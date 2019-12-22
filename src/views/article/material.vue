<template>
 <el-card>
   <bread-crumb slot="header">
    <template slot="title">素材管理</template>
   </bread-crumb>
   <el-tabs v-model="activeName">
     <el-tab-pane label="全部素材" name="all">
       <el-card>
         <img src="../../assets/logo.png" alt="">
         <el-row>
           <el-button></el-button>
         </el-row>
       </el-card>
     </el-tab-pane>
     <el-tab-pane label="收藏素材" name="cell">
       <el-card></el-card>
     </el-tab-pane>
   </el-tabs>
 </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      activeName: 'all'
    }
  }
}
</script>

<style>

</style>
