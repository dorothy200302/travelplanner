import register from '@/views/register.vue'
import {createRouter, createWebHistory} from "vue-router";
import primary from '@/views/primary.vue'
import plan from '@/views/plan/plan.vue'
import t from '@/components/flight.vue'
import MapContainer from '@/views/MapContainer.vue';
import test from "@/components/test.vue";
import makedealsuccess from "@/components/makedealsuccess.vue";
import blogDetail from "@/views/blogDetail.vue";
import viewsubregion from "@/components/viewsubregion.vue";
import goodCard from "@/components/goodCard.vue";
import transportSection from "@/components/transportSection.vue";
import shopSection from "@/components/shopSection.vue";
import shopDetail from "@/components/specifical_detail/shopDetail.vue";
import personalPage from "@/components/user/personalPage.vue";
import otherUser from "@/components/user/otherUser.vue";
import preference_pick from "@/components/preference_pick.vue";
import home from "@/home.vue";
import App from "@/App.vue";
import searchResult from "@/components/searchResult.vue";
import hotelDetail from "@/components/specifical_detail/hotelDetail.vue";
import resortDetail from "@/components/specifical_detail/resortDetail.vue";
import infoEdit from "@/components/user/infoEdit.vue";
import hotelSection from "@/components/secondaryCategory/hotelSection.vue";
import chat from "@/components/chat.vue";
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    // path 和 component 对应关系的位置
    routes: [
        {
            path:'/SuccessOrder/:orderId',
            component:makedealsuccess,
            name:'SuccessOrder',
            props:true
        },{
            path:'/user/:id',
            component:otherUser,
            props:true
        },
        {
            path:'/blog_Detail/:id',
            name:'blog_Detail',
            component:blogDetail,
            props:true
        },
        {
            path:'/hotelDetail/:id',
            component:hotelDetail,
            name:'hotelDetail',
            props:true
        },
        {
            name:'info-edit',
            path:'/info-edit/:userId',
            component:infoEdit,
            props:true
        },
        {
            path:'/myPage/:userId',
            component:personalPage,
            name:'myPage',
            props:true
        },
        {
            path:'/transportation/:typeId',
            component:transportSection,
            props:true
        },
        {
            path:'/shopsection/:typeId/:typeName',
            component:shopSection,
            name:'shopsection',
            props:true
        },
        {
          path:'/hotel_section',
          component:hotelSection,
        },
        {
            path:'/preference_pick/:userId',
            component:preference_pick,
            name:'preference_pick',
            props:true
        },
        {
            path:'/shopDetail/:id',
            component:shopDetail,
            name:'shopDetail',
            props:true
        },
        {
            path:'/test',
            component:infoEdit
        },
        {
            path: '/login',
            component: register
        }, {
            path: '/goodCard',
            component: goodCard
        },
        {
            path:'/planRoute',
            component:MapContainer
        },

        {
            path:'/view-subregion/:regionId',
            component:viewsubregion,
            name:'view-subregion',
            props:true
        },
        {
            path:'/t',
            component:t
        },
        {
            path:'/primary/:userId',
            component:primary,
            name:'primary',
            props:true
        },
        {
          path:'/blog_Detail/:id',
          component:blogDetail,
            props:true
        },{
            path:'/resort_detail/:id',
            component:resortDetail,
            name:'resort_detail',
            props:true
        },
        {
            name:'plan',
            path:'/plan/:destination/:count/:budget/:dates+',
            component:plan,
            props:true
        },
        {
            path:'/map',
            component:MapContainer,
            props:'/approach'
        },
        {
            path:'/s/:typeId',
            component:shopSection
        },
        {
            path:'/chat',
            component:chat
        },

        {
            path: '/',
            component: home
        },
        {path: '/searchResult/:keyWords',
            component:searchResult,
            name:'searchResult',
            props:true}
    ]
})

export default router
