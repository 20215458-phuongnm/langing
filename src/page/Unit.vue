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
          <Chip :logo="bav" alt-text="Sponsor 1" />
          <Chip :logo="huyhieu" alt-text="Huy hiệu đoàn" />
          <Chip :logo="hoisinhvien" alt-text="Hội Sinh viên Việt Nam" />
          <Chip :logo="bavtc" alt-text="Sponsor 2" />
          <Chip :logo="notback" alt-text="Logo Notback" />
        </div>
      </div>

      <div class="sponsor-section">
        <h2 class="section-title">BẢO TRỢ CHUYÊN MÔN</h2>
        <div class="chips-row">
          <Chip :logo="btcmssc" alt-text="SSC" />
        </div>
      </div>

      <div class="sponsor-section">
        <h2 class="section-title">NHÀ TÀI TRỢ KIM CƯƠNG</h2>
        <div class="chips-row">
          <Chip :logo="nttkcshs" alt-text="SHS" />
        </div>
      </div>

      <div class="sponsor-section">
        <h2 class="section-title">NHÀ TÀI TRỢ VÀNG</h2>
        <div class="chips-row">
          <Chip :logo="nttvlogo" alt-text="Logo New SD" />
        </div>
      </div>

      <div class="sponsor-section">
        <h2 class="section-title">NHÀ TÀI TRỢ BẠC</h2>
        <div class="chips-row">
          <Chip :logo="nttbblack" alt-text="Black Logo" />
        </div>
      </div>

       <div class="sponsor-section">
        <h2 class="section-title">NHÀ TÀI ĐỒNG</h2>
        <div class="chips-row">
          <Chip :logo="money" alt-text="NTTĐ" />
        </div>
      </div>

      <div class="sponsor-section">
        <h2 class="section-title">NHÀ TÀI TRỢ ĐỒNG HÀNH</h2>
        <div class="chips-row">
          <Chip :logo="nttdhbtc" alt-text="BTC" />
          <Chip :logo="nttdhmirae" alt-text="Mirae Asset" />
          <Chip :logo="nttdhnextgen" alt-text="NextGen Edu" />
        </div>
      </div>

      <div class="sponsor-section">
        <h2 class="section-title">NHÀ TÀI TRỢ HIỆN VẬT</h2>
        <div class="chips-row">
          <Chip :logo="ntthv10edu" alt-text="10EDU" />
          <Chip :logo="ntthvfidt" alt-text="FIDT" />
          <Chip :logo="ntthvlogo2" alt-text="Logo2" />
          <Chip :logo="ntthvdark" alt-text="Logo Dark" />
          <Chip :logo="ntthvlogo" alt-text="Logô" />
          <Chip :logo="ntthvmoneygain" alt-text="MoneyGain" />
          <Chip :logo="ntthvypfp" alt-text="YPFP" />
        </div>
      </div>

      <div class="sponsor-section">
        <h2 class="section-title">NHÀ TÀI TRỢ NỀN TẢNG</h2>
        <div class="chips-row">
          <Chip :logo="nttntpintree" alt-text="Pinetree" />
        </div>
      </div>

      <div class="sponsor-section">
        <h2 class="section-title">HỖ TRỢ THỰC HIỆN</h2>
        <div class="chips-row">
          <Chip :logo="httt_scue" alt-text="Hỗ trợ thực hiện" />
        </div>
      </div>

      <div class="sponsor-section">
        <h2 class="section-title">BẢO TRỢ TRUYỀN THÔNG</h2>
        <div class="chips-row">
          <Chip :logo="bttt" alt-text="Báo trợ truyền thông" />
        </div>
      </div>

      <div class="sponsor-section">
        <h2 class="section-title">HỖ TRỢ TRUYỀN THÔNG</h2>
        <div class="chips-row">
          <Chip :logo="httt_scue" alt-text="Hỗ trợ truyền thông" />
          <Chip :logo="httt_yecneu" alt-text="Hỗ trợ truyền thông" />
          <Chip :logo="httt_st" alt-text="Hỗ trợ truyền thông" />
          <Chip :logo="httt_ysc1" alt-text="Hỗ trợ truyền thông" />
          <Chip :logo="httt_doiteam" alt-text="Hỗ trợ truyền thông" />
          <Chip :logo="httt_sic" alt-text="Hỗ trợ truyền thông" />
          <Chip :logo="httt_xanh" alt-text="Hỗ trợ truyền thông" />
          <Chip :logo="httt_544918284" alt-text="Hỗ trợ truyền thông" />
          <Chip :logo="httt_images" alt-text="Hỗ trợ truyền thông" />
          <Chip :logo="fc" alt-text="Hỗ trợ truyền thông" />
        </div>
      </div>

            <div class="sponsor-section">
        <h2 class="section-title">BẢO TRỢ HÌNH ẢNH</h2>
        <div class="chips-row">
          <Chip :logo="btha" alt-text="Bảo trợ hình ảnh" />
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import Chip from "@/components/Chip.vue";
import bav from "@/assets/DVTC/BAV.png";
import bavtc from "@/assets/DVTC/BAVTC.png";
import huyhieu from "@/assets/DVTH/Huy_Hiệu_Đoàn.png";
import hoisinhvien from "@/assets/DVTH/Logo-Hoi-Sinh-Vien-Viet-Nam.webp";
import notback from "@/assets/DVTH/LOGOnotback (1).png";
import btcmssc from "@/assets/BTCM/Logo_SSC (1).svg";
import nttkcshs from "@/assets/NTTKC/3. LOGO SHS.png";
import nttvlogo from "@/assets/NTTV/4. LOGO MBS.png";
import nttbblack from "@/assets/NTTB/black-logo.png";
import nttdhbtc from "@/assets/NTTDH/7. LOGO BAO TIN.png";
import nttdhmirae from "@/assets/NTTDH/7. LOGO MIRAE ASSETS.png";
import nttdhnextgen from "@/assets/NTTDH/NextGen Edu.jpg";
import ntthv10edu from "@/assets/NTTHV/10EDU NGANG.png";
import ntthvfidt from "@/assets/NTTHV/FIDT.jpg";
import ntthvlogo2 from "@/assets/NTTHV/LOGO2 (2).png";
import ntthvdark from "@/assets/NTTHV/8. LOGO XNO.png";
import ntthvlogo from "@/assets/NTTHV/logô.jpg";
import ntthvmoneygain from "@/assets/NTTHV/8. LOGO MONEYGAIN.jpg";
import ntthvypfp from "@/assets/NTTHV/8. LOGO YPFP.png";
import nttntpintree from "@/assets/NTTNT/Logo-Pintree.png";
import httt_scue from "@/assets/HTTT/10 và 12. LOGO SCUE.png";
import httt_yecneu from "@/assets/HTTT/Bản sao của [YEC-NEU] LOGO-01 (1).png";
import httt_st from "@/assets/HTTT/LogoST.jpg";
import httt_ysc1 from "@/assets/HTTT/LogoYsc1png (2).png";
import httt_doiteam from "@/assets/HTTT/LOGOĐỘI.png";
import httt_sic from "@/assets/HTTT/SIC LOGO.png";
import httt_xanh from "@/assets/HTTT/xanh.png";
import httt_544918284 from "@/assets/HTTT/12. LOGO NSC.jpg";
import httt_images from "@/assets/HTTT/images.png";
import bttt from "@/assets/BTTT/11. LOGO BTTT.jpg";
import fc from "@/assets/HTTT/FC.png";
import btha from "@/assets/BTHA/btha.jpg";
import money from "@/assets/NTTD/6. NHÀ TÀI TRỢ ĐỒNG.png";
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

  /* Enhanced page entrance animation */
  animation: pageEntrance 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  opacity: 0;
  transform: scale(0.95);
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

  /* Container entrance effect */
  animation: containerSlideIn 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  opacity: 0;
  transform: translateY(30px);
  animation-delay: 0.3s;
}

.main-title {
  color: #dffbff;
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 60px;
  text-shadow: 0 0 3px rgba(223, 251, 255, 0.7),
    0 0 6px rgba(223, 251, 255, 0.5), 0 0 9px rgba(223, 251, 255, 0.3);
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
  text-shadow: 0 0 3px rgba(223, 251, 255, 0.9),
    0 0 6px rgba(223, 251, 255, 0.6), 0 0 9px rgba(223, 251, 255, 0.4);
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

/* Enhanced Animation cho các section khi load - fade từ dưới lên */
.sponsor-section {
  animation: dramaticFadeInUp 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  opacity: 0;
  transform: translateY(80px) scale(0.9);
  visibility: hidden;
  filter: blur(3px);
}

.sponsor-section:nth-child(2) {
  animation-delay: 0.8s;
}
.sponsor-section:nth-child(3) {
  animation-delay: 1s;
}
.sponsor-section:nth-child(4) {
  animation-delay: 1.2s;
}
.sponsor-section:nth-child(5) {
  animation-delay: 1.4s;
}
.sponsor-section:nth-child(6) {
  animation-delay: 1.6s;
}

@keyframes dramaticFadeInUp {
  0% {
    opacity: 0;
    transform: translateY(80px) scale(0.9);
    visibility: hidden;
    filter: blur(3px);
  }
  20% {
    visibility: visible;
    opacity: 0.3;
    filter: blur(2px);
  }
  60% {
    opacity: 0.8;
    transform: translateY(10px) scale(0.98);
    filter: blur(1px);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
    visibility: visible;
    filter: blur(0);
  }
}

/* Enhanced Main title animation - fade từ dưới lên */
.main-title {
  animation: dramaticTitleEntrance 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)
      forwards,
    titleGlow 2s ease-in-out infinite alternate 2s;
  opacity: 0;
  transform: translateY(50px) scale(0.8);
  visibility: hidden;
  filter: blur(4px);
  animation-delay: 0.5s;
}

@keyframes dramaticTitleEntrance {
  0% {
    opacity: 0;
    transform: translateY(50px) scale(0.8);
    visibility: hidden;
    filter: blur(4px);
  }
  25% {
    visibility: visible;
    opacity: 0.4;
    transform: translateY(30px) scale(0.9);
    filter: blur(2px);
  }
  70% {
    opacity: 0.9;
    transform: translateY(-5px) scale(1.05);
    filter: blur(0.5px);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
    visibility: visible;
    filter: blur(0);
  }
}

@keyframes titleGlow {
  from {
    text-shadow: 0 0 3px rgba(223, 251, 255, 0.7),
      0 0 6px rgba(223, 251, 255, 0.5), 0 0 9px rgba(223, 251, 255, 0.3);
  }
  to {
    text-shadow: 0 0 5px rgba(223, 251, 255, 0.8),
      0 0 10px rgba(223, 251, 255, 0.6), 0 0 15px rgba(223, 251, 255, 0.4),
      0 0 20px rgba(223, 251, 255, 0.2);
  }
}

/* Page entrance animation */
@keyframes pageEntrance {
  0% {
    opacity: 0;
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* Container slide in animation */
@keyframes containerSlideIn {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
