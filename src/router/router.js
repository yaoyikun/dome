//导入Vue框架
import Vue from 'vue'




// 1.导入路由
import VueRouter from 'vue-router'
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