<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">内容列表</template>
    </bread-crumb>
    <el-row class="row">
      <el-col :span="2">文章状态:</el-col>
      <el-col :span="18">
        <!-- change 值改变事件 -->
        <el-radio-group v-model="fromdata.status" @change="changeCondition">
          <el-radio :label="5">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">以发表</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row class="row">
      <el-col :span="2">频道列表:</el-col>
      <el-col :span="18">
        <!-- select  v-model也必须加 -->
        <el-select v-model="fromdata.channel" @change="changeCondition">
          <!-- label  value 必须要 -->
          <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row class="row">
      <el-col :span="2">时间选择</el-col>
      <el-col :span="18">
        <!-- 转化格式 value fromat -->
        <el-date-picker
          v-model="fromdata.value"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="changeCondition"
        ></el-date-picker>
      </el-col>
    </el-row>

    <el-row class="content">
      <span>共找到62285条符合条件的内容</span>
    </el-row>
    <el-row
      type="flex"
      justify="space-between"
      v-for="item in list"
      :key="item.id.toString()"
      style="margin-bottom:40px"
    >
      <el-col :span="16">
        <el-row type="flex">
          <img
            :src="item.cover.images.length ? item.cover.images[0] : defaultImg"
            alt
            style="width:100px;hright:100px"
          />
          <div class="title">
            <span>{{item.title}}</span>
            <!-- v - bind    插值表达式-->
            <el-tag :type="item.status | filterType" class="lable">{{item.status | filterStatus}}</el-tag>
            <span>{{item.pubdate}}</span>
          </div>
        </el-row>
      </el-col>
      <el-col :span="6">
        <el-row type="flex" justify="end" class="tally">
          <span>
            <i class="el-icon-edit"></i>修改
          </span>
          <span @click="del(item.id)">
            <i class="el-icon-delete"></i>删除
          </span>
        </el-row>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" align="middle">
      <el-pagination
        @current-change="pageChange"
        background
        layout="prev, pager, next"
        :current-page="page.currentPage"
        :page-size="page.pageSize"
        :total="page.total"

      ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      fromdata: {
        status: 5,
        channel: null,
        value: []
      },
      // 定义一个接收数据
      channels: [],
      // 定义一个接受列表的数据
      list: [],

      // 如果空 用默认
      defaultImg: require('../../assets/img/back.png'),
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  // 过滤器
  filters: {
    filterStatus (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
        default:
          break
      }
    },
    filterType (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return ''
        case 3:
          return 'danger'
        default:
          break
      }
    }
  },

  methods: {
    // 搜索值 改变条件
    changeCondition () {
      // alert('fromdata.status')
      let params = {
        page: this.page.currentPage,
        per_page: this.page.pageSize,
        status: this.fromdata.status === 5 ? null : this.fromdata.status,
        channel_id: this.fromdata.channel,
        begin_pubdate: this.fromdata.value.length > 0 ? this.fromdata.value[0] : null,
        end_pubdate: this.fromdata.value.length > 1 ? this.fromdata.value[1] : null
      }
      console.log(params)

      this.getArticle(params)
    },
    // 获取下拉列表
    getChannels () {
      this.$axios({
        url: 'channels'
      }).then(res => {
        this.channels = res.data.channels
      })
    },
    // 获取文章列表
    getArticle (params) {
      this.$axios({
        url: 'articles',
        params
      }).then(res => {
        this.list = res.data.results
        this.page.total = res.data.total_count
      })
    },
    // 分页
    pageChange (newpage) {
      this.page.currentPage = newpage

      this.changeCondition()
    },
    // 删除
    del (id) {
      this.$confirm('确定要删除').then(() => {
        this.$axios({
          url: `articles/${id}`,
          method: 'delete'
        }).then((res) => {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.changeCondition()
        })
      })
    }

  },
  created () {
    this.getChannels()
    this.getArticle()
  }
}
</script>

<style lang="less" scoped>
.row {
  height: 60px;
}
.content {
  margin: 60px 0;
}
.title {
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 20px;
  .lable {
    width: 60px;
  }
}
.tally {
  span {
    margin-left: 8px;
    font-size: 14px;
    cursor: pointer;
  }
}
</style>
