<template>
  <div class="background">
    <div class="container">
      <h>how about your travel plan?</h>&nbsp;&nbsp<var-button
          color="linear-gradient(to right bottom, #6750A4, #D0BCFF)"
          text-color="#fff" padding="20px 20px" margin-bottom="20px" @click="duu()"
      >
        添加喜好
      </var-button>
      <div class="input-row">
        <input type="text" placeholder="目的地" v-model="destination">
        <input type="number" placeholder="人数"  v-model="count">
        <input type="text" placeholder="时间段" @click="du()"
               v-model="dates">
      </div>
      <div class="input-row">
        <input type="number" placeholder="预算"  v-model="budget">
        <var-button color="#6750A4" @click="search">一键生成旅游计划</var-button>
      </div>
    </div>
    <div class="choice"  v-show="isPickDate" >
      <var-date-picker  v-show="isPickDate" element-loading-background="#6750A4"
                        color="linear-gradient(to bottom right, #6750A4,
#D0BCFF)" v-model="dates" range/>
      <var-button @click="handleDateConfirm">确定</var-button >

    </div>
  </div>
</template>

<script setup>

import {useRoute, useRouter} from "vue-router";
let destination=ref('')
let budget=ref()
let count=ref()
let dates=ref([])
const r=useRouter()
let userId=r.currentRoute.value.params.userId
let isPickDate=ref(false)
function du(){
  isPickDate.value=true
}
function search(){
r.push({
  name:'plan',
  params:{
    destination:destination.value,
    count:count.value,
    budget:budget.value,
    dates: dates.value, // 将值转换为数组
  }
})
}
function duu(){
  r.push({
      name:'preference_pick',
      params:{
    userId:userId
  }}
  )
}
function handleDateConfirm() {
  console.log(dates)
  isPickDate.value = false; // 关闭日期选择器
}
</script>

<style scoped>
h{
  font-size: 36px;
  padding: 20px 10px;
  color: #6750A4;
}
h2{
  margin-left: 80%;
  color: #6750A4;
}
.background {
  width: 1500px;
  height: 100vh;
  color: #6750A4;

  min-height: 100vh;
  background-image: url('@/assets/images/img.png');
  background-size: cover;
  background-position: center;
}
:deep .var-button--primary {
  color: var(--button-primary-text-color);
  background-color:#6750A4 ;
}
:deep .var-button--large {
  height: var(--button-large-height);
  padding: var(--button-large-padding);
  color: #6750A4;

  font-size: var(--button-large-font-size);
}
:deep .var-counter__controller {
  display: flex;
  align-items: center;
  color: #6750A4;

  color: var(--counter-font-color);
  border-radius: var(--counter-button-size);
  padding: var(--counter-padding);
  background: #6750A4;
  transition: color 0.25s, background-color 0.25s, opacity 0.25s;
}
.container {
  position: relative;
  top: 50%;
  width: 80%;
  margin-left: 10%;
  right: 0;
  color: #6750A4;

  transform: translateY(-50%);
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.input-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  left: 50%;
  width: 80%;
  color: #6750A4;
  padding: 10px;

}
.input-row input[type="text"],
.input-row input[type="number"] {
  flex: 1; /* 让输入框自动填充剩余空间 */
  padding: 8px 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  color: #6750A4;

}
.container input, .container button {
  padding: 8px 12px;
  font-size: 16px;
  color: #6750A4;

  border: 1px solid #ccc;
  border-radius: 5px;
}

.container button {
  background-color: #6750A4;
  color: #fff;
  cursor: pointer;
}
</style>
