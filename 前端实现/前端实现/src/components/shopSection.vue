<script setup>
import {useRouter} from "vue-router";
import {ref} from "vue";
import { getShopTypes, getShopDetail} from "@/api/secondQuery.js";
import axios from "axios";
import {getPlanAPI} from "@/api/plandetail.js";
let typeId = ref(null)
let typeName = ref('')
let router=useRouter()
if (router.currentRoute.value.params.typeId) {
  typeId.value = router.currentRoute.value.params.typeId
  typeName.value = router.currentRoute.value.params.typeName
}

// 监听路由参数的变化并更新typeId的值
watch(
    () => router.currentRoute.value.params.typeId,
    (newTypeId, oldTypeId) => {
      typeId.value = newTypeId
      // 执行其他相关操作...
      router.push({
        name:'shopSection',
        params:{
          typeId: newTypeId
        }
      })    }
)
let      isReachBottom=ref(false)
function toShopDetail(id) {
  router.push({
    name:'shopDetail',
    params:{
      id:id
    }
  })
}
let types=ref([])
let shops=ref([])
let x=ref(120)
let y=ref(30)
let page=ref(1)
    function queryTypes() {
        axios.get("/TypeList")
            .then(({data}) => {
              types.value = data;
            })
    }
queryTypes()
function queryShops() {
  axios.get("/Shop/of/type",{ params: {
    typeId: typeId.value,
        current: current.value,
        sortBy: sortBy.value,
        x: x.value,
        y: y.value
  }}).then(({data}) => {
        if (!data) {
          return
        }
        data.forEach(s => s.images = s.images.split(',')[0]);
        shops.value = shops.concat(data.data);
      })
}
function handleCommand(t) {
  router.push({
    name:'shopSection',
    params:{
   typeId: t.id,
      typeName: t.name
    }
  })}
const searchText = ref('')

function sortAndQuery(sortBy) {
  sortBy.value = sortBy;
  queryShops();
}
function goBack() {
  this.$router.back();
}
const active = ref(0)

function toDetail(id) {
  this.$router.push('/shopDetail/' + id);
}
function onScroll(e) {
  let scrollTop = e.target.scrollTop;
  let offsetHeight = e.target.offsetHeight;
  let scrollHeight = e.target.scrollHeight;
  if(scrollTop + offsetHeight + 1 > scrollHeight && !this.isReachBottom){
    isReachBottom.value = true
    console.log("触底")
    current.value++
    queryShops(current, 5);
  }else{
    isReachBottom = false
  }
}
let sortBy=ref('')
let current=ref(1)
function toMap() {
  router.push({
    name: 'map',
    params: {
      typeId: typeId.value
    }
  })
}
function markAsFavorite(id) {
}
</script>

<template>
  <var-app-bar
      round
      image="https://dimg04.c-ctrip.com/images/0205j120009r00tpsA9E1_R_300_225_R5_Q70_D.jpg"
      image-linear-gradient="to right top, rgba(29, 68, 147, 0.5) 0%, rgba(74, 198, 170, 0.9) 100%"
  >
    标题
    <template #left>
      <var-button round text color="transparent" text-color="#fff">
        <var-icon name="menu" :size="24" />
      </var-button>
    </template>

    <template #right>
      <var-button @click="toMap" round text color="transparent" text-color="#fff">
        <var-icon name="map-marker-radius" :size="24" />
      </var-button>
      <var-button round text color="transparent" text-color="#fff">
        <var-icon name="star" :size="24" />
      </var-button>
      <var-button round text color="transparent" text-color="#fff">
        <var-icon name="heart" :size="24" />
      </var-button>
    </template>

    <template #content>
      <var-tabs
          style="margin-top: 100px"
          color="transparent"
          active-color="#fff"
          inactive-color="#ddd"
          v-model:active="active"
      >
        <var-tab @click="sortAndQuery('distance')">距离</var-tab>
        <var-tab @click="sortAndQuery('popularity')">人气</var-tab>
        <var-tab @click="sortAndQuery('comments')">评分</var-tab>
      </var-tabs>
    </template>
  </var-app-bar>
<!--  <div class="shop-list" @scroll="onScroll">-->
<!--    <div class="shop-box" v-for="s in shops" :key="s.id" @click="toDetail(s.id)">-->
<!--      <div class="shop-img"><img :src="s.images" alt=""></div>-->
<!--      <div class="shop-info">-->
<!--        <div class="shop-title shop-item">{{s.name}}</div>-->
<!--        <div class="shop-rate shop-item" >-->
<!--          <el-rate-->
<!--              disabled v-model="s.score"-->
<!--              text-color="#F63"-->
<!--              show-score-->
<!--          ></el-rate>-->
<!--          <span>{{s.comments}}条</span>-->
<!--        </div>-->
<!--        <div class="shop-area shop-item">-->
<!--          <span>{{s.area}}</span>-->
<!--          <span v-if="s.distance">{{s.distance < 1000 ? s.distance.toFixed(1) + 'm' : (s.distance/1000).toFixed(1) + 'km'}}</span>-->
<!--        </div>-->
<!--        <div class="shop-avg shop-item">￥{{s.avgPrice}}/人</div>-->
<!--        <div class="shop-address shop-item">-->
<!--          <i class="el-icon-map-location"></i>-->
<!--          <span>{{s.address}}</span>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
</template>

<style scoped>
.header,.sort-bar,.shop-list {
  background-color: #fff;
}

.header{
  width: 100%;
  height: 7%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid #ff6633;
}
.header-back-btn{
  width: 10%;
  color: #ff6633;
  font-size: 24px;
  font-weight: bold;
}
.header-title {
  width: 80%;
  text-align: center;
  font-size: 18px;
  font-family: Hiragino Sans GB,Arial,Helvetica,"\5B8B\4F53",sans-serif;
}
.header-search {
  width: 10%;
  text-align: center;
  font-size: 18px;
  color: #ff6633;
}
.el-dropdown,.el-dropdown-menu__item {
  font-size: 12px;
  line-height: 20px;
}
.sort-bar {
  display: flex;
  justify-content: space-around;
  height: 6%;
  align-items: center;
  margin-bottom: 5px;
}
.sort-item {
  width: 20%;
  text-align: center;
  font-size: 12px;
}
.shop-list{
  height: 87%;
  background-color: #f1f1f1;
  overflow-y: auto;
}
.shop-box {
  display: flex;
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 3px;
  background-color: #fff;
}
.shop-img {
  text-align: center;
  padding: 5px;
}
.shop-img img{
  width: 95px;
  height: 95px;
  border-radius: 5px;
}
.shop-info {
  width: 65%;
}
.shop-title {
  font-weight: bold;
  font-size: 14px;
}
.shop-rate {
  display: flex;
  justify-content: space-between;
}

.shop-area {
  color: #6f6f71;
  display: flex;
  justify-content: space-between;
}
.shop-item {
  line-height: 20px;
  align-items: center;
}
.shop-address{
  display: flex;
}
.shop-address i{
  color: #6c6767;
}
.shop-address span{
  height: 20px;
  line-height: 20px;
  overflow: hidden;
}
</style>