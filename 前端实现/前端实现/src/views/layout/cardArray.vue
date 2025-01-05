<script setup>
//定义 Props，主标题和副标题
defineProps({
  title: {
    type: String
  },
  subTitle: {
    type: String
  }
})
</script>


<template>
  <div class="container">
    <div class="head">
      <!-- 主标题和副标题 -->
      <h2>
        {{title}}&nbsp;&nbsp;&nbsp;<small>{{ subTitle }}</small>
      </h2>
    </div>
    <hr/><hr/>
    <!-- 主体内容区域 插槽-->
    <slot/>
  </div>

</template>

<style scoped>
.container{
  flex-direction: column;
  margin-top: 20px; /* 设置容器与上一个容器的距离为 20px */
  flex-wrap: wrap; /* 允许项目换行 */
  position: relative;
  display: flex;
}
/* 设置主轴方向为垂直方向 */
hr {
  border: 0; /* 移除默认边框 */
  height: 1px; /* 设置分割线高度 */
  background-color: #CD8C95; /* 设置分割线颜色 */
  margin: 10px 0; /* 设置分割线的间距 */
}
h2{
  padding-left: 20px;
  font-family: 'Raleway', sans-serif;  font-size: 24px;
  font-weight: bold;
}

  .home-panel {
    background-color: #fff;

    .head {
      padding: 40px 0;
      display: flex;
      align-items: flex-end;

      h3 {
        flex: 1;
        font-size: 32px;
        font-weight: normal;
        margin-left: 6px;
        height: 35px;
        line-height: 35px;

        small {
          font-size: 16px;
          color: #999;
          margin-left: 20px;
        }
      }
    }
  }

</style>