<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">账户信息</template>
    </bread-crumb>
    <el-upload class="upload" action="">
        <img src="../../assets/img/hai.png" alt="">
    </el-upload>
    <el-form label-width="100px" :model="formData" :rules="rules" ref="myform">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="formData.name" class="btn"></el-input>
      </el-form-item>
      <el-form-item label="简介" prop="intro">
        <el-input v-model="formData.intro" class="btn"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="formData.email" class="btn"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile" >
        <el-input v-model="formData.mobile" class="btn" disabled></el-input>
      </el-form-item>
    <el-form-item>
         <el-button type="primary" @click="inForm">提交信息</el-button>
    </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        name: '',
        intro: '',
        email: '',
        mobile: '',
        photo: ''
      },
      // 规则校验
      rules: {
        name: [
          { required: true, message: '用户名不能为空' },
          { min: 2, max: 20, message: '用户名为5-20个字' }
        ],
        email: [
          { required: true, message: '邮箱不能为空' },
          { pattern: /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/ }
        ]
      }
    }
  },
  methods: {
    getInformation () {
      this.$axios({
        url: 'user/profile'
      }).then((res) => {
        this.formData = res.data
      })
    },
    //   点击提交
    inForm () {
    //   alert(1)
      this.$refs.myform.validate((isOk) => {
        if (isOk) {
          this.$axios({
            url: 'user/profile',
            method: 'patch',
            data: this.formData
          }).then((res) => {
            this.$message({
              type: 'success',
              message: '提交成功'
            })
          })
        }
      })
    }

  },
  created () {
    this.getInformation()
  }
}
</script>

<style lang="less" scoped>
.upload{
position: absolute;
    right: 300px;
    img{
    width: 200px;
    height: 200px;
    border-radius: 100px
}
}

.btn{
    width: 40%;

}
</style>
