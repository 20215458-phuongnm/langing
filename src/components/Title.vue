<template>
  <div
    ref="titleElement"
    class="relative mx-auto mb-12 title-container"
    :class="{ 'fade-in-visible': isVisible }"
    style="width: 320px; height: 140px"
  >
    <!-- Ảnh nền với kích thước cố định -->
    <img
      src="@/assets/title-frame.png"
      alt="Title Frame"
      class="w-full h-full object-contain title-frame"
    />

    <!-- Chữ overlay với font size cố định -->
    <h2
      class="absolute inset-0 flex items-center justify-center text-white font-bold title-text -mt-1"
      style="font-size: 28px; z-index: 10"
    >
      {{ props.text }}
    </h2>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const props = defineProps({
  text: {
    type: String,
    default: "VỀ CHÚNG TÔI",
  },
});

const titleElement = ref(null);
const isVisible = ref(false);
let observer = null;

onMounted(() => {
  // Intersection Observer để theo dõi khi element xuất hiện
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true;
          // Không cần observe nữa sau khi đã trigger animation
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.3, // Trigger khi 30% element xuất hiện
      rootMargin: "0px 0px -50px 0px", // Trigger sớm hơn một chút
    }
  );

  if (titleElement.value) {
    observer.observe(titleElement.value);
  }
});

onUnmounted(() => {
  if (observer && titleElement.value) {
    observer.unobserve(titleElement.value);
  }
});
</script>

<style scoped>
.title-container {
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  /* Trạng thái ban đầu - ẩn và ở dưới */
  opacity: 0;
  transform: translateY(50px);
  transition: opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1),
    transform 1.2s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Khi element xuất hiện */
.fade-in-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Hover effects chỉ hoạt động sau khi đã fade in */
.fade-in-visible:hover {
  transform: translateY(-8px) scale(1.05);
  filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.4));
}

.title-frame {
  border-radius: 8px;
  position: relative;
  z-index: 1;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.title-text {
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 1), 2px 2px 4px rgba(0, 0, 0, 0.9),
    1px 1px 2px rgba(0, 0, 0, 0.8), 0 0 15px rgba(0, 0, 0, 0.6);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  letter-spacing: 1px;
}

.title-container:hover .title-text {
  text-shadow: 3px 3px 8px rgba(0, 0, 0, 1), 2px 2px 6px rgba(0, 0, 0, 0.9),
    1px 1px 4px rgba(0, 0, 0, 0.8), 0 0 25px rgba(255, 255, 255, 0.6),
    0 0 35px rgba(255, 255, 255, 0.4);
  letter-spacing: 2px;
  transform: scale(1.02);
}

/* Hiệu ứng glow khi hover - chỉ cho element đã fade in */
.fade-in-visible:hover::before {
  content: "";
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  background: linear-gradient(
    45deg,
    rgba(30, 225, 255, 0.1),
    rgba(22, 180, 238, 0.1),
    rgba(11, 119, 243, 0.1),
    rgba(4, 218, 251, 0.1)
  );
  border-radius: 20px;
  filter: blur(15px);
  z-index: -1;
  animation: pulse-glow 2s ease-in-out infinite alternate;
}

@keyframes pulse-glow {
  0% {
    opacity: 0.5;
    transform: scale(0.95);
  }
  100% {
    opacity: 0.8;
    transform: scale(1.05);
  }
}

/* Responsive hover effects */
@media (max-width: 768px) {
  .fade-in-visible:hover {
    transform: translateY(-4px) scale(1.02);
  }
}

/* Disable hover effects on touch devices */
@media (hover: none) {
  .fade-in-visible:hover {
    transform: translateY(0) !important;
    filter: none;
  }

  .title-container:hover .title-frame {
    filter: none;
    box-shadow: none;
  }

  .title-container:hover .title-text {
    text-shadow: 3px 3px 6px rgba(0, 0, 0, 1), 2px 2px 4px rgba(0, 0, 0, 0.9),
      1px 1px 2px rgba(0, 0, 0, 0.8), 0 0 15px rgba(0, 0, 0, 0.6);
    letter-spacing: 1px;
    transform: none;
  }

  .fade-in-visible:hover::before {
    display: none;
  }
}
</style>
