//导入Vue框架
import Vue from 'vue'
// 1.导入路由
import VueRouter from 'vue-router'
//此VueRouter是自己自定义引入暴露出来的，即是自定义的，以下的VueRouter同样是这样
// 解决两次访问相同路由地址报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
//2.使用路由
Vue.use(VueRouter);

//导入登录页组件
import login from '../views/login/login.vue'
// 导入首页组件
import index from '../views/index/index.vue'
// 导入首页子组件
import dataList from '../views/index/dataList/dataList.vue'
import userList from '../views/index/userList/userList.vue'
import testList from '../views/index/testList/testList.vue'
import enterprise from '../views/index/enterprise/enterprise.vue'
import subject from '../views/index/subject/subject.vue'
//3.创建路由规则
const routes= [
    {path:'/login', component:login},
    {path:'/index',component:index,
    children:[
        {path:'dataList' ,component:dataList},
        {path:'userList' ,component:userList},
        {path:'testList' ,component:testList},
        {path:'enterprise' ,component:enterprise},
        {path:'subject' ,component:subject},

    ]
}
];
//4.创建路由实例化对象  并挂载路由规则
const router=new VueRouter({
    routes
})
//暴露出去,下一步实现路由实例挂载Vue实例
export default router;