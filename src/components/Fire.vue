<template>
  <div ref="container" class="w-full h-screen bg-black"></div>
</template>

<script setup>
import { onMounted, ref } from "vue"
import * as THREE from "three"

const container = ref(null)

onMounted(() => {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.z = 3

  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  container.value.appendChild(renderer.domElement)

  // Plane cho ngọn lửa
  const geometry = new THREE.PlaneGeometry(1.5, 2, 64, 64);

const material = new THREE.ShaderMaterial({
  uniforms: {
    time: { value: 0 },
    intensity: { value: 1.0 },
  },
  vertexShader: `
    varying vec2 vUv;
    uniform float time;
    void main() {
      vUv = uv;

      // làm lửa bập bùng bằng cách méo đỉnh lên xuống
      vec3 pos = position;
      
      // Multiple wave layers for more realistic fire movement - gentler
      float wave1 = sin(pos.y * 6.0 + time * 2.0) * 0.03;
      float wave2 = sin(pos.y * 8.0 + time * 2.5) * 0.02;
      float wave3 = sin(pos.y * 12.0 + time * 3.0) * 0.015;
      
      pos.x += wave1 + wave2 + wave3;
      
      // Vertical flickering - more gentle
      pos.y += sin(pos.x * 5.0 + time * 1.5) * 0.02;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    uniform float time;
    uniform float intensity;

    // Noise function for realistic fire texture
    float noise(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    void main() {
      vec2 uv = vUv;
      
      // Create base fire shape
      float fireShape = smoothstep(0.0, 0.3, uv.y) * smoothstep(1.0, 0.7, uv.y);
      fireShape *= smoothstep(0.0, 0.2, abs(uv.x - 0.5));
      fireShape *= smoothstep(1.0, 0.8, abs(uv.x - 0.5));
      
      // Add turbulent movement - gentler
      vec2 turbulence = vec2(
        sin(uv.y * 6.0 + time * 1.5) * 0.05,
        sin(uv.x * 8.0 + time * 2.0) * 0.025
      );
      
      uv += turbulence;
      
      // Multiple flicker layers for bập bùng effect - slower and gentler
      float flicker1 = 0.8 + 0.2 * sin(time * 12.0 + uv.y * 5.0);
      float flicker2 = 0.85 + 0.15 * sin(time * 8.0 + uv.x * 6.0);
      float flicker3 = 0.9 + 0.1 * sin(time * 15.0 + uv.y * 8.0);
      
      float totalFlicker = flicker1 * flicker2 * flicker3;
      
      // Create fire gradient
      float fireIntensity = fireShape * totalFlicker;
      fireIntensity = pow(fireIntensity, 0.8);
      
      // Blue fire colors - từ xanh đậm đến trắng xanh
      vec3 darkBlue = vec3(0.0, 0.1, 0.6);
      vec3 brightBlue = vec3(0.0, 0.5, 1.0);
      vec3 hotBlue = vec3(0.3, 0.8, 1.0);
      vec3 white = vec3(1.0, 1.0, 1.0);
      
      vec3 color;
      if(fireIntensity < 0.3) {
        color = mix(darkBlue, brightBlue, fireIntensity / 0.3);
      } else if(fireIntensity < 0.7) {
        color = mix(brightBlue, hotBlue, (fireIntensity - 0.3) / 0.4);
      } else {
        color = mix(hotBlue, white, (fireIntensity - 0.7) / 0.3);
      }
      
      // Add some noise for texture
      float noiseValue = noise(uv * 20.0 + time);
      fireIntensity *= 0.9 + 0.1 * noiseValue;
      
      // Reduce overall opacity for gentler effect
      fireIntensity *= 0.6;
      
      gl_FragColor = vec4(color, fireIntensity * intensity);
    }
  `,
  transparent: true,
});

  // Create multiple flame layers for depth
  const flames = [];
  
  // Main flame
  const mainFlame = new THREE.Mesh(geometry, material);
  scene.add(mainFlame);
  flames.push({ mesh: mainFlame, speed: 1.0, scale: 1.0 });
  
  // Secondary flame (slightly smaller, different movement)
  const secondaryMaterial = material.clone();
  secondaryMaterial.uniforms.intensity.value = 0.4;
  const secondaryFlame = new THREE.Mesh(geometry, secondaryMaterial);
  secondaryFlame.scale.set(0.8, 0.9, 1.0);
  secondaryFlame.position.z = -0.1;
  scene.add(secondaryFlame);
  flames.push({ mesh: secondaryFlame, speed: 0.8, scale: 0.8 });
  
  // Inner core flame (brightest)
  const coreMaterial = material.clone();
  coreMaterial.uniforms.intensity.value = 0.7;
  const coreFlame = new THREE.Mesh(geometry, coreMaterial);
  coreFlame.scale.set(0.6, 0.7, 1.0);
  coreFlame.position.z = 0.1;
  scene.add(coreFlame);
  flames.push({ mesh: coreFlame, speed: 1.2, scale: 0.6 });

  // Animation with enhanced flickering
  function animate() {
    requestAnimationFrame(animate)
    
    // Update time for all flames - slower animation
    flames.forEach((flame, index) => {
      flame.mesh.material.uniforms.time.value += 0.01 * flame.speed;
      
      // Add random intensity variations for bập bùng effect - gentler
      const baseIntensity = index === 2 ? 0.7 : (index === 1 ? 0.4 : 0.6);
      const flicker = 0.9 + 0.1 * Math.sin(Date.now() * 0.005 * (index + 1));
      flame.mesh.material.uniforms.intensity.value = baseIntensity * flicker;
      
      // Slight random movement for each flame - more subtle
      flame.mesh.rotation.z = Math.sin(Date.now() * 0.001 * flame.speed) * 0.02;
    });
    
    renderer.render(scene, camera)
  }
  animate()

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  })
})
</script>
