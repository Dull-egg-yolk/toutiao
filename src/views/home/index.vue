<template>
  <el-container>
    <el-aside :style="{width:collapse?'60px':'230px'}" style="transition:all 0.3s">
      <home-aside :collapse="collapse"></home-aside>
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
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      collapse: false
    }
  },
  created () {
    eventBus.$on('changeCollapse', () => {
      this.collapse = !this.collapse
    })
  }
}
</script>

<style>
</style>
