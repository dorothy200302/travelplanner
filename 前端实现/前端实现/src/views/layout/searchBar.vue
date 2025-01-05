
<script setup>
import {reactive, ref} from 'vue'
import { StyleProvider, Themes } from '@varlet/ui'
let destination=ref()
const formData = reactive({
  count1: 0,
  count2: 0,
  count3: 0
})
const date = ref(['2021-04-08', '2021-04-20'])
let isPickDate=ref(false)
let isPickDestination=ref(false)
let isNumberPick=ref(false)
</script>

<template>

  <var-space :size="[20, 40]">
    <i class="iconfont icon-lvyouquan"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <var-button-group  size="large" type="primary" color="linear-gradient(to bottom right, #6750A4, #D0BCFF)"
                       >
      <var-button size="large" @click="isPickDate=true,isNumberPick=false,isPickDestination=false">时间段</var-button>
      <var-button @click="isNumberPick=true,isPickDestination=false,isPickDate=false">同行人</var-button>
      <var-button @click="isPickDestination=true,isPickDate=false,isNumberPick=false">目的地</var-button>
     <var-button @click="isPickDestination=false,isPickDate=false,isNumberPick=false">提交</var-button>

    </var-button-group>
  </var-space>


  <div class="choice"  v-show="isPickDate" >
    <var-date-picker color="linear-gradient(to bottom right, #6750A4,
    #D0BCFF)" v-show="isPickDate" element-loading-background="#6750A4"  type="date" v-model="date" range/>
  </div>

  <div class="choice"  v-if="isNumberPick">
    <var-form>
      <div style="display: flex; align-items: center; margin-bottom: 10px;"> <!-- 添加margin-bottom以确保间距 -->
        <var-counter :rules="[v => v >= 0 || '必须大于等于0']" v-model="formData.count1" />
        <var-radio :checked-value="1">成人</var-radio>
      </div>
      <div style="display: flex; align-items: center; margin-bottom: 10px;"> <!-- 同样添加margin-bottom -->
        <var-counter :rules="[v => v >= 0 || '必须大于等于0']" v-model="formData.count2" />
        <var-radio :checked-value="1">儿童</var-radio>
        <!-- 确保var-checkbox-group不会破坏布局，可能需要设置其样式 -->
        <var-checkbox-group @click=""></var-checkbox-group>
      </div>
      <div style="display: flex;margin-bottom: 10px; align-items: center;"> <!-- 最后一行不需要额外的margin-bottom -->
        <var-counter :rules="[v => v >= 0 || '必须大于等于0']" v-model="formData.count3" />
        <var-radio :checked-value="3">婴儿</var-radio>
      </div>
    </var-form>
  </div>
  <div class="choice" v-if="isPickDestination">
    <var-space direction="column" size="large">
    <var-input placeholder="请输入文本" v-model="destination" />
    </var-space>
  </div>


</template>
<style scoped>
.iconfont{
  font-size: 60px;
}
.var-button-group {

}
::v-deep .var-button-group{
  top: 20%;
}
var-input{
  top: 40%;
}
.choice{
  top: 50%;
  position: relative;
  width: 40%;

}
.human{
  top: 40%;
  position: absolute;
  width: 40%;
}

.var-input__input {
  width: 100px;
  position: absolute;
  height: 50px;
  padding: 0;
  outline: none;
  border: none;
  top: 40%;
  background: transparent;
  color: var(--field-decorator-text-color);
  caret-color: var(--field-decorator-focus-color);
  font-size: var(--input-input-font-size);
  transition: color 0.25s;
}

::v-deep .var-button--primary {
  color: var(--button-primary-text-color);
  background-color:#6750A4 ;
}
::v-deep .var-button--large {
  height: var(--button-large-height);
  padding: var(--button-large-padding);
  font-size: var(--button-large-font-size);
}
::v-deep .var-counter__controller {
  display: flex;
  align-items: center;
  color: var(--counter-font-color);
  border-radius: var(--counter-button-size);
  padding: var(--counter-padding);
  background: #6750A4;
  transition: color 0.25s, background-color 0.25s, opacity 0.25s;
}
</style>