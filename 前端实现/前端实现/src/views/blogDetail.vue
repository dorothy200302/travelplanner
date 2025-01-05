<script setup>
import {useRoute, useRouter} from "vue-router";
import axios from "axios";
import {queryBlogById, queryShopById} from "@/api/detailPage.js";
import http from "@/utils/http.js";
let ro=useRoute()
let r=useRouter()
let blog=ref({})
let shop=ref({})
let likes=ref({})
let user=ref({})
let comments=ref([])
let followed=ref(false)
let items=ref([])
let myId=ref(0)

let id=ro.params.id

const queryById = async(id) => {
  const res = await queryBlogById(id);
  console.log(res);
  blog.value=res.data
  blog.value.images = blog.value.images.split(",");
  if(blog.value.type===2){
    queryShop()
  }
  queryLikeList(id)
  isFollowed()
  queryComments(id)
  queryUser()
}
queryById(id)
const queryShop = async() => {
  const res=await queryShopById(blog.value.shopId)
  console.log(res)
  shop.value=res.data
  shop.value.score = (shop.value.score / 10).toFixed(1)
}
queryComments(id)
function queryComments(id) {
  console.log("queryComments",id);
    http.get("blog/comment/list/" + id)
        .then(({data}) =>{
            console.log(data);
            comments.value = data.data})
        .catch(error => {
          console.error('An error occurred:', error);
          this.$message.error('An error occurred: ' + error.message);
        });}
function queryUser() {
      http.get("blog/getUserById/" + id)
          .then(({data}) => user.value = data.data)}
  function queryLikeList(id) {
    http.get("blog/likes/" + id)
        .then(({data}) => likes.value = data.data)
        .catch(error => {
          console.error('An error occurred:', error);
          this.$message.error('An error occurred: ' + error.message);
        });
  }

  function addLike() {
    http.put("blog/like/" + blog.value.id)
        .then(({data}) => {
          http.get("blog/" + blog.value.id)
              .then(({data}) => {
                if (typeof data.images === 'string') {
                  data.images = data.data.images.split(",");
                } else {
                  // 处理 data.images 不是字符串的情况
                }
                blog.value = data.data;
                queryLikeList(blog.id);
              })
              .catch(error => {
                console.error('An error occurred:', error);
                this.$message.error('An error occurred: ' + error.message);
              });
        })
        .catch(err => {
          this.$message.error(err)
        })
  }
  let commentData = ref();
function comment(commentData) {
  let loginUser = JSON.parse(localStorage.getItem('user'));
  if (!loginUser) {
    const a=window.prompt("Please login first");
  if(a!=null){
    r.push("/login")
  }
  }
  http.post('blog/comment/', {
    params: {
      id: blog.value.id,
      userId: user.value.userId
    },
    data: commentData
  })
      .then(response => {
        window.prompt(response.data);
      })
     ;}
  function isFollowed() {
    http.get("followTable/or/not/" + blog.userId)
        .then(({data}) => followed.value = data.data)
        .catch(error => {
          console.error('An error occurred:', error);
          this.$message.error('An error occurred: ' + error.message);
        });
  }

  function follow() {
    http.put("followTable/" + blog.userId + "/" + !followed)
        .then(() => {
          this.$message.success(followed.value ? "已取消关注" : "已关注")
          followed.value = !followed
        })
        .catch(error => {
          console.error('An error occurred:', error);
          this.$message.error('An error occurred: ' + error.message);
        });
    {
      console.log(error)
      this.$message.error("关注失败")
    }
  }

  function formatTime(b) {
    return b.getFullYear() + "年" + (b.getMonth() + 1) + "月" + b.getDate() + "日 ";
  }

  function formatMinutes(m) {
    if (m < 10) m = "0" + m
    return m;
  }

  function goBack() {
    window.history.go(-1);
  }
let rr=useRouter()
  function toOtherInfo() {
    if (blog.userId === user.id) {
      rr.push("/user"+"?id="+blog.userId)
    } else {
      rr.push("/user" + blog.userId)
    }
  }

</script>

<template>
  <div class="container">
    <div class="header">
      <div class="header-back-btn" @click="goBack"><i class="el-icon-arrow-left"></i></div>
      <div class="header-title"></div>
      <div class="header-share">...</div>
    </div>
    <div style="height: 85%;width: 100%;  ">

      <div class="basic">
        <div class="basic-icon" @click="toOtherInfo">
          <img :src="blog.icon || '/images/default-icon.png'" alt="">
        </div>
        <div class="basic-info">
          <div class="name">{{blog.name}}</div>
          <span class="time">{{formatTime(new Date(blog.createTime))}}</span>
        </div>
        <div style="width: 20%">
          <div class="logout-btn" @click="follow" v-show="!user || user.id !== blog.userId ">
            {{followed ? '取消关注' : '关注'}}
          </div>
        </div>
      </div>
      <h2 class="blog-title">{{blog.title}}</h2>
      <div class="blog-text" v-html="blog.content">
      </div>
      <div v-for="i in blog.images" :key="i">
        <img class="vertical-img" :src="i">
      </div>
</div>
      <div class="shop-basic" v-show="blog.type===2">
        <div class="shop-icon">
          <img :src=" '/images/img_1.png'" alt="">
        </div>
        <div style="width: 80%">
          <div class="name">{{shop.name}}</div>&nbsp;&nbsp;
          <div class="category">{{shop.area}}</div>
          <div class="address">{{shop.address}}</div>
          <div>
            <el-rate
                v-model="shop.score"  >
            </el-rate>
          </div>
          <div class="shop-avg">￥{{shop.avgPrice}}/人</div>
        </div>
      </div>
      <div class="zan-box">
        <div>
          <svg t="1646634642977" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2187" width="20" height="20" @click="addLike" >
            <path d="M160 944c0 8.8-7.2 16-16 16h-32c-26.5 0-48-21.5-48-48V528c0-26.5 21.5-48 48-48h32c8.8 0 16 7.2 16 16v448zM96 416c-53 0-96 43-96 96v416c0 53 43 96 96 96h96c17.7 0 32-14.3 32-32V448c0-17.7-14.3-32-32-32H96zM505.6 64c16.2 0 26.4 8.7 31 13.9 4.6 5.2 12.1 16.3 10.3 32.4l-23.5 203.4c-4.9 42.2 8.6 84.6 36.8 116.4 28.3 31.7 68.9 49.9 111.4 49.9h271.2c6.6 0 10.8 3.3 13.2 6.1s5 7.5 4 14l-48 303.4c-6.9 43.6-29.1 83.4-62.7 112C815.8 944.2 773 960 728.9 960h-317c-33.1 0-59.9-26.8-59.9-59.9v-455c0-6.1 1.7-12 5-17.1 69.5-109 106.4-234.2 107-364h41.6z m0-64h-44.9C427.2 0 400 27.2 400 60.7c0 127.1-39.1 251.2-112 355.3v484.1c0 68.4 55.5 123.9 123.9 123.9h317c122.7 0 227.2-89.3 246.3-210.5l47.9-303.4c7.8-49.4-30.4-94.1-80.4-94.1H671.6c-50.9 0-90.5-44.4-84.6-95l23.5-203.4C617.7 55 568.7 0 505.6 0z" p-id="2188" :fill="blog.isLike ? '#ff6633' : '#82848a'"></path>
          </svg>
        </div>
        <div class="zan-list">
          <div class="user-icon-mini" v-for="u in likes" :key="u.id">
            <img :src="u.icon || '/imgs/icons/default-icon.png'" alt="">
          </div>
          <div style="margin-left:10px;text-align: center;line-height: 24px;">{{blog.liked}}人点赞</div>
        </div>
      </div>
      <div class="blog-divider"></div>
      <div class="blog-comments">
        <div class="comments-head">
          <div>网友评价 <span font-size="32px">{{blog.comments}}</span></div>
          <div><i class="el-icon-arrow-right"></i></div>
        </div>
        <div class="comment-list">
          <var-input variant="outlined" placeholder="点击评论" textarea  v-model="commentData" />
          <var-button @click="comment(commentData)">确认</var-button>


          <div class="comment-box" v-for="i in comments" :key="i">
            <div class="comment-icon">
              <img
                  src="https://p0.meituan.net/userheadpicbackend/57e44d6eba01aad0d8d711788f30a126549507.jpg%4048w_48h_1e_1c_1l%7Cwatermark%3D0"
                  alt="">
            </div>
            <div class="comment-info">
              <div class="comment-user">叶小乙 <span>Lv5</span></div>
              <div style="display: flex;">
                打分
<!--                <el-rate disabled="true" v-model="comment.score"></el-rate>-->
              </div>
              <div style="padding: 5px 0; font-size: 14px">
                {{i.content}}
              </div>

              <div>
                浏览{{blog.searchCount}} 次&nbsp;&nbsp;&nbsp;&nbsp;评论{{blog.comments}}
              </div>
            </div>
          </div>
          <div
              style="display: flex; justify-content: space-between;padding: 15px 0; border-top: 1px solid #f1f1f1; margin-top: 10px;">
            <div>查看全部{{blog.comments}}}条评价</div>
            <div><i class="el-icon-arrow-right"></i></div>
          </div>
        </div>
      </div>
      <div class="blog-divider"></div>
    <div class="foot">
      <div class="foot-box">
        <div class="foot-view"  @click="addLike()">
          <svg t="1646634642977" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2187" width="26" height="26">
            <path d="M160 944c0 8.8-7.2 16-16 16h-32c-26.5 0-48-21.5-48-48V528c0-26.5 21.5-48 48-48h32c8.8 0 16 7.2 16 16v448zM96 416c-53 0-96 43-96 96v416c0 53 43 96 96 96h96c17.7 0 32-14.3 32-32V448c0-17.7-14.3-32-32-32H96zM505.6 64c16.2 0 26.4 8.7 31 13.9 4.6 5.2 12.1 16.3 10.3 32.4l-23.5 203.4c-4.9 42.2 8.6 84.6 36.8 116.4 28.3 31.7 68.9 49.9 111.4 49.9h271.2c6.6 0 10.8 3.3 13.2 6.1s5 7.5 4 14l-48 303.4c-6.9 43.6-29.1 83.4-62.7 112C815.8 944.2 773 960 728.9 960h-317c-33.1 0-59.9-26.8-59.9-59.9v-455c0-6.1 1.7-12 5-17.1 69.5-109 106.4-234.2 107-364h41.6z m0-64h-44.9C427.2 0 400 27.2 400 60.7c0 127.1-39.1 251.2-112 355.3v484.1c0 68.4 55.5 123.9 123.9 123.9h317c122.7 0 227.2-89.3 246.3-210.5l47.9-303.4c7.8-49.4-30.4-94.1-80.4-94.1H671.6c-50.9 0-90.5-44.4-84.6-95l23.5-203.4C617.7 55 568.7 0 505.6 0z" p-id="2188" :fill="blog.isLike ? '#ff6633' : '#82848a'"></path>
          </svg>
          <span :class="{liked: blog.isLike}">{{blog.liked}}</span>
        </div>
      </div>
      <div style="width: 40%">
      </div>
      <div class="foot-box">
        <div class="foot-view"><i class="el-icon-chat-square"></i></div>
      </div>
    </div></div>
</template>

<style scoped>
.blog-title{
  margin-top: 20px;
  font-color: #446889;

}
.header {
  background-color: #fff;
   width: 100%;
}
#ap {
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
  font-weight: normal;
}
.top-bar {
  height: 60px;
}

.header {
  width: 100%;
  height: 3%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid #ff6633;
  position: fixed;
  top: 0;
  z-index: 500;
}
.shop-avg{
  opacity: .4;
}
.header-back-btn {
  width: 10%;
  color: #ff6633;
  font-size: 24px;
  font-weight: bold;
}
.container {
  position: absolute;
  left: 20px;
  top: 0px;
  right: 60px;
  width: 1400px;
  padding: 40px;
  letter-spacing: 4px;
  margin-right: 0%;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
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
.blog-divider {
  width: 100%;

  height: 10px;
  background-color: #f3f1f1;
}

.blog-info-box{
  position: relative;
  overflow: hidden;
  height: 85%;
  width: 100%;
}
.blog-info-box.indicator{
  position: absolute;
  right: 3vw;
  bottom: 3vw;
  width: 10vw;
  height: 10vw;
  line-height: 10vw;
  border-radius: 5vw;
  text-align: center;
  background-color: rgba(0,0,0,.5);
  color: #fff;
  font-size: 14px;
}
.swiper-item{
  position: absolute;
  left:0;
  top:0;
  width: 100%;
  height: 100%;
}
.basic{
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 15px 15px 5px 15px;
}
.basic-icon {
  width:88px;
  height: 88px;
  padding: 1px;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0 0 3px 2px rgba(0, 0, 0, 0.07);
}
.basic-icon img {
  border-radius: 50%;
  width: 100%;
  height: 100%;
}

.shop-basic{
  width: 100%;
  margin-top: 20px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  padding: 15px 15px 5px 15px;
  box-shadow: 0 4px 4px 2px rgba(0, 0, 0, 0.1);
}
.shop-icon {
  width: 199px;
  height: 199px;
}
.shop-icon img {
  width: 100%;
  height: 100%;
}
.vertical-img {
  width: 780px;
  height:488px;
}
.zan-box{
  width: 90%;
  margin: auto;
  padding: 20px 0 10px;
  display: flex;
  justify-content: space-between;
}
.zan-list{
  width: 88%;
  display: flex;
}
.user-icon-mini{
  margin-left: -5px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  padding: 1px;
  background-color: #fff;
  box-shadow: 0 0 3px 2px rgba(0, 0, 0, 0.07);
}
.user-icon-mini img {
  border-radius: 50%;
  width: 100%;
  height: 100%;
}
.basic-info {
  width: 60%;
}
.basic-info .name{
  font-weight: bold;
  font-size: 12px;
  color: #446889;
}
.basic-info .time{
  display: inline-block;
  padding: 0 10px;
  margin: 5px 0 10px;
  border-radius: 2px;
  opacity: .4;
}

.logout-btn{
  width: 100%;
  height: 25px;
  line-height: 25px;
  border-radius: 12px;
  text-align: center;
  border: #ff6633 1px solid;
  color: #ff6633;
  box-shadow: 0 1px 2px 1px rgba(0, 0, 0, 0.04);
}
.blog-text{
  width: 90%;

  padding: 5px 20px;
}
.copyright {
  color: #d1d1d1;
  margin-top: 20px;
  text-shadow: 0 1px 1px #fff;
  text-align: center;
}
.blog-comments {
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
}  .header{
     position: relative;
   }
.foot-view span{
  font-size: 12px;
}
.liked{

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
}
.comment-box {
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