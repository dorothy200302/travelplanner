<script setup>

 import {ref} from "vue";
 import goodCard from '@/components/goodCard.vue'
 import cardArray from '@/views/layout/cardArray.vue'
 import {
   GenerallySearchAPI,
   getCategoryAPI,
   queryHotBlogsAPI,
   queryHotelTypeAPI,
   queryHotHotelAPI,
   queryHotResortAPI, queryQualityShop,
   queryShopTypeAPI, queryTravelTypeAPI
 } from "@/api/layout.js";
 import {useRouter} from "vue-router";
 import http from "@/utils/http.js";
 import searchResult from "@/components/searchResult.vue";
 import LayoutHeader from "@/views/layout/layoutHeader.vue";
 import Banner from "@/components/banner.vue";
 import CategoryCard from "@/components/categoryCard.vue";
 let hotResortList = ref([

 ]);

     let hotBlogs = ref([])
 let hotShopList = ref([])
 let hotList = ref([
   { id: 11, picture: 'https://ac-a.static.booking.cn/xdata/images/city/600x600/977242.jpg?k=72bfe23a6d7a496e0305b94bbb28ce197f3df2d6dd28986c3760a5f1c931664c&o=', name: '巴黎' },
   { id: 12, picture: 'https://ac-a.static.booking.cn/xdata/images/city/600x600/619763.jpg?k=3bfc62a779df5b92694287e9fc0b82d795f93700ddf8887d66f3191ee745dcc5&o=', name: '东京' },
   { id: 13, picture: 'https://ac-a.static.booking.cn/xdata/images/city/600x600/977255.jpg?k=701d538f315c17d17ca4eb5ff1a7bd0f8ed9222acebdaa6a212b638d04bef1c1&o=', name: '曼谷' },
   { id: 14, picture: 'https://ac-a.static.booking.cn/xdata/images/city/600x600/971353.jpg?k=a5b47d2c38469086427837dfe64ab2e6f57ba52f0504359ef4cc02dc4b9b0737&o=', name: '马德里' },
   { id: 15, picture: 'https://ac-a.static.booking.cn/xdata/images/city/600x600/977185.jpg?k=36b2aeec77f9df95f928540b3d0cafc0ce91b958cb3652e653b0be29d65867be&o=', name: '巴塞罗那' },
   { id: 16, picture: 'https://ac-a.static.booking.cn/xdata/images/xphoto/300x240/140046086.jpg?k=98dc81a68eb4c5dfbe786b9e59f4ef1718e6c93a41759820e10621def8d15361&o=', name: '舟山' }
 ])
 let isReachBottom = ref(false)
let shopList = ref([])
 let blogs = ref([])
 let page = ref(1)
 let pageSize = ref(10)
 let current = ref(1)
 let terms = ref(['酒店', '景点', '购物', '旅行','交通','美食'])

 function queryHotBlogsScroll() {
   queryHotBlogs();

 }

 function   addLike(b) {
   http.put("blog/like/" +b.id)
       .then(({data}) => {
         queryBlogById(b)
       })
       .catch(err => {
         console.log(err)
       })
 }
 let hpage = ref(1);
 let hpageSize = ref(10);

 // 更新 queryHotHotel 函数以接受 ref 参数
 const queryHotHotel = async (hpage, hpageSize) => {
   const res = await queryHotHotelAPI(hpage.value, hpageSize.value);
   hotHotelList.value = res;
   console.log(res);
   console.log(res);
 }
 queryHotHotel(hpage, hpageSize);
 const queryHotResort = async() => {
   const res = await queryHotResortAPI();
   console.log(res);
   res.forEach(b => {
     if (b.picture) {
       const startIndex = b.picture.indexOf('.jpg') + 4; // 获取.jpg在字符串中的位置并加上后缀长度
       b.picture = b.picture.substring(0, startIndex); // 使用substring函数截取从开始到.jpg后缀的子字符串
     }
   });
   hotResortList.value = res;
 }
 queryHotResort();
 const queryHotBlogs = async(value) => {
   const res = await queryHotBlogsAPI(value);
   console.log(res);
   res.data.forEach(b => {
     console.log(b);
     b.images = b.images.split(",")[0];
   });
   hotBlogs.value = hotBlogs.value.concat(res.data);;}
 queryHotBlogs(current.value);
 // let hotHotelList=ref([])
 let hotHotelList = ref([])
 let types=ref([])

 function   queryBlogById(b) {
   http.get("blog/" , {params: {id: b.id}})
       .then(({data}) => {
         b.liked = data.liked;
         b.isLike = data.isLike;
       })
       .catch((err) => {
         console.log(err)
         b.liked ++;
       })
 }
 queryHotBlogsScroll();
 queryHotBlogs();

 let hotelType=ref([])
 let ResortType=ref([])
 const queryResortType = async () => {
   try {
     const res = await queryHotResortAPI();
     ResortType.value = res;
   } catch (err) {
     console.log(err);
   }

 }

 queryResortType();
 let shopType=ref([])


 let transportType=ref([{id:1, name: '火车', icon: 'train.png'},
   {id:2, name: '租车', icon: 'train.png'},{id:3, name: '飞机', icon: 'train.png'},
   {id:4, name: '轮船', icon: 'train.png'},
   {id:5, name: '打车', icon: 'train.png'},
   {id:6, name: '自驾', icon: 'train.png'}])
 let travelType=ref([])
 const queryTravelType=async() => {
   const res = await queryTravelTypeAPI();
   travelType.value = res;}
 queryTravelType();
 let qualityShop=ref([])
const queryQualShop = async () => {
  try {
    const res = await queryQualityShop(current.value,pageSize.value);
    res.forEach(b => {
      console.log(b);
      b.picture = b.images.split(",")[0];
    });
    shopList.value = shopList.value.concat(res);

    console.log(res);
  } catch (err) {
    console.log(err);
  }}
queryQualShop();
 function onScroll(e) {
   let scrollTop = e.target.scrollTop;
   let offsetHeight = e.target.offsetHeight;
   let scrollHeight = e.target.scrollHeight;
   if (scrollTop + offsetHeight > scrollHeight && !isReachBottom) {
     isReachBottom.value = true
     hpage.value++;

     // 再次查询下一页数据
     current.value++;
     queryHotBlogsScroll();
   } else {
     isReachBottom.value = false
   }
 }
 let r=useRouter()
 function  toShopList(id, name) {
   r.push({path: '/shop-list', query: {type: id, name: name}})
 }
 function toBlogDetail(b) {
 r.push({name: 'blog_Detail', params: {id: b.id}})
 }
 function  toPage(i) {
   if (i === 0) {
     r.push({path: '/map', query: {id: b.id}})
   } else if (i === 4) {
     if(sessionStorage.getItem('userId')) {
       r.push({name: 'myPage', params:
             {userId: sessionStorage.getItem('userId')}})
     } else {
     r.push({path: '/login'})}
   } else if (i === 1){
     r.push({path: '/blog-detail', query: {id: b.id}})
   }
 }
 let cateItems=ref([{id:1,lable:'work hard and play harder',picture:'https://dimg04.c-ctrip.com/images/0102c120008gmz1epE5D9_C_286_190.jpg',title:'景点/目的地'},
   {id:2,lable:'night~night~',picture:'https://dimg04.c-ctrip.com/images/0205h1200099zcpap3876_W_1080_808_R5_D.jpg',title:'住宿'},
   {id:3,lable:'谁说途中不是风景？',picture:'https://dimg04.c-ctrip.com/images/0zg4u12000cuu4av9458D.png',title:'交通'},
   {id:4,lable:'全球时尚名店',picture:'https://dimg04.c-ctrip.com/images/0zd5f1200097sh2j549EE.jpg',title:'购物'},
   {id:5,lable:'优质游记个性推荐',picture:'https://dimg04.c-ctrip.com/images/0101x1200041v04n45526_C_286_190.jpg',title:'别人怎么玩？'}])
 let  id=sessionStorage.getItem('userId')
 let searchValue=ref('')
 function search() {
   console.log(searchValue.value)
   r.push({name: 'searchResult',
     params: {keyWords: searchValue.value}})}

 function scrollTo(id) {
   // 获取元素
   let element = document.getElementById(id);
   // 滚动到指定元素
    element.scrollIntoView();
 }
</script>

<template>
  <div class="search-bar">
    <var-icon name="account-circle-outline" @click="toPage(4)" />    <div class="search-input">
      <el-input size="big" placeholder="景点，酒店，旅行，美食" v-model="searchValue" >
        <i slot="prefix" class="el-input__icon el-icon-search" ></i>
        <var-icon name="checkbox-marked-circle-outline" />
      </el-input>
    </div>    <var-icon name="checkbox-marked-circle-outline"
  @click="search()"/>

  </div>
  <div class="aray1">
    <card-array title="从哪里开始看起？" sub-title="where to start?">  <ul class="goods-list">
    <div v-for="(item, index) in cateItems" :key="index">
      <div @click="scrollTo(item.id)">
        <category-card :good="item" />
      </div>
    </div>
  </ul>    </card-array></div>

  <div class="type-list">
    <div class="type-box" v-for="t in types" :key="t.id" @click="toShopList(t.id, t.name)">
      <div class="type-view"><img :src="'/imgs/' + t.icon" alt=""></div>
      <div class="type-text">{{t.name}}</div>
    </div>
  </div>
  <div class="aray1" id="1">
    <card-array title="全球胜地" sub-title="步履不停">
      <!-- 下面是插槽主体内容模版 -->
      <ul class="goods-list">
        <div v-for="(item, index) in hotList" :key="index">
          <RouterLink :to="{name: 'view-subregion', params: {regionId: item.id}}">
            <good-card :good="item" />
          </RouterLink>
        </div>
      </ul>
    </card-array></div>
  <div class="aray1">
    <card-array title="搜索中国" sub-title="这些目的地精彩纷呈">
      <!-- 下面是插槽主体内容模版 -->
      <ul class="goods-list">
        <div v-for="(item, index) in hotResortList" :key="index">
          <RouterLink :to="{name: 'resort_detail', params: {id: item.id}}">
            <good-card :good="item" />
          </RouterLink>
        </div>
      </ul>
    </card-array></div> <div class="aray1" id="2">
  <card-array title="酒店" sub-title="这些酒店精彩纷呈">
    <!-- 下面是插槽主体内容模版 -->
    <ul class="goods-list">
      <div v-for="(item, index) in hotHotelList" :key="index">
        <RouterLink :to="{name: 'hotelDetail', params: {id: item.id}}">
          <good-card :good="item" />
        </RouterLink>
      </div>
    </ul>
  </card-array></div>
  <div class="blog-list" @scroll="onScroll" id="5">
    <div class="blog-box" v-for="b in hotBlogs" :key="b.id">
      <div class="blog-img" @click="toBlogDetail(b)"><img :src="b.images" alt=""></div>
      <div class="blog-title">{{b.title}}</div>
      <div class="blog-foot">
        <div class="blog-user-icon"><img :src="b.icon || '/imgs/icons/default-icon.png'" alt=""></div>
        <div class="blog-user-name">{{b.name}}</div>
        <div class="blog-liked" @click="addLike(b)">
          <svg t="1646634642977" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2187" width="14" height="14">
            <path d="M160 944c0 8.8-7.2 16-16 16h-32c-26.5 0-48-21.5-48-48V528c0-26.5 21.5-48 48-48h32c8.8 0 16 7.2 16 16v448zM96 416c-53 0-96 43-96 96v416c0 53 43 96 96 96h96c17.7 0 32-14.3 32-32V448c0-17.7-14.3-32-32-32H96zM505.6 64c16.2 0 26.4 8.7 31 13.9 4.6 5.2 12.1 16.3 10.3 32.4l-23.5 203.4c-4.9 42.2 8.6 84.6 36.8 116.4 28.3 31.7 68.9 49.9 111.4 49.9h271.2c6.6 0 10.8 3.3 13.2 6.1s5 7.5 4 14l-48 303.4c-6.9 43.6-29.1 83.4-62.7 112C815.8 944.2 773 960 728.9 960h-317c-33.1 0-59.9-26.8-59.9-59.9v-455c0-6.1 1.7-12 5-17.1 69.5-109 106.4-234.2 107-364h41.6z m0-64h-44.9C427.2 0 400 27.2 400 60.7c0 127.1-39.1 251.2-112 355.3v484.1c0 68.4 55.5 123.9 123.9 123.9h317c122.7 0 227.2-89.3 246.3-210.5l47.9-303.4c7.8-49.4-30.4-94.1-80.4-94.1H671.6c-50.9 0-90.5-44.4-84.6-95l23.5-203.4C617.7 55 568.7 0 505.6 0z" p-id="2188" :fill="b.isLike ? '#ff6633' : '#82848a'"></path>
          </svg>
          {{b.liked}}
        </div>
      </div>
    </div>
  </div><div class="aray1" id="4">
  <card-array title="商户" sub-title="提前预览可逛商城">
    <!-- 下面是插槽主体内容模版 -->
    <ul class="goods-list">
      <div v-for="(item, index) in shopList" :key="index">
        <RouterLink :to="{name: 'shopDetail', params: {id: item.id}}">
          <good-card :good="item" />
        </RouterLink>
      </div>
    </ul>
  </card-array></div>
  <footer :active-btn="1"></footer>
<!--    <LayoutNav />-->
    <LayoutHeader />
<!--        <banner/>-->
<!--        <view-card/>-->
<!--    <LayoutFooter /><hr/>-->

</template>

<style>
.container[data-v-39eba66c] {
  flex-direction: column;
  margin-top: 20px;
  margin-right: 28px;
  flex-wrap: wrap;
  position: relative;
  display: flex;
}
.carousel {
  width: 50%;
  height: 400px;
  box-shadow: 0 3px 8px rgb(0 0 0 / 20%);

  &:hover {
    transform: translate3d(0, -3px, 0);
    box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
  }
}
div{
  overflow: visible;
}.carousel-img {
   width: 100%; /* 设置图片宽度为视图宽度 */
   height: 100%;
   border-radius: 10px; /* 设置圆角度数 */

   object-fit: cover;
 }.swipe-example {
    height: 160px;
    margin-top: 14px;
     box-shadow: 0 3px 8px rgb(0 0 0 / 20%);

     &:hover {
       transform: translate3d(0, -3px, 0);
       box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
     }
  }

.swipe-example-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;  box-shadow: 0 3px 8px rgb(0 0 0 / 20%);

  &:hover {
    transform: translate3d(0, -3px, 0);
    box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
  }
}
.search-bar{
  background-color: #CD8C95;

  color: white;
  display: flex;
  justify-content: space-around;
  height: 42px;
  align-items: center;
  padding: 0 8px;
}
.header-icon{
  /*width: 2%;*/
  font-size: 14px;
}
.search-input{
  width: 70%;
}.title {
   font-family: Arial, sans-serif;
   font-size: 30px;
   font-weight: bold;
  margin-left: 30px;
  padding: 10px 0;
   /* 其他字体样式属性 */
 }
.title1 {
  font-family: Arial, sans-serif;
  font-size: 30px;
  font-weight: bold;
  margin-left: 30px;
  /* 其他字体样式属性 */
}
.type-list {
  height: 25%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}
.search-bar var-icon{}
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

.blog-list {
  background-color: #eee;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin: 10px 0;
  justify-content: space-around;
}
.blog-box{
  width: 50%;
  background-color: #fff;
  margin: 11px 0;
  padding: 10px;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 3px;
}
.blog-img img{
  width: 100%;
  height:50%;
  border-radius: 3px;
}
.blog-title {
  padding: 2px 10px;
  height: 36px;
  width: 92%;
  overflow: hidden;
}
.blog-foot {
  display: flex;
  justify-content: space-between;
  margin: 10px 0 5px 0;
  padding: 0 10px;
}
.blog-user-icon {
  width: 10%;
  margin-right: 3px;
}
.blog-user-name {
  width: 65%;
  overflow: hidden;
}
.blog-user-icon img{
  width: 100%;
}
.blog-liked {
  width: 25%;
  display: flex;
  justify-content: flex-end;
}
.blog-liked img{
  width: 30%;
  height: 75%;
  margin-right: 2px;
}

.aray1{
  margin-top: 20px; /* 设置容器与上一个容器的距离为 20px */
  flex-direction: column; /* 设置主轴方向为垂直方向 */
  flex-wrap: wrap; /* 允许项目换行 */

  width: 100%;
  position: relative;
  display: flex;

  .goods-list{
    justify-content: space-between;
    align-items: center; /* 垂直居中 */
    flex-wrap: wrap; /* 换行 */
    p.name{
      color: #111111;
    }
  }
}
.goods-list {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center; /* 垂直居中 */
  flex-wrap: wrap; /* 换行 */
}
p.name{
  color: #111111;
}

</style>