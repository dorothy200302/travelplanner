import axios from 'axios'

// 创建axios实例
const http = axios.create({
    baseURL: 'http://localhost:8081/',
    timeout: 10000
})

// axios请求拦截器
http.interceptors.request.use(config => {
    const token = localStorage.getItem('usertoken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config
}, e => Promise.reject(e))

// axios响应式拦截器
http.interceptors.response.use(res => res.data, e => {
    return Promise.reject(e)
})

export default http
