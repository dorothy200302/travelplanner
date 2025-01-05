<script setup>
import { ref } from 'vue'
import axios from "axios";
import {useRouter} from "vue-router";
import http from "@/utils/http.js";
let user = ref({})
let info = ref({})
let blogs = ref([])
let commonFollows = ref([])
let followed = ref(false)
let activeName = ref('1')
let loginUser = JSON.parse(localStorage.getItem('user'));
let r=useRouter()
let id = r.currentRoute.value.params.id;
console.log("id",id.toString());
function  queryUser() {
  // 查询用户信息
  http.get("user/info/" + id)
      .then(({data}) => {
        // 保存用户
        user.value = data.data;
        // 查询用户详情
        queryUserInfo();
        // 查询用户笔记
        queryBlogs();
        // 是否被关注
        isFollowed();
      })
      .catch(console.log)
}
queryUser()
function queryBlogs() {
  http.get("blog/of/user", {
    params: {id: id, current: 1}
  })
      .then(({data}) => blogs.value = data.data)
}
function goBack() {
  window.history.go(-1)
}
function queryUserInfo() {
  http.get("user/info/" + id)
      .then(({data}) => {
        if (!data) {
          return
        }
        // 保存用户详情
        console.log(data);
        info.value = data.data;
        user.value = data.data;
        // 保存到本地
        sessionStorage.setItem("userInfo", JSON.stringify(data))
      })
      .catch(err => {
        this.$message.error(err);
      })
}
function isFollowed() {
  if (!loginUser) {
    followed.value = false;
    return;
  }
  http.get("followTable/or/not/" + blog.userId)
      .then(({data}) => followed.value = data.data)
      .catch(error => {
        console.error('An error occurred:', error);
        this.$message.error('An error occurred: ' + error.message);
      });
}
function  queryCommonFollow() {
  http.get("followTable/common/" + id)
      .then(({data}) => commonFollows.value = data.data)
      .catch(err => {
        this.$message.error(err);
      })
}
function  follow() {
  http.put("followTable/" + id + "/" + !followed)
      .then(() => {
        this.$message.success(followed.value ? "已取消关注" : "已关注")
        followed.value = !followed
      })
      .catch(this.$message.error)
}function handleClick(t) {
  if (t.name === '2') {
    queryCommonFollow();
  }
}function toOtherInfo(id){
  r.push({path: '/otherUser', query: {id: id}})

}
</script>

<template>
  <div class="container">
    <div class="header">
      <div class="header-back-btn" @click="goBack"><i class="el-icon-arrow-left"></i></div>
      <div class="header-title">&nbsp;&nbsp;&nbsp;</div>
    </div>
    <div class="basic">
      <div class="basic-icon">
        <img src="/images/img_2.png" alt="">
      </div>
      <div class="basic-info">
        <div class="name">{{user.userName}}</div>
        <span>{{user.originCity}}</span>
      </div>
      <div class="logout-btn" @click="follow" style="text-align: center">
        {{followed ? "取消关注" : "关注"}}
      </div>
    </div>
    <div class="introduce">
      <span v-if="info.introduce"></span>
      <span v-else>这个人很懒，什么都没有留下</span>
    </div>
    <div class="content">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="blogs of {{user.userName}}" name="1">
          <div v-for="b in blogs" :key="b.id" class="blog-item">
            <div class="blog-img"><img :src="b.images.split(',')[0]" alt=""></div>
            <div class="blog-info">
              <div class="blog-title" v-html="b.title"></div>
              <div class="blog-liked">
                <img src="" alt=""> {{b.liked}}</div>
              <div class="blog-comments"><i class="el-icon-chat-dot-round"></i> {{b.comments}}</div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="common follows" name="2">
          <div>你们都关注了：</div>
          <div class="follow-info" v-for="u in commonFollows" :key="u.id">
            <div class="follow-info-icon" @click="toOtherInfo(u.id)">
              <img :src="u.icon || '@/'" alt="">
            </div>
            <div class="follow-info-name">
              <div class="name">{{u.nickName}}</div>
            </div>
            <div class="follow-info-btn" @click="toOtherInfo(u.id)">
              去主页看看
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="what are we have in common in terms of travel?" name="3">
          <div>你们都在哪里旅游？</div>
          <div class="info-box">
            <div class="info-item">
              <div class="info-title">城市</div>
              <div class="info-content">北京</div>
            </div>

          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <footer :active-btn="0"></footer>
  </div>
</template>

<style scoped>
.el-tabs--bottom .el-tabs__item.is-bottom:nth-child(2), .el-tabs--bottom .el-tabs__item.is-top:nth-child(2), .el-tabs--top .el-tabs__item.is-bottom:nth-child(2), .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
  padding-left: 15px;
}
.el-tabs, .el-tab-pane{
  height: 100%;
}
.el-tabs__header{
  height: 10%;
}
.container{
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
.el-tabs__content{
  height: 90%;
}.header{
   width: 100%;
   line-height: 40px;
   height: 6%;
   display: flex;
   align-items: center;
   justify-content: space-between;
   border-bottom: 2px solid #ff6633;
 }
.header-back-btn{
  width: 10%;
  color: #ff6633;
  font-size: 22px;
}
.header-title {
  width: 90%;
  text-align: center;
  font-size: 18px;
  font-family: Hiragino Sans GB,Arial,Helvetica,"\5B8B\4F53",sans-serif;
}
.basic{
  height: 15%;
  display: flex;
  justify-content: space-between;
  padding: 15px 15px 5px 15px;
}
.basic-icon {
  width: 180px;
  height: 180px;
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

.basic-info {
  width: 54%;
  padding: 8px;
}
.basic-info .name{
  overflow: hidden;
  font-weight: bold;
  font-size: 14px;
}
.basic-info span{
  display: inline-block;
  padding: 0 10px;
  background-color: #eeeded;
  margin: 5px 0 10px;
  border-radius: 2px;
}

.edit-btn{
  width: 90%;
  line-height: 20px;
  border-radius: 12px;
  text-align: center;
  border: #eeeded 1px solid;
  box-shadow: 0 1px 2px 1px rgba(0, 0, 0, 0.04);
}
.logout-btn{
  width: 18%;
  margin-top: 8px;
  height: 20px;
  line-height: 20px;
  color: white;
  padding: 0 2px;
  border-radius: 3px;
  background-color: #f63;
  box-shadow: 0 1px 2px 1px rgba(0, 0, 0, 0.04);
}

.introduce{
  padding: 0 15px;
}
.content {
  height: 61%;
}

.edit-container{
  background-color: #f4f4f4;
}
.divider {
  height: 1px;
  background-color: #e4e4e4;
}
.info-box {
  margin-bottom: 10px;
  padding: 5px 15px;
  background-color: #fff;
}
.info-item{
  display: flex;
  justify-content: space-between;
  line-height: 40px;
}
.info-btn{
  display: flex;
}
.info-btn div {
  margin-left: 5px;
}

.blog-item {
  display: flex;
  padding: 10px;
  height: 90px;
  width: 90%;
  box-shadow: 1px 1px 4px 1px rgba(0,0,0,0.1);
  margin-bottom: 10px;
}
.blog-img {
  width: 70px;
  height: 90px;
  margin-right: 10px;
}
.blog-img img {
  width: 100%;
  height: 100%;
}
.blog-info {
  width: 50%;
  flex-grow: 1;
}
.blog-title {
  line-height: 20px;
}
.blog-liked {
  line-height: 16px;
  align-items: center;
}
.blog-liked img {
  width: 16px;
  height: 16px;
}
.blog-comments i {
  font-size: 16px;
}


.follow-info{
  display: flex;
  justify-content: space-between;
  padding: 15px 10px 5px 10px;
  align-items: center;
}
.follow-info-icon {
  width: 15%;
  padding: 1px;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0 0 3px 2px rgba(0, 0, 0, 0.07);
}
.follow-info-icon img {
  border-radius: 50%;
  width: 100%;
  height: 100%;
}
.follow-info-name{
  width: 56%;
  padding: 8px;
  font-size: 14px;
}
.follow-info-btn{
  width: 30%;
  font-size: 10px;
  line-height: 20px;
  height: 20px;
  border: #ff6633 1px solid;
  color: #ff6633;
  border-radius: 5px;
  text-align: center;
}

/*达人探店列表*/
.blog-list {
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  overflow-y: auto;
}
.blog-box{
  width: 90%;
  background-color: #fff;
  margin: 5px 0;
  box-shadow: 0 3px 4px 1px rgba(0, 0, 0, 0.1);
  border-radius: 3px;
}
.blog-img2 img{
  width: 100%;
  border-radius: 3px;
}
.blog-title {
  padding: 2px 10px;
  line-height: 24px;
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
</style>