<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">发表文章</template>
    </bread-crumb>
    <!-- 表单 -->
    <el-form label-width="100px" :model="formData" :rules="rules" ref="myform">
      <el-form-item label="标题" prop="title">
        <el-input style="width :60%" v-model="formData.title"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <quill-editor style="height:300px;" type="textarea" v-model="formData.content"></quill-editor>
      </el-form-item>
      <el-form-item label="封面" prop="type" style="margin-top:100px">
        <el-radio-group v-model="formData.cover.type" @change="changeType">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
        {{formData.cover.images}}
      </el-form-item>

      <!-- 放置封面组件 父组件给子组件传值 给谁传就在谁的标签上写属性-->
      <cover-image :list="formData.cover.images"></cover-image>
      <el-form-item label="频道" prop="channel_id">
        <el-select v-model="formData.channel_id" placeholder="请选择频道">
          <el-option v-for="item in list" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="clickPublish()" style="margin-left:100px">发表</el-button>
    <el-button @click="clickPublish(true)">存入草稿</el-button>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        title: '',
        content: '',
        cover: {
          type: 0,
          images: []
        },
        channel_id: null
      },
      // 下拉频道列表
      list: [],
      // 校验规则对象
      rules: {
        title: [
          { required: true, message: '标题不能为空' },
          { min: 5, max: 30, message: '标题长度为5-30' }
        ],
        content: [
          { required: true, message: '内容不能为空' },
          { min: 2, max: 200, message: '内容最大长度为200' }
        ],
        channel_id: [{ required: true, message: '频道分类不能为空' }]
      }
    }
  },

  methods: {
    // change事件
    changeType () {
      if (this.formData.cover.type === 0 || this.formData.cover.type === -1) {
        this.formData.cover.images = []
        // alert(1)
      } else if (this.formData.cover.type === 1) {
        this.formData.cover.images = ['']
      } else if (this.formData.cover.type === 3) {
        this.formData.cover.images = ['', '', '']
      }
    },
    // 获取下拉列表
    getChannels () {
      this.$axios({
        url: 'channels'
      }).then(res => {
        // debugger
        this.list = res.data.channels
      })
    },
    // 点击发布  发表按钮
    clickPublish (draft) {
      this.$refs.myform.validate(isOk => {
        if (isOk) {
          // 相当于封装
          let { targetId } = this.$route.params
          this.$axios({
            url: targetId ? `articles/${targetId}` : `articles`,
            method: targetId ? 'put' : 'post',
            params: { draft },
            data: this.formData
          }).then(res => {
            //   // 跳转到内容列表
            this.$router.push('/home/article')
          })
          // // 解构赋值
          // let { targetId } = this.$route.params
          // if (targetId) {
          //   this.$axios({
          //     url: `articles/${targetId}`,
          //     method: 'put',
          //     params: { draft },
          //     data: this.formData
          //   }).then(res => {
          //   // 跳转到内容列表
          //     this.$router.push('/home/article')
          //   })
          // } else {
          //   this.$axios({
          //     url: 'articles',
          //     method: 'post',
          //     params: { draft },
          //     data: this.formData
          //   }).then(res => {
          //   // 跳转到内容列表
          //     this.$router.push('/home/article')
          //   })
          console.log('校验成功')
          // }
        }
      })
    },
    // 点击修改获取文章
    getArticleId (targetId) {
      this.$axios({
        url: `articles/${targetId}`
      }).then(res => {
        this.formData = res.data
      })
    }
  },
  // 动态路由vue 提醒一下，当使用路由参数时，
  // 例如从 /user/foo 导航到 /user/bar，
  // 原来的组件实例会被复用。因为两个路由都渲染同个组件，
  // 比起销毁再创建，复用则显得更加高效。不过，这也意味着组件的生命周期钩子不会再被调用。
  // 使用的是同一组件
  // 复用组件时，想对路由参数的变化作出响应的话，你可以简单地 watch (监测变化) $route 对象：
  watch: {
    $route: function (to, from) {
      if (Object.keys(to.params).length) {
        //  有参数  => 修改
        this.getArticleId(to.params.targetId)
      } else {
        // 没有参数  => 发布 // 没有参数  => 发布
        this.formData = {
          title: '', // 标题
          content: '', // 文章内容
          cover: {
            type: 0, //   封面类型 -1:自动，0-无图，1-1张，3-3张
            images: [] // 存储的图片的地址
          }
        }
      }
    }
    // 'formData.cover.type': function () {
    //   // debugger
    //   if (this.formData.cover.type === 0 || this.formData.cover.type === -1) {
    //     this.formData.cover.images = []
    //     // alert(1)
    //   } else if (this.formData.cover.type === 1) {
    //     this.formData.cover.images = ['']
    //   } else if (this.formData.cover.type === 3) {
    //     this.formData.cover.images = ['', '', '']
    //   }
    // }
  },

  created () {
    this.getChannels()
    // 获取id  判断有没有id  有就是修改 没有就是发布
    // 解构赋值
    let { targetId } = this.$route.params
    targetId && this.getArticleId(targetId)
  }
}
</script>

<style>
</style>
