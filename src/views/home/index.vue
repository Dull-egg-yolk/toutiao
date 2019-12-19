<template>
  <el-container>
    <el-aside class="aside">
      <home-aside></home-aside>
    </el-aside>
    <el-container>
      <el-header>
        <home-header></home-header>
      </el-header>
      <el-main>内容</el-main>
    </el-container>
  </el-container>
</template>

<script>
// 引入左导航
import homeaside from '../../components/home/home-aside'
// 引入头部
import homeheader from '../../components/home/home-header'
export default {
  // 注册组件
  components: {
    'home-aside': homeaside,
    'home-header': homeheader
  }
}
</script>

<style>
.aside {
background-color: #353b4e;
height: 100vh;
}
</style>
