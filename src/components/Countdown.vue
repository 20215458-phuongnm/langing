<template>
  <div class="countdown-container">
    <!-- Glass Card -->
    <div class="glass-card">
      <!-- Main Content - Vertical Layout -->
      <div class="main-content">
        <!-- Top: Countdown -->
        <div class="countdown-section">
          <Countdown
            :time="targetTimestamp"
            :interval="1000"
            mainColor="#fff"
            secondFlipColor="#fff"
            class="countdown-wrapper"
          >
          </Countdown>
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
    <div class="decoration-dots">
      <div class="dot dot-1"></div>
      <div class="dot dot-2"></div>
      <div class="dot dot-3"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { Countdown } from "vue3-flip-countdown";

// Thời gian đích (ví dụ sau 3 ngày)
const targetDate = new Date();
targetDate.setDate(targetDate.getDate() + 3);

// Convert to timestamp for vue3-flip-countdown
const targetTimestamp = targetDate.getTime();
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap");

.countdown-container {
  position: relative;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.glass-card {
  position: relative;
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.15),
    rgba(255, 255, 255, 0.05)
  );
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 24px;
  padding: 2.5rem 6rem;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(255, 255, 255, 0.1) inset, 0 0 40px rgba(255, 255, 255, 0.1),
    0 0 80px rgba(255, 255, 255, 0.05);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  max-width: 900px;
  width: 100%;
}

.glass-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.4),
    transparent
  );
  animation: shimmer 3s ease-in-out infinite;
}

@keyframes shimmer {
  0%,
  100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}

.glass-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 35px 70px rgba(0, 0, 0, 0.2),
    0 0 0 1px rgba(255, 255, 255, 0.15) inset, 0 0 60px rgba(255, 255, 255, 0.2),
    0 0 120px rgba(255, 255, 255, 0.1), 0 0 200px rgba(255, 255, 255, 0.05);
}

.main-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
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
  border: none !important;
  text-transform: none !important;
  letter-spacing: 0.02em !important;
  min-width: auto !important;
  height: auto !important;
  box-shadow: 0 8px 32px rgba(251, 191, 36, 0.3) !important;
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
  box-shadow: 0 12px 40px rgba(251, 191, 36, 0.4) !important;
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

.decoration-dots {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
}

.dot {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
}

.dot-1 {
  top: 20%;
  left: 10%;
  animation: float 4s ease-in-out infinite;
}

.dot-2 {
  top: 60%;
  right: 15%;
  animation: float 4s ease-in-out infinite 1.5s;
}

.dot-3 {
  bottom: 30%;
  left: 20%;
  animation: float 4s ease-in-out infinite 3s;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px) scale(1);
    opacity: 0.3;
  }
  50% {
    transform: translateY(-20px) scale(1.2);
    opacity: 0.6;
  }
}

/* Responsive Design */
@media (max-width: 640px) {
  .countdown-container {
    padding: 1rem;
  }

  .glass-card {
    padding: 2rem 2.5rem;
    min-width: 320px;
    max-width: 95vw;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15),
      0 0 0 1px rgba(255, 255, 255, 0.1) inset,
      0 0 30px rgba(255, 255, 255, 0.08);
  }

  .main-content {
    gap: 2rem;
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
    padding: 2.5rem 4rem;
    max-width: 700px;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15),
      0 0 0 1px rgba(255, 255, 255, 0.1) inset,
      0 0 35px rgba(255, 255, 255, 0.08), 0 0 60px rgba(255, 255, 255, 0.04);
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .glass-card {
    padding: 2.5rem 5rem;
    max-width: 800px;
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
  color: #ffffff !important;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-family: "Poppins", sans-serif;
}

/* Đảm bảo label trong countdown có màu trắng */
.countdown-wrapper :deep(.label) {
  color: #ffffff !important;
}

.countdown-wrapper :deep(.flip-countdown .label) {
  color: #ffffff !important;
}

.countdown-wrapper :deep(*) {
  color: #ffffff !important;
}

@media (min-width: 640px) {
  .label {
    font-size: 0.875rem;
  }
}
</style>
