<template>
  <footer id="contact" class="w-full bg-[#5f819b]/70 text-white py-12 px-6">
    <div class="max-w-full mx-auto px-4 lg:px-8">
      <!-- Phần tiêu đề liên hệ -->
 <div class="flex flex-col-reverse sm:flex-row justify-between items-start sm:items-center mb-8">
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
  <v-btn class="footer-register-btn mb-3 sm:mt-0">
    Đăng ký ngay
  </v-btn>
</div>

      <!-- Nội dung chính -->
      <div class="flex flex-col md:flex-row md:justify-between md:gap-8 gap-8">
        <!-- Cột 1: CLB -->
        <div class="w-full md:w-2/4">
          <p class="text-base md:text-lg font-bold mb-3 text-yellow-400 ">
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
            <li>Email: notify.blnhi@gmail.com</li>
            <li>Hotline: 0968 763 960 (Ms. Phương Anh)</li>
            <li>
              Fanpage:
              <a
                href="https://facebook.com/banlinhnhadatu.sec"
                target="_blank"
                class="underline hover:text-yellow-300"
              >
                facebook.com/banlinhnhadatu.sec
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
              <li><a href="#about" class="hover:underline">Về chúng tôi</a></li>
              <li><a href="#contest" class="hover:underline">Về cuộc thi</a></li>
              <li><a href="#awards" class="hover:underline">Giải thưởng</a></li>
              <li><a href="#rules" class="hover:underline">Thể lệ</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

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
  transition: background-color 0.2s ease-in-out;
}

.footer-register-btn:hover {
  background-color: #fcd34d !important;
}
</style>
