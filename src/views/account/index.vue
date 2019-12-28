<template>
  <el-card v-loading="loading">
    <bread-crumb slot="header">
      <template slot="title">账户信息</template>
    </bread-crumb>
    <!-- http-request覆盖默认的上传行为，可以自定义上传的实现function -->
    <el-upload class="upload" action="" :show-file-list="false" :http-request="uploadImg">
        <img :src="formData.photo ? formData.photo : defaultImg" alt="">
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
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {

      loading: false,
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
      },
      defaultImg: require('../../assets/img/hai.png')
    }
  },
  methods: {
    //   上传图片
    uploadImg (params) {
      console.log(this.formData.photo, params)

      this.loading = true
      let data = new FormData()
      // 放一个photo里的属性file
      data.append('photo', params.file)
      this.$axios({
        url: 'user/photo',
        method: 'patch',
        data
      }).then((res) => {
        this.formData.photo = res.data.photo
        console.log(res)

        this.loading = false
      })
    },
    //   获取用户数据信息
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
            // eventBus
            eventBus.$emit('public')
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
