<script setup>
import { getBannerApi } from '@/api/home'
import { onMounted, ref } from 'vue'

const bannerList = ref(['https://z1.muscache.cn/im/pictures/cdb9be9e-0d63-487b-a35d-04f0690439dc.jpg?im_w=720' ,
'https://z1.muscache.cn/im/pictures/06ee427f-51e5-4ba2-8d1e-e47c50329fb9.jpg?im_w=720','https://z1.muscache.cn/im/pictures/e95abf4c-6463-41fd-a06e-08c449473d5c.jpg?im_w=720'])

// const getBanner = async () => {
//   const res = await getBannerApi()
//   console.log(res)
//   bannerList.value = res.data
// }
// onMounted(() => getBanner())
</script>

<template>
  <div class="home-banner">
    <!--使用 ElementPlus 的轮播图组件-->
    <el-carousel height="500px">
      <el-carousel-item v-for="item in bannerList" :key="item">
        <img :src="item" alt="">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>



<style scoped lang='scss'>
.home-banner {
  width: 700px;
  height: 100px;
  position: relative;
  left:20%;
  right:0;

  img {
    width: 92%;
    height: 250px;
  }
}
</style>
