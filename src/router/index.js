import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home'
import Login from '../views/login'
import Home2 from '../views/home/home'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    children: [{
      // 二级路由 不写地址一进来就显示
      path: '',
      component: Home2
    }]
  },
  {
    path: '/login',
    component: Login
  }

]

const router = new VueRouter({
  routes
})

export default router
