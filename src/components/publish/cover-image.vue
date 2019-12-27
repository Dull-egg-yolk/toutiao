<template>
  <div class='cover-image'>
      <!-- 根据封面的images长度 进行渲染 一个或者3个或者没有 -->
      <!-- 点击打开弹层 -->
      <div v-for="(item,index) in list" :key="index" class='cover-item' @click="openDialog(index)">
         <img :src="item ? item : changeImg" alt="">
      </div>
      <!-- 需要设置visible属性，它接收Boolean，
      当为true时显示 Dialog。Dialog 分为两个部分：body和footer，footer需要具名为footer的slot。
      title属性用于定义标题，它是可选的，默认值为空。最后，本例还展示了before-close的用法。 -->
      <el-dialog :visible="dialogVisible" @close="closeDialog">
        <!-- 监听谁在谁的标签上写监听 -->
        <select-image @selectImg="reserveImg"></select-image>
      </el-dialog>
  </div>
</template>

<script>
export default {
  // 父组件给子组件传值
  props: ['list'], // 接收属性
  data () {
    return {
      changeImg: require('../../assets/img/pic_bg.png'), // 图片变成变量
      dialogVisible: false,
      // 定义一个变量 接收index
      selectIndex: -1
    }
  },
  methods: {
    // 接收
    reserveImg (img) {
      this.$emit('clickImg', img, this.selectIndex)
      alert(this.selectIndex)
      this.closeDialog()
    },
    // 打开弹层  打开哪个是哪个 传下标
    openDialog (index) {
      // alert(index)
      this.dialogVisible = true
      // 打开弹层时 下标
      this.selectIndex = index
    },
    closeDialog () {
      this.dialogVisible = false
    }
  }
}
</script>

<style lang='less' scoped>
  .cover-image {
    display: flex;
    margin:20px 0;
    margin-left: 100px;
     .cover-item {
       border: 1px solid #ccc;
       width: 250px;
       height: 250px;
       padding: 10px;
       img {
         height: 100%;
         width:100%;
       }
     }
  }
</style>
