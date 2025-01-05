<script setup>
import {useRoute} from "vue-router";
import http from "@/utils/http.js";

let r=useRoute()
let user = ref({})
let info=ref({})
function    checkLogin() {
  if (!sessionStorage.getItem("usertoken")) {
    window.prompt("您还没有登录，请先登录");
    return
  }
  user.value = JSON.parse(sessionStorage.getItem("user"))
  // 查询用户信息
  http.get("user/me")
      .then(({data}) => {

        info.value = JSON.parse(sessionStorage.getItem("userInfo")) || {}
      })
      .catch(err => {
        this.$message.error(err);
        setTimeout(() => location.href = "login.html", 1000)
      })
}
checkLogin()
function goBack() {
  window.history.back()
}
</script>

<template>
  <div id="app">
    <div class="header">
      <div class="header-back-btn" @click="goBack" ><i class="el-icon-arrow-left"></i></div>
      <div class="header-title">资料编辑&nbsp;&nbsp;&nbsp;</div>
    </div>
    <div class="edit-container">
      <div class="info-box">
        <div class="info-item">
          <div class="info-label">头像</div>
          <div class="info-btn">
            <img width="35" :src="user.icon || '/imgs/icons/default-icon.png'" alt="">
            <div><i class="el-icon-arrow-right"></i></div>
          </div>
        </div>
        <div class="divider"></div>
        <div class="info-item">
          <div class="info-label">昵称</div>
          <div class="info-btn">
            <div >{{user.nickName}}</div>
            <div>
              <i class="el-icon-arrow-right"></i>
            </div>
          </div>
        </div>
        <div class="divider"></div>
        <div class="info-item">
          <div class="info-label">个人介绍</div>
          <div class="info-btn">
            <div style="overflow: hidden; width: 150px;text-align: right">{{info.introduce || '介绍一下自己'}}</div>
            <div>
              <i class="el-icon-arrow-right"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="info-box">
        <div class="info-item">
          <div class="info-label">性别</div>
          <div class="info-btn">
            <div>{{info.gender || '选择'}}</div>
            <div><i class="el-icon-arrow-right"></i></div>
          </div>
        </div>
        <div class="divider"></div>
        <div class="info-item">
          <div class="info-label">城市</div>
          <div class="info-btn">
            <div>{{info.city || '选择'}}</div>
            <div><i class="el-icon-arrow-right"></i></div>
          </div>
        </div>
        <div class="divider"></div>
        <div class="info-item">
          <div class="info-label">生日</div>
          <div class="info-btn">
            <div>{{info.birthday || '添加'}}</div>
            <div><i class="el-icon-arrow-right"></i></div>
          </div>
        </div>
      </div>

      <div class="info-box">
        <div class="info-item">
          <div class="info-label">我的积分</div>
          <div class="info-btn">
            <div>查看积分</div>
            <div><i class="el-icon-arrow-right"></i></div>
          </div>
        </div>
        <div class="divider"></div>
        <div class="info-item">
          <div class="info-label">会员等级</div>
          <div class="info-btn">
            <div><a href="javascript:void(0)">成为VIP尊享特权</a></div>
            <div><i class="el-icon-arrow-right"></i></div>
          </div>
        </div>
      </div>
    </div>
    <foot-bar :active-btn="4"></foot-bar>
  </div>
</template>

<style scoped>
.header{
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
  width: 80px;
  height: 80px;
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
</style>