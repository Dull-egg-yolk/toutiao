<template>
  <el-card>
    <!-- card自带的具名插槽 -->
    <bread-crumb slot="header">
      <!-- 面包屑的具名插槽 -->
      <template slot="title">评论列表</template>
    </bread-crumb>
    <el-table :data="list">
      <el-table-column label="标题" width="600" prop="title"></el-table-column>
      <el-table-column :formatter="formatter" label="评论状态" prop="comment_status"></el-table-column>
      <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
      <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="obj">
          <!-- {{obj.row.comment_status}} -->
          <!-- 按钮的样式  elementUi -->
          <el-button type="text" size="small">修改</el-button>
          <!-- 传当前行数据 obj.row -->
          <el-button @click="clickbtn(obj.row)" type="text" size="small">{{obj.row.comment_status ? '关闭评论' : '打开评论'}}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    formatter (row, column, value, index) {
      return value ? '正常' : '关闭'
    },
    getComment () {
      this.$axios({
        url: 'articles',
        // query查询参数给params
        params: { response_type: 'comment' }
      }).then(res => {
      // debuggers
        console.log(res)
        this.list = res.data.results
      })
    },
    // 点击开开或者关闭
    // 传参row里面是 id title 等......
    clickbtn (row) {
      // debugger
      let confirm = row.comment_status ? '关闭' : '打开'
      this.$confirm(`是否要${confirm}评论`).then(() => {
        // alert(1)
        // 请求接口
        this.$axios({
          url: 'comments/status',
          method: 'put',
          // row
          params: { article_id: row.id.toString() },
          // 布尔类型  取反 如果是true 就是false
          data: { allow_comment: !row.comment_status }
          // 成功进then
        }).then((res) => {
          // 提示信息
          this.$message({
            type: 'success',
            message: '成功'
          })
          // debugger
          this.getComment()
        // }).catch(() => {
        //   this.$message({
        //     type: 'error',
        //     message: '失败'
        //   })
        })
      })
    }

  },
  // 请求数据
  created () {
    this.getComment()
  }

}
</script>

<style>
</style>
