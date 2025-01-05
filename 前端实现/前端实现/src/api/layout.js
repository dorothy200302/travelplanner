import http from '@/utils/http'

export function getCategoryAPI () {
    return http({
        url: 'generalcategory/getAll'
    })
}
export function queryHotelTypeAPI () {
    return http({
        url: 'hotel/queryHotelType'
    })
}
export function queryHotelByIdAPI (id) {
    return http({
        url: 'hotel/get',
        params: {
            id: id}
    })
}
export function getVoucherByHotelId (id) {
    return http({
        url: 'hotel/getVoucherByHotelId',
        params: {
            hotelId: id}
    })
}
export function getVoucherByResortId (id) {
    return http({
        url: 'viewsInfor/getVoucherById',
        params: {
            id: id}
    })
}
export function queryTravelTypeAPI () {
    return http({
        url: 'generalcategory/getAll'
    })
}
export function queryResortTypeAPI () {
    return http({
        url: 'generalcategory/ResortType'
    })
}
export function queryResortByIdAPI (id) {
    return http({
        url: 'viewsInfor/get',
        params: {
            id: id}
    })
}
export function queryResortByRegionAPI (id,current,size) {
    return http({
        url: 'viewsInfor/getViewsByRegion',
        params: {
            regionId: id,
            current: current,
            size: size}
    })
}
export function chatAPI (question,uId) {
    return http({
        url: 'ollama/chat',
        params: {
            question: question,
            uId: uId}
        })
}
export function queryShopByIdAPI (id) {
    return http({
        url: 'Shop/get',
        params: {
            id: id
        }})}
export function queryQualityShop (current,size) {
    return http({
        url: 'Shop/qualityShop',
        params: {
            current: current,
            size: size}

})}
export function queryBlogTypeAPI () {
    return http({
        url: 'blog/types'
    })}
export function queryShopTypeAPI () {
    return http({
        url: 'Shop/TypeList'
    })
}
export function queryHotBlogsAPI (current) {
    return http({
        url: 'blog/hot',
        params:{
            current: current
        }
    })
}
export function queryHotHotelAPI (page, size) {
    console.log(page, size)
    return http({
        url: 'hotel/qualityHotel',
        params: {
            page: page,
            size: size
        }
    })
}

export function queryHotResortAPI () {
    return http({
        url: 'viewsInfor/queryHotResort'
    })
}export function queryHotShopAPI (page, size) {
    return http({
        url: 'Shop/queryHotShop',
        params: {
            page: page,
            size: size
        }
    })
}
export function getViewsByType (type,current,size) {
    return http({
        url: 'viewsInfor/getViewsByType',
        params: {
            type: type,
            current: current,
            size: size
        }
    })
}
export function GenerallySearchAPI (RequestParams) {
    return http.post({
        url: 'search/AnyItem',
        params: {
            key:RequestParams.value.key,
            page:RequestParams.value.page,
        size:RequestParams.value.size,
            city:RequestParams.value.city,
            brand:RequestParams.value.brand,
            starName:RequestParams.value.starName,
            minPrice:RequestParams.value.minPrice,
            maxPrice:RequestParams.value.maxPrice,
            location:RequestParams.value.location,
            sortBy:RequestParams.value.sortBy
}
    })
}

