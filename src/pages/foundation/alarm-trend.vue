<template>
  <vis-border title="报警趋势" width="124rem" height="47rem">
    <div class="alarm-trend">
      <div class="panel-content chart" ref="myChart"></div>
    </div>
  </vis-border>
</template>

<script>
import { get } from 'utils/http';
import echarts from 'echarts';
import { mapState } from "vuex";
import VisBorder from 'common/back-fram';

export default {
  name: 'page',
  components: {
    VisBorder
  },
  data(){
    return {
      myChart: null,
      option: null,

      values: [],
      xLabels: []
    }
  },
  mounted() {
    this.getData();
  },
  computed: {
    ...mapState(['fontSize']),
  },
  methods: {
    getData() {
      get(`/api/camera/hatAlarm`).then(res=>{
        this.xLabels = [];
        this.values = [];
        (res.data || []).forEach(({date, value})=>{
          this.xLabels.push(date);
          this.values.push(value);
        })
        this.initChart();
      })
    },
    initChart() {
      const { fontSize, values, xLabels } = this;
      this.option = {
        grid: {
          top: '7%',
          left: '6%',
          right: '5%',
          bottom: '15%',
        },
        xAxis: [{
          type: 'category',
          boundaryGap: true,
          axisLine: { //坐标轴轴线相关设置。数学上的x轴
            show: true,
            lineStyle: {
              color: "rgba(216,216,216,0.2)"
            },
          },
          axisLabel: { //坐标轴刻度标签的相关设置
            textStyle: {
              color: 'rgba(255,255,255,0.4)',
              margin: 1.5*fontSize,
            },
          },
          axisTick: {
            show: false,
          },
          data: xLabels
        }],
        yAxis: [{
          name: "次",
          min: 0,
          max: 100,
          splitLine: {
            show: false,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(216,216,216,0.2)"
            }
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: 'rgba(255,255,255,0.4)',
            },
          },
          axisTick: {
            show: false,
          },
        }],
        series: [{
          name: '注册总量',
          type: 'line',
          symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
          showAllSymbol: true,
          symbolSize: 6,
          lineStyle: {
            normal: {
              color: "rgba(0,135,255,1)", // 线条颜色
            },
            borderColor: "rgba(0,135,255,1)"
          },
          itemStyle: {
            color: "rgba(0,135,255,1)",
            borderColor: "rgba(0,135,255,1)",
            borderWidth: 1
          },
          areaStyle: { //区域填充样式
            normal: {
              //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: "rgba(0,135,255,0.74)"
                },
                {
                  offset: 1,
                  color: "rgba(0,135,255, 0)"
                }
              ], false),
              shadowColor: 'rgba(0,135,255, 0.9)', //阴影颜色
              shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
            }
          },
          data: values
        }]
      };

      this.myChart = echarts.init(this.$refs.myChart);
      this.myChart.setOption(this.option);
    }
  }
}
</script>
<style lang="scss" scope>
.alarm-trend {
  height: calc(100% - 4.2rem);
  .panel-content {
    position: relative;
  }
  .chart {
    margin-top: 1.6rem;
    height: 100%;
    width: 100%;
  }
}
</style>
