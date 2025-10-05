<template>
  <section ref="sectionElement" class="relative w-full py-16 px-4 md:px-16">
    <!-- Title component -->
    <div class="flex justify-center mb-5">
      <Title text="VỀ CUỘC THI" />
    </div>
    <!-- Content with full-width background strip -->
    <div class="relative">
      <!-- Full-width background strip -->
      <div
        class="absolute inset-0 w-screen left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#214159]/20 via-[#214159]/40 to-[#214159] backdrop-blur-sm"
      ></div>

      <!-- Content positioned over background -->
      <div
        class="relative z-10 flex flex-col md:flex-row items-center gap-8 py-8 min-h-[400px] md:min-h-[300px]"
      >
        <!-- Image -->
        <div
          ref="imageElement"
          class="md:w-1/2 md:ml-13 flex justify-center animate-element"
          :class="{ 'animate-visible': isVisible }"
        >
          <img
            src="@/assets/cup.jpg"
            alt="About Us"
            class="w-5/6 rounded-lg shadow-lg mt-3 mb-1"
          />
        </div>
        <!-- Text content -->
        <div
          ref="textElement"
          class="md:w-1/2 mr-5 md:mr-13 text-white text-base md:text-lg leading-relaxed flex items-center text-center md:text-left animate-element animate-delay"
          :class="{ 'animate-visible': isVisible }"
        >
          <div>
            Bản lĩnh Nhà đầu tư - cuộc thi đầu tiên và duy nhất tại Học viện
            Ngân hàng và là một trong những cuộc thi lớn nhất về lĩnh vực Kinh
            tế - Tài chính - Chứng khoán dành cho sinh viên toàn quốc, được tổ
            chức bởi CLB Chứng khoán Học viện Ngân hàng - SEC. Cuộc thi tự hào
            về hành trình hơn một thập kỷ xây dựng, phát triển, đánh thức giá
            trị cốt lõi trong mỗi bạn sinh viên, mang đến những giá trị toàn
            diện cho các bạn trẻ và doanh nghiệp. Trở lại với dấu mốc 14 năm,
            Bản lĩnh Nhà đầu tư 2025 đem đến những trải nghiệm chuyên sâu và
            thực tế, tiếp nối thành công của các mùa trước và hứa hẹn sẽ bùng nổ
            hơn với sự tranh tài của hàng ngàn thí sinh đến từ mọi miền Tổ quốc.
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import Title from "@/components/Title.vue";

const sectionElement = ref(null);
const textElement = ref(null);
const imageElement = ref(null);
const isVisible = ref(false);
let observer = null;

onMounted(() => {
  // Intersection Observer để theo dõi khi section xuất hiện
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
      threshold: 0.2, // Trigger khi 20% section xuất hiện
      rootMargin: "0px 0px -50px 0px", // Trigger sớm hơn một chút
    }
  );

  if (sectionElement.value) {
    observer.observe(sectionElement.value);
  }
});

onUnmounted(() => {
  if (observer && sectionElement.value) {
    observer.unobserve(sectionElement.value);
  }
});
</script>

<style scoped>
/* Animation cho elements */
.animate-element {
  opacity: 0;
  transform: translateY(40px) scale(0.95);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Animation delay cho element thứ hai */
.animate-delay {
  transition-delay: 0.2s;
}

/* Trạng thái khi visible */
.animate-visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* Hiệu ứng bounce nhẹ khi element xuất hiện hoàn toàn */
.animate-visible {
  animation: bounceIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: translateY(40px) scale(0.95);
  }
  60% {
    opacity: 0.9;
    transform: translateY(-5px) scale(1.01);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
