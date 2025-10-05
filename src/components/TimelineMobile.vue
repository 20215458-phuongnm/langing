<template>
  <div
    class="relative flex flex-col h-screen bg-cover bg-center bg-no-repeat overflow-hidden justify-center items-center"
    :style="{ backgroundImage: `url(${backgroundImage})` }"
  >
    <!-- Main content container -->
    <div class="flex flex-col w-full max-w-md">
      <!-- Timeline ở trên - Horizontal -->
      <div class="flex-shrink-0 px-4 pt-4 pb-6">
        <div class="relative">
          <!-- Đường line ngang - Full screen width -->
          <div
            class="absolute h-[3px] bg-white z-0"
            style="top: 32px; left: -100vw; right: -100vw; width: 200vw"
          ></div>

          <!-- Timeline items nằm ngang -->
          <div
            class="flex justify-between items-start relative z-10 py-4 min-h-[100px]"
          >
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
                class="text-white text-[9px] font-medium mt-1 text-center max-w-[70px] leading-tight animate-fade-in min-h-[20px] flex items-center justify-center"
              >
                <span class="whitespace-pre-line">{{ round.description }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Detail Box ở dưới -->
      <div class="flex items-start justify-center px-4 pt-2 pb-4">
        <div
          class="swipeable-detail-box relative bg-gradient-to-br from-[#214159] via-[#2d5a7b] to-[#1a3349] bg-opacity-95 backdrop-blur-sm w-full max-w-[380px] h-[450px] p-4 rounded-xl shadow-2xl border border-[#3a6b8c] border-opacity-30 transition-all duration-300 ease-in-out hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] overflow-hidden cursor-grab active:cursor-grabbing"
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

          <!-- Swipe indicators -->
          <div class="absolute top-4 left-4 z-20 opacity-60">
            <div
              v-if="selectedRound > 0"
              class="flex items-center text-white/60 text-xs"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
          </div>

          <div class="absolute top-4 right-4 z-20 opacity-60">
            <div
              v-if="selectedRound < rounds.length - 1"
              class="flex items-center text-white/60 text-xs"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
          </div>

          <!-- Dot indicators -->
          <div
            class="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20"
          >
            <div class="flex space-x-2">
              <div
                v-for="(round, index) in rounds"
                :key="`dot-${index}`"
                class="dot-indicator w-2 h-2 rounded-full transition-all duration-300"
                :class="
                  index === selectedRound
                    ? 'bg-[#dffbff] scale-125'
                    : 'bg-white/30'
                "
                @click="selectRound(index)"
              ></div>
            </div>
          </div>

          <Transition name="detail-content" mode="out-in">
            <div
              :key="selectedRound"
              class="relative h-full flex flex-col z-10 w-full items-center pt-8 pb-12"
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
                class="text-white/90 text-xs leading-relaxed text-left transition-all duration-300 ease-in-out transform flex-1 overflow-y-auto w-full max-w-[320px] no-scrollbar"
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
import { ref, onMounted, onUnmounted } from "vue";
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

// Touch/Swipe functionality
let touchStartX = 0;
let touchStartY = 0;
let detailBoxElement = null;

const handleTouchStart = (e) => {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
};

const handleTouchEnd = (e) => {
  if (!touchStartX || !touchStartY) return;

  const touchEndX = e.changedTouches[0].clientX;
  const touchEndY = e.changedTouches[0].clientY;

  const diffX = touchStartX - touchEndX;
  const diffY = touchStartY - touchEndY;

  // Check if horizontal swipe is more significant than vertical
  if (Math.abs(diffX) > Math.abs(diffY)) {
    // Minimum swipe distance threshold
    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        // Swipe left - next round
        if (selectedRound.value < rounds.value.length - 1) {
          selectRound(selectedRound.value + 1);
        }
      } else {
        // Swipe right - previous round
        if (selectedRound.value > 0) {
          selectRound(selectedRound.value - 1);
        }
      }
    }
  }

  // Reset touch positions
  touchStartX = 0;
  touchStartY = 0;
};

const handleMouseDown = (e) => {
  touchStartX = e.clientX;
  touchStartY = e.clientY;
};

const handleMouseUp = (e) => {
  if (!touchStartX || !touchStartY) return;

  const mouseEndX = e.clientX;
  const mouseEndY = e.clientY;

  const diffX = touchStartX - mouseEndX;
  const diffY = touchStartY - mouseEndY;

  // Check if horizontal swipe is more significant than vertical
  if (Math.abs(diffX) > Math.abs(diffY)) {
    // Minimum swipe distance threshold
    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        // Swipe left - next round
        if (selectedRound.value < rounds.value.length - 1) {
          selectRound(selectedRound.value + 1);
        }
      } else {
        // Swipe right - previous round
        if (selectedRound.value > 0) {
          selectRound(selectedRound.value - 1);
        }
      }
    }
  }

  // Reset mouse positions
  touchStartX = 0;
  touchStartY = 0;
};

onMounted(() => {
  // Find detail box element
  detailBoxElement = document.querySelector(".swipeable-detail-box");

  if (detailBoxElement) {
    // Add touch event listeners
    detailBoxElement.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    detailBoxElement.addEventListener("touchend", handleTouchEnd, {
      passive: true,
    });

    // Add mouse event listeners for desktop testing
    detailBoxElement.addEventListener("mousedown", handleMouseDown);
    detailBoxElement.addEventListener("mouseup", handleMouseUp);
  }
});

onUnmounted(() => {
  if (detailBoxElement) {
    detailBoxElement.removeEventListener("touchstart", handleTouchStart);
    detailBoxElement.removeEventListener("touchend", handleTouchEnd);
    detailBoxElement.removeEventListener("mousedown", handleMouseDown);
    detailBoxElement.removeEventListener("mouseup", handleMouseUp);
  }
});
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

/* Hide scrollbar */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

/* Swipe functionality styles */
.swipeable-detail-box {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  touch-action: pan-y; /* Allow vertical scrolling but capture horizontal gestures */
}

.swipeable-detail-box:active {
  transform: scale(0.98);
  transition: transform 0.1s ease;
}

/* Swipe hint animation */
@keyframes swipeHint {
  0%,
  100% {
    opacity: 0.6;
    transform: translateX(0);
  }
  50% {
    opacity: 1;
    transform: translateX(5px);
  }
}

.swipeable-detail-box:hover .absolute.top-4.right-4 svg,
.swipeable-detail-box:hover .absolute.top-4.left-4 svg {
  animation: swipeHint 2s ease-in-out infinite;
}

/* Enhanced dot indicators */
.dot-indicator {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.dot-indicator:hover {
  transform: scale(1.3);
  opacity: 0.8;
}
</style>
