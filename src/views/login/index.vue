<template>
  <div class="login">
    <el-card class="el-card">
      <div class="title">
        <img src="../../assets/img/logo_index.png" alt />
      </div>
      <!-- ref获取el-form实例 -->
      <el-form :model="loginForm" :rules="loginRules" ref="myForm">
        <!-- 绑定表单数据对象 -->
        <el-form-item prop="phone">
          <el-input placeholder="请输入手机号" v-model="loginForm.phone"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input placeholder="验证码" style="width:65%" v-model="loginForm.code"></el-input>
          <!-- 朴素按钮 -->
          <el-button plain style="margin-left:35px">发送验证码</el-button>
        </el-form-item>
        <el-form-item prop="check" >
          <el-checkbox v-model="loginForm.check">
            我已阅读并同意
            <a href="#" style="color:blue">用户协议</a>和<a href="#" style="color:blue">隐私条款</a>
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%" type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 定义保单数据对象
      loginForm: {
        // 手机号
        phone: '',
        // 验证码
        code: '',
        // 是否勾选
        check: true
      },
      //   验证登录表单的验证规则
      loginRules: {
        // 校验规则
        // key(字段名):value(数组)
        phone: [{ required: true, message: '请输入您的手机号' }, {
          pattern: /^1[3456789]\d{9}$/, message: '手机号码格式不正确'
        }],
        code: [{ required: true, message: '请输入您的验证码' }, {
        // pattern正则表达式
          pattern: /^\d{6}$/, message: '验证码格式不正确'
        }],
        // 自定义校验自定义函数validator
        // validator是一个函数, 其中有三个参数 (rule(当前规则-没什么用),value(当前值),callback(回调函数))
        // value指当前字段名
        check: [{ validator: function (rule, value, callback) {
          if (value) {
            // 是true 校验通过 直接执行callback 是函数调用callback()
            callback()
          } else {
            //   不通过执行callback 传参(错误信息 new一个error)
            callback(new Error('必须同意'))
          }
        }
        }]
      }
    }
  },
  methods: {
    //   提交登录表单
    login () {
    // 对整个表单进行校验的方法，参数为一个回调函数
    // 该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise
      this.$refs.myForm.validate(function (isOk) {
        if (isOk) {
        // 校验成功
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.login {
  background-image: url("../../assets/img/login_bg.jpg");
  height: 100vh;
  background-position: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .el-card {
    width: 460px;
    height: 350px;
    .title {
      text-align: center;
      margin-bottom: 30px;
      img {
        height: 44px;
      }
    }
  }
}
</style>
