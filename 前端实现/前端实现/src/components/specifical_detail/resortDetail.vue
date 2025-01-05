<script setup>
import {useRouter} from "vue-router";
import {getVoucherByResortId, queryHotelByIdAPI, queryResortByIdAPI} from "@/api/layout.js";
import axios from "axios";
import http from "@/utils/http.js";
import ItemSearch from "@/components/itemSearch.vue";

let r=useRouter();
let rid=r.currentRoute.value.params.id;
let users=sessionStorage.getItem("user");
let resort=ref({});
let vouchers=ref([]);
let userId=null;
if (users) {
  const user = JSON.parse(users);
   userId = user.userId;
}
const queryR = async(id) => {
  const res = await queryResortByIdAPI(id);
  console.log(res);
  resort.value = res;
  if (res.picture) {
    resort.value.picture = resort.value.picture.split(",")
  }
}
queryR(rid);
const queryVouchers = async(id) => {
  const res = await getVoucherByResortId(id);
  console.log(res);
  vouchers.value = res;
  }
queryVouchers(rid);
function formatTime(v){
  console.log(v);
  let b = new Date(v.beginTime);
  console.log(b);
  let e = new Date(v.endTime);
  return b.getMonth() + 1 + "月" + b.getDate() + "日 "
      +  b.getHours() + ":" + formatMinutes(b.getMinutes())
      + " ~ "/*  + e.getMonth() + 1 + "月" + e.getDate() + "日 " */
      +  e.getHours() + ":" + formatMinutes(e.getMinutes());
}function formatMinutes(m){
  if(m < 10) m = "0" + m
  return m;
}function isNotBegin(v){
  console.log(v.beginTime);

  return new Date(v.beginTime).getTime() > new Date().getTime();
  // return v.beginTime> new Date().getTime();

}
function isEnd(v) {
  console.log(v);
  // 将结束时间转换为 Date 对象
  // let endTime = new Date(v.endTime);
  // // 获取当前时间
  // let currentTime = new Date();
  //
  // // 使用 Date 对象的 getTime 方法来比较时间
  // return endTime.getTime() < currentTime.getTime();
  return new Date(v.endTime).getTime() < new Date().getTime();

}

let showImageIsShow=ref(false)

function showImage(){
  showImageIsShow=true

}
function   closeImage() {
  showImageIsShow = false;
}
function seckill(v){
  if(!userId){
    window.alert("请先登录")
    // 未登录，跳转
    setTimeout(() => {
      r.push("/login");
    }, 200);
    return;
  }
  if(isNotBegin(v)){
    window.alert("优惠券抢购尚未开始！")
    return;
  }
  if(isEnd(v)){
    window.alert("优惠券抢购已经结束！")
    return;
  }
  if(v.stock < 1){
    window.alert("库存不足，请刷新再试试！")
    return;
  }
  let id = v.id;
  let cacheEntity = {
    goodsId: id,
    number: 1,
    valueNow: v.payValue,
    userId:userId
  }
  // 秒杀抢购
  http.post("viewsInfor/VoucherSecKill",cacheEntity)
      .then(({data}) => {
        console.log(data);
        if(!isNaN(data)){
          window.alert("抢购成功，订单id：" + data)
          r.push({name:"SuccessOrder",params:{orderId:data}});}
        else{
          window.alert(data)
        }
      })
      .catch(e => {
    window.alert(e)
  })
}
</script>

<template>
  <div class="background">
<!--    <div class="search-bar">-->
<!--      <var-icon name="account-circle-outline" @click="toPage(4)" />    <div class="search-input">-->
<!--      <el-input size="big" placeholder="景点，酒店，旅行，美食 "      v-model="searchValue" >-->
<!--        <i slot="prefix" class="el-input__icon el-icon-search" ></i>-->
<!--        <var-icon name="checkbox-marked-circle-outline" />-->
<!--      </el-input>-->
<!--    </div>    <var-icon name="checkbox-marked-circle-outline"-->
<!--                        @click="search()"/>-->
<!--    </div>-->
    <item-search>

    </item-search>
    <div class="container">
      <h1>{{resort.name}}</h1>
      <div class="shop-rate-info"> 交通:4.9  环境:4.8  服务:4.7 </div>
      <div class="shop-rank">
        <img src="@/assets/images/bd.png" width="64" height="40" alt="">
        <span>总评分：{{resort.commentRank}}</span>
        <div><i class="el-icon-arrow-right"></i></div>
        <span v-if="resort.contact">联系方式：{{resort.contact}}</span>
        <span v-if="resort.title">{{resort.title}}</span>

      </div>
      <div class="shop-address">
        <div><i class="el-icon-map-location"></i></div>
        <span>{{resort.location}}</span>
        <var-icon name="map-marker-radius" />
<!--        <div style="width: 10px; flex-grow: 2; text-align: center; color: #e1e2e3">|</div>-->
<!--        <div style="margin: 0 15px">-->
<!--          {{resort.description}}-->
<!--        </div>-->
      </div>
              <div style="margin: 0 15px">
                {{resort.description}}
              </div>
      <div class="shop-images">
        <div v-for="(s,$index) in resort.picture" :key="$index" >
          <img :src="s" alt="" @click="showImage($index)">
        </div>

      </div>
      <el-carousel v-show="showImageIsShow" class="img-right" >
        <span class="close" @click="closeImage">&times;</span>
        <el-carousel-item v-for="(s,i) in resort.picture" :key="i">
          <img :src="s" alt="" class="carousel-img">
        </el-carousel-item>
      </el-carousel>

      <div class="shop-detail">
        入园时间：{{resort.status}}<br>
      </div>

      <div class="shop-detail">
        基础设施：{{resort.infrastructure}}<br>
      </div>
      <div class="shop-detail">
        特殊优惠:{{resort.specialTreatment}}
      </div>
      <div class="shop-voucher">
        <div>
          <span class="voucher-icon">券</span>
          <span style="font-weight: bold;">代金券</span>
        </div>
        <div class="voucher-box" v-for="v in vouchers" :key="v.id" >
          <div class="voucher-circle">
            <div class="voucher-b"></div>
            <div class="voucher-b"></div>
            <div class="voucher-b"></div>
          </div>
          <div class="voucher-left">
            <div class="voucher-title">{{v.title}}</div>
            <div class="voucher-subtitle">{{v.subTitle}}</div>
            <div class="voucher-price"><div>￥ {{v.payValue}}</div>
              <span>{{ ((v.payValue*10)/v.actualValue).toFixed(2) }}折</span></div>
            <div class="seckill-stock">剩余 <span>{{v.stock}}</span> 张</div>

          </div>
          <div class="voucher-right">
            <div v-if="v.type" class="seckill-box">
<!--              <div class="voucher-btn" :class="{'disable-btn':-->
<!--              isNotBegin(v) || v.stock < 1}" @click="seckill(v)">限时抢购</div>-->
              <div class="seckill-stock">剩余 <span>{{v.stock}}</span> 张</div>
              <div class="seckill-time">{{formatTime(v)}}</div>
            </div>
            <div class="voucher-btn" @click="seckill(v)" v-else>抢购</div>
          </div>
        </div>
      </div>
      <div class="shop-comments">
        <div class="comments-head">
          <div>网友评价 <span>（119）</span></div>
          <div><i class="el-icon-arrow-right"></i></div>
        </div>
        <div class="comment-tags">
          <div class="tag">赞(19)</div>
          <div class="tag">回头客(4)</div>
          <div class="tag">停车方便(3)</div>
        </div>
        <div class="comment-list">
          <div class="comment-box" v-for="i in commentList" :key="i">
            <div class="comment-icon">
              <img src="https://p0.meituan.net/userheadpicbackend/57e44d6eba01aad0d8d711788f30a126549507.jpg%4048w_48h_1e_1c_1l%7Cwatermark%3D0" alt=""/>
            </div>
            <div class="comment-info">
              <div class="comment-user">{{i.user}} <span>Lv5</span></div>
              <div style="display: flex;">
                打分
                <el-rate disabled v-model="i.score" ></el-rate>
              </div>
              <div style="padding: 5px 0; font-size: 14px">
                {{i.content}}

              </div>
              <div class="comment-images">
                <div v-for=" ii in i.pictures" :key="ii" >

                  <img :src="ii">
                  <!--                <img src="https://dimg04.c-ctrip.com/images/0236m12000dfp1f05BC45_R_150_150_R5_Q70_D.jpg" alt="">-->
                  <!--                <img src="https://dimg04.c-ctrip.com/images/0235512000dfp0fjr3206_R_150_150_R5_Q70_D.jpg" alt="">-->
                </div>
              </div>
              <div>
                浏览641 &nbsp;&nbsp;&nbsp;&nbsp;评论5
              </div>
            </div>
          </div>
        </div>
      </div>
    </div></div>
</template>

<style scoped>
.close {
  color: white;
  position: absolute;
  top: 15px;
  right: 35px;
  font-size: 40px;
  font-weight: bold;
  transition: 0.3s;
}

.close:hover,
.close:focus {
  color: #999;
  text-decoration: none;
  cursor: pointer;
}
img{
  width: 306px;
  height: 306px;

}
.img-right {
   top: 50%; /* 将元素置于屏幕顶部的50%位置 */
   left: 50%; /* 将元素置于屏幕左侧的50%位置 */
   transform: translate(-50%, -50%);
   position: fixed;
   width: 950px;
   height: 380px;
   margin-bottom: 8%;
 }
.carousel-img {
    width: 100%; /* 设置图片宽度为视图宽度 */
    height: 100%;
    object-fit: cover;
  }
.shop-rank img{
  width: 64px;
  height: 34px;
}
.goods-list {
  display: flex;
  justify-content: space-between;
  width: 100%;

  li {
    width: 306px;
    height: 406px;

    background: #f0f9f4;
    transition: all .5s;

    &:hover {
      transform: translate3d(0, -3px, 0);
      box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
    }

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .price {
      color: $priceColor;
    }
  }
}
.container {
  position: relative;
  width: 100%;
  //margin: 40px ;
  overflow: auto; /* 添加滚动条 */
  padding: 40px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}
.background {
  width: 1500px;
  height: 100vh; /* Set the height to 100% of the viewport height */
  //overflow: auto; /* 添加滚动条 */
  background-image: url('https://dimg04.c-ctrip.com/images/100e0h0000008rp39A12F_C_1180_462.jpg');
  background-size: 100%;
  background-repeat:no-repeat ;
}
.header {
  background-color: #fff;
}

.top-bar {
  height: 60px;
}

.header {
  width: 100%;
  line-height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid #ff6633;
  position: fixed;
  top: 0;
  z-index: 500;
}

.header-back-btn {
  width: 10%;
  color: #ff6633;
  font-size: 24px;
  font-weight: bold;
}

.header-title {
  width: 80%;
  text-align: center;
  font-size: 18px;
  font-family: Hiragino Sans GB, Arial, Helvetica, "\5B8B\4F53", sans-serif;
}

.header-share {
  width: 10%;
  text-align: center;
  font-size: 18px;
  color: #82848a;
  font-weight: bold;
  font-family: Hiragino Sans GB, Arial, Helvetica, "\5B8B\4F53", sans-serif;
}

.shop-title {
  font-size: 20px;
  font-weight: bold;
  margin: 5px 0;
}

.shop-rate {
  margin: 5px 0;
  display: flex;
  justify-content: space-between;
}

.shop-rate-info {
  margin: 5px 0;
  color: #82848a;
}

.shop-info-box {
  padding: 0 10px;
}

.shop-rank {
  margin: 5px 0;
  display: flex;
  width: 100%;
}

.shop-rank span {
  color: #B15E2C;
  font-weight: bold;
  font-size: 16px;
  background: linear-gradient(
      -248deg, #FFEBCF 2%, #FFECDD 61%);
  border-radius: 1px;
  height: 35px;
  line-height: 30px;
  padding: 0 6px;
}

.shop-rank div {
  color: #5a5b5b;
  font-size: 14px;
  width: 45%;
  text-align: end;
}

.shop-images {
  display: flex;
  overflow-x: scroll;
  padding: 5px 0;
}

.shop-images img {
  height: 266px;
  width: 277px;
  margin-right: 3px;
  display: inline-block;
  border-radius: 7px;
  border: 1px solid #e1e1e1;
}

.shop-address {
  font-size: 14px;
  color: black;
  height: 72px;
  display: flex;
  overflow: auto; /* 添加滚动条 */
  align-items: center;
  //padding: 5px 0;
}

.shop-divider {
  height: 10px;
  background-color: #f3f1f1;
}

.shop-open-time {
  display: flex;
  padding: 10px;
  font-size: 14px;
}

.shop-open-time div {
  margin-right: 10px;
}

.line-right {
  width: 40px;
  flex-grow: 1;
  color: #82848a;
  font-size: 12px;
  text-align: right;
}

.shop-voucher {
  padding: 10px;
}

.voucher-icon {
  display: inline-block;
  line-height: 16px;
  background-color: #f5a966;
  color: white;
  padding: 0 4px 2px 4px;
}

.voucher-box {
  background-color: #fff1f1;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  margin: 10px 0;
}

.voucher-circle {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 80px;
}

.voucher-b{
  height: 10px;
  width: 10px;
  background-color: #fff;
  border-radius: 50%;
}

.voucher-left {
  flex-grow: 1;
  margin-left: 15px;
}

.voucher-right {
  margin-right: 15px;
}

.voucher-title, .voucher-subtitle, .voucher-price {
  padding: 5px 0;
}

.voucher-title {
  font-weight: bold;
}

.voucher-subtitle {
  color: #82848a;
}

.voucher-price {
  color: #F63;
  display: flex;
  align-items: center;
}

.voucher-price div {
  font-weight: bold;
  font-size: 14px;
}

.voucher-price span {
  margin-left: 10px;
  font-size: 10px;
  padding: 0 5px;
  line-height: 10px;
  background-color: #fce5e5;
}

.voucher-btn {
  background-color: #ff6633;
  color: white;
  font-size: 14px;
  line-height: 30px;
  width: 65px;
  text-align: center;
  border-radius: 15px;
}
.seckill-box{
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 12px;
  padding: 15px 0 0 0;
}
.seckill-box div{
  font-size: 12px;
}
.disable-btn{
  background-color: #adacab;
}
.seckill-time{
  color: #F63;
}
.seckill-stock {
  color: #adacab;
}
.seckill-stock span{
  background-color: #fce5e5;
  color: rgb(240, 51, 51);
}
.copyright {
  color: #d1d1d1;
  margin-top: 20px;
  text-shadow: 0 1px 1px #fff;
  text-align: center;
}
.shop-comments {
  padding: 10px;
}
.comments-head {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  font-weight: bold;
}
.comments-head span {
  font-size: 12px;
  font-weight: normal;
  color: #82848a;
}
.comment-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.comment-tags div {
  width: 25%;
  border: 1px solid #427fc4;
  border-radius: 5px;
  text-align: center;
  color: #427fc4;
  padding: 5px 10px;
  margin-top: 7px;
}
.comment-list {
  margin-top: 15px;
  overflow: auto; /* 添加滚动条 */

}
.comment-box {
  overflow: auto; /* 添加滚动条 */

  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}
.comment-icon {
  width: 55px;
}
.comment-icon img{
  width: 48px;
  height: 48px;
  border-radius: 50%;
}
.comment-info {
  width: 80%;
  flex-grow: 1;
}
.comment-user {
  font-size: 14px;
}
.comment-user span {
  font-size: 10px;
  padding: 0 10px;
  border-radius: 8px;
  background-color: #f7b253;
  color: white;
}
.comment-images {
  display: flex;
  width: 100%;
  overflow-x: scroll;
  padding: 10px 0;
}
.comment-images img {
  height: 94px;
  width: 92px;
  border-radius: 5px;
  margin-right: 5px;
}
</style>