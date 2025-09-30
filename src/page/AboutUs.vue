<template>
  <section ref="sectionElement" class="relative w-full py-16 px-4 md:px-16">
    <!-- Title component -->
    <div class="flex justify-center mb-5">
      <Title />
    </div>
    <!-- Content with full-width background strip -->
    <div class="relative">
      <!-- Full-width background strip -->
      <div
        class="absolute inset-0 w-screen left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#214159] via-[#214159]/40 to-[#214159]/20 backdrop-blur-sm"
      ></div>

      <!-- Content positioned over background -->
      <div
        class="relative z-10 flex flex-col md:flex-row items-center gap-8 py-8 min-h-[400px] md:min-h-[300px]"
      >
        <!-- Text content -->
        <div
          ref="textElement"
          class="md:w-1/2 md:ml-13 text-white text-base md:text-lg leading-relaxed flex items-center text-center md:text-left animate-element"
          :class="{ 'animate-visible': isVisible }"
        >
          <div>
            Câu lạc bộ chứng khoán Học viện Ngân hàng - SEC (Securities Club) là
            một trong những câu lạc bộ lâu đời và có tầm ảnh hưởng nhất Học viện
            Ngân hàng. Với thông điệp “Phát huy sức trẻ, Chia sẻ tầm nhìn”, trải
            qua 18 năm hình thành, phát triển, SEC tự hào là tổ chức sinh viên
            mang tính biểu tượng của Học viện Ngân hàng, đem lại cho các bạn
            sinh viên những trải nghiệm và giá trị khó quên. Với nhiều sự kiện
            và chương trình mang tính thương hiệu, ứng dụng cao trong thực tế,
            SEC tự hào và hứa hẹn sẽ là một điểm đến, cầu nối đáng tin cậy của
            các bạn sinh viên và chuyên gia trong ngành Kinh tế - Tài chính -
            Chứng khoán trên toàn quốc.
          </div>
        </div>
        <!-- Image -->
        <div
          ref="imageElement"
          class="md:w-1/2 md:mr-13 flex justify-center animate-element animate-delay"
          :class="{ 'animate-visible': isVisible }"
        >
          <img
            src="@/assets/aboutus.png"
            alt="About Us"
            class="w-full rounded-lg shadow-lg"
          />
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
  transform: translateY(60px) scale(0.9);
  transition: all 4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Animation delay cho element thứ hai */
.animate-delay {
  transition-delay: 0.5s;
}

/* Trạng thái khi visible */
.animate-visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* Hiệu ứng bounce nhẹ khi element xuất hiện hoàn toàn */
.animate-visible {
  animation: bounceIn 2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: translateY(60px) scale(0.9);
  }
  60% {
    opacity: 0.8;
    transform: translateY(-10px) scale(1.02);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
