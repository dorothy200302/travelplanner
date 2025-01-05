import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import {createPinia} from "pinia";
// import 'swiper/swiper-bundle.css'
// 全局指令注册
import { lazyPlugin } from '@/directives/index.js'

import '@varlet/ui/es/style'
import Varlet from '@varlet/ui'
// 引入 vue-awesome-swiper
// import VueAwesomeSwiper from 'vue-awesome-swiper'
const pinia=createPinia()
const app=createApp(App)
app.use(router)
app.use(pinia)
app.use(lazyPlugin)

app.use(Varlet)
// app.use(VueAwesomeSwiper)
app.mount('#app')
