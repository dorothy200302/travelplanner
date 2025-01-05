<script setup>
import Router from "@/router/index.js";
import flight from '@/components/flight.vue'
import { useRoute } from "vue-router";
import {onMounted, toRefs} from "vue";import { useRouter} from "vue-router";
import {defineComponent} from "vue";
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
import {getPlanAPI} from "@/api/plandetail.js";
let planlist=ref([])
const getplan=async ()=>{
  const res=await getPlanAPI(dates,d,budget,count);
  planlist.value=res.data
}

onMounted(()=>{
  getplan()
})
let ro=useRoute()
let r=useRouter()
let d=r.currentRoute.value.params.destination
let count=r.currentRoute.value.params.count
let budget=r.currentRoute.value.params.budget
let dates=r.currentRoute.value.params.dates
function deal() {
  r.push({
    name:'SuccessOrder',

    params:{
      orderId:123213
    }
  }
  )
}
function alter(){
  r.push({
    path:'/',
  })

}
let alterflight=ref(false)

let flightss=ref([{flight_number: 'CA345', airline: '南方航空', airline_logo: 'https://pic.c-ctrip.com/AssetCatalog/airline/48/MU.png?v=2', start_time: '08:00',end_time:'9:45',end_airport:'SHA', start_airport: 'NJ', price: 500},
    {flight_number: 'CZ319', airline: '南方航空', airline_logo: 'https://pic.c-ctrip.com/AssetCatalog/airline/48/CZ.png?v=2', start_time: '08:00',end_time:'9:45',end_airport:'SHA', start_airport: 'NJ', price: 530,
    },
  {flight_number: 'ZH349', airline: '深圳航空', airline_logo: 'https://pic.c-ctrip.com/AssetCatalog/airline/32/ZH.png', start_time: '08:00',end_time:'9:45',end_airport:'SHA', start_airport: 'NJ', price: 500},{flight_number: 'CA143', airline: '南方航空', airline_logo: 'https://pic.c-ctrip.com/AssetCatalog/airline/48/CZ.png?v=2', start_time: '08:00',end_time:'9:45',end_airport:'NJ', start_airport: 'SHA', price: 260}
    ,{flight_number:'ZH259', airline: '深圳航空', airline_logo: 'https://pic.c-ctrip.com/AssetCatalog/airline/32/ZH.png', start_time: '08:00',end_time:'9:45',end_airport:'SHA', start_airport: 'NJ', price: 500},{flight_number: 'CA143', airline: '南方航空', airline_logo: 'https://pic.c-ctrip.com/AssetCatalog/airline/48/CZ.png?v=2', start_time: '08:00',end_time:'9:45',end_airport:'NJ', start_airport: 'SHA', price: 260}
,{flight_number: 'ZH249', airline: '深圳航空', airline_logo: 'https://pic.c-ctrip.com/AssetCatalog/airline/32/ZH.png', start_time: '08:00',end_time:'9:45',end_airport:'SHA', start_airport: 'NJ', price: 500},{flight_number: 'CA143', airline: '南方航空', airline_logo: 'https://pic.c-ctrip.com/AssetCatalog/airline/48/CZ.png?v=2', start_time: '08:00',end_time:'9:45',end_airport:'NJ', start_airport: 'SHA', price: 260}
,{flight_number: 'ZH653', airline: '深圳航空', airline_logo: 'https://pic.c-ctrip.com/AssetCatalog/airline/32/ZH.png', start_time: '08:00',end_time:'9:45',end_airport:'SHA', start_airport: 'NJ', price: 500},{flight_number: 'CA143', airline: '南方航空', airline_logo: 'https://pic.c-ctrip.com/AssetCatalog/airline/48/CZ.png?v=2', start_time: '08:00',end_time:'9:45',end_airport:'NJ', start_airport: 'SHA', price: 260}])
let plan=ref( {
  destination: '上海',
  startDate: '2024-04-01',
  endDate: '2024-04-05',
  totalDays: 5,
  timeline: [
    {
      activities: [
        {temperature:'21-24度'},
        { type:'transportation',link:'',temperature:'16-20度', description: '乘飞机前往目的地',flight_number: 'CS233', airline: '东方航空', airline_logo: 'https://pic.c-ctrip.com/AssetCatalog/airline/48/MU.png?v=2', start_time: '08:00',end_time:'9:45',end_airport:'SHA', start_airport: 'NJ', price: 500 },
        { duration: '12:00-13:20',link:'',temperature:'21-22度',type:'hotel', description: '抵达目的地并入住酒店',picture:['https://dimg04.c-ctrip.com/images/0203t120009qwtw0h59E5_W_1080_808_R5_D.jpg','https://dimg04.c-ctrip.com/images/02032120009qwrk3uCCB1_W_1080_808_R5_D.jpg','https://dimg04.c-ctrip.com/images/0206r120009qwx8159D6A_W_1080_808_R5_D.jpg'],price:349 ,name:'云和夜泊酒店',location:'上海浦东新区秋亭路128弄' },
        { duration: '15:00-17:00',link:'',temperature:'21-24度', type:'view',description: '参观景点',name:'朱家角',picture:['https://dimg04.c-ctrip.com/images/0104j1200086x852y923C_R_1600_10000.jpg','https://dimg04.c-ctrip.com/images/100h12000000s15vx23C0_R_1600_10000.jpg'],price:380,location:'愚园路1037号'   },
        { duration: '17:00-19:00',link:'',temperature:'21-24度',name:' 附近的福和慧餐厅',type:'restaurant',description: '用餐于',picture:['https://dimg04.c-ctrip.com/images/0105v120009v7j74xEB77_C_1600_1200.png','https://dimg04.c-ctrip.com/images/100v0a0000004y697C181_R_1600_10000.jpg','https://dimg04.c-ctrip.com/images/100r0a0000004y5gkB6EA_C_1600_1200.jpg'],price:380  }
      ]
    },
    {
      activities: [
        {temperature:'18-22度'},
        { type:'transportation',temperature:'17-20度', description: '乘汽车前往目的地',flight_number: '沪CZ7003', airline: '帕萨特4座', airline_logo: 'https://fc1tn.baidu.com/it/u=1486947412,3621967126&fm=202&mola=new&crop=v1', start_time: '08:30',end_time:'8:45',end_airport:'上海小南国', start_airport: '酒店', price: 50 },
        { name:'上海小南国',temperature:'18-22度',duration: '10:00-11:00', type:'restaurant',description: '用餐于附近的',picture:['https://gw.alicdn.com/imgextra/i4/2216840076436/O1CN01m4gzfw1xPjySoQ34x_!!2216840076436.jpg_Q75.jpg_.webp','https://dimg04.c-ctrip.com/images/010381200061k3tz6AAB8_W_671_0_Q90.jpg?proc=autoorient'],price:250  },
        { name:'；陆家嘴',temperature:'18-22度',duration: '11:00-13:00', type:'view',description: '游览',picture:['https://dimg04.c-ctrip.com/images/01010120008c4l0eo64B0_R_1600_10000.jpg','https://dimg04.c-ctrip.com/images/0102p1200083422381FEF_R_1600_10000.jpg','https://dimg04.c-ctrip.com/images/10040m000000dht6p0F19_C_220_140.jpg'],price:380  },
        { temperature:'18-22度',duration: '13:00-14:20', type:'restaurant',description: '用餐于附近的',picture:['https://dimg04.c-ctrip.com/images/02008120009r1ijhw7052_W_1080_808_R5_D.jpg','https://img2.baidu.com/it/u=1997151421,1990021448&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1710867600&t=60a5cb5f5ffccde588bf00c07173323b'],price:380  },
        { temperature:'18-22度',duration: '14:20-17:00', type:'view',description: '游览',picture:['https://lvyo.lehuiets.com/uploads/images/20240131/441c280741d115dd931fd76711a00567.png','http://add.diletong.cn/uploads/images/ueditor/20230510/1683683641554019.jpg','http://add.diletong.cn/uploads/images/ueditor/20230510/1683683644927565.jpg'],
          name:'上海迪士尼乐园',price:680  },
        { temperature:'18-22度',name:'迪士尼内的主题餐厅',duration: '17:00-19:0', type:'restaurant',description: '用餐于附近的',picture:['https://img2.baidu.com/it/u=3724661200,2052352308&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500','https://img1.baidu.com/it/u=167070466,1693370934&fm=253&fmt=auto&app=138&f=JPEG?w=600&h=403'],price:380  },
        { temperature:'18-22度',duration: '19:00', type:'restaurant',description: '乘汽车返回酒店',picture:'https://cars.zuchecdn.com/static/img/car1_8de81432bcc20e964d64b890163b4d99.png',price:50  },

      ]
    },
    // 其他天数的活动安排
  ]

}
)

</script>

<template>
  <div class="background">
    <div id="flight-list-container" v-show="alterflight">
      <div v-for="(f, idx) in flightss" class="flight-item" :key="idx">
        <a href="">
          <div  class="flight-number">{{ f.flight_number }}</div></a>
        <img class="airline-logo" :src="f.airline_logo" :alt="f.airline">
        <div class="start-time">{{ f.start_time }}</div>
        --- <div class="start-time">{{ f.end_time }}</div>
        <div class="start-airport">{{ f.start_airport }}</div>>>
        <div class="start-airport">{{ f.end_airport }}</div>
        <div class="price">${{ f.price }}</div>

      </div></div>
    <div class="container">
      <h2>您的初步方案如下</h2><var-icon name="menu-down" size="larger"/>
      <var-button @click="alter()" text outline type="primary">探索更多</var-button>
     <RouterLink to="/planRoute"> <var-icon name="map-marker-radius" />&nbsp;地图导航</RouterLink>
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      <var-button @click="deal()" text outline type="primary">一键下单</var-button>

      <i class="iconfont icon-ditu"></i><br/>
      <div class="timeline">
        <br/>
        <div v-for="(day, index) in plan.timeline" :key="index" class="day">
          <h3>第{{ index + 1 }}天</h3>
          <div class="activities">
            <div class="activity" v-for="(activity, idx) in day.activities" :key="idx" >
              预估气温：{{activity.temperature}}
              <a @click="alterflight=true" v-show="activity.type === 'transportation' ||
               activity.type === 'hotel' || activity.type === 'view' || activity.type === 'restaurant'">
                点击了解/修改</a>

              <div class="flight" v-if="activity.type === 'transportation'">
                <h2>{{activity.description}}</h2>
                    <div  class="flight-number">{{ activity.flight_number }}</div>
                    <img class="airline-logo" :src="activity.airline_logo" :alt="activity.airline">
                    <div class="start-time">{{ activity.start_time }}</div>
                    --- <div class="start-time">{{ activity.end_time }}</div>
                    <div class="start-airport">{{ activity.start_airport }}</div>>>
                    <div class="start-airport">{{ activity.end_airport }}</div>
                    <div class="price">${{ activity.price }}</div>
              </div>
              <template class="hotel" v-else-if="activity.type === 'hotel'">
                  <h2>{{activity.description}}</h2>
                <div class="content">
                  <div class="text">
                    <RouterLink to="/alter"  > <p >名称: {{ activity.name }}</p></RouterLink>
                    <p>地点: {{ activity.location }}</p>
                    <p class="duration">${{ activity.duration }}</p>
                    <p class="price">${{ activity.price }}</p>
                  </div>&nbsp;
                  <el-carousel class="img-right" >
                    <el-carousel-item  v-for="item in activity.picture" :key="item">
                      <img class="carousel-img" :src="item" alt="" > <!-- 设置图片样式 -->
                    </el-carousel-item>
                  </el-carousel>
<!--                  <img class="img-right" :src="activity.picture">-->
                </div>
              </template>
              <template class="hotel" v-else-if="activity.type === 'view'">
                <h2>{{activity.description}}</h2>
                <div class="content">
                  <div class="text">
                    <p>名称: {{ activity.name }}</p>
                    <p>地点: {{ activity.location }}</p>
                    <p class="duration">${{ activity.duration }}</p>
                    <p class="price">${{ activity.price }}</p>
                  </div>&nbsp;
               <el-carousel class="img-right" >
                    <el-carousel-item v-for="item in activity.picture" :key="item">
                      <img :src="item" alt="" class="carousel-img">
                    </el-carousel-item>
                  </el-carousel>
<!--                  <img class="img-right" :src="activity.picture">-->
                </div>
              </template>
              <template class="hotel" v-else-if="activity.type === 'restaurant'">
              <h2>{{activity.description}}</h2>
<!--              <img class="img-right" :src="activity.picture">-->
              <div class="content">
                <div class="text">
                  <p>名称: {{ activity.name }}</p>
                  <p>地点: {{ activity.location }}</p>
                  <p class="duration">${{ activity.duration }}</p>
                  <p class="price">${{ activity.price }}</p>
                </div>&nbsp;
                <el-carousel class="img-right" >
                  <el-carousel-item v-for="item in activity.picture" :key="item">
                    <img :src="item" alt="" class="carousel-img">
                  </el-carousel-item>
                </el-carousel>
<!--                <el-carousel class="img-right" >-->
<!--                    <img :src="activity.picture" alt="">-->
<!--                </el-carousel>-->
                <img class="img-right" :src="activity.picture">

              </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
#flight-list-container {

  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 20px;
}

.flight-item {
  display: flex;
  align-items: center;

  padding: 5px 0;
  border-bottom: 10px solid #eee;
}

.flight-item img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
  border-radius: 5px;
}
a, .green {
  text-decoration: none;
  color: #007bff;
  transition: 0.4s;
  padding: 9px;
  margin-bottom: auto;
}
.img-right {
  right: 8%;
  position: absolute;
 width: 550px;
  height: 180px;
  margin-bottom: 8%;
}
:deep .var-icon::before {
  position: relative;
  display: inline-block;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  font-weight: bolder;
  font-style: normal;
  line-height:1.5;
}
p{
  color: #111111;
}
.carousel-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.carousel-slide {
  flex: 0 0 auto;
  transition: transform 0.5s ease; /* 添加过渡效果 */
}

.carousel-img {
  width: 100%; /* 设置图片宽度为视图宽度 */
  height: 100%;
  object-fit: cover;
}
.content {
  display: flex;
  align-items: center;
}
.hotel {
  margin-bottom: 20px;
}
.text {
  flex: 1; /* 让文本部分占据剩余空间 */
}
.content {
  width: 50%;
  right: 0;
  overflow: hidden; /* 清除浮动 */
}
.flight {
  display: flex;
  align-items: center;
  margin-right: 10px;
  right: 0;
}
.img{
  width: 50%;
  margin-right: 10px;
}
.flight-number {
  font-weight: bold;
  margin-left: 100px;
  margin-right: 100px;
}

.airline-logo {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}

.start-time {
  font-size: 20px;
  text-transform: uppercase;
  margin-right: 10px;
}

.start-airport {
  margin-right: 10px;
}

.price {
  margin-left: auto;
}
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
.background {
  width: 100%;
  height: 100vh; /* Set the height to 100% of the viewport height */
  overflow: auto; /* 添加滚动条 */
  background-image: url('https://dimg04.c-ctrip.com/images/100e0h0000008rp39A12F_C_1180_462.jpg');
  background-size: 100%;
  background-repeat:no-repeat ;
}

.container {
  position: relative;
  width: 100%;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

h2 {
  margin-bottom: 20px;
}

.timeline {
  display: flex;
  flex-direction: column;
}

.day {
  margin-bottom: 20px;
}

.activities {
  margin-top: 10px;
}

.activity {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
}

.activity h4 {
  margin-bottom: 5px;
}
</style>
