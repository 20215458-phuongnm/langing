<template>
  <div class="countdown-container">
    <!-- Glass Card -->
    <div class="glass-card">
      <!-- Main Content - Vertical Layout -->
      <div class="main-content">
        <!-- Top: Countdown -->
        <div class="countdown-section">
          <Countdown
            deadlineISO="2025-10-10T00:00:00+07:00"
            :interval="1000"
            mainColor="#fff"
            secondFlipColor="#fff"
            class="countdown-wrapper"
          />
        </div>

        <!-- Bottom: Action -->
        <div class="action-section">
          <v-btn
            class="btn-register"
            color="#fbbf24"
            variant="flat"
            size="large"
          >
            <span class="btn-text">ĐĂNG KÝ NGAY</span>
          </v-btn>
        </div>
      </div>
    </div>

    <!-- Decorative Elements -->
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { Countdown } from "vue3-flip-countdown";

// Thời gian đích: 0h ngày 10/10/2025
const targetDate = new Date(2025, 9, 10, 0, 0, 0); // Tháng 9 = October (tháng bắt đầu từ 0)

// Convert to timestamp for vue3-flip-countdown
const targetTimestamp = targetDate.getTime();
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap");

.countdown-container {
  position: relative;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
}

.glass-card {
  position: relative;
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.05)
  );
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border-radius: 0px;
  padding: 2rem 2.5rem;
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(255, 255, 255, 0.05) inset;

  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: visible;
  max-width: 100vw;
  width: 100vw;
}

/* Removed decorative patterns to keep simple glass effect */

.glass-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(255, 255, 255, 0.1) inset;
}

/* Removed hover effects for decorative elements */

.main-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.countdown-section {
  display: flex;
  justify-content: center;
}

.countdown-wrapper {
  font-family: "JetBrains Mono", "Courier New", monospace;
  white-space: nowrap;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  flex-wrap: nowrap !important;
}

/* Đảm bảo các phần tử countdown không xuống dòng */
.countdown-wrapper :deep(.flip-countdown) {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  flex-wrap: nowrap !important;
  white-space: nowrap !important;
}

.countdown-wrapper :deep(.flip-countdown > *) {
  display: inline-flex !important;
  align-items: center !important;
  flex-shrink: 0 !important;
}

.action-section {
  display: flex;
  justify-content: center;
}

.btn-register {
  background: linear-gradient(135deg, #fbbf24, #f59e0b) !important;
  color: #000 !important;
  padding: 1rem 2.5rem !important;
  border-radius: 16px !important;
  font-family: "Poppins", sans-serif !important;
  font-weight: 700 !important;
  font-size: 1rem !important;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
  border: 2px solid transparent !important;
  text-transform: none !important;
  letter-spacing: 0.02em !important;
  min-width: auto !important;
  height: auto !important;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1) !important;
  position: relative !important;
  overflow: hidden !important;
}

.btn-register::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: left 0.6s;
}

.btn-register:hover::before {
  left: 100%;
}

.btn-register:hover {
  background-color: #fcd34d !important;
  transform: translateY(-2px) scale(1.05) !important;
  box-shadow: 0 8px 25px rgba(251, 191, 36, 0.4) !important;
  filter: brightness(1.1) !important;
}

.btn-register:active {
  background: linear-gradient(135deg, #f59e0b, #d97706) !important;
  transform: translateY(-1px) scale(1.01) !important;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2) !important;
  border: 2px solid #f59e0b !important;
  text-shadow: 0 0 12px rgba(251, 191, 36, 1) !important;
}

.btn-text {
  margin-right: 0.5rem;
}

.btn-icon {
  font-weight: bold;
  transition: transform 0.3s ease;
}

.btn-register:hover .btn-icon {
  transform: translateX(4px);
}

/* Responsive Design */
@media (max-width: 640px) {
  .countdown-container {
    padding: 0;
  }

  .glass-card {
    padding: 1rem 1rem;
    min-width: 100vw;
    max-width: 100vw;
    width: 100vw;
    border-radius: 0px;
  }

  .main-content {
    gap: 0.75rem;
  }

  .countdown-wrapper {
    font-size: 0.8rem;
    transform: scale(0.9);
  }

  .btn-register {
    padding: 0.875rem 2rem !important;
    font-size: 0.9rem !important;
  }
}

@media (min-width: 641px) and (max-width: 768px) {
  .glass-card {
    padding: 1.5rem 1.5rem;
    max-width: 100vw;
    width: 100vw;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .glass-card {
    padding: 1.75rem 2rem;
    max-width: 100vw;
    width: 100vw;
  }
}

@media (min-width: 1025px) {
  .glass-card {
    padding: 2rem 2.5rem;
    max-width: 100vw;
    width: 100vw;
  }
}

@media (min-width: 640px) {
  .flip-number {
    font-size: 3.5rem;
    min-width: 90px;
    height: 130px;
    padding: 1.25rem 1.5rem;
  }
}

@media (min-width: 768px) {
  .flip-number {
    font-size: 4.25rem;
    min-width: 110px;
    height: 150px;
    padding: 1.5rem 1.75rem;
  }

  .title {
    font-size: 2rem;
  }
}

.label {
  margin-top: 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #000000 !important;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-family: "Poppins", sans-serif;
}

/* Chỉ label có màu đen, số vẫn màu trắng */
.countdown-wrapper :deep(.label) {
  color: #000000 !important;
}

.countdown-wrapper :deep(.flip-countdown .label) {
  color: #000000 !important;
}

/* Đảm bảo số countdown vẫn màu trắng */
.countdown-wrapper :deep(.flip-number) {
  color: #ffffff !important;
}

.countdown-wrapper :deep(.flip-countdown .flip-number) {
  color: #ffffff !important;
}

@media (min-width: 640px) {
  .label {
    font-size: 0.875rem;
  }
}

.corner-top-left {
  top: 20px;
  left: 20px;
  background: linear-gradient(135deg, #fbbf24, transparent);
  border-radius: 0 0 20px 0;
}

.corner-top-right {
  top: 20px;
  right: 20px;
  background: linear-gradient(225deg, #3b82f6, transparent);
  border-radius: 0 0 0 20px;
}

.corner-bottom-left {
  bottom: 20px;
  left: 20px;
  background: linear-gradient(45deg, #a855f7, transparent);
  border-radius: 0 20px 0 0;
}

.corner-bottom-right {
  bottom: 20px;
  right: 20px;
  background: linear-gradient(315deg, #10b981, transparent);
  border-radius: 20px 0 0 0;
}
</style>
