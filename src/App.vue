<template>
  <div class="relative min-h-screen custom-bg">
    <!-- Video overlay -->
    <video
      autoplay
      loop
      muted
      playsinline
      class="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-30"
    >
      <source src="@/assets/flare.mp4" type="video/mp4" />
    </video>

    <!-- Nội dung -->
    <div class="relative z-10">
      <Header />

      <main class="relative min-h-screen">
        <Countdown />
        <div class="absolute bottom-0 left-0 w-full mb-7">
          <Blndt />
        </div>
      </main>

      <!-- Scroll ngang cho AboutUs & AboutContest -->
      <div ref="horizontalSection" class="horizontal-section mt-32">
        <section class="snap-child">
          <AboutUs />
        </section>
        <section class="snap-child">
          <AboutContest />
        </section>
      </div>

      <Prize class="mt-16" />

      <!-- Activity Section -->

      <!-- Description -->
      <section
        ref="descriptionSection"
        class="relative py-16 px-4 md:px-16 description-container"
        :class="{ 'description-visible': isDescriptionVisible }"
      >
        <div class="max-w-4xl mx-auto text-center py-16">
          <p class="text-white text-xl md:text-2xl leading-relaxed py-16">
            Cuộc thi Bản lĩnh Nhà đầu tư là hành trình thử thách tư duy và khơi
            mở tiềm năng của thế hệ trẻ đam mê tài chính. Từ kiến thức nền tảng
            đến những góc nhìn chuyên sâu, cuộc thi truyền cảm hứng để thí sinh
            bứt phá giới hạn, hun đúc bản lĩnh, và cùng kiến tạo một thế hệ nhà
            đầu tư tự tin, năng động trong tương lai.
          </p>
        </div>
      </section>
      <Activity />
      <Title text="THỂ LỆ" class="mt-40 mb-12" />
      <Timeline class="mt-16" />
      <Unit class="mt-16" />
      <Footer class="mt-16" />
    </div>

    <!-- Floating Button -->
    <div class="floating-button">
      <button class="floating-btn" @click="scrollToTop">
        <img src="@/assets/footer-logo.png" alt="Logo" class="floating-logo" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue";

import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Countdown from "./components/Countdown.vue";
import Blndt from "./components/Blndt.vue";
import AboutUs from "./page/AboutUs.vue";
import AboutContest from "./page/AboutContest.vue";
import Prize from "./components/Prize.vue";
import Activity from "./page/Activity.vue";
import Timeline from "./page/Timeline.vue";
import Title from "./components/Title.vue";
import Unit from "./page/Unit.vue";

const horizontalSection = ref(null);
const descriptionSection = ref(null);
const isDescriptionVisible = ref(false);

// Scroll to top function
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

onMounted(() => {
  const el = horizontalSection.value;
  if (!el) return;

  // Setup Intersection Observer for description section
  if (descriptionSection.value) {
    const descriptionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isDescriptionVisible.value = true;
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of element is visible
      }
    );

    descriptionObserver.observe(descriptionSection.value);
  }

  const onWheel = (e) => {
    // Kiểm tra vị trí của horizontal section so với viewport
    const rect = el.getBoundingClientRect();
    const isAtTop = rect.top <= 0;
    const isInView = rect.top <= window.innerHeight && rect.bottom >= 0;

    // Nếu horizontal section chưa chạm top thì cho scroll dọc bình thường
    if (!isAtTop) {
      return; // Cho phép scroll dọc để đưa section lên top
    }

    const scrollLeft = el.scrollLeft;
    const maxScrollLeft = el.scrollWidth - el.clientWidth;
    const aboutUsSection = el.querySelector(".snap-child:first-child");

    if (!aboutUsSection) return;

    const aboutUsScrollTop = aboutUsSection.scrollTop;
    const aboutUsScrollHeight = aboutUsSection.scrollHeight;
    const aboutUsClientHeight = aboutUsSection.clientHeight;
    const aboutUsMaxScroll = aboutUsScrollHeight - aboutUsClientHeight;

    // Case 1: Đang ở AboutUs (scrollLeft = 0) và scroll xuống, section đã ở top
    if (scrollLeft === 0 && e.deltaY > 0 && isAtTop) {
      // Nếu AboutUs chưa scroll hết content bên trong
      if (aboutUsMaxScroll > 5 && aboutUsScrollTop < aboutUsMaxScroll - 5) {
        // Cho phép scroll dọc trong AboutUs
        return;
      }
      // Nếu AboutUs đã scroll hết -> bắt đầu scroll ngang
      e.preventDefault();
      el.scrollLeft += e.deltaY * 2;
      if (el.scrollLeft > maxScrollLeft) el.scrollLeft = maxScrollLeft;
      return;
    }

    // Case 2: Đang scroll ngang (0 < scrollLeft < maxScrollLeft)
    if (scrollLeft > 0 && scrollLeft < maxScrollLeft && isAtTop) {
      e.preventDefault();
      if (e.deltaY > 0) {
        // Scroll xuống -> tiếp tục scroll ngang sang phải
        el.scrollLeft += e.deltaY * 2;
        if (el.scrollLeft > maxScrollLeft) el.scrollLeft = maxScrollLeft;
      } else {
        // Scroll lên -> scroll ngang sang trái
        el.scrollLeft += e.deltaY * 2;
        if (el.scrollLeft < 0) el.scrollLeft = 0;
      }
      return;
    }

    // Case 3: Đã scroll ngang hết (scrollLeft = maxScrollLeft)
    if (scrollLeft >= maxScrollLeft && e.deltaY > 0 && isAtTop) {
      // Cho phép scroll xuống tiếp (không preventDefault)
      return;
    }

    // Case 4: Ở AboutContest và scroll lên
    if (scrollLeft >= maxScrollLeft && e.deltaY < 0 && isAtTop) {
      // Bắt đầu scroll ngang về lại
      e.preventDefault();
      el.scrollLeft += e.deltaY * 2;
      if (el.scrollLeft < 0) el.scrollLeft = 0;
      return;
    }

    // Case 5: Về lại AboutUs hoàn toàn (scrollLeft = 0) và scroll lên
    if (scrollLeft === 0 && e.deltaY < 0) {
      // Nếu đang ở top và AboutUs đã scroll về đầu thì cho scroll lên để đưa section xuống
      if (isAtTop && aboutUsScrollTop <= 5) {
        return; // Cho phép scroll dọc để đưa section xuống khỏi top
      }
      // Nếu chưa ở top thì cho scroll bình thường
      if (!isAtTop) {
        return;
      }
      // Nếu ở top và AboutUs chưa scroll về đầu thì scroll trong AboutUs
      return;
    }
  };

  el.addEventListener("wheel", onWheel, { passive: false });

  onBeforeUnmount(() => {
    el.removeEventListener("wheel", onWheel);
  });
});
</script>

<style scoped>
.custom-bg {
  background-image: url("@/assets/background.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center top;
  background-attachment: fixed;
}

/* Ẩn scrollbar của body khi cần */
:global(body) {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
}

:global(body::-webkit-scrollbar) {
  display: none; /* Chrome, Safari, Opera */
}

.horizontal-section {
  display: flex;
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden; /* chỉ ẩn scroll ngang */
  overflow-y: hidden; /* ẩn scroll dọc của container */
  scroll-behavior: smooth;
}

.snap-child {
  flex: 0 0 100%;
  min-height: 100vh;
  overflow-y: auto; /* cho phép scroll dọc trong từng section */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
}

.snap-child::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

/* Description fade-in animation */
.description-container {
  opacity: 0;
  transform: translateY(30px);
  transition: all 1s ease-out;
}

.description-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Floating Button */
.floating-button {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
}

.floating-btn {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.2),
    rgba(255, 255, 255, 0.1)
  );
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), 0 0 20px rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.floating-btn:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15),
    0 0 30px rgba(255, 255, 255, 0.15);
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.25),
    rgba(255, 255, 255, 0.15)
  );
}

.floating-btn:active {
  transform: translateY(0) scale(0.98);
}

.floating-logo {
  width: 32px;
  height: 32px;
  object-fit: contain;
  filter: brightness(1.1);
  transition: all 0.3s ease;
}

.floating-btn:hover .floating-logo {
  transform: scale(1.1);
  filter: brightness(1.3);
}

/* Responsive cho floating button */
@media (max-width: 768px) {
  .floating-button {
    bottom: 1.5rem;
    right: 1.5rem;
  }

  .floating-btn {
    width: 50px;
    height: 50px;
  }

  .floating-logo {
    width: 26px;
    height: 26px;
  }
}
</style>
