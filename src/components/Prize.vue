<template>
  <div
    ref="prizeSection"
    class="max-w-6xl mx-auto overflow-hidden rounded-lg shadow-2xl prize-container"
    :class="{ 'prize-visible': isVisible }"
  >
    <!-- Statistics Section - Gradient Background -->
    <div class="bg-gradient-to-b from-[#d4fcf8] to-[#eafffe] p-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        <!-- Statistic 1 -->
        <div class="text-slate-800">
          <div class="text-5xl md:text-6xl font-bold mb-3 text-slate-700">
            {{ animatedCount1 }}+
          </div>
          <div class="text-lg md:text-xl text-slate-600">Thí sinh đăng ký</div>
        </div>

        <!-- Statistic 2 -->
        <div class="text-slate-800">
          <div class="text-5xl md:text-6xl font-bold mb-3 text-slate-700">
            {{ animatedCount2 }}+
          </div>
          <div class="text-lg md:text-xl text-slate-600">Tiếp cận thí sinh</div>
        </div>

        <!-- Statistic 3 -->
        <div class="text-slate-800">
          <div class="text-5xl md:text-6xl font-bold mb-3 text-slate-700">
            {{ animatedCount3 }}+
          </div>
          <div class="text-lg md:text-xl text-slate-600">Trường Đại học</div>
        </div>
      </div>
    </div>

    <!-- Prize Section - Simple Dark Background -->
    <div
      class="relative bg-gradient-to-br from-[#233b51] via-[#233b51]/80 to-[#233b51] p-16 overflow-hidden opacity-90"
    >
      <div class="relative z-10 my-4 text-center text-white">
        <h2 class="text-2xl md:text-3xl font-bold mb-6 tracking-wide">
          TỔNG GIÁ TRỊ GIẢI THƯỞNG LÊN TỚI
        </h2>
        <div
          class="text-5xl md:text-7xl font-bold text-cyan-300 drop-shadow-2xl tracking-wider glow-text"
        >
          HƠN {{ animatedPrize }} TRIỆU ĐỒNG
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const prizeSection = ref(null);
const isVisible = ref(false);
const animatedCount1 = ref(0);
const animatedCount2 = ref(0);
const animatedCount3 = ref(0);
const animatedPrize = ref(0);

// Target values
const targetCount1 = 2000;
const targetCount2 = 45000;
const targetCount3 = 20;
const targetPrize = 400;

let hasAnimated = false;

// Animation function
const animateNumber = (
  current,
  target,
  setter,
  duration = 2000,
  increment = 1
) => {
  if (current >= target) {
    setter(target);
    return;
  }

  const step = Math.ceil((target - current) / (duration / 16));
  const nextValue = Math.min(current + step, target);
  setter(nextValue);

  if (nextValue < target) {
    requestAnimationFrame(() => {
      animateNumber(nextValue, target, setter, duration - 16, increment);
    });
  }
};

// Format number with comma separator
const formatNumber = (num) => {
  return num.toLocaleString("vi-VN");
};

// Intersection Observer to trigger animation when in view
const setupIntersectionObserver = () => {
  if (!prizeSection.value) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;

          // Trigger component fade-in first
          isVisible.value = true;

          // Start animations with slight delays for staggered effect (delayed to allow fade-in)
          setTimeout(
            () =>
              animateNumber(
                0,
                targetCount1,
                (val) => {
                  animatedCount1.value = formatNumber(val);
                },
                3500
              ),
            600
          );

          setTimeout(
            () =>
              animateNumber(
                0,
                targetCount2,
                (val) => {
                  animatedCount2.value = formatNumber(val);
                },
                4000
              ),
            300
          );

          setTimeout(
            () =>
              animateNumber(
                0,
                targetCount3,
                (val) => {
                  animatedCount3.value = val;
                },
                2500
              ),
            1000
          );

          setTimeout(
            () =>
              animateNumber(
                0,
                targetPrize,
                (val) => {
                  animatedPrize.value = val;
                },
                3500
              ),
            1200
          );
        }
      });
    },
    {
      threshold: 0.3, // Trigger when 30% of element is visible
    }
  );

  observer.observe(prizeSection.value);

  return observer;
};

onMounted(() => {
  const observer = setupIntersectionObserver();

  onBeforeUnmount(() => {
    if (observer) {
      observer.disconnect();
    }
  });
});
</script>

<style scoped>
/* Prize container fade-in animation */
.prize-container {
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.8s ease-out;
}

.prize-visible {
  opacity: 1;
  transform: translateY(0);
}

.glow-text {
  text-shadow: 0 0 10px rgba(34, 211, 238, 0.8),
    0 0 20px rgba(34, 211, 238, 0.6), 0 0 30px rgba(34, 211, 238, 0.4),
    0 0 40px rgba(34, 211, 238, 0.3), 0 0 50px rgba(34, 211, 238, 0.2);
  filter: brightness(1.1);
}

.glow-text:hover {
  text-shadow: 0 0 15px rgba(34, 211, 238, 1), 0 0 25px rgba(34, 211, 238, 0.8),
    0 0 35px rgba(34, 211, 238, 0.6), 0 0 45px rgba(34, 211, 238, 0.4),
    0 0 55px rgba(34, 211, 238, 0.3);
  filter: brightness(1.2);
  transition: all 0.3s ease;
}
</style>
