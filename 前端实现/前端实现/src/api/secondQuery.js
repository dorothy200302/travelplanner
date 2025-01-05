import http from '@/utils/http'

export function getShopTypes () {
    return http({
        url: 'Shop/TypeList'
    })
}
export function getShopDetail (id) {
    return http({
        url: 'Shop/',
        params:{
            id: id
        }
    })
}