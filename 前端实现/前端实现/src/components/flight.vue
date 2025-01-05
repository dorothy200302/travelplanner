<template>
  <div class="question-bubble">
    <transition name="fade">
      <div v-if="showQuestion" class="semi-transparent-bubble">
        <div class="question-mark">
          <div class="circle"></div>
          <div class="dot"></div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showQuestion: false
    };
  },
  mounted() {
    // 在组件加载后启动动画效果
    setTimeout(() => {
      this.showQuestion = true;
    }, 500); // 这里设置延迟时间，可以根据需要调整
  }
};
</script>

<style scoped>
.question-bubble {
  display: flex;
  justify-content: center;
  align-items: center;
}

.semi-transparent-bubble {
  //background-color: rgba(255, 182, 193, 0.2); /* 淡粉色的半透明背景 */
  padding: 50px;  background-color: rgba(255, 182, 255, 0.7);

  border-radius: 50%;
  transform: translateX(-50%);
}

.question-mark {
  position: relative;
  width: 400px; /* 大十倍 */
  height: 400px; /* 大十倍 */
}

.circle {
  position: absolute;
  width: 300px; /* 大十倍 */
  height: 300px; /* 大十倍 */
  border: 20px solid #000;
  border-radius: 50%;
}

.dot {
  position: absolute;
  bottom: 0;
  width: 60px; /* 大十倍 */
  height: 60px; /* 大十倍 */
  background-color: #000;
  border-radius: 50%;
  transform: translateX(-50%);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>