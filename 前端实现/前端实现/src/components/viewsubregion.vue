<script setup>
import {useRouter} from "vue-router";
import {queryHotBlogsAPI, queryResortByRegionAPI} from "@/api/layout.js";
import GoodCard from "@/components/goodCard.vue";

let r=useRouter();
let regionId=r.currentRoute.value.params.regionId;
let id=sessionStorage.getItem("id");
console.log(regionId);
let Resorts=ref([]);
let current=ref(1);
let isReachBottom=ref(false);
const queryR = async(id,b,c) => {
  const res = await queryResortByRegionAPI(regionId,current.value,c);
  console.log(res);
  res.forEach(b => {
    if(b.picture) {
      b.picture = b.picture.split(",")[0]}
  });
  Resorts.value = Resorts.value.concat(res)
  ;}
queryR(regionId, current.value, 10);
function onScroll(e) {
  let scrollTop = e.target.scrollTop;
  let offsetHeight = e.target.offsetHeight;
  let scrollHeight = e.target.scrollHeight;
  if (scrollTop + offsetHeight > scrollHeight && !isReachBottom) {
    isReachBottom.value = true

    // 再次查询下一页数据
    current.value++;
    queryR(regionId, current.value, 10);
  } else {
    isReachBottom.value = false
  }
}
</script>

<template>
  <ul class="goods-list">
    <li v-for="(item, index) in Resorts" :key="index">
      <RouterLink :to="{name: 'resort_detail', params: {id: item.id}}">
        <good-card :good="item" />
      </RouterLink>
    </li>
  </ul></template>

<style scoped>

</style>