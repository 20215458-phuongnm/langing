<template>
  <div
    class="relative flex justify-between items-center h-screen bg-cover bg-center bg-no-repeat overflow-hidden px-20"
    :style="{ backgroundImage: `url(${backgroundImage})` }"
  >
    <!-- Phần bên trái - Timeline -->
    <div class="flex-1 flex justify-center items-center">
      <!-- Ô hình chữ nhật border trắng cố định -->
      <!-- <div
        class="absolute border-4 border-white w-[220px] h-[100px] z-20 -translate-x-32"
      ></div> -->

      <!-- Timeline container wrapper -->
      <div class="mt-[470px]">
        <!-- Timeline container -->
        <div
          ref="timeline"
          class="relative flex flex-col items-start transition-transform duration-700 ml-19"
          :style="{ transform: `translateY(${translateY}px)` }"
        >
          <!-- Đường line dọc kéo dài toàn background -->
          <div
            class="absolute right-0 w-[5px] bg-white"
            style="top: -200vh; bottom: -200vh"
          ></div>

          <!-- Các vòng -->
          <div
            v-for="(round, index) in rounds"
            :key="index"
            class="relative flex items-center cursor-pointer mb-24"
            @click="selectRound(index)"
          >
            <!-- Text tên vòng (bên trái) -->
            <div
              class="transition-all duration-500 relative"
              :class="
                index === selectedRound ? 'mr-16 -translate-x-32' : 'mr-16'
              "
            >
              <!-- Container với kích thước cố định -->
              <div
                class="w-[220px] h-[100px] flex flex-col justify-center transition-all duration-500"
                :class="[
                  index === selectedRound
                    ? 'px-3 py-2 text-center'
                    : 'items-start justify-center text-left',
                ]"
              >
                <div
                  class="transition-all duration-500"
                  :class="
                    index === selectedRound
                      ? 'text-[#dffbff] text-2xl font-bold leading-tight mb-1'
                      : 'text-[#dffbff] font-bold text-2xl'
                  "
                  :style="
                    index === selectedRound
                      ? 'text-shadow: 0 0 10px #dffbff, 0 0 20px #dffbff, 0 0 30px #dffbff;'
                      : ''
                  "
                >
                  {{ round.title }}
                </div>

                <!-- <div
                  v-if="index === selectedRound"
                  class="text-white text-base font-medium leading-tight transition-all duration-500 delay-1000"
                >
                  {{ round.description }}
                </div> -->
              </div>
            </div>

            <!-- Icon viên đá nằm chồng lên line -->
            <div
              class="absolute right-0 flex justify-center items-center translate-x-1/2 z-10"
            >
              <img
                src="@/assets/rock.png"
                class="w-12 h-12 transition-all duration-500"
                :class="
                  index === selectedRound
                    ? 'brightness-125 drop-shadow-[0_0_15px_gold]'
                    : 'brightness-50'
                "
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Phần bên phải - Detail Box -->
    <div class="flex-1 flex justify-center items-center">
      <div
        class="bg-[#214159] bg-opacity-90 w-[600px] h-[400px] p-6 rounded-lg"
      >
        <h2 class="text-[#dffbff] text-2xl font-bold mb-2 text-left">
          {{ rounds[selectedRound].timeframe.toUpperCase() }}
        </h2>
        <div
          class="text-white text-sm leading-relaxed text-left overflow-y-auto max-h-[300px]"
        >
          <pre class="whitespace-pre-wrap font-sans">{{
            rounds[selectedRound].detail
          }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
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
    description: "THUYẾT TRÌNH PHÂN TÍCH CƠ HỘI ĐẦU TƯ",
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

const selectedRound = ref(2); // mặc định Vòng 3
const timeline = ref(null);
const translateY = ref(0);

const selectRound = async (index) => {
  selectedRound.value = index;

  await nextTick();
  // Di chuyển timeline để round được chọn nằm trong ô border cố định
  const timelineEl = timeline.value.children[index + 1]; // +1 vì có line element đầu tiên

  if (timelineEl) {
    // Vị trí của ô border cố định (theo thiết kế hiện tại)
    const borderBoxCenterY = window.innerHeight / 2;

    // Vị trí hiện tại của round
    const timelineRect = timelineEl.getBoundingClientRect();
    const roundCenterY = timelineRect.top + timelineRect.height / 2;

    // Tính khoảng cách cần di chuyển
    const diff = borderBoxCenterY - roundCenterY;
    translateY.value += diff;
  }
};

onMounted(() => {
  selectRound(selectedRound.value);
});
</script>

<style scoped></style>
