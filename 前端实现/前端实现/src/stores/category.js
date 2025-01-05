import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCategoryAPI } from '@/api/layout'

export const useCategoryStore = defineStore('category', () => {
    // 导航列表数据管理
    //state 导航列表数据
    const categoryList = ref([])

    // action 获取导航数据的方法
    const getCategory = async () => {
        const res = await getCategoryAPI();
        console.log(res);
        categoryList.value = res.data;
    }

    return {
        categoryList, getCategory
    }
})
