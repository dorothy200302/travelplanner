<template>
  <el-carousel class="img-right" >
    <el-carousel-item  v-for="item in dates.picture" :key="item">
      <img class="carousel-img" :src="item" alt="" > <!-- 设置图片样式 -->
    </el-carousel-item>
  </el-carousel>
</template>

<script setup>
import { useRoute } from "vue-router";
let ro=useRoute()
let dates=ro.params.dates


import {Pagination} from "@varlet/ui";

</script>

<style scoped>
/* 这里可以添加一些针对该组件的样式 */
.img-right {
  position: relative;
  width: 250px;
  height: 180px;
  margin-bottom: 8%;
  margin-left: 40px;
}.carousel-img {
   width: 100%; /* 设置图片宽度为视图宽度 */
   height: 100%;
   object-fit: cover;
 }
</style>