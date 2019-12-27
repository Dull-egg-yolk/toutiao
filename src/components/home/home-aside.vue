<template>
  <div class="home-aside">
    <div class="title">
      <img src="../../assets/img/hai.png" alt="">
    </div>
    <el-menu :router="true" background-color="#323745" text-color="#fff" active-text-color=" #ffd04b" style="width:301px">
      <el-menu-item index="/home">
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <span>内容管理</span>
        </template>

        <el-menu-item index="/home/publish">发布文章</el-menu-item>
        <el-menu-item index="/home/article">内容列表</el-menu-item>
        <el-menu-item index="/home/comment">评论列表</el-menu-item>
        <el-menu-item index="/home/material">素材管理</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <span>粉丝管理</span>
        </template>

        <el-menu-item index="/home/fans-data">图文数据</el-menu-item>
        <el-menu-item index="/home/fans-file">粉丝概况</el-menu-item>
        <el-menu-item index="/home/fans-pic">粉丝画像</el-menu-item>
        <el-menu-item index="/home/fans-list">粉丝列表</el-menu-item>
      </el-submenu>
      <el-menu-item index="/account">
        <span slot="title">账户信息</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {}
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
