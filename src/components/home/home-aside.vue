<template>
  <div class="home-aside">
    <div class="title">
      <img src="../../assets/img/hai.png" alt="">
    </div>
    <el-menu :collapse="collapse" :router="true" background-color="#323745" text-color="#fff" active-text-color=" #ffd04b" :style="{width:collapse ? '60px' : '230px'}">
      <el-menu-item index="/home">
        <!-- <template slot="title"> -->
          <i class="el-icon-s-home"></i>
          <span>首页</span>
          <!-- </template> -->
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-s-order"></i>
          <span>内容管理</span>
        </template>

        <el-menu-item index="/home/publish">
        发布文章
        </el-menu-item>
        <el-menu-item index="/home/article">内容列表</el-menu-item>
        <el-menu-item index="/home/comment">评论列表</el-menu-item>
        <el-menu-item index="/home/material">素材管理</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-s-custom"></i>
          <span>粉丝管理</span>
        </template>

        <el-menu-item index="/home/fans-data">图文数据</el-menu-item>
        <el-menu-item index="/home/fans-file">粉丝概况</el-menu-item>
        <el-menu-item index="/home/fans-pic">粉丝画像</el-menu-item>
        <el-menu-item index="/home/fans-list">粉丝列表</el-menu-item>
      </el-submenu>
      <el-menu-item index="/account">
        <!-- <template slot="title"> -->
          <i class="el-icon-s-tools"></i>
          <span>账户信息</span>
          <!-- </template> -->
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {

  // 接收属性
  props: ['collapse']

}
</script>

<style lang="less" scoped>
.home-aside {
    .title {
        img {
            width: 300px;
            height: 100px;
        }
    }
}
</style>
