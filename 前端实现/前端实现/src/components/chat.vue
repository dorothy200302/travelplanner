<script setup>
import {useRouter} from "vue-router";
import http from "@/utils/http.js";

let r=useRouter();
let rid=r.currentRoute.value.params.id;
let user=sessionStorage.getItem("user");

const chatHistory = ref([
  { type: 'bot', text: '您好！ 我是机器人小小我是机器人小小我是机器人小小我是机器人小小我是机器人小小我是机器人小小我是机器人小小我是机器人小小我是机器人小小我是机器人小小我是机器人小小我是机器人小小我是机器人小小，很高兴为您服务。' },
     { type: 'user', text: '你好我是机器人小小我是机器人小小我是机器人小小我是机器人小小我是机器人小小我是机器人小小我是机器人小小我是机器人小小我是机器人小小我是机器人小小我是机器人小小我是机器人小小我是机器人小小' }, { type: 'bot', text: '您好！ 我是机器人小小，很高兴为您服务。' },
  { type: 'user', text: '你ff好' }
]);
const userInput = ref('');

const sendMessage = () => {
  const userMessage = userInput.value;
  chatHistory.value.push({ type: 'user', text: userMessage });
  userInput.value = ''; // 清空输入框

  setTimeout(() => {
    http.get('ollama/chat',{params:{question:userMessage}}).then(res => {
    const botMessage = res.data;
    chatHistory.value.push({ type: 'bot', text: botMessage });});
    // 滚动到指定元素
    // let element = document.getElementById("#2");
    // element.scrollIntoView({
    //   behavior: "smooth",
    //   block: "end"
    // });
        const container = this.$refs.container;
        container.scrollTop += 100;

        // }); // 模拟延迟
    // 在页面加载后将页面滚动到底部

  }
  );
function displayText() {
  let index = 0;
  const interval = setInterval(() => {
    if (index < text.length) {
      this.displayedText += this.text[index++];
    } else {
      clearInterval(interval);
    }
  }, 100); // 控制逐字显示的速度，单位为毫秒
}}

</script>

<template>
<!--  <div class="container">-->
    <div>
        <h1>Chat with {{user}}</h1>
        <p>This is the chat room for {{user}} with id {{rid}}</p>
        <p>You can start chatting here</p>
      <div class="chat-history">
        <div v-for="(message, index) in chatHistory" :key="index" class="message">
          <div v-if="message.type === 'user'" class="user-message">
            <div style="margin: 80px 15px 25px 20px;overflow: auto " >{{ message.text }}</div>
            <div class="basic-icon" style="float:right;align-self:flex-start;
           margin-left: 80px" >
              <img src="/images/img_2.png" style="border-radius: 50%; width: 42px;
               margin: 20px 20px 30px 30px; float:right;align-self:flex-start;height: 60px;
              " alt="">
            </div>
          </div>
          <div v-else class="bot-message" id="2" >
            <div class="basic-icon" style="float:left;" >
            <img src="/images/img_3.png" style="border-radius: 50%;
            width: 50px;align-self:flex-start;
            margin: 10px 10px 10px 10px;
            height: 60px; float:left;" alt=""></div>
            <div style="margin: 80px 15px 25px 20px;overflow: auto ">{{ message.text }}</div>
<!--          </div><div style=" margin: 40px 5px 5px 20px; float:left;"></div>-->
            </div>

        </div>

      </div>

    </div>
    <div class="chat-input" id="1">
      <input style="height:60px" v-model="userInput" @keyup.enter="sendMessage" placeholder="请输入您的问题" />

    </div>

<!--  </div>-->
</template>

<style scoped>
.container {
  //position: relative;
  width: 100%;
  margin: 40px ;
  //overflow: auto; /* 添加滚动条 */
  padding: 80px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}.basic-icon {
   width:8px;
   height: 18px;
   padding: 1px;
   background-color: #fff;
   border-radius: 50%;
   box-shadow: 0 0 3px 2px rgba(0, 0, 0, 0.07);
 }
.user-message {
  background-color: #e0e0e0;
  padding: 30px 20px 20px 20px;
  border-radius: 35px;
  margin: 15px 15px 15px 20px;
word-wrap: break-word;
  text-align: right;
  display: flex;
  justify-content: right;
  align-items:flex-start;
}

.bot-message {
  border-radius: 35px;
  background-color: #c7edff;
  margin: 40px 40px 40px 40px;
  padding: 20px;
  display: flex;
  //margin: 15px 5px 5px 20px;
  text-align: left;
  word-wrap: break-word;
}

.chat-input {
  margin-top: 20px;
  text-align: center;
  position:fixed;
  bottom: 20px;
  width:80%;
  height: 80px;
  padding: 10px;
}

input {
  padding: 10px;
  width: 80%;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>