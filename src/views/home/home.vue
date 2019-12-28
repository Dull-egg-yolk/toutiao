<template>
<!-- 二级组件 -->
<div class="pic">
    <div class="echart" ref="myecharts"></div>
</div>
</template>

<script>
import Echart from 'echarts'
export default {
  mounted () {
    //   获取实例
    let myecharts = Echart.init(this.$refs.myecharts)
    //
    myecharts.setOption(
      {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line'
        }]
      }
    )
  }

}
</script>

<style lang="less" scoped>
.pic {
    // background-image: url('../../assets/img/timg (1).png');
    // height: 100vh;
    .echart{
        width: 600px;
        height: 400px;
    }
}
</style>
