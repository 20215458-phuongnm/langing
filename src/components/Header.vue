<template>
  <header
    class="w-full text-white px-6 py-5 sticky top-0 z-50 backdrop-blur-sm transition-all duration-300"
    :class="isAtTop ? 'bg-[#214159]' : 'bg-[#214159]/10'"
  >
    <div class="flex justify-between items-center">
      <!-- Logo -->
      <div
        class="flex items-center gap-2 cursor-pointer"
        @click="goToTopAndReload"
      >
        <img src="@/assets/logo.png" alt="Logo" class="h-10 w-auto" />
      </div>

      <!-- Desktop Menu -->
      <nav class="desktop-menu">
        <ul class="flex items-center gap-14">
          <li class="overflow-visible">
            <a @click="scrollToAboutUs" class="nav-link cursor-pointer"
              >Về chúng tôi</a
            >
          </li>
          <li class="overflow-visible">
            <a @click="scrollToAboutContest" class="nav-link cursor-pointer"
              >Về cuộc thi</a
            >
          </li>
          <li class="overflow-visible">
            <a @click="scrollToActivity" class="nav-link cursor-pointer"
              >Các hoạt động</a
            >
          </li>
          <li class="overflow-visible">
            <a @click="scrollToTimeline" class="nav-link cursor-pointer"
              >Thể lệ</a
            >
          </li>
          <li class="overflow-visible">
            <a @click="scrollToFooter" class="nav-link cursor-pointer"
              >Liên hệ</a
            >
          </li>
          <li>
            <v-btn href="#register" class="btn-register" variant="flat">
              Đăng ký ngay
            </v-btn>
          </li>
        </ul>
      </nav>

      <!-- Mobile Hamburger Button -->
      <button
        @click="toggleMobileMenu"
        class="mobile-hamburger flex flex-col justify-center items-center w-8 h-8 space-y-1"
        :class="{ active: isMobileMenuOpen }"
      >
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>
    </div>

    <!-- Mobile Menu -->
    <nav
      class="mobile-menu absolute left-0 right-0 bg-[#214159] z-40 overflow-hidden shadow-lg mt-5"
      :class="isMobileMenuOpen ? 'menu-open' : 'menu-closed'"
    >
      <ul class="flex flex-col space-y-4 py-6 px-6 border-t border-white/20">
        <li>
          <a
            @click="
              scrollToAboutUs();
              closeMobileMenu();
            "
            class="nav-link block py-2 cursor-pointer"
            >Về chúng tôi</a
          >
        </li>
        <li>
          <a
            @click="
              scrollToAboutContest();
              closeMobileMenu();
            "
            class="nav-link block py-2 cursor-pointer"
            >Về cuộc thi</a
          >
        </li>
        <li>
          <a
            @click="
              scrollToActivity();
              closeMobileMenu();
            "
            class="nav-link block py-2 cursor-pointer"
            >Các hoạt động</a
          >
        </li>
        <li>
          <a
            @click="
              scrollToTimeline();
              closeMobileMenu();
            "
            class="nav-link block py-2 cursor-pointer"
            >Thể lệ</a
          >
        </li>
        <li>
          <a
            @click="
              scrollToFooter();
              closeMobileMenu();
            "
            class="nav-link block py-2 cursor-pointer"
            >Liên hệ</a
          >
        </li>
        <li class="pt-2">
          <v-btn
            href="#register"
            class="btn-register inline-block"
            @click="closeMobileMenu"
            variant="flat"
          >
            Đăng ký ngay
          </v-btn>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const isMobileMenuOpen = ref(false);
const isAtTop = ref(true);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

// Logo click handler
const goToTopAndReload = () => {
  // Smooth animated scroll to top
  const scrollToTop = () => {
    const currentScroll =
      document.documentElement.scrollTop || document.body.scrollTop;

    if (currentScroll > 0) {
      // Custom smooth scroll with easing
      const scrollStep = Math.ceil(currentScroll / 15); // Slower, smoother steps
      window.scrollTo(0, currentScroll - scrollStep);
      requestAnimationFrame(scrollToTop);
    } else {
      // Ensure we're at absolute top
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      window.scrollTo(0, 0);

      // Reload after smooth scroll completes
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }
  };

  // Start the smooth scroll animation
  scrollToTop();
};

// Scroll functions for navigation
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

const scrollToFooter = () => {
  const footer =
    document.querySelector("footer") ||
    document.querySelector('[class*="Footer"]');
  if (footer) {
    footer.scrollIntoView({ behavior: "smooth" });
  }
};

const handleScroll = () => {
  isAtTop.value = window.scrollY <= 50;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
.desktop-menu {
  display: none;
}

.mobile-hamburger {
  display: flex;
}

.mobile-menu {
  display: block;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.menu-closed {
  max-height: 0;
  opacity: 0;
  transform: translateY(-20px);
  visibility: hidden;
}

.menu-open {
  max-height: 400px;
  opacity: 1;
  transform: translateY(0);
  visibility: visible;
}

/* Smooth animation for menu items */
.mobile-menu ul li {
  transition: all 0.3s ease;
  transform: translateX(-20px);
  opacity: 0;
}

.menu-open ul li {
  transform: translateX(0);
  opacity: 1;
}

.menu-open ul li:nth-child(1) {
  transition-delay: 0.1s;
}
.menu-open ul li:nth-child(2) {
  transition-delay: 0.15s;
}
.menu-open ul li:nth-child(3) {
  transition-delay: 0.2s;
}
.menu-open ul li:nth-child(4) {
  transition-delay: 0.25s;
}
.menu-open ul li:nth-child(5) {
  transition-delay: 0.3s;
}
.menu-open ul li:nth-child(6) {
  transition-delay: 0.35s;
}

@media (min-width: 1200px) {
  .desktop-menu {
    display: block;
  }

  .mobile-hamburger {
    display: none;
  }

  .mobile-menu {
    display: none;
  }
}

.nav-link {
  transition: all 0.3s ease;
  display: inline-block;
  padding: 0.25rem 0.5rem;
  font-weight: 700;
}

.nav-link:hover {
  color: #fbbf24;
  font-size: 1.05em;
}

.btn-register {
  background-color: #fbbf24 !important;
  color: #000 !important;
  padding: 0.5rem 1rem;
  border-radius: 9999px !important;
  font-weight: 600;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: none !important;
  box-shadow: none !important;
  text-transform: none !important;
  letter-spacing: normal !important;
  min-width: auto !important;
  height: auto !important;
}

.btn-register:hover {
  background-color: #fcd34d !important;
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 8px 25px rgba(251, 191, 36, 0.4) !important;
  filter: brightness(1.1);
}

.hamburger-line {
  display: block;
  width: 100%;
  height: 2px;
  background-color: white;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transform-origin: center;
}

button.active .hamburger-line:nth-child(1) {
  transform: translateY(6px) rotate(45deg);
}

button.active .hamburger-line:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}

button.active .hamburger-line:nth-child(3) {
  transform: translateY(-6px) rotate(-45deg);
}
</style>
