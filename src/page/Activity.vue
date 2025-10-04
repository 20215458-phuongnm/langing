<template>
  <section
    ref="activitySection"
    class="activity-scroll-section"
    :class="{ 'mobile-layout': isMobile }"
  >
    <div class="activity-wrapper" :class="{ 'mobile-wrapper': isMobile }">
      <div class="activity-inner" :class="{ 'mobile-inner': isMobile }">
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

        <!-- Desktop: Horizontal scrolling SmallPictures -->
        <div v-if="!isMobile" class="activity-horizontal-wrapper">
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
              <div class="w-full h-full flex justify-center items-center">
                <div class="small-picture-hover-wrapper">
                  <SmallPicture :type="activity.type" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Mobile: Stack layout -->
        <div v-else class="mobile-activity-wrapper">
          <div class="mobile-activity-header">
            <h2
              class="text-white text-3xl font-bold text-center mb-8 glow-title"
            >
              CÁC HOẠT ĐỘNG
            </h2>
          </div>
          <div class="mobile-activity-content">
            <div
              class="mobile-horizontal-scroll-container"
              ref="mobileScrollContainer"
            >
              <div
                v-for="(activity, index) in activities"
                :key="'mobile-item-' + index"
                class="mobile-activity-item"
                @click="scrollToItem(index)"
              >
                <div class="mobile-smallpicture-wrapper">
                  <SmallPicture :type="activity.type" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Desktop: Vertical title section - Right side -->
        <div
          v-if="!isMobile"
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

        <!-- Mobile: Horizontal title section - Top -->
        <div
          v-if="isMobile"
          class="absolute top-0 left-0 right-0 w-full h-16 flex items-center justify-center bg-black/50 backdrop-blur-sm z-30 mobile-title-section"
        >
          <h2
            class="text-white text-2xl font-bold tracking-wider glow-title mobile-title-text"
          >
            CÁC HOẠT ĐỘNG
          </h2>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed, nextTick } from "vue";
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
const mobileScrollContainer = ref(null);
const currentBgIndex = ref(0);
const horizontalOffset = ref(0);

// Mobile detection
const isMobile = computed(() => {
  if (typeof window !== "undefined") {
    return window.innerWidth < 768;
  }
  return false;
});

// Function to scroll to specific item on mobile
const scrollToItem = (index) => {
  if (!isMobile.value || !mobileScrollContainer.value) return;

  const container = mobileScrollContainer.value;
  const items = container.querySelectorAll(".mobile-activity-item");

  if (items[index]) {
    // Calculate scroll position to center the item
    const item = items[index];
    const containerWidth = container.clientWidth;
    const itemWidth = item.clientWidth;
    const itemOffset = item.offsetLeft;
    const scrollPosition = itemOffset - (containerWidth - itemWidth) / 2;

    // Smooth scroll to the item
    container.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    });

    // Update background index immediately
    currentBgIndex.value = index;
  }
};

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

  // Handle mobile horizontal scroll for background change
  const handleMobileScroll = () => {
    if (!isMobile.value || !mobileScrollContainer.value) return;

    const container = mobileScrollContainer.value;
    const items = container.querySelectorAll(".mobile-activity-item");
    const containerWidth = container.clientWidth;
    const scrollLeft = container.scrollLeft;

    // Calculate which item is currently centered
    let centerIndex = 0;
    let minDistance = Infinity;

    items.forEach((item, index) => {
      const itemCenter = item.offsetLeft + item.clientWidth / 2;
      const containerCenter = scrollLeft + containerWidth / 2;
      const distance = Math.abs(itemCenter - containerCenter);

      if (distance < minDistance) {
        minDistance = distance;
        centerIndex = index;
      }
    });

    // Update background index if changed
    if (centerIndex !== currentBgIndex.value) {
      currentBgIndex.value = centerIndex;
    }
  };

  // Add mobile scroll listener if on mobile
  nextTick(() => {
    if (isMobile.value && mobileScrollContainer.value) {
      mobileScrollContainer.value.addEventListener(
        "scroll",
        handleMobileScroll
      );
    }
  });

  onBeforeUnmount(() => {
    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("resize", setupActivityScroll);
    if (mobileScrollContainer.value) {
      mobileScrollContainer.value.removeEventListener(
        "scroll",
        handleMobileScroll
      );
    }
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

/* Mobile title section */
.mobile-title-section {
  transition: all 0.3s ease;
}

.mobile-title-text {
  transition: all 0.3s ease;
  text-shadow: 0 0 3px rgba(223, 251, 255, 0.6),
    0 0 6px rgba(223, 251, 255, 0.4), 0 0 9px rgba(223, 251, 255, 0.3),
    0 0 12px rgba(223, 251, 255, 0.2);
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

/* Mobile Layout Styles */
@media (max-width: 767px) {
  .mobile-layout {
    height: auto !important;
    position: relative;
  }

  .mobile-wrapper {
    position: relative !important;
    height: auto !important;
    overflow: visible !important;
  }

  .mobile-inner {
    height: auto !important;
    width: 100% !important;
  }

  .mobile-activity-wrapper {
    position: relative;
    z-index: 20;
    min-height: 100vh;
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5));
    padding-top: 4rem; /* Add padding for mobile title */
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    display: flex;
    flex-direction: column;
    justify-content: center; /* Center vertically */
  }

  .mobile-activity-header {
    display: none; /* Hide since we have mobile title section now */
  }

  .mobile-main-title {
    font-size: 2.25rem !important;
    text-shadow: 0 0 10px rgba(223, 251, 255, 0.8),
      0 0 20px rgba(223, 251, 255, 0.6), 0 0 30px rgba(223, 251, 255, 0.4),
      0 0 40px rgba(96, 217, 250, 0.6);
    letter-spacing: 0.1em;
    margin-bottom: 0 !important;
  }

  .mobile-activity-content {
    padding: 1rem 0 2rem 0;
    flex: 1;
    display: flex;
    align-items: center; /* Center the horizontal scroll container */
  }

  .mobile-horizontal-scroll-container {
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
    gap: 1rem;
    padding: 0 1rem 0 1rem;
    scroll-snap-type: x mandatory;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE/Edge */
    scroll-behavior: smooth;
  }

  .mobile-horizontal-scroll-container::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }

  .mobile-activity-item {
    position: relative;
    flex: 0 0 75vw;
    height: 300px; /* Fixed height instead of min-height for better centering */
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    overflow: hidden;
    transition: all 0.3s ease;
    scroll-snap-align: center;
    cursor: pointer;
  }

  .mobile-activity-item:hover {
    transform: scale(1.02);
  }

  .mobile-smallpicture-wrapper {
    position: relative;
    z-index: 10;
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-radius: 15px;
    padding: 1.5rem;
    border: 1px solid rgba(255, 255, 255, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .mobile-smallpicture-wrapper:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: scale(1.03);
    transition: all 0.3s ease;
  }

  /* Disable desktop hover effects on mobile */
  .mobile-activity-wrapper .small-picture-hover-wrapper {
    padding: 0;
    border-radius: 0;
  }

  .mobile-activity-wrapper .small-picture-hover-wrapper::before,
  .mobile-activity-wrapper .small-picture-hover-wrapper::after {
    display: none;
  }

  .mobile-activity-wrapper .small-picture-hover-wrapper:hover {
    transform: none;
    filter: none;
  }

  /* Visual indicator for horizontal scroll */
  .mobile-horizontal-scroll-container::after {
    content: "";
    position: sticky;
    right: 0;
    top: 0;
    width: 30px;
    height: 100%;
    background: linear-gradient(
      270deg,
      rgba(0, 0, 0, 0.4) 0%,
      transparent 100%
    );
    pointer-events: none;
    z-index: 5;
    flex-shrink: 0;
  }
}

/* Small mobile devices */
@media (max-width: 480px) {
  .mobile-title-text {
    font-size: 1.5rem !important;
  }

  .mobile-activity-wrapper {
    padding-top: 3.5rem !important;
  }

  .mobile-activity-item {
    flex: 0 0 80vw;
    min-height: 65vh;
    padding: 0.75rem;
  }

  .mobile-smallpicture-wrapper {
    max-width: 350px;
    padding: 1rem;
  }

  .mobile-horizontal-scroll-container {
    gap: 0.75rem;
    padding: 0 0.5rem;
  }
}

/* Very small mobile devices */
@media (max-width: 360px) {
  .mobile-title-text {
    font-size: 1.25rem !important;
  }

  .mobile-activity-wrapper {
    padding-top: 3rem !important;
  }

  .mobile-activity-item {
    flex: 0 0 85vw;
    min-height: 60vh;
    padding: 0.5rem;
  }

  .mobile-smallpicture-wrapper {
    max-width: 300px;
    padding: 0.75rem;
  }

  .mobile-horizontal-scroll-container {
    gap: 0.5rem;
    padding: 0 0.25rem;
  }
}
</style>
