<script setup>
import {useRouter} from "vue-router";
import {GenerallySearchAPI} from "@/api/layout.js";
import http from "@/utils/http.js";

let r=useRouter();

let id=sessionStorage.getItem("id");
let  resorts=ref([]);
let hotels=ref([]);
let shops=ref([])

const   params=ref( {
  key: "", // 搜索关键字
  page: 1, // 当前页码
  size: 10, // 每页大小
  sortBy: "default",// 排序字段
  filters: {}, // 过滤字段
})
 params.value.key=r.currentRoute.value.params.keyWords;

  //sear  const s=async() => {
 function search(){
   if(params.value.key=="" || params.value.key==null){
     alert("请输入搜索关键字");
   }
   http.post('search/AnyItem',params.value).then(res => {
    console.log(res);
    res.data.viewList.forEach(b => {
      b.picture = b.picture.split(",")[0];
    });
     resorts.value=res.data.viewList;//

     res.data.hotels.forEach(b => {
       const startIndex = b.pic.indexOf('.jpg') + 4; // 获取.jpg在字符串中的位置并加上后缀长度
       b.pic = b.pic.substring(0, startIndex);
     });
     hotels.value=res.data.hotels;
     console.log(res.data.hotels);
     // 获得所有的<name></name>标签
     let nameElements = document.getElementsByTagName('name');

// 为每个标签设置样式
     for (let i = 0; i < nameElements.length; i++) {
       nameElements[i].style.backgroundColor = 'yellow';
       nameElements[i].style.fontWeight = 'bold';
     }


     res.data.shopList.forEach(b => {
  b.images = b.images.split(",")[0];
});
     shops.value=res.data.shopList;

   }).catch(err => {
      console.log(err);
    });
 }

  search();

</script>

<template>
<h1>nice!we've got this relevant  choices!</h1>
<div class="search-result">
  <div class="search-result-item" v-for="item in resorts" :key="item.id">
    <router-link :to="{name:'resort_detail',params:{id:item.id}}">
      <img :src="item.picture" alt="">
    <div>
      <h2 v-html="item.name"></h2>
    </div>      <p>{{item.title}}</p>
      <p>{{item.location}}</p>
      <p>{{item.commentRank}}</p>

    </router-link>
  </div>
  <div class="search-result-item" v-for="item in hotels" :key="item.id">
    <router-link :to="{name:'hotelDetail',params:{id:item.id}}">
      <img :src="item.pic" alt="">
    <div>
        <h2  v-html="item.name"></h2>
      </div>
    <p>{{item.description}}</p>
      <p>{{item.brand}}</p>
    <p>{{item.city}}</p>
      <p>{{item.business}}</p>
    </router-link>

  </div>
  <div class="search-result-item" v-for="item in shops" :key="item.id">
    <router-link :to="{name:'shopDetail',params:{id:item.id}}">
      <img :src="item.images" alt="">
      <h2 v-html="item.name"></h2>
      <p>{{item.description}}</p>
      <p>{{item.title}}</p>
      <p>{{item.address}}</p>

    </router-link>
  </div>
</div>

</template>

<style scoped>
.search-result {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}



.search-result-item {
  width: 30%;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
  box-shadow: 0 0 10px #ccc;
}

.search-result-item img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  margin-bottom: 10px;
}


.search-result-item h2 {
  font-size: 20px;
  margin-bottom: 10px;
}

.search-result-item p {
  font-size: 16px;
  margin-bottom: 10px;

  color: #666;
}

.search-result-item a {
  display: block;
  text-decoration: none;
  color: #333;
}
name{
  background-color: yellow;
}

</style>