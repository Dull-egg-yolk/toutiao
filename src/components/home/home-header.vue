<template>
  <el-row type="flex" justify="space-between">
    <el-col :span="6">
      <i class="el-icon-s-unfold"></i>
      <span style="font-size:16px">江苏传智播客教育科技股份有限公司</span>
    </el-col>
    <el-col :span="6">
      <el-row type="flex" justify="end" align="middle">
        <img src="../../assets/img/avatar.jpg" alt=""/>
        <el-dropdown>
          <span class="el-dropdown-link">
            路飞
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人信息</el-dropdown-item>
            <el-dropdown-item>git地址</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
img{
    width: 40px;
    height: 40px;
    border-radius: 20px;
}
</style>
