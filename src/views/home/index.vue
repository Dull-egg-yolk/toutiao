<template>
  <el-container>
    <el-aside class="aside">
      <home-aside></home-aside>
    </el-aside>
    <el-container>
      <el-header>
        <home-header></home-header>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

export default {

}
</script>

<style>
.aside {
background-color: #353b4e;
height: 100vh;
}
</style>
