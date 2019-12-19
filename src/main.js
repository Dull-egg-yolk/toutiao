import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入axios
import axios from 'axios'
// 引入初始化样式
import './styles/index.less'
// 引入element
import ElementUI from 'element-ui'
// 引入样式
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
Vue.config.productionTip = false
// 在axios统一导入之前 设置一个常态值
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
// 赋值全局对象
Vue.prototype.$axios = axios
// 相当于所有的Vue的实例就都有了这个$axios属性
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
