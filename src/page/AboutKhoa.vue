<template>
  <section ref="sectionElement" class="relative w-full py-16 px-4 md:px-16">
    <!-- Title component -->
    <div class="flex justify-center mb-5">
      <Title text="VỀ KHOA TÀI CHÍNH" fontSize="22px" />
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
            src="@/assets/NTQ08842.jpeg"
            alt="About Us"
            class="w-5/6 rounded-lg shadow-lg my-14 mb-1"
          />
        </div>
        <!-- Text content -->
        <div
          ref="textElement"
          class="md:w-1/2 md:mr-20 text-white text-base md:text-lg leading-relaxed flex items-center text-center md:text-left animate-element animate-delay"
          :class="{ 'animate-visible': isVisible }"
        >
          <div>
            Khoa Tài chính – Học viện Ngân hàng là một trong những đơn vị dẫn
            đầu về quy mô và chất lượng đào tạo tại Học viện. Với bề dày truyền
            thống cùng đội ngũ giảng viên giàu kinh nghiệm, Khoa Tài chính không
            ngừng khẳng định vị thế là cái nôi đào tạo nguồn nhân lực chất lượng
            cao trong nhiều lĩnh vực. Thông qua các sự kiện học thuật, tọa đàm
            chuyên môn và cuộc thi chuyên ngành, Khoa Tài chính luôn giữ vững sứ
            mệnh gắn kết tri thức học thuật với thực tiễn nghề nghiệp, giúp sinh
            viên phát huy năng lực, bản lĩnh và tư duy tài chính. Sau nhiều năm
            gắn bó, đồng hành Cuộc thi “Bản lĩnh Nhà đầu tư” từ những mùa đầu
            tiên và đặc biệt năm nay với vai trò là 1 trong những Đơn vị tổ
            chức, Khoa Tài chính đã góp phần khẳng định vai trò của mình trong
            việc nuôi dưỡng tư duy tài chính, khơi dậy đam mê đầu tư và tạo dựng
            một sân chơi học thuật ý nghĩa dành cho sinh viên trên toàn quốc.
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
