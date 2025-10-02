<template>
  <div
    class="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto small-picture-component"
  >
    <!-- Small image with white border -->
    <div
      class="relative border-2 sm:border-4 border-white overflow-hidden image-container"
    >
      <img
        :src="currentActivity.image"
        :alt="currentActivity.title"
        class="w-full h-auto object-cover shadow-lg image-zoom-effect"
      />
    </div>

    <!-- Information section with transparent background -->
    <div class="bg-black/60 backdrop-blur-sm p-2 sm:p-4 text-white">
      <!-- Title -->
      <h3
        class="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2 uppercase glow-title"
      >
        {{ currentActivity.title }}
      </h3>

      <!-- Description -->
      <p class="text-xs sm:text-sm text-white/90 leading-relaxed mb-2 sm:mb-3">
        {{ currentActivity.description }}
      </p>

      <!-- Subtitle -->
      <div class="text-xs text-cyan-300 uppercase tracking-wider font-medium">
        {{ currentActivity.subtitle }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

// Import images
import S1 from "@/assets/S1.png";
import S2 from "@/assets/S2.png";
import S3 from "@/assets/S3.png";

// Props
const props = defineProps({
  type: {
    type: String,
    required: true,
    validator: (value) => ["training", "presentation", "gala"].includes(value),
  },
});

// Activity data
const activities = {
  training: {
    title: "TRAINING",
    description:
      "Cuộc thi Bản lĩnh Nhà đầu tư mới các điều kiện về giai đoạn nghiệm trong lĩnh vực Tài chính - Chứng khoán chia sẻ bài học của bản, mang đến đặc quyền gia vị cho thí sinh.",
    subtitle: "TRAINING THÍ SINH TOP 50 & TOP 16",
    image: S1,
  },
  presentation: {
    title: "PRESENTATION",
    description:
      "TOP 16 thể hiện bản lĩnh trước Hội đồng giám khảo bằng phần thuyết trình về một cơ hội đầu tư tại Ủy ban Chứng khoán Nhà nước - nơi mọi ý tưởng có thể trở thành đầu tư năng.",
    subtitle: "THUYẾT TRÌNH TẠI UBCKNN",
    image: S2,
  },
  gala: {
    title: "GALA NIGHT",
    description:
      "Tại đêm Gala Chung kết, khán giả sẽ chứng kiến TOP 5 thí sinh xuất sắc tranh tài qua các thử thách kịch tính, những màn trình diễn đẳng cấp âm vị Quán Quân.",
    subtitle: "TRANH TÀI - THỬ THÁCH",
    image: S3,
  },
};

// Computed property để lấy activity dựa trên type
const currentActivity = computed(() => {
  return activities[props.type] || activities.training;
});
</script>

<style scoped>
/* Glow effect for title */
.glow-title {
  text-shadow: 0 0 15px rgba(223, 251, 255, 0.6),
    0 0 12px rgba(223, 251, 255, 0.4), 0 0 16px rgba(223, 251, 255, 0.3),
    0 0 16px rgba(223, 251, 255, 0.2);
}

/* Image zoom effect on hover - trigger từ component chính */
.small-picture-component {
  transition: all 0.3s ease;
  cursor: pointer;
}

.image-container {
  transition: all 0.3s ease;
}

.image-zoom-effect {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Hover vào bất kỳ đâu trong component sẽ zoom ảnh */
.small-picture-component:hover .image-zoom-effect {
  transform: scale(1.1);
}

.small-picture-component:hover .image-container {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3), 0 0 20px rgba(96, 217, 250, 0.2);
}

/* Mobile responsive styles */
@media (max-width: 767px) {
  .small-picture-component {
    max-width: none !important;
    width: 100%;
  }

  .image-container {
    border-width: 3px;
  }

  .small-picture-component > div:last-child {
    padding: 1.5rem !important;
  }

  .small-picture-component h3 {
    font-size: 1.5rem !important;
    margin-bottom: 1rem !important;
  }

  .small-picture-component p {
    font-size: 0.875rem !important;
    line-height: 1.6 !important;
    margin-bottom: 1rem !important;
  }

  .small-picture-component > div:last-child > div:last-child {
    font-size: 0.75rem !important;
  }
}

/* Small mobile devices */
@media (max-width: 480px) {
  .small-picture-component h3 {
    font-size: 1.25rem !important;
  }

  .small-picture-component p {
    font-size: 0.8rem !important;
  }

  .small-picture-component > div:last-child {
    padding: 1.25rem !important;
  }
}

/* Very small mobile devices */
@media (max-width: 360px) {
  .small-picture-component h3 {
    font-size: 1.125rem !important;
  }

  .small-picture-component p {
    font-size: 0.75rem !important;
  }

  .small-picture-component > div:last-child {
    padding: 1rem !important;
  }
}
</style>
