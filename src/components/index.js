// 引入左导航
import homeaside from './home/home-aside.vue'
// 引入头部
import homeheader from './home/home-header.vue'
// 引入面包屑
import breadcrumb from './Breadcrumb/bread-crumb.vue'
export default {
  // install 方法
  install (Vue) {
    //   全局注册
    Vue.component('home-aside', homeaside)
    Vue.component('home-header', homeheader)
    Vue.component('bread-crumb', breadcrumb)
  }

}
