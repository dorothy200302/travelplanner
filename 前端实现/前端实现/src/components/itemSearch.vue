<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
defineProps({
  searchValue:{
    type:String,
    default:'上海'
  }
})
let r=useRouter()
let searchValue=ref('')
function search() {
  if (searchValue.value === '') {
    r.push({path: '/',
     })
  }
  console.log(searchValue.value)
  r.push({name: 'searchResult',
    params: {keyWords: searchValue.value}})}
let transportApproach=ref('')
function  toPage(i) {
  if (i === 0) {
    r.push({path: '/map', params: {approach: transportApproach.value}})
  } else if (i === 4) {
    r.push({path: '/login'})
  } else if (i === 1){
    r.push({path: '/user-edit', query: {id: b.id}})
  }
}
</script>

<template>

<!--  <div class="search-bar">-->
<!--    <var-icon name="account-circle-outline" @click="toPage(4)" />    <div class="search-input">-->
<!--    <el-input size="big" placeholder="景点，酒店，旅行，美食" v-model="searchValue" >-->
<!--      <i slot="prefix" class="el-input__icon el-icon-search" ></i>-->
<!--      <var-icon name="checkbox-marked-circle-outline" />-->
<!--    </el-input>-->
<!--  </div>    <var-icon name="checkbox-marked-circle-outline"-->
<!--                      @click="search()"/>-->

<!--  </div>-->
  <div class="search-bar">
    <var-icon name="account-circle-outline" @click="toPage(4)" />
    <div class="search-input">
      <el-input size="big" placeholder="景点，酒店，旅行，美食" v-model="searchValue" @keyup.enter="search">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
        <var-icon name="checkbox-marked-circle-outline" />
      </el-input>
    </div>

    <var-icon name="checkbox-marked-circle-outline" @click="search()"/>
  </div>

</template>

<style scoped>
.search-bar{
  background-color: #111111;
  color: white;
  display: flex;
  justify-content: space-around;
  height: 8%;
  align-items: center;
  padding: 0 8px;
}
</style>