<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">素材管理</template>
    </bread-crumb>
    <el-tabs v-model="activeName">
      <el-tab-pane label="全部素材" name="all" style="overflow: hidden">
        <div class="box">
          <el-card v-for="item in list" :key="item.id" class="card">
            <img :src="item.url" alt />
            <el-row type="flex" justify="space-around" align="middle" class="row">
              <!-- 图标 -->
              <i class="el-icon-star-on"></i>
              <i class="el-icon-delete-solid"></i>
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
    // 点击切换页码
    pageChange (newpage) {
      this.page.currentPage = newpage
      this.getMaterial()
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
      font-size: 20px
    }
  }
}
</style>
