<template>
  <section ref="activitySection" class="activity-scroll-section">
    <div class="activity-wrapper">
      <div class="activity-inner">
        <!-- Background images (large) with fade transition -->
        <div class="absolute inset-0 z-0">
          <div
            v-for="(activity, index) in activities"
            :key="'bg-' + index"
            class="absolute inset-0 transition-opacity duration-[800ms] ease-in-out"
            :class="{
              'opacity-100': currentBgIndex === index,
              'opacity-0': currentBgIndex !== index,
            }"
          >
            <img
              :src="activity.backgroundImage"
              alt="Background"
              class="w-full h-full object-cover"
            />
          </div>
        </div>

        <!-- Horizontal scrolling SmallPictures -->
        <div class="activity-horizontal-wrapper">
          <div
            ref="activityHorizontalInner"
            class="activity-horizontal-inner"
            :style="{ transform: `translateX(-${horizontalOffset}px)` }"
          >
            <div
              v-for="(activity, index) in activities"
              :key="'item-' + index"
              class="activity-horizontal-item"
            >
              <div class="w-full h-full flex justify-center items-center pl-64">
                <div class="small-picture-hover-wrapper">
                  <SmallPicture :type="activity.type" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Vertical title section - Right side -->
        <div
          class="absolute right-0 top-0 w-20 h-full flex items-center justify-center bg-black/30 backdrop-blur-sm z-30 hover-title-section"
        >
          <div class="transform rotate-90 origin-center">
            <h2
              class="text-white text-3xl md:text-4xl font-bold tracking-wider whitespace-nowrap glow-title hover-title-text"
            >
              CÁC HOẠT ĐỘNG
            </h2>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import SmallPicture from "@/components/SmallPicture.vue";

// Import background images
import B1 from "@/assets/B1.png";
import B2 from "@/assets/B2.png";
import B3 from "@/assets/B3.jpg";

// Activities data
const activities = [
  {
    type: "training",
    backgroundImage: B1,
  },
  {
    type: "presentation",
    backgroundImage: B2,
  },
  {
    type: "gala",
    backgroundImage: B3,
  },
];

const activitySection = ref(null);
const activityHorizontalInner = ref(null);
const currentBgIndex = ref(0);
const horizontalOffset = ref(0);

onMounted(() => {
  const el = activitySection.value;
  if (!el) return;

  const wrapper = el.querySelector(".activity-wrapper");
  const inner = activityHorizontalInner.value;

  // Setup activity scroll section height
  let totalWidth = 0;
  const bufferDistance = 200;
  const endBufferDistance = 100;

  const setupActivityScroll = () => {
    if (inner) {
      totalWidth = inner.scrollWidth;
      // Set section height based on content width plus buffers
      el.style.height = `${totalWidth + bufferDistance + endBufferDistance}px`;
    }
  };

  // Setup on load and resize
  setupActivityScroll();
  window.addEventListener("resize", setupActivityScroll);

  // Handle scroll for horizontal effect and background fade
  const handleScroll = () => {
    const rect = el.getBoundingClientRect();

    // Check if we're in the activity scroll zone
    if (rect.top <= bufferDistance && rect.bottom > window.innerHeight) {
      const scrollY = Math.max(0, -rect.top + bufferDistance);

      // Buffer zone - before horizontal scrolling starts
      if (scrollY < bufferDistance) {
        horizontalOffset.value = 0;
        currentBgIndex.value = 0;
      }
      // Main scrolling zone
      else if (
        scrollY >= bufferDistance &&
        scrollY <= totalWidth - window.innerWidth + endBufferDistance
      ) {
        const adjustedScrollY = scrollY - bufferDistance;

        // Update horizontal offset for SmallPictures
        horizontalOffset.value = adjustedScrollY;

        // Calculate which background should be shown based on scroll progress
        const maxScrollWidth = totalWidth - window.innerWidth;
        const scrollProgress = adjustedScrollY / maxScrollWidth;
        const bgIndex = Math.min(
          Math.floor(scrollProgress * activities.length),
          activities.length - 1
        );

        // Update background with smooth transitions at boundaries
        const sectionProgress = (scrollProgress * activities.length) % 1;
        if (sectionProgress < 0.1 || sectionProgress > 0.9) {
          currentBgIndex.value = Math.round(scrollProgress * activities.length);
        } else {
          currentBgIndex.value = bgIndex;
        }
      }
      // End buffer zone
      else if (scrollY > totalWidth - window.innerWidth + endBufferDistance) {
        horizontalOffset.value = totalWidth - window.innerWidth;
        currentBgIndex.value = activities.length - 1;
      }
    }
  };

  window.addEventListener("scroll", handleScroll);

  onBeforeUnmount(() => {
    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("resize", setupActivityScroll);
  });
});
</script>

<style scoped>
/* Activity scroll section similar to horizontal scroll in App.vue */
.activity-scroll-section {
  position: relative;
  width: 100vw;
  /* height will be set dynamically by JavaScript */
}

.activity-wrapper {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
}

.activity-wrapper::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

.activity-inner {
  position: relative;
  height: 100%;
  width: 100vw;
}

.activity-horizontal-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
  z-index: 20;
}

.activity-horizontal-inner {
  display: flex;
  height: 100%;
  /* width will be calculated based on items */
  transition: transform 0.1s ease-out;
}

.activity-horizontal-item {
  flex: 0 0 100vw;
  height: 100vh;
  position: relative;
}

/* Vertical title glow effect */
.glow-title {
  text-shadow: 0 0 3px rgba(223, 251, 255, 0.6),
    0 0 6px rgba(223, 251, 255, 0.4), 0 0 9px rgba(223, 251, 255, 0.3),
    0 0 12px rgba(223, 251, 255, 0.2);
}

/* Simple hover effects for title section */
.hover-title-section {
  transition: all 0.3s ease;
  cursor: pointer;
}

.hover-title-section:hover {
  transform: scale(1.05);
  width: 120px; /* Mở rộng từ 80px (w-20) lên 120px */
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  box-shadow: 0 0 25px rgba(96, 217, 250, 0.4), 0 0 50px rgba(96, 217, 250, 0.2);
}

.hover-title-text {
  transition: all 0.3s ease;
}

.hover-title-section:hover .hover-title-text {
  transform: scale(1.1);
  text-shadow: 0 0 5px rgba(223, 251, 255, 0.8),
    0 0 10px rgba(223, 251, 255, 0.6), 0 0 15px rgba(223, 251, 255, 0.4),
    0 0 20px rgba(96, 217, 250, 0.6), 0 0 30px rgba(96, 217, 250, 0.4);
}

/* SmallPicture hover effects */
.small-picture-hover-wrapper {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  border-radius: 20px;
  padding: 20px;
  position: relative;
  overflow: hidden;
}

.small-picture-hover-wrapper::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.05),
    rgba(255, 255, 255, 0.02)
  );
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  opacity: 0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: -1;
}

.small-picture-hover-wrapper:hover::before {
  opacity: 1;
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.15),
    rgba(255, 255, 255, 0.08)
  );
  border: 1px solid rgba(96, 217, 250, 0.3);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15), 0 0 30px rgba(96, 217, 250, 0.2);
}

.small-picture-hover-wrapper:hover {
  transform: translateY(-15px) scale(1.05);
  filter: brightness(1.1) saturate(1.2);
}

.small-picture-hover-wrapper::after {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent,
    rgba(96, 217, 250, 0.1),
    transparent
  );
  transform: translateX(-100%) translateY(-100%) rotate(45deg);
  transition: transform 0.6s ease;
  pointer-events: none;
}

.small-picture-hover-wrapper:hover::after {
  transform: translateX(100%) translateY(100%) rotate(45deg);
}

/* Ripple effect on click */
.small-picture-hover-wrapper:active {
  transform: translateY(-15px) scale(1.02);
  transition: transform 0.1s ease;
}

/* Additional glow animation */
@keyframes smallPictureGlow {
  0%,
  100% {
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15),
      0 0 30px rgba(96, 217, 250, 0.2);
  }
  50% {
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2), 0 0 40px rgba(96, 217, 250, 0.4);
  }
}

.small-picture-hover-wrapper:hover::before {
  animation: smallPictureGlow 2s ease-in-out infinite;
}

/* Background fade transition */
.transition-opacity {
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
