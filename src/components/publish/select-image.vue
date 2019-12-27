<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="素材库" name="material">
      <!-- 渲染数据 -->
      <div class="imageBox">
        <el-card class="imageCard" v-for="item in list" :key="item.id">
          <img @click="clickImg(item.url)" :src="item.url" alt />
        </el-card>
      </div>
      <el-row type="flex" justify="center" align="middle">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="page.total"
          :page-size="page.pageSize"
          :current-page="page.currentPage"
          @current-change="changePage"
        ></el-pagination>
      </el-row>
    </el-tab-pane>
    <el-tab-pane label="上传图片" name="upload">上传图片</el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'material',
      //   定义一个list
      list: [],
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  methods: {
    //   点击图片
    clickImg (url) {
    //   alert(url)
    // 把图片传出去  子给父传值 $emit('自定义事件名'，参数)
      this.$emit('selectImg', url)
    },
    //   分页
    changePage (newpage) {
      this.page.currentPage = newpage
      this.getMaterial()
    },
    //   获取素材
    getMaterial () {
      this.$axios({
        url: 'user/images',
        params: {
          collect: false,
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      }).then(res => {
        this.list = res.data.results
        this.page.total = res.data.total_count
      })
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang="less" scoped>
.imageBox {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .imageCard {
    width: 120px;
    height: 120px;
    margin: 10px;
    img {
      width: 100%;
    }
  }
}
</style>
