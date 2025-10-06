<template>
  <footer id="contact" class="w-full bg-[#5f819b]/70 text-white py-12 px-6">
    <div class="max-w-full mx-auto px-4 lg:px-8">
      <!-- Phần tiêu đề liên hệ -->
      <div
        class="flex flex-col-reverse sm:flex-row justify-between items-start sm:items-center mb-8"
      >
        <!-- Logo + chữ thông tin liên hệ -->
        <div class="flex items-center gap-2">
          <img
            src="@/assets/footer-logo.png"
            alt="Footer Logo"
            class="h-10 sm:h-12 w-auto"
          />
          <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold">
            THÔNG TIN LIÊN HỆ
          </h2>
        </div>

        <!-- Nút đăng ký ngay -->
        <v-btn
          href="https://sec-contest.vercel.app/"
          target="_blank"
          class="footer-register-btn mb-3 sm:mt-0"
        >
          Đăng ký ngay
        </v-btn>
      </div>

      <!-- Nội dung chính -->
      <div class="flex flex-col md:flex-row md:justify-between md:gap-8 gap-8">
        <!-- Cột 1: CLB -->
        <div class="w-full md:w-2/4">
          <p class="text-base md:text-lg font-bold mb-3 text-yellow-400">
            CLB CHỨNG KHOÁN HỌC VIỆN NGÂN HÀNG - SEC
          </p>
          <ul class="space-y-2 text-sm">
            <li>Địa chỉ: 12 Chùa Bộc, Đống Đa, Hà Nội</li>
            <li>
              Fanpage:
              <a
                href="https://facebook.com/sec.bav"
                target="_blank"
                class="underline hover:text-yellow-300"
              >
                facebook.com/sec.bav
              </a>
            </li>
            <li>Email: sec.hvnh@gmail.com</li>
            <li>Hotline: 0968 763 960 (Ms. Phương Anh)</li>
          </ul>
        </div>

        <!-- Cột 2: Cuộc thi -->
        <div class="w-full md:w-1/3 md:ml-24">
          <h3 class="text-base md:text-lg font-bold mb-3 text-yellow-400">
            CUỘC THI BẢN LĨNH NHÀ ĐẦU TƯ
          </h3>
          <ul class="space-y-2 text-sm">
            <li>Email: notify.blndt@gmail.com</li>
            <li>Hotline: 0968 763 960 (Ms. Phương Anh)</li>
            <li>
              Fanpage:
              <a
                href="https://facebook.com/banlinhnhadautu.sec"
                target="_blank"
                class="underline hover:text-yellow-300"
              >
                facebook.com/banlinhnhadautu.sec
              </a>
            </li>
          </ul>
        </div>

        <!-- Cột 3: Mục lục -->
        <div class="w-full md:w-1/4 md:flex md:justify-end mr-12">
          <div class="text-left">
            <h3 class="text-base md:text-lg font-bold mb-3 text-yellow-400">
              MỤC LỤC
            </h3>
            <ul class="space-y-2 text-sm">
              <li>
                <a
                  @click="scrollToAboutUs"
                  class="hover:underline cursor-pointer"
                  >Về chúng tôi</a
                >
              </li>
              <li>
                <a
                  @click="scrollToAboutContest"
                  class="hover:underline cursor-pointer"
                  >Về cuộc thi</a
                >
              </li>
              <li>
                <a
                  @click="scrollToActivity"
                  class="hover:underline cursor-pointer"
                  >Các hoạt động</a
                >
              </li>
              <li>
                <a
                  @click="scrollToTimeline"
                  class="hover:underline cursor-pointer"
                  >Thể lệ</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Scroll functions for navigation - tương tự như Header
const scrollToAboutUs = () => {
  // Check if mobile
  const isMobile = window.innerWidth <= 768;

  if (isMobile) {
    // Mobile: scroll to vertical AboutUs section
    const aboutUsSection = document.querySelector(
      ".mobile-section:first-child"
    );
    if (aboutUsSection) {
      aboutUsSection.scrollIntoView({ behavior: "smooth" });
    }
  } else {
    // Desktop: scroll to AboutUs section directly
    const horizontalSection = document.querySelector(
      ".horizontal-scroll-section"
    );
    if (horizontalSection) {
      // Calculate position to show AboutUs (first item)
      const rect = horizontalSection.getBoundingClientRect();
      const scrollTop = window.pageYOffset + rect.top;

      window.scrollTo({
        top: scrollTop,
        behavior: "smooth",
      });
    }
  }
};

const scrollToAboutContest = () => {
  // Check if mobile
  const isMobile = window.innerWidth <= 768;

  if (isMobile) {
    // Mobile: scroll to vertical AboutContest section
    const aboutContestSection = document.querySelector(
      ".mobile-section:nth-child(2)"
    );
    if (aboutContestSection) {
      aboutContestSection.scrollIntoView({ behavior: "smooth" });
    }
  } else {
    // Desktop: scroll to position that shows AboutContest
    const horizontalSection = document.querySelector(
      ".horizontal-scroll-section"
    );
    if (horizontalSection) {
      // Calculate position to show AboutContest (second item)
      // Need to scroll deeper into the horizontal section to trigger AboutContest
      const rect = horizontalSection.getBoundingClientRect();
      const sectionHeight = horizontalSection.offsetHeight;
      const scrollTop = window.pageYOffset + rect.top + sectionHeight * 0.5;

      window.scrollTo({
        top: scrollTop,
        behavior: "smooth",
      });
    }
  }
};

const scrollToActivity = () => {
  const activitySection = document.querySelector(
    ".description-container"
  ).nextElementSibling;
  if (activitySection) {
    activitySection.scrollIntoView({ behavior: "smooth" });
  }
};

const scrollToTimeline = () => {
  // Method 1: Look for all elements and find the actual Timeline component
  const allElements = document.querySelectorAll("*");
  for (let element of allElements) {
    // Check if this element contains Timeline component
    if (element.tagName && element.__vueParentComponent) {
      const componentName =
        element.__vueParentComponent?.type?.name ||
        element.__vueParentComponent?.type?.__name;
      if (componentName === "Timeline") {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }
    }
  }

  // Method 2: Find by DOM structure - Timeline comes after Title with "THỂ LỆ"
  const titleElement = Array.from(
    document.querySelectorAll(".title-container")
  ).find((el) => el.textContent.includes("THỂ LỆ"));

  if (titleElement) {
    // Get the parent of title, then find next mt-16 element
    const titleParent =
      titleElement.closest(".mt-40, .mb-12") || titleElement.parentElement;
    let nextSibling = titleParent.nextElementSibling;

    if (nextSibling && nextSibling.classList.contains("mt-16")) {
      nextSibling.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
  }

  // Method 3: Simple fallback - find the second mt-16 element (first is Title, second should be Timeline)
  const mt16Elements = document.querySelectorAll(".mt-16");
  if (mt16Elements.length >= 2) {
    // Skip Title (first mt-16), get Timeline (second mt-16)
    for (let i = 1; i < mt16Elements.length; i++) {
      const element = mt16Elements[i];
      // Check if previous element contains "THỂ LỆ" - then this should be Timeline
      const prevElement = element.previousElementSibling;
      if (
        prevElement &&
        prevElement.textContent &&
        prevElement.textContent.includes("THỂ LỆ")
      ) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }
    }
  }
};
</script>

<style scoped>
.footer-register-btn {
  background-color: #fbbf24 !important;
  color: #000 !important;
  padding: 0.5rem 1.25rem !important;
  border-radius: 9999px !important;
  font-weight: 600 !important;
  text-transform: none !important;
  box-shadow: none !important;
  min-width: auto !important;
  height: auto !important;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: none !important;
  letter-spacing: normal !important;
}

.footer-register-btn:hover {
  background-color: #fcd34d !important;
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 8px 25px rgba(251, 191, 36, 0.4) !important;
  filter: brightness(1.1);
}
</style>
