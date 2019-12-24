<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">素材管理</template>
    </bread-crumb>
    <el-row type="flex" justify="end">
      <el-upload :http-request="uploading" action="">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
    </el-row>
    <!-- el-tabs 的事件 tab-click -->
    <el-tabs v-model="activeName" @tab-click="changeTab">
      <el-tab-pane label="全部素材" name="all" style="overflow: hidden">
        <div class="box">
          <el-card v-for="item in list" :key="item.id" class="card">
            <img :src="item.url" alt />
            <el-row type="flex" justify="space-around" align="middle" class="row">
              <!-- 图标 -->
              <!-- 方法传进来参数 -->
              <i @click="collectOrcancel(item)" :style="{color:item.is_collected ? 'red' : ''}" class="el-icon-star-on"></i>
              <i @click="del(item)" class="el-icon-delete-solid"></i>
            </el-row>
          </el-card>
        </div>
        <el-row type="flex" justify="center" align="middle">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="this.page.total"
            :page-size="this.page.pageSize"
            :current-page="this.page.currentPage"
            @current-change="pageChange"
          ></el-pagination>
        </el-row>
      </el-tab-pane>

      <el-tab-pane label="收藏素材" name="cell">
        <div class="box">
          <el-card v-for="item in list" :key="item.id" class="card">
            <img :src="item.url" alt />
          </el-card>
        </div>
        <el-row type="flex" justify="center" align="middle">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="this.page.total"
            :page-size="this.page.pageSize"
            :current-page="this.page.currentPage"
            @current-change="pageChange"
          ></el-pagination>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      activeName: 'all',
      page: {
        currentPage: 1,
        total: 0,
        pageSize: 10
      }
    }
  },
  methods: {
    // 请求数据
    getMaterial () {
      this.$axios({
        url: 'user/images',
        method: 'get',
        params: {
          page: this.page.currentPage,
          per_page: this.page.pageSize,
          collect: this.activeName === 'cell'
        }
      }).then(res => {
        debugger
        this.list = res.data.results
        this.page.total = res.data.total_count
      })
    },
    // tab-click,tab被选中时触发,被选中的标签 tab 实例
    changeTab () {
      this.page.currentPage = 1
      this.getMaterial()
      // alert(this.activeName)
    },
    // 点击页码切换全部图片
    pageChange (newpage) {
      this.page.currentPage = newpage
      this.getMaterial()
    },
    // 上传 图片
    uploading (params) {
      // 定义一个fromdata
      let fromD = new FormData()
      fromD.append('image', params.file)
      this.$axios({
        url: 'user/images',
        method: 'post',
        data: fromD
      }).then((res) => {
        debugger
        this.getMaterial()
      })
    },

    // 点击收藏或取消收藏
    collectOrcancel (row) {
      this.$axios({
        url: `user/images/${row.id}`,
        method: 'put',
        // 是否收藏
        data: { collect: !row.is_collected }
      }).then(() => {
        // 重新调用
        this.getMaterial()
        this.$message({
          type: 'success',
          message: '收藏成功'
        })
      })
    },
    // 删除
    del (row) {
      this.$confirm('是否要删除').then(() => {
        this.$axios({
          url: `user/images/${row.id}`,
          method: 'delete'
        }).then(() => {
          // 重新调用
          this.getMaterial()
          this.$message({
            type: 'success',
            message: '删除成功'
          })
        })
      })
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang="less" scoped>
.box {
  display: flex;
  flex-wrap: wrap;
  .card {
    width: 200px;
    height: 200px;
    margin: 13px;
    position: relative;
    img {
      width: 100%;
      height: 150px;
    }
    .row {
      width: 100%;
      height: 25px;
      position: absolute;
      left: 0;
      bottom: 0;
      background-color: aquamarine;
      font-size: 20px;
      i {
        cursor: pointer;
      }
    }
  }
}
</style>
