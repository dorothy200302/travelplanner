<script setup>
import {useRouter} from "vue-router";
import http from "@/utils/http.js";

let selected = ref([])
let questionAndChoice=ref([{question:"下述哪些景点吸引你？",choices:[{content:'大自然和热带雨林',id:1},
    {content:'摩天大楼与现代场所',id:2},{content:'宁静和古老的地方',id:3},{content:'表演和聚会',id:4},
    {content:'主题公园和水上世界',id:5}], selected: [] },{question:"你会偏好哪种交通工具来完成这次的城市探险?",choices:[{content:'露天观光巴士',id:6},
    {content:'自驾车',id:7},{content:'火车',id:8},{content:'租车',id:9},{content:'徒步',id:10},{content:'飞机',id:11},
{content:'轮船',id:12},{content:'骑车',id:13}], selected: [] },
  {question:"到了大快朵颐的时刻，你选择哪里用餐？",choices:[{content:'美食广场',id:14},{content:'艺术餐厅和咖啡厅',id:15},{content:'快餐连锁',id:16},{content:'正式餐厅',id:17},{content:'街边小吃',id:18}], selected: [] },
  {question:"度假时你会带上谁同行？",choices:[{content:'驴友',id:19},{content:'朋友',id:20},{content:'自己',id:21},{content:'伴侣或爱人',id:22},{content:'全家',id:23}], selected: [] },
  {question:"你期望在这次旅途中寻获的是？",choices:[{content:'冒险',id:24},{content:'禅意/灵感',id:25},{content:'热情',id:26},{content:'浪漫',id:27},{content:'亲密',id:28}], selected: [] }])
let r=useRouter()
let allSelected=ref([])
let id=r.currentRoute.value.params.userId
function saveAnswer(){
  questionAndChoice.value.forEach(question => {
    allSelected.value.push(...question.selected);
  })
  http.put('user/userFeature/add',
  {userId: id, feature: allSelected.value}).then(({data}) => {
    // 处理返回的数据
  console.log(id)
        r.push({name: "primary",params: {userId: id}})
         console.log(allSelected.value);
      })
      .catch(err => {
        console.log(allSelected.value);
        console.log(err);
      })
}
</script>

<template>
<!--  <var-select :placeholder=q.question multiple v-model="answer1" v-for=" q in questionAndChoice" :key="q.question">-->
<!--    <var-option :label=c.content :value=c.id v-for=" c in q.choices" />-->
<!--  </var-select>-->
 <div class="container"> <div v-for="q in questionAndChoice" :key="q.question">
  <var-select :placeholder="q.question" multiple v-model="q.selected" >
    <var-option :label="c.content" :value="c.id" v-for="c in q.choices" :key="c.id" />
  </var-select>
</div>
  <br><br><br>
  <var-button @click="saveAnswer" block type="primary">保存并继续</var-button>

 </div>
</template>


<style scoped>
.container {
  padding: 40px;
}
.var-button--normal {
  height: var(--button-normal-height);
  padding: var(--button-normal-padding);

  font-size: var(--button-normal-font-size);
}
.var-button--primary {
  color: var(--button-primary-text-color);
  background-color: #6750A4;

}
:deep .var-select__select {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: 24px;
  outline: none;
  border: none;
  font-size: inherit;
  color: var(--field-decorator-text-color);
  word-break: break-all;
  overflow: hidden;
  transition: color 0.25s;
}
:deep .var-field-decorator__controller {
   width: 100%;
  margin-top: 20px;
   display: flex;
   align-items: stretch;
   position: relative;
 }
</style>