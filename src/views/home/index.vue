<template>
  <el-container>
    <el-aside class="aside">
      <home-aside></home-aside>
    </el-aside>
    <el-container>
      <el-header>头部</el-header>
      <el-main>内容</el-main>
    </el-container>
  </el-container>
</template>

<script>
// 引入
import homeaside from '../../components/home/home-aside'
export default {
  // 注册组件
  components: {
    'home-aside': homeaside
  }
}
</script>

<style>
.aside {
background-color: #353b4e;
height: 100vh;
}
</style>
