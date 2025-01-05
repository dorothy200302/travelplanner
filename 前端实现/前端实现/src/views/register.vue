<template>
  <div class="container">
    <div class="card">
      <h2>{{ isLogin ? '登录' : '注册' }}界面</h2>
<br/>
      <div v-if="isLogin" class="form">
        <label for="loginEmail">邮箱：</label>
        <input type="email" id="loginEmail"  v-model="loginEmail" class="input" placeholder="请输入邮箱">
        <br>
        <label for="loginPassword">密码：</label>
        <input type="password" id="loginPassword" v-model="loginPassword" class="input" placeholder="请输入密码">
        <br>
        <label for="rememberPassword">
          <input type="checkbox" id="rememberPassword" v-model="rememberPassword">记住密码
        </label>
        <br>
        <button @click="login" class="button">登录</button>
        <p class="agreement">登录代表同意我们的<a href="#">用户协议</a></p>
      </div>
      <div v-else class="form">
        <label for="registerEmail">邮箱：</label>
        <input type="email" id="registerEmail" v-model="registerEmail" class="input" placeholder="请输入邮箱">

        <br/>
        <label for="verificationCode">验证码：</label>
        <input type="text" id="verificationCode" v-model="verificationCode" class="input" placeholder="请输入验证码">
        <button @click="getVerificationCode" :disabled="isSending">获取验证码</button>
        <br>
        <label for="registerPassword">密码：</label>
        <input type="password" id="registerPassword" v-model="registerPassword" class="input" placeholder="请输入密码">
        <br>
        <label for="confirmPassword">确认密码：</label>
        <input type="password" id="confirmPassword" v-model="confirmPassword" class="input" placeholder="请再次输入密码">
        <br>
        <span v-if="!isPasswordMatch" class="error-message">两次输入密码不一致</span>
        <br>
        <button @click="register" class="button">注册</button>
        <p class="agreement">注册代表同意我们的<a href="#">用户协议</a></p>
      </div>

      <button @click="toggleMode" class="toggle-button">{{ isLogin ? '切换到注册' : '切换到登录' }}</button>
    </div>
  </div>
</template>

<script setup>
import {useRouter} from "vue-router";
import axios from "axios";
import http from "@/utils/http.js";

     let isLogin=ref(false)
   let   verificationCode=ref('')
   let   loginEmail=ref('')
  let    loginPassword=ref('')
 let    rememberPassword=ref(false)
  let    registerEmail=ref('')
 let    isSending=ref(false)
let    registerPassword=ref('')
let    confirmPassword=ref('')
let    isPasswordMatch=ref(true)
let loginForm=ref({})
const router = useRouter()
// const http = axios.create({
//   baseURL: 'http://localhost:8081/', // 设置基础URL
//   timeout: 10000 // 设置超时时间，单位毫秒
// });

function    toggleMode() {
      isLogin.value = !isLogin.value;
    }
    function login() {
      let loginForm =ref( {
        email: loginEmail.value,
        password: loginPassword.value,
        code: null
      });
      console.log(loginForm.value)
      // router.push('/primary')
      console.log('登录');
      http.post('user/login', loginForm.value)
       .then(res => {
          console.log(res);
         if (res.success) {
            sessionStorage.setItem("usertoken", JSON.stringify(res.data))
           const tokenParts = res.data.split('.');
           const decodedPayload = JSON.parse(atob(tokenParts[1]));


// 获取用户信息
           let user= {
             userId: decodedPayload.userId,
             userName: decodedPayload.userName,
             icon: decodedPayload.icon
           };
      console.log(user)
           sessionStorage.setItem("user", JSON.stringify(user))

           router.push({ name: 'primary', params: { userId: user.userId }})
          }else
          {
window.prompt("登录失败，请检查邮箱或密码")
          }})
        }
function getVerificationCode() {
  http.get("user/sendMail",{ params: {
      email: registerEmail.value
    }})
      .then(() => {
        console.log(registerEmail.value);
      })
      .catch(err => {
        console.log(err);
      });
  // 发送获取验证码的请求到后端
  isSending.value = true; // 设置正在发送状态
  setTimeout(() => {
    // 模拟发送验证码的异步操作，假设 2 秒后发送成功
    console.log('验证码已发送到邮箱');
    isSending.value = false; // 设置发送完成状态
  }, 2000);
}function    register() {
  let loginForm = ref({
    email: registerEmail.value,
    password: registerPassword.value,
    code: verificationCode.value
  });
  console.log(loginForm.value)
      // 检查两次输入的密码是否一致
      if (registerPassword.value !== confirmPassword.value) {
        isPasswordMiatch.value = false;
        return;
      }
      isPasswordMatch.value = true;
  http.post('user/login', loginForm.value)
   .then(res => {
      console.log(res);
     if (res.success) {
       sessionStorage.setItem("usertoken", JSON.stringify(res.data))
       const tokenParts = res.data.split('.');
       const decodedPayload = JSON.parse(atob(tokenParts[1]));

// 获取用户信息
       let user= {
         userId: decodedPayload.userId,
         userName: decodedPayload.userName,
         icon: decodedPayload.icon
       };

       sessionStorage.setItem("user", JSON.stringify(user))
       window.alert('注册成功，请登录');
       isLogin.value = true; // 切换到登录界面
      }else{
        window.prompt("注册失败，请检查邮箱或验证码")
      }})
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1500px;
  height: 100vh; /* 设置容器高度为视口的高度 */
  background-image: url('https://z1.muscache.cn/pictures/prohost-api/Hosting-879012498547289208/original/e24abccc-fbd9-4b42-a8b6-7b57598c13fc.jpeg?im_w=960'); /* 设置背景图像 */
  background-size: cover; /* 背景图像尺寸覆盖整个容器 */
  animation: animateBackground 20s infinite linear; /* 应用背景动画 */
}
@keyframes animateBackground {
  0% {
    background-position: 0% 0%; /* 背景图像初始位置 */
  }
  100% {
    background-position: 100% 100%; /* 背景图像结束位置 */
  }
}
.card {
  max-width: 1000px;
  width: 200%;
  height: 100%;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form {
  margin-bottom: 20px;
}

.input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.button:hover {
  background-color: #0056b3;
}

.toggle-button {
  width: 100%;
  padding: 8px;
  background-color: #ccc;
  color: #333;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.toggle-button:hover {
  background-color: #b3b3b3;
}

.error-message {
  color: red;
  font-size: 12px;
}

.agreement {
  font-size: 12px;
  color: #777;
  margin-top: 10px;
}
</style>
