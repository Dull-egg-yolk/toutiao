<template>
  <el-row type="flex" justify="space-between" class="row">
    <el-col :span="6">
      <i class="el-icon-s-unfold"></i>
      <span style="font-size:16px">江苏传智播客教育科技股份有限公司</span>
    </el-col>
    <el-col :span="6">
      <el-row type="flex" justify="end" align="middle">
        <!-- 三元表达式   -->
        <img :src="userinfo.photo ? userinfo.photo : defultImg" alt=""/>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            {{ userinfo.name }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="info">个人信息</el-dropdown-item>
            <el-dropdown-item command="git">git地址</el-dropdown-item>
            <el-dropdown-item command="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  // 获取用户信息
  data () {
    return {
      // 响应式数据
      userinfo: {},
      // 用require 把地址转成变量
      defultImg: require('../../assets/img/avatar.jpg')
    }
  },
  //  生命周期 查询数据
  created () {
    //   获取令牌信息
    // let token = window.localStorage.getItem('user-token')
    this.$axios({
      url: 'user/profile'
      //   请求参数
      // headers: {
      //   //  后台参数  Bearer 必须加空格
      //   Authorization: 'Bearer ' + token
      // }
    }).then((res) => {
      // console.log(res)

      console.log(res.data)
      this.userinfo = res.data
    })
  },
  methods: {
    handleCommand (command) {
      // alert(1)
      if (command === 'logout') {
        window.localStorage.removeItem('user-token')
        this.$router.push('/login')
      }
    }
  }

}
</script>

<style lang="less" scoped>
.row {
  margin-top: 20px;
}
img{
    width: 40px;
    height: 40px;
    border-radius: 20px;
}
</style>
