import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home'
import Login from '../views/login'
import Home2 from '../views/home/home'
// import Article from '../views/article/publish.vue'
import Arpublish from '../views/article/publish.vue'
import Ararticle from '../views/article/article.vue'
import Arcomment from '../views/article/comment.vue'
import Armaterial from '../views/article/material.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        // 二级路由 不写地址一进来就显示
        path: '',
        component: Home2
      },
      {
        path: '/home/publish/:targetId',
        component: Arpublish
      },
      {
        path: '/home/publish',
        component: Arpublish
      },
      {
        path: '/home/article',
        component: Ararticle
      },
      {
        path: '/home/comment',
        component: Arcomment
      },
      {
        path: '/home/material',
        component: Armaterial
      }
    ]
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
