import http from '@/utils/http.js'
export function queryBlogById(id){
    return http({
        url:'blog/',
        params:{
            id:id
        }
    })
}
export function queryShopById(id){
    return http({
        url:'Shop/',
        params:{
            shopId:id
        }
    })
}

export function clickShop(id){
    return http({
        url:'/blog/',
        params:{
            id:id
        }
    })
}export function purchase(id){
    return http({
        url:'/blog/',
        params:{
            id:id
        }
    })
}