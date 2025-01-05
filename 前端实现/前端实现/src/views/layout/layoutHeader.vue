<script setup>
//导入方法
import { getCategoryAPI } from '@/api/layout'
import { onMounted, ref } from 'vue'
import { useScroll } from '@vueuse/core'
//导入方法
import { useCategoryStore } from '@/stores/category'
const categoryStore = useCategoryStore()

const { y } = useScroll(window)
//获取分类信息，将返回的数据存储到 categoryList 数组
const categoryList = ref([])
const getCategory = async() => {
  console.log('getCategory');
  const res = await getCategoryAPI();
  console.log(res);
  categoryList.value = res.data;
}

onMounted(() => {
  getCategory()
})
</script>


<template>
  <div class="app-header-sticky" :class="{show:y>80}">
    <div class="container">
      <RouterLink class="logo" to="/" />
  <ul class="app-header-nav">
    <li  v-for="item in categoryList" :key="item.id">
      <RouterLink to="/" >{{item.title}}</RouterLink>
    </li>
  </ul></div></div>

</template>

<style scoped lang='scss'>

a, .green {
  text-decoration: none;
  color: #111111;
  transition: 0.4s;
  padding: 3px;
}
.app-header-sticky {
  width: 100%;
  height: 80px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background-color:#CD8C95;
  border-bottom: 1px solid #CD8C95;
  // 此处为关键样式!!!
  // 状态一：往上平移自身高度 + 完全透明
  transform: translateY(-100%);
  opacity: 0;

  // 状态二：移除平移 + 完全不透明
  &.show {
    transition: all 0.3s linear;
    transform: none;
    opacity: 1;
  }

  .container {
    display: flex;
    align-items: center;
justify-content: space-between;
  }

  .logo {
    width: 200px;
    height: 80px;
    background: url("https://t7.baidu.com/it/u=989974334,1285571713&fm=74&app=80&size=f256,256&n=0&f=JPEG&fmt=auto?sec=1714150800&t=06398e641754ab3c05d7aef8c5d0ee26") no-repeat right 2px;
    background-size: 160px auto;
  }

  .right {
    width: 420px;
    display: flex;
    text-align: center;
    padding-left: 40px;
    border-left: 2px solid #222222;

    a {
      width: 58px;
      margin-right: 40px;
      font-size: 16px;

      line-height: 1;
      writing-mode: horizontal-tb;
      white-space: nowrap;
      &:hover {
        color: #222222;
      }
    }
  }
}

.app-header-nav {
  width: 100%;
  display: flex;
  padding-left: 40px;
  position: relative;
  z-index: 998;

  li {
    margin-right: 100px;
    width: 38px;
    text-align: center;
    display: inline;
   white-space: nowrap;
    a {
      font-size: 16px;
      display: inline;

      &:hover {
        color: #222222;
        border-bottom: 1px solid #222222;
      }
    }

    .active {
      color: #222222;
      border-bottom: 1px solid #222222;
    }
  }
}
</style>