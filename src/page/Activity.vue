<template>
  <section class="relative w-full h-screen overflow-hidden flex">
    <!-- Main content area - Left side -->
    <div class="relative flex-1 h-full">
      <!-- Background images (large) with custom fade transition -->
      <div class="absolute inset-0 z-0">
        <div
          v-for="(activity, index) in activities"
          :key="'bg-' + index"
          class="absolute inset-0 transition-opacity duration-[800ms] ease-in-out"
          :class="{
            'opacity-100': currentIndex === index,
            'opacity-0': currentIndex !== index,
          }"
        >
          <img
            :src="activity.backgroundImage"
            alt="Background"
            class="w-full h-full object-cover"
          />
          <!-- Removed dark overlay for clearer background -->
        </div>
      </div>
      <!-- Small pictures container (top area) -->
      <div class="absolute w-full z-10 pt-16 pb-8">
        <!-- Single small picture with slide-in/out transition -->
        <div
          class="relative w-full flex justify-end pr-24 overflow-hidden h-[700px]"
        >
          <!-- Current image -->
          <div
            :key="'current-' + currentIndex + '-' + animationKey"
            class="absolute top-0 left-0 w-full animate-slide-in-right"
          >
            <SmallPicture :type="activities[currentIndex].type" />
          </div>
          <!-- Previous image sliding out -->
          <div
            v-if="prevIndex !== currentIndex"
            :key="'prev-' + prevIndex + '-' + (animationKey - 1)"
            class="absolute top-0 left-0 w-full animate-slide-out-left"
          >
            <SmallPicture :type="activities[prevIndex].type" />
          </div>
        </div>
      </div>
    </div>
    <!-- Vertical title section - Right side -->
    <div
      class="w-20 h-full flex items-center justify-center bg-black/30 backdrop-blur-sm"
    >
      <div class="transform rotate-90 origin-center">
        <h2
          class="text-white text-3xl md:text-4xl font-bold tracking-wider whitespace-nowrap glow-title"
        >
          CÁC HOẠT ĐỘNG
        </h2>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
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

// Reactive state
const currentIndex = ref(0);
const prevIndex = ref(0);
const animationKey = ref(0); // Counter để force re-render
const isSliding = ref(false); // Track khi đang slide

// Watch currentIndex to update progress manually if needed
const progress = ref(0);
let progressInterval = null;

const startProgress = () => {
  progress.value = 0;
  if (progressInterval) clearInterval(progressInterval);

  progressInterval = setInterval(() => {
    progress.value += 2.5;
    if (progress.value >= 100) {
      progress.value = 0;
    }
  }, 100);
};

// Auto-cycle for background images
let autoPlayInterval = null;

const startAutoPlay = () => {
  autoPlayInterval = setInterval(() => {
    prevIndex.value = currentIndex.value;
    if (currentIndex.value < activities.length - 1) {
      currentIndex.value++;
    } else {
      currentIndex.value = 0;
    }
    animationKey.value++;
  }, 8000);
};

// Methods
const nextSlide = () => {
  if (currentIndex.value < activities.length - 1) {
    prevIndex.value = currentIndex.value;
    currentIndex.value++;
    animationKey.value++; // Increment để force re-render
  }
  resetAutoPlay();
};

const prevSlide = () => {
  if (currentIndex.value > 0) {
    prevIndex.value = currentIndex.value;
    currentIndex.value--;
    animationKey.value++; // Increment để force re-render
  }
  resetAutoPlay();
};

const setCurrentIndex = (index) => {
  prevIndex.value = currentIndex.value;
  currentIndex.value = index;
  animationKey.value++; // Increment để force re-render
  resetAutoPlay();
};

const resetAutoPlay = () => {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval);
  }
  startAutoPlay();
};

// Watch cho v-carousel tự động chuyển
watch(currentIndex, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    prevIndex.value = oldVal;
    animationKey.value++;
  }
});

// Lifecycle
onMounted(() => {
  startProgress();
  startAutoPlay();
});

onBeforeUnmount(() => {
  if (progressInterval) {
    clearInterval(progressInterval);
  }
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval);
  }
});
</script>

<style scoped>
/* Vertical title glow effect */
.glow-title {
  text-shadow: 0 0 3px rgba(223, 251, 255, 0.6),
    0 0 6px rgba(223, 251, 255, 0.4), 0 0 9px rgba(223, 251, 255, 0.3),
    0 0 12px rgba(223, 251, 255, 0.2);
}

/* Smooth transitions */
.transition-transform {
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Slide animations */
@keyframes slideInRight {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes slideOutLeft {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}

.animate-slide-in-right {
  animation: slideInRight 2s ease-out forwards;
}

.animate-slide-out-left {
  animation: slideOutLeft 2s ease-out forwards;
}
</style>
