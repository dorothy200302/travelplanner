import http from '@/utils/http.js'
export function getBannerApi(){
    return http({
        url:''
    })
}
/**
 * @description: 获取人气推荐
 * @param {*}
 * @return {*}
 */
export function findHotAPI(){
    return http({
        url:'blog/hot'
    })
}/**
 * @description: 获取所有商品模块
 * @param {*}
 * @return {*}
 */

