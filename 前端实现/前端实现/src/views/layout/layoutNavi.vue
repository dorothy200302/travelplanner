<script setup xmlns="http://www.w3.org/1999/html">
import { ref } from 'vue'
//导入方法
import { useCategoryStore } from '@/stores/category'
const categoryStore = useCategoryStore()

const active = ref(0)
</script>

<template>
  <ul class="app-header-nav">
    <RouterLink to="/"><i class="iconfont icon-icon_xinyong_xianxing_jijin-140"></i></RouterLink>
    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <i class="iconfont icon-lvyou1" ></i>

    <RouterLink to="/"><i class="iconfont icon-a-011_daohang"></i>
  </RouterLink>
  </ul>

</template>
<style scoped lang="css">
.icon {
  width: 1em; height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
 :deep .var-icon::before {
margin-right: 10px;
   display: inline-block;
   font-size: inherit;
   text-rendering: auto;
   -webkit-font-smoothing: antialiased;
   font-weight: normal;
   font-style: normal;
   line-height: 1;
 }
var-icon{
  font-size: medium;
 }
.icon-wode{
  font-size: 40px;
  display: flex;
  margin-right:10px;
}
.icon-jiudian1{
  font-size: 40px;
  display: flex;
}
li{
  height: 77px;
}.app-header-nav {
   width: 100%;
  top: 10px;
   display: flex;
  height: 99px;
   z-index: 998;
  font-size: large;
position: absolute;
  li{
    height: 77px;
  }
  li:nth-child(2){
    margin: 0 auto;
  }
  li :nth-child(3){
    margin-right: 10px;
  }

 }
.icon {
  width: 3em; height: 3em;
  vertical-align: -0.3em;
  fill: currentColor;
  overflow: hidden;
}.iconfont {
   font-size: 24px; /* 设置图标大小 */
   color: red; /* 设置图标颜色 */
 }

body {
  transition: background-color .25s, color .25s;
  color: var(--color-text);
  background-color: var(--color-body);
}
.app-topnav {
  background: var(--color-body);;
display: flex;

  ul {
    display: flex;
    list-style: none;
    padding: 0;
  }

  .right-icons {
    margin-left: auto; /* 将容器推到右侧 */
    display: flex; /* 使用 Flexbox 布局 */
    margin-right:10px;

  }

  ul li {
    margin-right: 10px;
  }

      ~li {
        a {
          border-left: 2px solid #666;
        }
      }
}

</style>