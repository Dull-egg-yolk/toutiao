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
          <el-button
            @click="clickbtn(obj.row)"
            type="text"
            size="small"
          >{{obj.row.comment_status ? '关闭评论' : '打开评论'}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-row type="flex" justify="center" align="middle">
      <!-- 加参数 element里的分页 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :current-page="page.currentPage"
        :page-size="page.pageSize"
        :total="page.total"
        @current-change="pageChange"
      ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [],

      page: {
        // 当前页数
        currentPage: 1,
        // 总条数
        total: 0,

        // 每页多少条
        pageSize: 10
      }
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

        params: {
          response_type: 'comment',
          // 分页的参数加进来 page 页   per_page 每页多少条
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      }).then(res => {
        // debuggers
        console.log(res)
        this.list = res.data.results
        // 接口总数 等于 总条数 total_count 是后端接口给的
        this.page.total = res.data.total_count
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
        }).then(res => {
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
    },
    // 点击页码
    // 参数 点几显示几
    pageChange (newpage) {
      // 当前页 赋值给newpage
      this.page.currentPage = newpage
      this.getComment()
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
