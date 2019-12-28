// 权限拦截  导航守卫
import router from '../router'

// 引入progress
// import progress from 'nprogress'
import progress from 'nprogress'
import 'nprogress/nprogress.css'
// to: Route: 即将要进入的目标 路由对象
// from: Route: 当前导航正要离开的路由
// next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
// 路由改变路径之前
router.beforeEach(function (to, from, next) {
  // 开启进度条
  progress.start()
  // if(a.startsWith(b))
  // 判断字符串a 是不是以字符串b开头.
  // if(a.endsWith(b))
  // 判断字符串a 是不是以字符串b结尾.
  if (to.path.startsWith('/home')) {
    // 获取token
    let token = window.localStorage.getItem('user-token')
    if (token) {
      // 直接通过
      next()
      // next(false) 终止
    } else {
      // next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航
      next('/login')
    }
  } else {
    next()
  }
})

// 关闭
router.afterEach(function () {
  setTimeout(() =>
    progress.done(), 300
  )
})
