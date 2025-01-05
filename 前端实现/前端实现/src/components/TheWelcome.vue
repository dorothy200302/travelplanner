<script setup>

import {onMounted, onUnmounted, reactive, ref} from "vue";
import {Snackbar} from "@varlet/ui";import { useRouter } from 'vue-router';
import Heading from "@/views/layout/layoutHeader.vue";
import axios from "axios";

const date = ref(['2021-04-08', '2021-04-20'])
let isPickDate=ref(false)
let isPickDestination=ref(false)
let isNumberPick=ref(false)
let destination=ref('北京')
let infant=ref()
let cards=ref([])
let types=ref([])
let current=ref(1)
let isReachBottom=ref(false)
onMounted(() => {
  queryTypes();
});
function queryTypes() {
  types.value=axios.get("/").data
}
function queryHotCardScroll(){
 let da= axios.get(""+current.value).data
     .forEach(b => b.img = b.images.split(",")[0]);
 cards.value.concat(da)
}
const router=useRouter()
function addLike(b) {
  axios.put("/card/like/" +b.value.id)

}
function login(){
  router.push('/login');
}
function  onScroll(e) {
  let scrollTop = e.target.scrollTop;
  let offsetHeight = e.target.offsetHeight;
  let scrollHeight = e.target.scrollHeight;
  if (scrollTop + offsetHeight > scrollHeight && !this.isReachBottom) {
    this.isReachBottom = true
    // 再次查询下一页数据
    this.current++;
    queryHotCardScroll();
  } else {
    this.isReachBottom = false
  }
}
function searchFilter(){}
const formData = reactive({
  username: '',
  password: '',
  department: '',
  gender: undefined,
  license: false,
  range: 10,
  count: 0,
  group: [],
  score: 0,
  like: [],
  files: []
})
function toCardDetail(c){

}
function filterType(id, name){

}
</script>

<template>
<heading/>

    <var-space :size="[10, 10]">
    <var-button-group size="large" type="primary" color="linear-gradient(to bottom right, #6750A4, #D0BCFF)">
      <var-button @click="isPickDate=true">时间段</var-button>
      <var-button @click="isNumberPick=true,isPickDate=false,isPickDestination=false">同行人</var-button>
      <var-button @touchstart="isPickDestination=true">目的地</var-button>

    </var-button-group>
  </var-space>


    <var-date-picker v-show="isPickDate" type="date" v-model="date" range/>

  <teleport to="body" v-show="isNumberPick">
      <var-radio :checked-value="1">成人</var-radio><var-counter
    :rules="[v => v > 10 || '必须大于1']"
    v-model="formData.count"
    /><br>
      <var-radio :checked-value="2">儿童</var-radio><var-counter
    :rules="[v => v > 10 || '必须大于1']"
    v-model="child"
    /><br>
      <var-radio :checked-value="3">婴儿</var-radio><var-counter
    :rules="[infant => infant > 10 || '必须大于1']"
    v-model="infant"
    />
    <var-checkbox-group @click=""></var-checkbox-group>
  </teleport>

  <teleport v-show="isPickDestination">
    <var-space direction="column" size="small">
    <var-input placeholder="小尺寸" size="small" v-model="destination" />
    </var-space>
  </teleport>

  <div class="type-list">
    <div class="type-box" v-for="t in types" :key="t.id" @click="filterType(t.id, t.name)">
      <div class="type-view"><img :src="'/imgs/' + t.icon" alt=""></div>
      <div class="type-text">{{t.name}}</div>
    </div>
  </div>
  <div class="card-list"  @scroll="onScroll">

      <div class="card-box" v-for="b in cards" :key="b.id">
        <div class="card-img" @click="toCardDetail(b)"><img :src="b.img" alt=""></div>
        <div class="card-title">{{b.title}}</div>
        <div class="card-foot">
          <div class="card-price">{{b.price}}</div>
          <div class="card-liked" @click="addLike(b)">
            <svg t="1646634642977" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2187" width="14" height="14">
              <path d="M160 944c0 8.8-7.2 16-16 16h-32c-26.5 0-48-21.5-48-48V528c0-26.5 21.5-48 48-48h32c8.8 0 16 7.2 16 16v448zM96 416c-53 0-96 43-96 96v416c0 53 43 96 96 96h96c17.7 0 32-14.3 32-32V448c0-17.7-14.3-32-32-32H96zM505.6 64c16.2 0 26.4 8.7 31 13.9 4.6 5.2 12.1 16.3 10.3 32.4l-23.5 203.4c-4.9 42.2 8.6 84.6 36.8 116.4 28.3 31.7 68.9 49.9 111.4 49.9h271.2c6.6 0 10.8 3.3 13.2 6.1s5 7.5 4 14l-48 303.4c-6.9 43.6-29.1 83.4-62.7 112C815.8 944.2 773 960 728.9 960h-317c-33.1 0-59.9-26.8-59.9-59.9v-455c0-6.1 1.7-12 5-17.1 69.5-109 106.4-234.2 107-364h41.6z m0-64h-44.9C427.2 0 400 27.2 400 60.7c0 127.1-39.1 251.2-112 355.3v484.1c0 68.4 55.5 123.9 123.9 123.9h317c122.7 0 227.2-89.3 246.3-210.5l47.9-303.4c7.8-49.4-30.4-94.1-80.4-94.1H671.6c-50.9 0-90.5-44.4-84.6-95l23.5-203.4C617.7 55 568.7 0 505.6 0z" p-id="2188" :fill="b.isLike ? '#ff6633' : '#82848a'"></path>
            </svg>
            <var-icon name="heart-outline"  @click="() =>{ Snackbar.success('点击成功');addLike(b)}"/>
          </div>
        </div>
      </div>
...<veiw-card/><veiw-card/>
  </div>
</template>
<style scoped>

.card-list {
  background-color: #eee;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  height: 60%;
  overflow-y: auto;
}
.card-box{
  width: 48%;
  background-color: #fff;
  margin: 5px 0;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 3px;
}
.icon-container {
  display: flex;
  justify-content: space-between; /* 在元素之间分配空间，使它们分别靠向容器的两边 */
  align-items: center; /* 垂直居中图标 */
  /* 根据需要设置宽度、高度、边距等样式 */
  width: 100%; /* 确保容器填满其父元素的宽度 */
}

/* 如果你想要让中间的图标更小或者样式有所不同，你可以给它一个特定的类 */
.icon-container .center-icon {
  /* 设置中间图标的样式，比如更小的尺寸 */
  float: right; /* 假设你的 var-icon 组件使用 CSS 变量来控制尺寸 */
}
.type-list {
  height: 25%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}
.type-box{
  width: 17%;
  text-align: center;
}
.type-box img {
  width: 100%;
}
.type-text{
  color: #111;
  font-size: 10px;
  margin-top: -8px;
  margin-bottom: 10px;
}
.card-price{
  padding: 2px 10px;
  height: 36px;
  width: 92%;
  overflow: hidden;
}
.card-img{
  width: 100%;
  border-radius: 3px;
}
.card-title {
  padding: 2px 10px;
  height: 36px;
  width: 92%;
  overflow: hidden;
}
.card-foot {
  display: flex;
  justify-content: space-between;
  margin: 10px 0 5px 0;
  padding: 0 10px;
}



.card-liked {
  width: 25%;
  display: flex;
  justify-content: flex-end;
}
.card-liked img{
  width: 30%;
  height: 75%;
  margin-right: 2px;
}
</style>
