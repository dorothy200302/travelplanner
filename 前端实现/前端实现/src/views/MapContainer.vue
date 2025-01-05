<script setup>
import { onMounted, onUnmounted } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";
import axios from "axios";
import {useRouter} from "vue-router";

let map = null;
let r=useRouter()
let approach=r.currentRoute.value.params.approach
function guide(){
  if (approach===''){

  }
}

let responseData=ref('')

onMounted(() => {
  AMapLoader.load({
    key: "41ab88acbe6d8144fb8c898ea57a1e77", // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  })
      .then((AMap) => {    console.log("地图 API 加载成功！");
        map = new AMap.Map("container", {
          // 设置地图容器id
          viewMode: "2D", // 是否为3D地图模式
          zoom: 11, // 初始化地图级别
          scrollWheel:true,
          center: [111, 39.90923], // 初始化地图中心点位置
        });
        AMap.plugin('AMap.Driving', function() {
          let driving = new AMap.Driving({
            // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
            policy: AMap.DrivingPolicy.LEAST_TIME
          })

          let points = [
            { keyword: '北京市地震局（公交站）',city:'北京' },
            { keyword: '亦庄文化园（地铁站）',city:'北京' }
          ]

          driving.search(points, function (status, result) {
            // 未出错时，result即是对应的路线规划方案
          })
        })
        // console.log(map)
        let a = axios.get(
'https://restapi.amap.com/v5/direction/walking?isindoor=0&origin=116.466485,39.995197&destination=116.46424,40.020642&key=41ab88acbe6d8144fb8c898ea57a1e77')
            .then(({data}) => {
              console.log(data);
              responseData.value=data
            })
            .catch(error => {
              console.error('Error fetching data:', error);
            });

      }).then(({data})=>{
    console.log(data)
  })
      .catch((e) => {
        console.log(e);
      });
});

onUnmounted(() => {
  map?.destroy();
});
</script>

<template>
  <div id="container" ></div>
<!--  <div v-html="responseData"></div>-->

</template>

<style scoped>
#container {
  width: 100%;
  height: 100vh;
}
</style>