//导入Vue框架
import Vue from 'vue'




// 1.导入路由
import VueRouter from 'vue-router'
//2.使用路由
Vue.use(VueRouter);

//导入组件
import login from '../views/login/login.vue'
//3.创建路由规则
const routes= [
    {path:'/login', component:login}
];
//4.创建路由实例化对象  并挂载路由规则
const router=new VueRouter({
    routes
})
//暴露出去,下一步实现路由实例挂载Vue实例
export default router;