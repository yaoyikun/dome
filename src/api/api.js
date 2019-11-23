// 导入axios
import axios from 'axios'

// 统一设置  基地址
axios.defaults.baseURL='http://183.237.67.218:3002'
// 统一设置  跨域携带cookie
axios.defaults.withCredentials=true;

// 暴露出去  有名字的暴露  名字一般与接口地址一样
// 相当与封装接口函数,暴露后外部只需要调用即可
// 暴露登录接口
export function login(data){
    return axios({
        url:'/login',
        method:'post',
        data
    })
}

// 暴露注册接口
export function register(data){
    return axios({
        url:'/register',
        method:'post',
        data
    })
}
// 暴露短信验证码接口
export function sendsms(data){
    return axios({
        url:'/sendsms',
        method:'post',
        data
    })
}
// 首页获取头像接口
export function getToken(data){
    return axios({
        url:'/token',
        method:'post',
        data
    })
}