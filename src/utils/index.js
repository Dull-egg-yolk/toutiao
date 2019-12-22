// 接口访问 token 统一  请求拦截器  对axios封装
// 引入axios
import axios from 'axios'
// 引入elementui 里的messages
import { Message } from 'element-ui'
// 引入路由
import router from '../router'

// 引入 json-bigint
import jsonBig from 'json-bigint'
// import router from '../router'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/' // 赋值黑马头条的默认地址
// axios 拦截器  两个回调函数 执行请求OK时  第二个 执行请求失败
// config是axios的所有配置
axios.interceptors.request.use(function (config) {
  // 获取token
  let token = window.localStorage.getItem('user-token')
  //   config里的headers headers里的Authorization
  //   Bearer 后面加空格
  config.headers.Authorization = 'Bearer ' + token
  //   返回config
  return config
}, function () {

})
// 数字失真问题
axios.defaults.transformResponse = [function (data) {
  debugger
  return jsonBig.parse(data)
}]
// 响应拦截
axios.interceptors.response.use(function (result) {
  // 成功时
  return result.data ? result.data : {}
}, function (err) {
  // debugger
  console.log(err)
  //  获取状态码
  let status = err.response.status
  let message = ''
  if (status === 400) {
    message = '手机号或者验证码错误'
  } else if (status === 401) {
    window.localStorage.removeItem('user-token')
    router.push('/login')
  } else if (status === 403) {
    router.push('/login')
  } else if (status === 507) {
    message = '服务器数据库异常'
  } else if (status === 404) {
    message = '手机号码不正确'
  }
  //   Message({ type: 'warning', message })
  Message({ type: 'warning', message }) // 提示消息
  //
  // debugger
  return Promise.reject(err)
})
// 请求拦截器完成 可以在main.js里直接引用
// 也可以 导出  然后把main.js 里引入的axis的地址改成现在的
export default axios
