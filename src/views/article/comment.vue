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
        <el-buuton>修改</el-buuton>
        <el-buuton></el-buuton>
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
  // 请求数据
  created () {
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
  methods: {
    formatter (row, column, value, index) {
      return value ? '正常' : '关闭'
    }
  }
}
</script>

<style>

</style>
