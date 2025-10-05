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
  background: 
    /* Pure white base with subtle gradient */ linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.98) 0%,
    rgba(248, 250, 252, 0.95) 50%,
    rgba(255, 255, 255, 0.98) 100%
  );
  backdrop-filter: blur(15px) saturate(150%);
  -webkit-backdrop-filter: blur(15px) saturate(150%);
  border-radius: 0px;
  padding: 1rem 4rem;

  /* Premium white card shadows */
  box-shadow: 
    /* Main depth shadow */ 0 25px 50px rgba(0, 0, 0, 0.08),
    0 15px 35px rgba(0, 0, 0, 0.05), 0 5px 15px rgba(0, 0, 0, 0.04),
    /* Inner white glow */ inset 0 1px 0 rgba(255, 255, 255, 0.9),
    inset 0 -1px 0 rgba(0, 0, 0, 0.02),
    /* Outer subtle glow */ 0 0 50px rgba(255, 255, 255, 0.3);

  /* Elegant border */
  border: 2px solid;
  border-image: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.8) 0%,
      rgba(240, 245, 251, 0.6) 25%,
      rgba(59, 130, 246, 0.1) 50%,
      rgba(240, 245, 251, 0.6) 75%,
      rgba(255, 255, 255, 0.8) 100%
    )
    1;

  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: visible;
  max-width: 100vw;
  width: 100vw;
}

/* Subtle decorative pattern overlay */
.glass-card::before {
  content: "";
  position: absolute;
  inset: 0;
  background: 
    /* Subtle dot pattern */ radial-gradient(
      circle at 25% 25%,
      rgba(59, 130, 246, 0.03) 1px,
      transparent 1px
    ),
    radial-gradient(
      circle at 75% 75%,
      rgba(251, 191, 36, 0.02) 1px,
      transparent 1px
    ),
    /* Fine grid lines */
      linear-gradient(90deg, rgba(255, 255, 255, 0.5) 1px, transparent 1px),
    linear-gradient(0deg, rgba(240, 245, 251, 0.3) 1px, transparent 1px);
  background-size: 40px 40px, 60px 60px, 20px 20px, 20px 20px;
  opacity: 0.4;
  pointer-events: none;
  animation: subtleMove 30s linear infinite;
}

@keyframes subtleMove {
  0% {
    background-position: 0 0, 0 0, 0 0, 0 0;
  }
  100% {
    background-position: 40px 40px, -60px 60px, 20px 20px, -20px 20px;
  }
}

/* Outer glow ring */
.glass-card::after {
  content: "";
  position: absolute;
  inset: -3px;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.6) 0%,
    rgba(59, 130, 246, 0.1) 25%,
    rgba(251, 191, 36, 0.05) 50%,
    rgba(59, 130, 246, 0.1) 75%,
    rgba(255, 255, 255, 0.6) 100%
  );
  border-radius: 0px;
  z-index: -1;
  filter: blur(1px);
  animation: gentleGlow 4s ease-in-out infinite alternate;
}

@keyframes gentleGlow {
  0% {
    opacity: 0.3;
    transform: scale(1);
  }
  100% {
    opacity: 0.6;
    transform: scale(1.005);
  }
}

.glass-card:hover {
  transform: translateY(-5px) scale(1.01);

  box-shadow: 
    /* Enhanced depth shadows */ 0 35px 70px rgba(0, 0, 0, 0.12),
    0 20px 45px rgba(0, 0, 0, 0.08), 0 8px 25px rgba(0, 0, 0, 0.06),
    /* Enhanced inner glow */ inset 0 2px 0 rgba(255, 255, 255, 0.95),
    inset 0 -2px 0 rgba(0, 0, 0, 0.03),
    /* Premium outer glow */ 0 0 80px rgba(255, 255, 255, 0.4),
    /* Subtle blue accent */ 0 0 120px rgba(59, 130, 246, 0.08);

  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
}

.glass-card:hover::after {
  opacity: 1;
  animation-duration: 4s, 2s;
  filter: blur(0.5px);
}

.glass-card:hover::before {
  opacity: 0.6;
  animation-duration: 15s;
}

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
  background: linear-gradient(135deg, #fcd34d, #fbbf24) !important;
  transform: translateY(-3px) scale(1.03) !important;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important;
  border: 2px solid #fbbf24 !important;
  color: #000 !important;
  text-shadow: 0 0 8px rgba(251, 191, 36, 0.8) !important;
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
    padding: 0.75rem 1.5rem;
    min-width: 100vw;
    max-width: 100vw;
    width: 100vw;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15),
      0 0 0 1px rgba(255, 255, 255, 0.1) inset,
      0 0 30px rgba(255, 255, 255, 0.08);
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
    padding: 1rem 3rem;
    max-width: 100vw;
    width: 100vw;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15),
      0 0 0 1px rgba(255, 255, 255, 0.1) inset,
      0 0 35px rgba(255, 255, 255, 0.08), 0 0 60px rgba(255, 255, 255, 0.04);
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .glass-card {
    padding: 1rem 4rem;
    max-width: 100vw;
    width: 100vw;
  }
}

@media (min-width: 1025px) {
  .glass-card {
    padding: 1rem 5rem;
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
