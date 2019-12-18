<template>
  <div class="login">
    <el-card class="el-card">
      <div class="title">
        <img src="../../assets/img/logo_index.png" alt />
      </div>
      <el-form :model="loginForm" :rules="loginRules">
        <!-- 绑定表单数据对象 -->
        <el-form-item prop="phone">
          <el-input placeholder="请输入手机号" v-model="loginForm.phone"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input placeholder="验证码" style="width:65%" v-model="loginForm.code"></el-input>
          <!-- 朴素按钮 -->
          <el-button plain style="margin-left:35px">发送验证码</el-button>
        </el-form-item>
        <el-form-item prop="check">
          <el-checkbox>
            我已阅读并同意
            <a href="#" style="color:blue">用户协议</a>和
            <a href="#" style="color:blue">隐私条款</a>
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button v-model="loginForm.check" style="width:100%" type="primary" @click="login">登录</el-button>
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
        check: false
      },
      //   验证登录表单的验证规则
      loginRules: {
        // 校验规则
        // key(字段名):value(数组)
        phone: [{ required: true, message: '请输入您的手机号' }, {
          pattern: /^1[3456789]\d{9}$/, message: '手机号码格式不正确'
        }],
        code: [{ required: true, message: '请输入您的验证码' }, {
          pattern: /^\d{6}$/, message: '验证码格式不正确'
        }],
        // value指当前字段名
        check: [{ validator: function (rule, value, callback) {
          if (value) {
            callback()
          } else {
            callback(new Error('必须同意'))
          }
        }
        }]
      }
    }
  },
  methods: {
    login () {}
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
