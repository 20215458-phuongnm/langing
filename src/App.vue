<template>
  <div class="relative min-h-screen custom-bg">
    <!-- Video overlay -->
    <!-- <video
      autoplay
      loop
      muted
      playsinline
      class="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-30"
    >
      <source src="@/assets/flare.mp4" type="video/mp4" />
    </video> -->

    <!-- Nội dung -->
    <div class="relative z-10">
      <Header />

      <main class="relative min-h-screen">
        <!-- Flame background image - spanning from countdown to blndt -->
        <div
          class="absolute top-40 bottom-20 left-0 w-full overflow-hidden z-0"
        >
          <img
            src="@/assets/flameback.png"
            alt="Flame Background"
            class="w-full h-full object-cover object-center"
          />
        </div>

        <!-- Countdown overlaying the flame image -->
        <div class="relative z-20">
          <Countdown />
        </div>

        <!-- Blndt component fixed at bottom -->
        <div class="absolute bottom-0 left-0 w-full z-10 mb-7">
          <Blndt />
        </div>
      </main>

      <!-- Scroll ngang cho AboutUs & AboutContest (Desktop) / Stack dọc (Mobile) -->
      <div ref="horizontalSection" class="horizontal-scroll-section">
        <div class="horizontal-wrapper">
          <div class="horizontal-inner">
            <section class="horizontal-item">
              <AboutUs />
            </section>
            <section class="horizontal-item">
              <AboutContest />
            </section>
          </div>
        </div>

        <!-- Mobile vertical stack -->
        <div class="mobile-vertical-stack md:hidden">
          <section class="mobile-section">
            <AboutUs />
          </section>
          <section class="mobile-section">
            <AboutContest />
          </section>
        </div>
      </div>

      <Prize class="mt-32 md:mt-60 mb-20 md:mb-40" />

      <!-- Activity Section -->

      <!-- Description -->
      <section
        ref="descriptionSection"
        class="relative py-16 px-4 md:px-16 description-container md:mt-24"
        :class="{ 'description-visible': isDescriptionVisible }"
      >
        <div class="max-w-5xl mx-auto text-center py-16">
          <!-- Decorative elements -->
          <div class="relative">
            <div
              class="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"
            ></div>

            <div class="glass-text-container">
              <p class="hero-description">
                Cuộc thi Bản lĩnh Nhà đầu tư là hành trình thử thách tư duy và
                khơi mở tiềm năng của thế hệ trẻ đam mê tài chính. Từ kiến thức
                nền tảng đến những góc nhìn chuyên sâu, cuộc thi truyền cảm hứng
                để thí sinh bứt phá giới hạn, hun đúc bản lĩnh, và cùng kiến tạo
                một thế hệ nhà đầu tư tự tin, năng động trong tương lai.
              </p>

              <!-- Quote decoration -->
              <div class="quote-decoration">
                <svg
                  class="quote-icon quote-left"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M6.5 10c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm6 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm-6 4c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm6 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"
                  />
                </svg>
                <svg
                  class="quote-icon quote-right"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M6.5 10c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm6 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm-6 4c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm6 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"
                  />
                </svg>
              </div>
            </div>

            <div
              class="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"
            ></div>
          </div>
        </div>
      </section>
      <Activity class="mt-32 md:mt-48 mb-24 md:mb-48" />
      <Title text="THỂ LỆ" class="mt-40 mb-12 md:mt-60 md:mb-20" />
      <Timeline class="mt-16 md:mt-32 mb-20" />
      <Unit class="mt-32 md:mt-56 mb-32 md:mb-56" />
      <Footer class="mt-20 md:mt-40" />
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

  // Check if mobile
  const isMobile = () => window.innerWidth <= 768;

  const wrapper = el.querySelector(".horizontal-wrapper");
  const inner = el.querySelector(".horizontal-inner");

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

  // Set up horizontal scroll section height based on content width
  let totalWidth = 0;
  const setupHorizontalScroll = () => {
    // Skip horizontal scroll setup on mobile
    if (isMobile()) {
      el.style.height = "auto";
      return;
    }

    if (inner) {
      totalWidth = inner.scrollWidth;
      // Set section height to enable vertical scrolling for horizontal effect
      el.style.height = `${totalWidth}px`;
    }
  };

  // Setup on load and resize
  setupHorizontalScroll();
  window.addEventListener("resize", setupHorizontalScroll);

  // Handle scroll for horizontal effect
  const handleScroll = () => {
    // Skip horizontal scroll on mobile
    if (isMobile()) return;

    const rect = el.getBoundingClientRect();

    // Check if we're in the horizontal scroll zone
    if (rect.top <= 0 && rect.bottom > window.innerHeight) {
      const scrollY = -rect.top;
      // Apply horizontal scroll based on vertical scroll position
      if (wrapper) {
        wrapper.scrollLeft = scrollY;

        // Lock vertical scroll for all items during horizontal scrolling
        const items = wrapper.querySelectorAll(".horizontal-item");
        items.forEach((item) => {
          item.scrollTop = 0; // Reset to top
          item.classList.add("scroll-locked"); // Add lock class
        });
      }
    } else {
      // Re-enable vertical scroll when not in horizontal scroll zone
      const items = wrapper?.querySelectorAll(".horizontal-item");
      items?.forEach((item) => {
        item.classList.remove("scroll-locked"); // Remove lock class
      });
    }
  };

  window.addEventListener("scroll", handleScroll);

  onBeforeUnmount(() => {
    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("resize", setupHorizontalScroll);
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

/* Mobile background adjustments */
@media (max-width: 768px) {
  .custom-bg {
    background-attachment: scroll; /* Fix mobile background issues */
    background-size: cover;
    background-position: center center; /* Better centering on mobile */
  }
}

/* Ẩn scrollbar của body khi cần */
:global(body) {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
}

:global(body::-webkit-scrollbar) {
  display: none; /* Chrome, Safari, Opera */
}

.horizontal-scroll-section {
  position: relative;
  width: 100vw;
  /* height will be set dynamically by JavaScript */
}

/* Mobile responsive - hide horizontal scroll on mobile */
@media (max-width: 768px) {
  .horizontal-scroll-section {
    height: auto !important; /* Override JS height */
  }

  .horizontal-wrapper {
    display: none; /* Hide horizontal scroll on mobile */
  }
}

.horizontal-wrapper {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
}

.horizontal-wrapper::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

.horizontal-inner {
  display: flex;
  height: 100%;
  /* width will be calculated based on items */
}

.horizontal-item {
  flex: 0 0 100vw;
  height: 100vh;
  overflow-y: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
  display: flex;
  align-items: flex-start; /* Ensure consistent alignment */
  scroll-behavior: smooth; /* Add smooth scrolling */
  position: relative; /* Ensure proper positioning */
}

/* Lock vertical scroll during horizontal scrolling */
.horizontal-item.scroll-locked {
  overflow-y: hidden !important;
}

/* Ensure both AboutUs and AboutContest are consistently positioned */
.horizontal-item > * {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
}

/* Mobile vertical stack styles */
.mobile-vertical-stack {
  display: flex;
  flex-direction: column;
  width: 100%;
  background: inherit;
}

.mobile-section {
  width: 100%;
  min-height: auto;
  padding: 0;
  margin: 0;
}

/* Hide horizontal elements on desktop */
@media (min-width: 769px) {
  .mobile-vertical-stack {
    display: none !important;
  }
}

.horizontal-item::-webkit-scrollbar {
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

/* Hero Description Styling */
.glass-text-container {
  position: relative;
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.05)
  );
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  padding: 3rem 2.5rem;
  margin: 2rem 0;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(255, 255, 255, 0.05) inset;
  transition: all 0.6s ease;
}

.glass-text-container:hover {
  transform: translateY(-5px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(255, 255, 255, 0.1) inset;
}

.hero-description {
  font-size: 1.25rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.95);
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  margin: 0;
  font-weight: 400;
  letter-spacing: 0.02em;
}

.highlight-text {
  background: linear-gradient(135deg, #fbbf24, #f59e0b, #d97706);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 600;
  text-shadow: none;
  position: relative;
}

.highlight-text::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #fbbf24, transparent);
  border-radius: 1px;
}

.highlight-accent {
  color: #60d9fa;
  font-weight: 500;
  text-shadow: 0 0 10px rgba(96, 217, 250, 0.3);
  transition: all 0.3s ease;
}

.highlight-accent:hover {
  color: #7dd3fc;
  text-shadow: 0 0 15px rgba(96, 217, 250, 0.5);
}

.quote-decoration {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.quote-icon {
  position: absolute;
  width: 24px;
  height: 24px;
  color: rgba(251, 191, 36, 0.3);
  opacity: 0.6;
}

.quote-left {
  top: 1rem;
  left: 1rem;
  transform: rotate(180deg);
}

.quote-right {
  bottom: 1rem;
  right: 1rem;
}

/* Responsive Typography */
@media (min-width: 768px) {
  .hero-description {
    font-size: 1.375rem;
    line-height: 1.7;
  }

  .glass-text-container {
    padding: 3.5rem 3rem;
  }
}

@media (min-width: 1024px) {
  .hero-description {
    font-size: 1.5rem;
    line-height: 1.75;
  }
}

@media (max-width: 640px) {
  .hero-description {
    font-size: 1.125rem;
    line-height: 1.8;
  }

  .glass-text-container {
    padding: 2rem 1.5rem;
    margin: 1.5rem 0;
  }

  .quote-icon {
    width: 20px;
    height: 20px;
  }
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
