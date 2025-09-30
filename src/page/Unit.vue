<template>
  <div class="unit-page">
    <!-- Content -->
    <div class="content-container">
      <!-- Main title -->
      <h1 class="main-title">ĐƠN VỊ ĐỒNG HÀNH</h1>

      <!-- Sponsor sections -->
      <div class="sponsor-section">
        <h2 class="section-title">ĐƠN VỊ TỔ CHỨC</h2>
        <div class="chips-row">
          <Chip logo="@/assets/logo1.png" alt-text="Sponsor 1" />
          <Chip logo="@/assets/logo2.png" alt-text="Sponsor 2" />
          <Chip logo="@/assets/logo3.png" alt-text="Sponsor 3" />
          <Chip logo="@/assets/logo4.png" alt-text="Sponsor 4" />
          <Chip logo="@/assets/logo5.png" alt-text="Sponsor 5" />
        </div>
      </div>

      <div class="sponsor-section">
        <h2 class="section-title">BẢO TRỢ CHUYÊN MÔN</h2>
        <div class="chips-row">
          <Chip logo="@/assets/logo6.png" alt-text="Expert Partner 1" />
          <Chip logo="@/assets/logo7.png" alt-text="Expert Partner 2" />
        </div>
      </div>

      <div class="sponsor-section">
        <h2 class="section-title">NHÀ TÀI TRỢ KIM CƯƠNG</h2>
        <div class="chips-row">
          <Chip logo="@/assets/logo8.png" alt-text="Diamond Sponsor" />
        </div>
      </div>

      <div class="sponsor-section">
        <h2 class="section-title">NHÀ TÀI TRỢ BẠCH KIM</h2>
        <div class="chips-row">
          <Chip logo="@/assets/logo9.png" alt-text="Platinum Sponsor" />
        </div>
      </div>

      <div class="sponsor-section">
        <h2 class="section-title">NHÀ TÀI TRỢ VÀNG</h2>
        <div class="chips-row">
          <Chip logo="@/assets/logo10.png" alt-text="Gold Sponsor" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Chip from "@/components/Chip.vue";
</script>

<style scoped>
.unit-page {
  position: relative;
  min-height: 100vh;
  background-attachment: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 20px;
  overflow-x: hidden;
}

.bg-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 28, 41, 0.3);
  z-index: 1;
}

.content-container {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.main-title {
  color: #dffbff;
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 60px;
  text-shadow: 0 0 5px #dffbff, 0 0 10px #dffbff;
  letter-spacing: 2px;
}

.sponsor-section {
  margin-bottom: 50px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.section-title {
  color: #dffbff;
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 25px;
  text-shadow: 0 0 4px #dffbff, 0 0 8px #dffbff;
  letter-spacing: 1px;
}

.chips-row {
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
  justify-content: center;
  align-items: center;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .main-title {
    font-size: 2.5rem;
    margin-bottom: 40px;
  }

  .section-title {
    font-size: 1.3rem;
    margin-bottom: 20px;
  }

  .chips-row {
    gap: 20px;
  }

  .sponsor-section {
    margin-bottom: 40px;
  }
}

@media (max-width: 768px) {
  .unit-page {
    padding: 40px 15px;
  }

  .main-title {
    font-size: 2rem;
    margin-bottom: 30px;
  }

  .section-title {
    font-size: 1.1rem;
    margin-bottom: 15px;
  }

  .chips-row {
    gap: 15px;
  }

  .sponsor-section {
    margin-bottom: 30px;
  }
}

@media (max-width: 480px) {
  .main-title {
    font-size: 1.5rem;
    letter-spacing: 1px;
  }

  .section-title {
    font-size: 1rem;
  }

  .chips-row {
    gap: 12px;
  }

  .content-container {
    padding: 0 10px;
  }
}

/* Animation cho các section khi load */
.sponsor-section {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
  transform: translateY(30px);
}

.sponsor-section:nth-child(2) {
  animation-delay: 0.1s;
}
.sponsor-section:nth-child(3) {
  animation-delay: 0.2s;
}
.sponsor-section:nth-child(4) {
  animation-delay: 0.3s;
}
.sponsor-section:nth-child(5) {
  animation-delay: 0.4s;
}
.sponsor-section:nth-child(6) {
  animation-delay: 0.5s;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Main title animation */
.main-title {
  animation: titleGlow 2s ease-in-out infinite alternate;
}

@keyframes titleGlow {
  from {
    text-shadow: 0 0 4px #dffbff, 0 0 8px #dffbff;
  }
  to {
    text-shadow: 0 0 6px #dffbff, 0 0 12px #dffbff, 0 0 18px #dffbff;
  }
}
</style>
