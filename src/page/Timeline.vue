<template>
  <!-- Mobile Version -->
  <TimelineMobile v-if="isMobile" />

  <!-- Desktop Version -->
  <div
    v-else
    class="relative flex flex-col lg:flex-row justify-center items-center h-screen bg-cover bg-center bg-no-repeat overflow-hidden px-4 md:px-8 lg:px-12 xl:px-20 2xl:px-32"
    :style="{ backgroundImage: `url(${backgroundImage})` }"
  >
    <!-- Phần bên trái - Timeline -->
    <div
      class="flex justify-center items-center w-full md:w-auto lg:w-auto lg:flex-shrink-0"
    >
      <!-- Ô hình chữ nhật border trắng cố định -->
      <!-- <div
        class="absolute border-4 border-white w-[220px] h-[100px] z-20 -translate-x-32"
      ></div> -->

      <!-- Timeline container wrapper -->
      <div class="mt-4 md:mt-8 lg:mt-[470px] timeline-scroll-container">
        <!-- Timeline container -->
        <div
          ref="timeline"
          class="relative flex flex-col items-start transition-transform duration-700 ml-4 md:ml-6 lg:ml-8 xl:ml-19"
          :style="{ transform: `translateY(${translateY}px)` }"
        >
          <!-- Đường line dọc kéo dài toàn background -->
          <div
            class="absolute right-6 lg:right-12 w-[3px] lg:w-[5px] bg-white"
            style="top: -200vh; bottom: -200vh"
          ></div>

          <!-- Các vòng - Infinite Loop -->
          <div
            v-for="(round, index) in rounds"
            :key="`round-${index}`"
            class="timeline-round-item relative flex items-center cursor-pointer mb-4 lg:mb-8 transition-all duration-300 hover:scale-105"
            :class="{
              'timeline-item-active':
                index % originalRounds.length ===
                selectedRound % originalRounds.length,
            }"
            @click="selectRound(index)"
          >
            <!-- Text tên vòng (bên trái) -->
            <div
              class="transition-all duration-500 relative"
              :class="
                index === selectedRound
                  ? 'mr-8 lg:mr-16 -translate-x-8 lg:-translate-x-32'
                  : 'mr-8 lg:mr-16'
              "
            >
              <!-- Container với kích thước cố định -->
              <div
                class="w-[180px] lg:w-[220px] h-[80px] lg:h-[100px] flex flex-col justify-center transition-all duration-500"
                :class="[
                  index === selectedRound
                    ? 'px-3 py-2 text-center'
                    : 'items-start justify-center text-left',
                ]"
              >
                <div
                  class="transition-all duration-500 transform"
                  :class="
                    index === selectedRound
                      ? 'text-[#dffbff] text-2xl lg:text-3xl font-bold leading-tight mb-1 scale-110'
                      : 'text-[#dffbff] font-bold text-lg lg:text-2xl scale-100'
                  "
                  :style="
                    index === selectedRound
                      ? 'text-shadow: 0 0 10px #dffbff, 0 0 20px #dffbff, 0 0 30px #dffbff;'
                      : ''
                  "
                >
                  {{ round.title }}
                </div>

                <div
                  v-if="index === selectedRound"
                  class="text-white text-xs lg:text-sm font-medium leading-tight transition-all duration-500 delay-300 mt-1 whitespace-pre-line"
                >
                  {{ round.description }}
                </div>
              </div>
            </div>

            <!-- Icon viên đá nằm chồng lên line -->
            <div
              class="absolute right-6 lg:right-12 flex justify-center items-center translate-x-1/2 z-10"
            >
              <img
                src="@/assets/rock.png"
                class="w-8 h-8 lg:w-12 lg:h-12 transition-all duration-500 transform"
                :class="
                  index === selectedRound
                    ? 'brightness-125 drop-shadow-[0_0_15px_gold] scale-110'
                    : 'brightness-50 hover:brightness-75 hover:scale-105'
                "
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Phần bên phải - Detail Box -->
    <div
      class="flex justify-center items-center w-full md:w-auto lg:w-auto mt-4 md:mt-6 lg:mt-0 md:ml-8 lg:ml-16 xl:ml-24 2xl:ml-36"
    >
      <div
        class="relative bg-gradient-to-br from-[#214159] via-[#2d5a7b] to-[#1a3349] bg-opacity-95 backdrop-blur-sm w-full max-w-[350px] md:max-w-[450px] lg:max-w-[500px] xl:max-w-[600px] lg:w-[500px] xl:w-[600px] min-h-[300px] md:min-h-[350px] lg:min-h-[400px] p-4 md:p-5 lg:p-6 rounded-xl shadow-2xl border border-[#3a6b8c] border-opacity-30 transition-all duration-500 ease-in-out mx-4 md:mx-2 lg:mx-0 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] hover:scale-[1.02] overflow-hidden"
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
            :key="selectedRound % originalRounds.length"
            class="relative h-full flex flex-col z-10 w-full items-center"
          >
            <!-- Title with enhanced styling -->
            <div class="mb-4 w-full max-w-[300px] lg:max-w-[520px]">
              <h2
                class="text-[#dffbff] text-lg lg:text-2xl font-bold mb-2 text-left transition-all duration-300 ease-in-out transform bg-gradient-to-r from-[#dffbff] to-[#87ceeb] bg-clip-text text-transparent drop-shadow-sm"
              >
                {{ currentRoundData.timeframe.toUpperCase() }}
              </h2>
              <div
                class="w-16 h-0.5 bg-gradient-to-r from-[#dffbff] to-transparent rounded-full"
              ></div>
            </div>

            <!-- Content with enhanced styling -->
            <div
              class="text-white/90 text-xs lg:text-sm leading-relaxed text-left transition-all duration-300 ease-in-out transform flex-1 w-full max-w-[300px] lg:max-w-[520px]"
            >
              <div class="space-y-3">
                <pre
                  class="whitespace-pre-wrap font-sans leading-loose text-white/95 selection:bg-[#dffbff]/20"
                  >{{ currentRoundData.detail }}</pre
                >
              </div>
            </div>

            <!-- Decorative bottom element -->
            <div
              class="mt-4 flex justify-end w-full max-w-[300px] lg:max-w-[520px]"
            >
              <div class="flex space-x-1">
                <div
                  class="w-2 h-2 bg-[#dffbff]/40 rounded-full animate-pulse"
                ></div>
                <div
                  class="w-2 h-2 bg-[#dffbff]/60 rounded-full animate-pulse delay-200"
                ></div>
                <div
                  class="w-2 h-2 bg-[#dffbff]/80 rounded-full animate-pulse delay-500"
                ></div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from "vue";
import backgroundImage from "@/assets/back.png";
import TimelineMobile from "@/components/TimelineMobile.vue";

// Mobile detection with better responsive handling including small desktops
const isMobile = computed(() => {
  if (typeof window !== "undefined") {
    // Switch to mobile layout for screens smaller than 1024px (tablets and small desktops)
    return window.innerWidth < 1024;
  }
  return false;
});

const originalRounds = [
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
];

// Tạo timeline lặp vô tận bằng cách nhân 100 lần
const rounds = computed(() => {
  // Tạo 100 bản lặp để có timeline siêu dài
  const result = [];
  for (let i = 0; i < 100; i++) {
    result.push(...originalRounds);
  }
  return result;
});

const selectedRound = ref(250); // Bắt đầu từ giữa 100 bản lặp (50 * 5 = 250) để có thể cuộn cả 2 hướng
const timeline = ref(null);
const translateY = ref(0);

// Select round and center it - với logic lặp vô tận
const selectRound = async (index) => {
  selectedRound.value = index;

  // Center the selected round
  if (!isMobile.value && timeline.value) {
    await nextTick();

    const roundElements = timeline.value.querySelectorAll(
      ".timeline-round-item"
    );
    const selectedElement = roundElements[index];

    if (selectedElement) {
      const viewportCenterY = window.innerHeight / 2;
      const elementRect = selectedElement.getBoundingClientRect();
      const elementCenterY = elementRect.top + elementRect.height / 2;

      // Calculate distance to move element to center
      const scrollDistance = elementCenterY - viewportCenterY;

      // Smooth scroll to center
      translateY.value -= scrollDistance;
    }
  }
};

// Computed để lấy round data hiện tại theo logic lặp
const currentRoundData = computed(() => {
  const realIndex = selectedRound.value % originalRounds.length;
  return originalRounds[realIndex];
});
</script>

<style scoped>
/* Tương tự như .menu-item trong test.html */
.timeline-item-active {
  transform: scale(1.02);
}

/* Hover effect tương tự test.html */
.relative.flex.items-center.cursor-pointer:hover {
  filter: brightness(1.1);
}

/* Smooth transition cho tất cả timeline items */
.relative.flex.items-center.cursor-pointer {
  transition: all 0.3s ease;
}

/* Enhanced glow effect cho selected item */
.timeline-item-active .text-\[\#dffbff\] {
  text-shadow: 0 0 15px #dffbff, 0 0 25px #dffbff, 0 0 35px #dffbff !important;
}

/* Timeline container smooth scrolling */
.relative.flex.flex-col.items-start {
  transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* Đảm bảo timeline container luôn visible */
.timeline-scroll-container {
  opacity: 1;
  visibility: visible;
}

/* Detail Box smooth transitions */
.bg-\[\#214159\] {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.bg-\[\#214159\]:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

/* Content fade animation */
.text-\[\#dffbff\] {
  animation: contentFadeIn 0.3s ease-out;
}

.text-white {
  animation: contentSlideIn 0.35s ease-out;
}

@keyframes contentFadeIn {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes contentSlideIn {
  0% {
    opacity: 0;
    transform: translateX(20px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

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

/* Desktop only styles - Mobile uses separate component */
</style>
