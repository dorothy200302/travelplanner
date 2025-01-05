<script setup>
import http from "@/utils/http.js";
import {h} from "vue";

let isTest=ref(false)
 let   filterNames=ref( {
  brand: "品牌",
      city: "城市",
      starName: "星级",
      price: "价格",
})
let filterList=ref({ })// 过滤项的假数据
let sortItems=ref( [
  {
    key: "default",
    text: "默认",
  },
  {
    key: "score",
    text: "评价",
  },
  {
    key: "price",
    text: "价格",
  }
])// 排序字段的假数据
 let   hotels=ref( [])// 酒店数据
  let  total=ref(0);  // 总条数
 let   totalPage=ref(0) ; // 总页数
let   params=ref( {
  key: "", // 搜索关键字
      page: 1, // 当前页码
      size: 5, // 每页大小
      sortBy: "default",// 排序字段
      filters: {}, // 过滤字段
})
let map=ref( {})// 地图对象
let loc=ref("")  // 地图标记
  let  ml= 0 // 控制地图位置
 let   geolocation=ref({}) // 定位系统
let loading=ref(false)// false, // 是否在定位
 let   currentHotel=ref({})
let ops=ref([]) // 自动补全列表 [],
  let  showOps=ref(false)// false,
  let  opsIndex=ref(-1)// -1,
  let  isFixed=ref(false)
  let  testFilterData=ref({
  "city": ["上海", "北京", "深圳", "杭州"],
      "starName": ["四星","五星","二钻","三钻","四钻","五钻"],
      "brand": ["7天酒店",  "如家","速8", "皇冠假日","华美达","万怡","喜来登","万豪","和颐","希尔顿"],
})
watch(() => params.value.filters, (newFilters, oldFilters) => {
  search();
  // 获取过滤项
  getFilter();
}, { deep: true });
watch([() => params.value.sortBy, () => params.value.page], () => {
  search(loc);
});
watch(() => opsIndex, (newOpsIndex, oldOpsIndex) => {
  if (newOpsIndex !== -1) {
    params.key = ops[newOpsIndex];
  }
});
  // // 页面加载时，先搜索一下
  // search();
  // // 获取过滤项
  // getFilter();
 onMount(()=> {
  //初始化地图
  map = new AMap.Map('container', {
    resizeEnable: true, //是否监控地图容器尺寸变化
    zoom: 11, //初始地图级别
    center: [120.0, 32.0], //初始地图中心点
  });
  // 初始化定位系统
  AMap.plugin('AMap.Geolocation', () => {
    geolocation = new AMap.Geolocation({
      position: 'RT',    //定位按钮的停靠位置
      buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
      zoomToAccuracy: true,   //定位成功后是否自动调整地图视野到定位点
    });

    AMap.Event.addListener(geolocation, 'complete', result => {
      if (params.page !== 1) {
        params.page = 1;
        loc = result.position.lat + ", " + result.position.lng;
      } else {
        searchByMap(result.position.lat + ", " + result.position.lng);
      }

    });//返回定位信息
    AMap.Event.addListener(geolocation, 'error', err => console.log(err));      //返回定位出错信息
  });

  let oDiv = document.querySelector(".map-box"),
      H = 0,
      Y = oDiv;
  while (Y) {
    H += Y.offsetTop;
    Y = Y.offsetParent;
  }
  window.addEventListener('scroll', () => handleScroll(H, oDiv));
})

 function handleScroll(h, o) {
    let s = document.body.scrollTop || document.documentElement.scrollTop
   isFixed = s > h;
    ml = o.offsetLeft;
  }
  let show = ref(false);
function handleKeyUp(e) {
    if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 65 && e.keyCode <= 90) || e.keyCode === 8) {
      // 用户输入的字符，需要自动补全
     getSuggestion();
    } else if (e.keyCode === 13) {
      // 用户按回车，需要搜索
     search();
      getFilter();
    } else if (e.keyCode === 38) {
      if (opsIndex > 0) {
       opsIndex--;
      } else {
       opsIndex = ops.length - 1;
      }
    } else if (e.keyCode === 40) {
      opsIndex = (opsIndex + 1) % ops.length;
    } else if (e.keyCode === 27) {
      show = false
    }
  }
function handleSearch(){
    search();
    getFilter();
  }
function getSuggestion() { // 查询自动补全
    if (!params.key) {
      // key没有值，不去搜索了
      ops = [];
      return;
    }
    http.get("/hotel/suggestion?key=" + params.key)
        .then(resp => {
         ops = resp.data;
        })
        .catch(e => {
          if(isTest){
            ops = ["万豪", "如家", "喜来登"]
          }else{
            ops = []
          }
          console.log(e);
        })
  }
function getFilter() {
    // 准备参数
  const state = params;
  const filters = state.filters;
  const params = { ...state };

  const { price: ps, ... fs } = filters;
  for (let i in fs) {
    params[i] = fs[i];
  }
    // 处理价格
    if(ps){
      let pArr = ps.split("-");
      params.minPrice = parseInt(pArr[0]);
      let max = parseInt(pArr[1]);
      params.maxPrice = max === 0 ? 999999 : max;
    }
    http.post("hotel/filters", params)
        .then(resp => {
          filterList = resp.data;
        })
        .catch(err => {
          console.log(err);
          filterList = testFilterData;
        })
  }
function  searchByMap(location) {
    // 准备参数
  let a=params.location
  let filters = params.filters;
  let params = { ...state };

  let { price: ps, ... fs } = filters;
  for (let i in fs) {
    params[i] = fs[i];
  }
    // 处理价格
    if(ps){
      let pArr = ps.split("-");
      params.minPrice = parseInt(pArr[0]);
      let max = parseInt(pArr[1]);
      params.maxPrice = max === 0 ? 999999 : max;
    }

    // 准备地址
    if (location) {
      params.location = location;
      loc = location;
    }

    http.post("hotel/list", params)
        .then(resp => {
         hotels = resp.data.hotels;
          total = resp.data.total;
         totalPage = Math.floor((total + 5 - 1) / 5);
          if (location) {
           setMapCenter(location);
          } else if(hotels && hotels.length > 0){
            setMapCenter(hotels[0].location);
          }
          initMarker();
        })
        .catch(err => {
          console.log(err)
         hotels = [{"id":60223,"name":"上海希尔顿酒店","address":"静安华山路250号","price":2688,"score":37,"brand":"希尔顿","city":"上海","starName":"五星级","business":"静安寺地区","location":"31.219306, 121.445427","pic":"https://m.tuniucdn.com/filebroker/cdn/res/92/10/9210e74442aceceaf6e196d61fc3b6b1_w200_h200_c1_t0.jpg"},{"id":60922,"name":"上海虹桥祥源希尔顿酒店","address":"红松东路1116号","price":1108,"score":45,"brand":"希尔顿","city":"上海","starName":"五钻","business":"虹桥地区","location":"31.18746, 121.395312","pic":"https://m.tuniucdn.com/fb3/s1/2n9c/tQRqDTFkHnHzMZiDKjcGV81ekvc_w200_h200_c1_t0.jpg"},{"id":309208,"name":"北京王府井希尔顿酒店","address":"王府井东街8号","price":1679,"score":46,"brand":"希尔顿","city":"北京","starName":"五钻","business":"天安门/王府井地区","location":"39.914539, 116.413392","pic":"https://m.tuniucdn.com/fb2/t1/G6/M00/52/10/Cii-TF3ePt2IX9UEAALb6VYBSmoAAGKMgGsuW8AAtwB147_w200_h200_c1_t0.jpg"},{"id":395434,"name":"北京希尔顿酒店","address":"东三环北路东方路1号","price":350,"score":45,"brand":"希尔顿","city":"北京","starName":"五星级","business":"燕莎/朝阳公园商业区","location":"39.952703, 116.462387","pic":"https://m.tuniucdn.com/fb3/s1/2n9c/3fwNbKGhk6XCrkdVyxwhC5uGpLVy_w200_h200_c1_t0.jpg"},{"id":395702,"name":"北京首都机场希尔顿酒店","address":"首都机场3号航站楼三经路1号","price":222,"score":46,"brand":"希尔顿","city":"北京","starName":"五钻","business":"首都机场/新国展地区","location":"40.048969, 116.619566","pic":"https://m.tuniucdn.com/fb2/t1/G6/M00/52/10/Cii-U13ePtuIMRSjAAFZ58NGQrMAAGKMgADZ1QAAVn_167_w200_h200_c1_t0.jpg"},{"id":615175,"name":"千岛湖滨江希尔顿度假酒店","address":"环湖北路600号","price":1265,"score":47,"brand":"希尔顿","city":"杭州","starName":"五钻","business":"千岛湖镇","location":"29.603634, 119.077596","pic":"https://m.tuniucdn.com/fb3/s1/2n9c/6qzYeUrrXsH5H3cd9bMXLz8MJtT_w200_h200_c1_t0.jpg"},{"id":2351601,"name":"深圳蛇口希尔顿南海酒店","address":"望海路1177号","price":509,"score":47,"brand":"希尔顿","city":"深圳","starName":"五钻","business":"深圳湾口岸/蛇口","location":"22.479373, 113.916013","pic":"https://m.tuniucdn.com/fb2/t1/G6/M00/45/EA/Cii-TF3ZpXOIfa6fAAJjiUOiuYgAAFrtgDtgpQAAmOh799_w200_h200_c1_t0.jpg"},{"id":368701368,"name":"深圳大中华希尔顿酒店","address":"福田深南大道1003号","price":1666,"score":46,"brand":"希尔顿","city":"深圳","starName":"五钻","business":"会展中心/CBD","location":"22.539313, 114.069763","pic":"https://m.tuniucdn.com/fb3/s1/2n9c/4EnHseZ73LXdFJY7DSdJ8xqAcjXe_w200_h200_c1_t0.jpg"},{"id":2048042240,"name":"北京大兴希尔顿酒店","address":"高米店南里18号楼","price":1283,"score":48,"brand":"希尔顿","city":"北京","starName":"五钻","business":"大兴北京新机场地区","location":"39.76875, 116.339199","pic":"https://m.tuniucdn.com/fb3/s1/2n9c/3B32F8zSU2CJCWzs1hoH2o4WcquR_w200_h200_c1_t0.jpg"},{"id":2056105938,"name":"北京通州北投希尔顿酒店","address":"新华东街289号2号楼","price":1068,"score":48,"brand":"希尔顿","city":"北京","starName":"五钻","business":"果园环岛/通州区","location":"39.908805, 116.659748","pic":"https://m.tuniucdn.com/fb3/s1/2n9c/NGKdpec3tZJNUUNWJ5pd67Cp5AY_w200_h200_c1_t0.png"}]
          total = 271;
          totalPage = 28;
        })
  }
function  search(location) {
    searchByMap(location);

  }
function prePage() {
    if (params.page > 1) {
      params.page--
    }
  }
function  nextPage() {
    if (params.page <totalPage) {
      params.page++
    }
  }
function  clickPrice(min, max) {
   params.minPrice = min;
   params.maxPrice = max;
  }
function  clickFilter(key, option) {
    loc = "";
    const {...obj} = params.filters;
    obj[key] = option;
    params.filters = obj;
  }
function deleteFilter(k) {
    loc = "";
    const {...obj} = params.filters;
    delete obj[k];
    params.filters = obj;
  }
function  location(loc) {
    let arr = loc.split(", ");
    let json = '[' + arr[1] + ', ' + arr[0] + ']'
    return JSON.parse(json);
  }
function initMarker() {
    if (!loc) {
      map.clearMap();
    }
    markHotels();
  }
function  setMapCenter(location){
   map.setCenter(location(location));
  }
function  markHotels(){
    hotels.forEach((h, i) => {
      // 将创建的点标记添加到已有的地图实例：
      let marker = new AMap.Marker({
        position: location(h.location),   // 经纬度构成的一维数组[116.39, 39.9]
        title: h.name,
        offset: new AMap.Pixel(0, 0),
        anchor:'bottom-center'
      });
      marker.vid = h.id;
      map.add(marker);
    });
  }
function  handleMarkerFocus(h) {
map.setCenter(location(h.location));
    let old = currentHotel;
    let oldMarker = map.getAllOverlays("marker").find(m => m.vid === old.id);
    if (oldMarker) {
      updateMarker(oldMarker, "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png", "",
          location(old.location), old.id);
    }

    currentHotel = h;
    let marker = map.getAllOverlays("marker").find(m => m.vid === h.id);
   updateMarker(marker, "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png", h.name,
       location(h.location), h.id);
  }
function updateMarker(marker, icon, text, position, id) {
    // 自定义点标记内容
    let markerContent = document.createElement("div");

    // 点标记中的图标
    let markerImg = document.createElement("img");
    markerImg.className = "markerlnglat";
    markerImg.src = icon;
    markerImg.setAttribute('width', '25px');
    markerImg.setAttribute('height', '34px');
    markerContent.appendChild(markerImg);

    // 点标记中的文本
    if (text) {
      let markerSpan = document.createElement("span");
      markerSpan.className = 'marker';
      markerSpan.innerHTML = text;
      markerContent.appendChild(markerSpan);
    }

    marker.setContent(markerContent);
    marker.setPosition(position);
    marker.vid = id;
  }
function getGeoLoc(){
    loading = true;
    geolocation.getCurrentPosition((status,result) => {
      loading = false;
      if(status === 'complete'){
        console.log("successs")
        // https://a.amap.com/jsapi/static/image/plugin/point.png
        addMaker('//a.amap.com/jsapi/static/image/plugin/point.png', result.position.lng,result.position.lat);
        if (params.page !== 1) {
          params.page = 1;
          loc = result.position.lat + ", " + result.position.lng;
        } else {
          searchByMap(result.position.lat + ", " + result.position.lng);
        }
      }else{
        console.log("err", status)
      }
    });
  }
function addMaker(iconUrl, lng, lat){
    // 创建 AMap.Icon 实例：
    let icon = new AMap.Icon({
      size: new AMap.Size(25, 25),    // 图标尺寸
      image: iconUrl,  // Icon的图像
      imageOffset: new AMap.Pixel(0, 0),  // 图像相对展示区域的偏移量，适于雪碧图等
      imageSize: new AMap.Size(25, 25)   // 根据所设置的大小拉伸或压缩图片
    });


    // 将 Icon 实例添加到 marker 上:
    let marker = new AMap.Marker({
      position: new AMap.LngLat(lng, lat),
      offset: new AMap.Pixel(0, 0),
      icon: icon, // 添加 Icon 实例
      title: '北京',
      zoom: 13,
      anchor:"center"
    });
    map.add(marker);
  }

function  remainFilter() {
    let keys = Object.keys(params.filters);
    let obj = {};
    Object.keys(filterList).forEach(key => {
      if (!keys.includes(key) && filterList[key].length > 1) {
        obj[key] = filterList[key];
      }
    })
    return obj;

}

</script>

<template>

  <div style="width: 70%;text-align: center;margin: auto;">
      <div class="search-bar">
        <div class="input-box">
          <input title="输入关键字搜索酒店" v-model="params.key" type="text" @click.stop="" @focus="showOps=true"
                 @keyup="handleKeyUp($event)">
          <button @click="handleSearch">搜索</button>
        </div>
        <div id="complete-box" v-show="showOps && ops.length > 0">
          <div v-for="(item, i) in ops" :key="i" @click="handleSearch" @mouseover="opsIndex = i"
               :style='{"background-color": opsIndex===i ? "#EEE" : "#fff"}'>{{item}}
          </div>
        </div>
      </div>
      <!-- 已选择过滤项 -->
      <div class="selected-ops">
        <div class="open">全部结果：</div>
        <div class="selected-op" v-for="(v, k) in params.filters" :key="k" @click="deleteFilter(k)">
          {{filterNames[k]}}：<span>{{v}} <span class='close'>×</span></span>
        </div>
      </div>
      <!--过滤项-->
      <div class="filter-list">
        <div v-for="(v, k) in remainFilter" :key="k">
          <div class="filter-box">
            <div class="f-key"><strong>{{filterNames[k]}}</strong></div>
            <div class="column-divider"></div>
            <div class="f-items">
              <div class="f-item" @click="clickFilter(k, o)" v-for="(o, j) in v" :key="j"><a href="javascript:void(0)">
                {{o}}</a></div>
            </div>
          </div>
          <div class="row-divider"></div>
        </div>
        <div class="filter-box">
          <div class="f-key"><strong>价格</strong></div>
          <div class="column-divider"></div>
          <div class="f-items">
            <div class="f-item" @click="clickFilter('price','0-100')"><a href="javascript:void(0)">100元以下</a></div>
            <div class="f-item" @click="clickFilter('price','100-300')"><a href="javascript:void(0)">100-300元</a></div>
            <div class="f-item" @click="clickFilter('price','300-600')"><a href="javascript:void(0)">300-600元</a></div>
            <div class="f-item" @click="clickFilter('price','600-1500')"><a href="javascript:void(0)">600-1500元</a></div>
            <div class="f-item" @click="clickFilter('price','1500-0')"><a href="javascript:void(0)">1500元以上</a></div>
          </div>
        </div>
      </div>
      <!-- 排序 -->
      <div class="top-ban">
        <!--排序条件-->
        <div class="sort-items">
          <div class="sort-item" v-for="(item, i) in sortItems" :key="i">
            <a :class="{selected: params.sortBy===item.key}" @click="params.sortBy=item.key"
               href="javascript:void(0)">{{item.text}}</a>
            |
          </div>
        </div>

        <!--分页条-->
        <div class="top-pagination">
          <span>共 <i style="color: #222;">{{total}}</i> 家酒店</span>
          <span><i style="color: red;">{{params.page}}</i>/{{totalPage}}</span>
          <a class="btn-arrow" href="#" style="display: inline-block" @click="prePage">&lt;</a>
          <a class="btn-arrow" href="#" style="display: inline-block" @click="nextPage">&gt;</a>
        </div>
      </div>
      <div class="row-divider" style="margin-bottom: 5px; width: 100%"></div>
      <!--酒店列表-->
      <div style="display: flex; justify-content: space-between;">

        <div class="hotel-list">
          <div class="hotel-box" v-for="(hotel,i) in hotels" :key="i"
               style="display: flex;justify-content: space-between;" @mouseover="handleMarkerFocus(hotel)">
            <div class="ad-mark" v-if="hotel.isAD">
              <img src="./img/ad.png" width="25"/>
            </div>
            <div style="width: 0;"></div>
            <div style="width: 25%"><img width="100%" :src="hotel.pic"></div>
            <div class="hotel-info">
              <div class="hotel-name" v-html="hotel.name">
              </div>
              <div class="star-name"> {{hotel.starName}}</div>
              <div class="address">
                位于 <span style="color: #BC8516;">{{hotel.business}}</span> 周边，{{hotel.address}}
              </div>
              <div class="order"> 1分钟前有人预订了该酒店</div>
              <div v-if="hotel.distance" class="address">距离您 {{hotel.distance.toFixed(2)}} km</div>
            </div>
            <div style="text-align: left; width: 15%;">
              <div>
                <b style="color: #f60;">￥</b> <span id='hotel-price'>{{hotel.price}}</span> <span
                  style="font-size: 0.2em; color: #999;">起</span>
              </div>
              <div class='btn'>立即预定</div>
              <div>
                <span class="hotel-score">{{hotel.score / 10}}分</span> /<span>5分</span>
              </div>
            </div>
          </div>
        </div>
        <div :class='{"map-box": true, "fixed-map": isFixed}' :style="{left: ml + 'px'}">
          <div class="map-head">地图预览</div>
          <div class="amap" id="container"></div>
          <div class="map-geo" @click="getGeoLoc">
            <img src="https://a.amap.com/jsapi/static/image/plugin/waite.png" v-show="loading">
          </div>
        </div>
      </div>
    </div>
</template>

<style scoped>

.search-bar{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.input-box{
  display: flex;
  width: 35%;
}
.search-bar input {
  border: 0px solid black;
  width: 80%;
  height: 28px;
  line-height: 28px;
  vertical-align: top;
  border-radius: .25rem 0 0 .25rem;
}

.search-bar button {
  width: 20%;
  border: 1px solid black;
  background-color: black;
  color: #fff;
  line-height: 28px;
  margin-left: -6px;
  border-radius: 0 .25rem .25rem 0;
  height: 28px;
}

#complete-box{
  margin-top: 28px;
  position: absolute;
  z-index: 99;
  text-align: left;
  border: 1px solid #f1f1f2;
  width: 336px;
  height: 120px;
  background-color: #fff;
}
#complete-box div{
  padding-left: 7px;
}

.btn {
  height: 34px;
  line-height: 34px;
  padding: 0 12px;
  font-size: 16px;
  font-family: "Arial", "PingFang SC", "Microsoft Yahei", "SimSun", sans-serif;
  color: #FFF;
  background: #CD8C95;
  border-color: #CD8C95;
  vertical-align: top;
  text-align: center;
  display: inline-block;
  box-sizing: content-box;
  cursor: pointer;
  border-radius: 3px;
}

em {
  color: red;
  font-style: normal;
}

.selected {
  color: red;
}

.filter-list {
  padding: 5px 0;
  background: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 3px 1px rgba(0, 0, 0, 0.2);
}

.filter-box {
  display: flex;
  align-content: center;
  position: relative;
  line-height: 24px;
}

.f-key {
  font-size: 12px;
  color: #666;
  width: 10%;
  text-align: center;
  margin: auto;
  line-height: 100%;
}
.column-divider{
  width: 2px;
  border-radius: 1px;
  box-shadow: 1px 0 0 rgba(0,0,0,.2) inset,-1px 0 0 rgba(255,255,255,.2) inset;
}
.row-divider{
  margin: auto;
  width: 98%;
  border-radius: 1px;
  height: 3px;
  box-shadow:0 1px 0 rgba(0,0,0,.2) inset,0 -1px 0 rgba(255,255,255,.2) inset;
}
a {
  text-decoration: none;
  color: #999;
}

a:hover {
  color: #CD8C95;
}

.f-items {
  width: 85%;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
}

.f-item {
  width: 80px;
  line-height: 30px;
  font-size: 12px;
}
.btn-arrow{
  border-radius: 3px;
}
.btn-arrow,
.btn-arrow:visited,
.btn-arrow:link,
.btn-arrow:active {
  width: 46px;
  height: 23px;
  border: 1px solid #DDD;
  background: #FFF;
  line-height: 23px;
  font-family: "\5b8b\4f53";
  text-align: center;
  font-size: 16px;
  color: #AAA;
  text-decoration: none;
  out-line: none
}

.btn-arrow:hover {
  background-color: #CD8C95;
  color: whitesmoke;
}

.sort-item {
  display: inline;
  width: 50px;
  float: left;
  font-size: 13px;
}

.selected-ops {
  display: flex;
  align-items: center;
}

.open {
  font-size: 12px;
  margin-left: 10px;
  line-height: 24px;
  margin-bottom: 3px;
}

.selected-op {
  border: 1px solid #eee;
  border-radius: 3px;
  font-size: 12px;
  margin-left: 10px;
  line-height: 16px;
  background: #fff;
  padding: 0px 5px 1px;
}

.selected-op:hover {
  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.1);
}

.selected-op span {
  color: red;
  cursor: pointer;
}

.close {
  margin-left: 8px;
  font-size: 16px;
  font-weight: 800;
}

.top-ban {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

.top-pagination {
  padding: 3px 15px;
  font-size: 11px;
  font-weight: 700;
  line-height: 18px;
  color: #999;
  text-shadow: 0 1px 0 rgba(255, 255, 255, .5);
  text-transform: uppercase;
}

.top-pagination span {
  margin-right: 10px;
}


body {
  background-color: #fcfcfc;
}

#app {
  width: 100%;
  display: flex;
  justify-content: center;
}

.star-name {
  width: 50px;
  text-align: center;
  font: 12px/1.5 tahoma, arial, 'pingfang sc', 'Hiragino Sans GB', \5b8b\4f53, sans-serif;
  background-color: #fe7a6b;
  color: #fff;
  margin-bottom: 10px;
  border-radius: 3px;
  padding: 2px 5px;
  zoom: 1;
}
.hotel-info {
  text-align: left;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
#hotel-price {
  font-weight: bold;
  font-size: 24px;
  color: #f60;
  padding-right: 2px;
  font-family: 'Helvetica Neue', 'Arial', 'PingFang SC', 'Microsoft Yahei', 'SimSun', sans-serif;
}

.hotel-name {
  font-size: 18px;
  color: #333;
  font-weight: bold;
  font-family: "Helvetica Neue", "Arial", "PingFang SC", "Microsoft Yahei", "SimSun", sans-serif;
  line-height: 26px;
}

.hotel-score {
  font-size: 14px;
  color: #365873;
  font-weight: 700;
  font: italic small-caps bold 12px/1.5 Arial, sans-serif;
}

.hotel-list {
  display: flex;
  flex-direction: column;
  width: 640px;
  height: 100%;
}
.hotel-list span{
  font-size: 12px;
  font: italic small-caps bold 12px/1.5 Arial, sans-serif;
}
.order {
  color: #2bba9e; cursor: default; font: 12px/1.5 tahoma,arial,'pingfang sc','Hiragino Sans GB',\5b8b\4f53,sans-serif;
}
.address {
  margin-bottom: 10px;font: 12px/1.5 tahoma,arial,'pingfang sc','Hiragino Sans GB',\5b8b\4f53,sans-serif;
}

.hotel-box {
  padding: 20px;
  margin-bottom: 10px;
  position: relative;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 1px 3px 1px rgba(0, 0, 0, 0.2);
}

.hotel-box:hover {
  box-shadow: 0 1px 3px 1px rgba(245, 131, 8, 0.3);
}

.fixed-map {
  position: fixed;
  top: 0;
}

.map-box {
  background-color: #fff;
  color: #666;
  width: 360px;
  height: 400px;
  padding: 5px;
  border-radius: 5px;
  box-shadow: 0 1px 3px 1px rgba(0, 0, 0, 0.2);
}

.map-head {
  line-height: 35px;
}

.amap {
  width: 100%;
  height: 350px;
}

.marker-label{
  font-size: 12px;
}
.marker {
  position: absolute;
  top: -25px;
  right: -100px;
  color: #fff;
  padding: 4px 10px;
  box-shadow: 1px 1px 1px rgba(10, 10, 10, .2);
  white-space: nowrap;
  font-size: 12px;
  font-family: "";
  background-color: #25A5F7;
  border-radius: 3px;
}

em{
  color: red;
}
.ad-mark {
  position: absolute;
  left: 5px;
  top: 0;
}
.ad-mark img{
  filter: drop-shadow(1px 2px 1px rgba(0,0,0,.3))
}

.map-geo{
  position: relative;
  bottom: 35px;
  left: 310px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  background-image: url(https://a.amap.com/jsapi/static/image/plugin/locate.png);
  background-size: 24px;
  background-repeat: no-repeat;
  background-position: 50%;
  background-color: #fff;
  box-shadow: 0 0 5px silver;
}

.map-geo img {
  height: 24px;
  width: 24px;
  background-color: #fff;
  margin: 4px;
  border-radius: 50%;
  -webkit-animation: rotate 2s linear infinite;
}
</style>