<template>
  <div
    class="relative flex flex-col h-screen bg-cover bg-center bg-no-repeat overflow-hidden justify-center items-center"
    :style="{ backgroundImage: `url(${backgroundImage})` }"
  >
    <!-- Main content container -->
    <div class="flex flex-col w-full max-w-md">
      <!-- Timeline ở trên - Horizontal -->
      <div class="flex-shrink-0 px-4 pt-4">
        <div class="relative">
          <!-- Đường line ngang - HIDDEN -->
          <!-- <div
          class="absolute top-1/2 left-0 right-0 h-[3px] bg-white transform -translate-y-1/2 z-0"
        ></div> -->

          <!-- Timeline items nằm ngang -->
          <div class="flex justify-between items-center relative z-10 py-4">
            <div
              v-for="(round, index) in rounds"
              :key="`mobile-round-${index}`"
              class="flex flex-col items-center cursor-pointer transition-all duration-300"
              :class="{
                'timeline-mobile-active': index === selectedRound,
              }"
              @click="selectRound(index)"
            >
              <!-- Icon viên đá -->
              <div class="mb-2">
                <img
                  src="@/assets/rock.png"
                  class="w-8 h-8 transition-all duration-300"
                  :class="
                    index === selectedRound
                      ? 'brightness-125 drop-shadow-[0_0_15px_gold]'
                      : 'brightness-50 hover:brightness-75'
                  "
                />
              </div>

              <!-- Text tên vòng -->
              <div
                class="text-center transition-all duration-300"
                :class="
                  index === selectedRound
                    ? 'text-[#dffbff] text-sm font-bold'
                    : 'text-[#dffbff] text-xs font-medium opacity-70'
                "
                :style="
                  index === selectedRound
                    ? 'text-shadow: 0 0 10px #dffbff, 0 0 20px #dffbff;'
                    : ''
                "
              >
                {{ round.title }}
              </div>

              <!-- Description cho active item -->
              <div
                v-if="index === selectedRound"
                class="text-white text-[9px] font-medium mt-1 text-center max-w-[70px] leading-tight animate-fade-in h-[20px] flex items-center justify-center"
              >
                <span class="whitespace-pre-line">{{ round.description }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Detail Box ở dưới -->
      <div class="flex items-start justify-center px-4 pt-6 pb-4">
        <div
          class="relative bg-gradient-to-br from-[#214159] via-[#2d5a7b] to-[#1a3349] bg-opacity-95 backdrop-blur-sm w-full max-w-[380px] h-[420px] p-4 rounded-xl shadow-2xl border border-[#3a6b8c] border-opacity-30 transition-all duration-500 ease-in-out hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] overflow-hidden"
        >
          <!-- Background pattern overlay -->
          <div class="absolute inset-0 opacity-10">
            <div
              class="absolute inset-0 bg-gradient-to-br from-transparent via-[#dffbff]/5 to-transparent"
            ></div>
            <div
              class="absolute top-4 right-4 w-2 h-2 bg-[#dffbff]/20 rounded-full animate-pulse"
            ></div>
            <div
              class="absolute bottom-6 left-6 w-1 h-1 bg-[#dffbff]/30 rounded-full animate-pulse delay-1000"
            ></div>
          </div>

          <!-- Glowing border effect -->
          <div
            class="absolute inset-0 rounded-xl bg-gradient-to-r from-[#dffbff] via-transparent to-[#dffbff] opacity-20 blur-sm"
          ></div>
          <div
            class="absolute inset-[1px] rounded-xl bg-gradient-to-br from-[#214159] via-[#2d5a7b] to-[#1a3349]"
          ></div>

          <Transition name="detail-content" mode="out-in">
            <div
              :key="selectedRound"
              class="relative h-full flex flex-col z-10 w-full items-center"
            >
              <!-- Title with enhanced styling -->
              <div class="mb-3 w-full max-w-[320px]">
                <h2
                  class="text-[#dffbff] text-base font-bold mb-2 text-left transition-all duration-300 ease-in-out transform bg-gradient-to-r from-[#dffbff] to-[#87ceeb] bg-clip-text text-transparent drop-shadow-sm"
                >
                  {{ rounds[selectedRound].timeframe.toUpperCase() }}
                </h2>
                <div
                  class="w-16 h-0.5 bg-gradient-to-r from-[#dffbff] to-transparent rounded-full"
                ></div>
              </div>

              <!-- Content with enhanced styling -->
              <div
                class="text-white/90 text-xs leading-relaxed text-left transition-all duration-300 ease-in-out transform flex-1 overflow-y-auto w-full max-w-[320px]"
              >
                <div class="space-y-2 pr-2">
                  <pre
                    class="whitespace-pre-wrap font-sans leading-relaxed text-white/95 selection:bg-[#dffbff]/20"
                    >{{ rounds[selectedRound].detail }}</pre
                  >
                </div>
              </div>

              <!-- Decorative bottom element -->
              <div
                class="mt-2 flex justify-end flex-shrink-0 w-full max-w-[320px]"
              >
                <div class="flex space-x-1">
                  <div
                    class="w-1.5 h-1.5 bg-[#dffbff]/40 rounded-full animate-pulse"
                  ></div>
                  <div
                    class="w-1.5 h-1.5 bg-[#dffbff]/60 rounded-full animate-pulse delay-200"
                  ></div>
                  <div
                    class="w-1.5 h-1.5 bg-[#dffbff]/80 rounded-full animate-pulse delay-500"
                  ></div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import backgroundImage from "@/assets/back.png";

const rounds = ref([
  {
    title: "VÒNG 1",
    description: "TEST ONLINE",
    timeframe: "TEST ONLINE (THỜI GIAN: 10/10/2025 - 24/10/2025)",
    detail: `Thí sinh sẽ làm bài thi trắc nghiệm trực tuyến trên Website của Ban Tổ Chức.
Bài thi gồm 20 câu trắc nghiệm về các lĩnh vực Kinh tế, Tài chính, Chứng khoán... Ở mỗi câu hỏi, các thí sinh chỉ được lựa chọn 01 đáp án duy nhất.

Tổng điểm bài thi: 20 điểm.
Thời gian làm bài: 30 phút.
Hình thức thi: Cá nhân - Trực tuyến.

Top 300 thí sinh có điểm số cao nhất sẽ bước tiếp vào Vòng 2 - Test sơ loại.`,
  },
  {
    title: "VÒNG 2",
    description: "TEST SƠ LOẠI",
    timeframe: "TEST SƠ LOẠI (THỜI GIAN: 26/10/2025)",
    detail: `Thí sinh sẽ trải qua 01 bài thi trên giấy trực tiếp gồm 02 phần thi với hình thức thi Trắc nghiệm và Tự luận.

Tổng điểm bài thi: 100 điểm
Thời gian làm bài: 60 phút
Hình thức thi: Cá nhân - Trực tiếp

Top 50 thí sinh có điểm số cao nhất sẽ bước tiếp vào Vòng 3 - Thử thách chuyên sâu.`,
  },
  {
    title: "VÒNG 3",
    description: "THỬ THÁCH CHUYÊN SÂU",
    timeframe: "THỬ THÁCH CHUYÊN SÂU (THỜI GIAN: 29/10/2025 - 16/11/2025)",
    detail: `THỬ THÁCH THỊ TRƯỜNG (29/10/2025 - 14/10/2025)
Mỗi thí sinh được cấp Nhóm giao dịch giả lập từng Stock123 của CTCP Chứng khoán Pinetree, thực hiện đặt lệnh trực tuyến quy chế do Ban tổ chức công bố. Sau khi kết thúc, thí sinh có kết quả giao dịch tốt nhất sẽ nhận quà tặng và giấy chứng nhận.

THỬ THÁCH NHÓM (16/11/2025)
Top 50 thí sinh sẽ được chia thành 10 đội thi giải Case-study theo vòng thi thử thách thị trường. Sau đó, các nhóm sẽ phải hoàn thiện phần bài hoàn chỉnh trong vòng 02 tuần và trình bày lời giải, phần biện với team đối thủ do BTC bốc thăm và Ban Giám khảo.`,
  },
  {
    title: "VÒNG 4",
    description: "THUYẾT TRÌNH PHÂN TÍCH\nCƠ HỘI ĐẦU TƯ",
    timeframe: "Thuyết trình phân tích cơ hội đầu tư (THỜI GIAN: 07/12/2025)",
    detail: `Top 16 thí sinh sẽ được Ban tổ chức chia thành các cặp (thông tin về người cùng cặp sẽ được Ban tổ chức thông báo trước để thí sinh chuẩn bị) để thuyết trình trước hội đồng Ban Giám khảo về danh mục đầu tư của mình. Các thí sinh sẽ trả lời các câu hỏi từ thí sinh cùng cặp và tư phía Ban Giám khảo trong một khoảng thời gian quy định.

Hình thức thi: Cá nhân.`,
  },
  {
    title: "VÒNG 5",
    description: "CHUNG KẾT",
    timeframe: "GALA NIGHT (THỜI GIAN: 16/01/2026)",
    detail: `Top 5 thí sinh xuất sắc nhất sẽ trải qua Vòng Chung kết được sắn khấu hóa để tìm ra Quán quân của Cuộc thi Bản lĩnh Nhà đầu tư 2025`,
  },
]);

const selectedRound = ref(0); // mặc định Vòng 1

const selectRound = (index) => {
  selectedRound.value = index;
};
</script>

<style scoped>
/* Timeline mobile active state - No additional styling needed, handled by :class binding */

/* Fade in animation */
@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}

/* Detail content transitions */
.detail-content-enter-active {
  transition: all 0.25s ease-out;
}

.detail-content-leave-active {
  transition: all 0.15s ease-in;
}

.detail-content-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.98);
}

.detail-content-enter-to {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.detail-content-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.detail-content-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.98);
}

/* Scrollbar styling */
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: rgba(223, 251, 255, 0.3);
  border-radius: 2px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: rgba(223, 251, 255, 0.5);
}
</style>
