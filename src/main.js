import Vue from 'vue'
import App from './App.vue'


//导入elementUi
import ElementUI from 'element-ui'
//导入element全局css样式
import 'element-ui/lib/theme-chalk/index.css';
//使用elementUi
Vue.use(ElementUI);

// 导入全局样式css\
import './style/base.css'



//导入router  路由管理
import router from './router/router.js'

Vue.config.productionTip = false

new Vue({
  router,//路由实例 挂载 vue实例
  render: h => h(App),
}).$mount('#app')
