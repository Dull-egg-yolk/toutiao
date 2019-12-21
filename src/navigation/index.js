// 权限拦截  导航守卫
import router from '../router'
// to: Route: 即将要进入的目标 路由对象
// from: Route: 当前导航正要离开的路由
// next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
router.beforeEach(function (to, from, next) {
  // if(a.startsWith(b))
// 判断字符串a 是不是以字符串b开头.
// if(a.endsWith(b))
// 判断字符串a 是不是以字符串b结尾.
  if (to.path.startsWith('/home')) {
    let token = window.localStorage.getItem('user-token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
