<template>
  <div class="banner-section">
    <div class="marquee-wrapper" ref="wrapper">
      <div
        class="marquee"
        ref="marquee"
        :style="{ transform: `translateX(${translateX}px)` }"
      >
        <img
          v-for="n in 8"
          :key="`left-${n}`"
          src="@/assets/BLNDT.png"
          alt="BLNDT"
          class="marquee-img"
        />
        <img
          v-for="n in 8"
          :key="`center-${n}`"
          src="@/assets/BLNDT.png"
          alt="BLNDT"
          class="marquee-img"
        />
        <img
          v-for="n in 8"
          :key="`right-${n}`"
          src="@/assets/BLNDT.png"
          alt="BLNDT"
          class="marquee-img"
        />
      </div>
    </div>
    <div class="banner-text">
      <p>Cuộc thi về Kinh tế - Tài chính - Chứng khoán do sinh viên tổ chức</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const wrapper = ref(null);
const marquee = ref(null);
const translateX = ref(0);

let animationFrame = null;
let speed = 0.5;
let direction = 1; 
let directionTimer = null;
const directionChangeInterval = 20000; 

const animate = () => {
  if (marquee.value) {
    translateX.value += speed * direction;

  }

  animationFrame = requestAnimationFrame(animate);
};

const changeDirection = () => {
  direction *= -1; // Toggle between -1 and 1
  console.log("Direction changed to:", direction === 1 ? "right" : "left");
};

const startDirectionTimer = () => {
  directionTimer = setInterval(() => {
    changeDirection();
  }, directionChangeInterval);
};

onMounted(() => {

  translateX.value = -2000; 

  animate();
  startDirectionTimer();
});

onUnmounted(() => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
  }

  if (directionTimer) {
    clearInterval(directionTimer);
  }
});
</script>

<style scoped>
.banner-section {
  background-color: #172534;
  width: 100%;
}

.marquee-wrapper {
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  position: relative;
  transform: translateZ(0);
  padding: 0 50px; 
}

.marquee {
  display: inline-flex;
  will-change: transform;
  backface-visibility: hidden;
  transform: translateZ(0);
  transition: none;
}

.marquee-img {
  height: 60px;
  margin-right: 40px;
  flex-shrink: 0;
  transform: translateZ(0);
  transition: none;
  image-rendering: auto;
  display: block;
}

.banner-text {
  background-color: #172534;
  padding: 15px 20px;
  text-align: center;
}

.banner-text p {
  color: white;
  font-size: 16px;
  font-weight: 500;
  margin: 0;
  letter-spacing: 0.5px;
  line-height: 1.4;
}

@media (max-width: 768px) {
  .banner-text p {
    font-size: 14px;
    padding: 0 10px;
  }
}

@media (max-width: 480px) {
  .banner-text p {
    font-size: 12px;
    line-height: 1.3;
  }
}
</style>
