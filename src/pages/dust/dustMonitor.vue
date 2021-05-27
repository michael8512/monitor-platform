<!--
 * @Description: 实时监测
 * @Author: hexy
 * @Date: 2021-05-27 15:43:34
 * @LastEditors: hexy
 * @LastEditTime: 2021-05-27 20:07:39
 * @FilePath: /monitor-platform/src/pages/dust/dustMonitor.vue
-->
<template>
  <back-fram title="实时监测" class="line-chart-container" height="26.2rem">
      <div class="line-chart" ref="myChart"></div>
  </back-fram>
</template>

<script>
import backFram from "../common/back-fram";
import { get } from "utils/http";
import echarts from "echarts";
import { mapState } from "vuex";

export default {
  name: "page",
  components: {
    backFram,
  },
  data() {
    return {
      myChart: null,
      option: null,

      values: [],
      xLabels: [],
    };
  },
  mounted() {
    this.getData();
  },
  computed: {
    ...mapState(["fontSize"]),
  },
  methods: {
    getData() {
      get(`/api/camera/hatAlarm`).then((res) => {
        this.xLabels = [];
        this.values = [];
        (res.data || []).forEach(({ date, value }) => {
          this.xLabels.push(date);
          this.values.push(value);
        });
        this.initChart();
      });
    },
    initChart() {
      const { fontSize, values, xLabels } = this;
      this.option = {
        grid: {
          top: "7%",
          left: "10%",
          right: "5%",
          bottom: "25%",
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: true,
            axisLine: {
              //坐标轴轴线相关设置。数学上的x轴
              show: true,
              lineStyle: {
                color: "rgba(216,216,216,0.2)",
              },
            },
            axisLabel: {
              //坐标轴刻度标签的相关设置
              textStyle: {
                color: "rgba(255,255,255,0.4)",
                margin: 1.5 * fontSize,
              },
            },
            axisTick: {
              show: false,
            },
            data: xLabels,
          },
        ],
        yAxis: [
          {
            name: "次",
            min: 0,
            max: 100,
            splitLine: {
              show: false,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgba(216,216,216,0.2)",
              },
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "rgba(255,255,255,0.4)",
              },
            },
            axisTick: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "注册总量",
            type: "line",
            symbol: "circle", // 默认是空心圆（中间是白色的），改成实心圆
            showAllSymbol: true,
            symbolSize: 6,
            lineStyle: {
              normal: {
                color: "rgba(235,186,15,1)", // 线条颜色
              },
              borderColor: "rgba(235,186,15,1)",
            },
            itemStyle: {
              color: "rgba(235,186,15,1)",
              borderColor: "rgba(235,186,15,1)",
              borderWidth: 1,
            },
            areaStyle: {
              //区域填充样式
              normal: {
                //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(235,186,15,0.74)",
                    },
                    {
                      offset: 1,
                      color: "rgba(235,186,15, 0)",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(235,186,15, 0.9)", //阴影颜色
                shadowBlur: 20, //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
              },
            },
            data: values,
          },
        ],
      };

      this.myChart = echarts.init(this.$refs.myChart);
      this.myChart.setOption(this.option);
    },
  },
};
</script>
<style lang="scss">
.line-chart-container{
  margin-right: 2.3rem;
  .line-chart{
    height: 22rem;
  }
}

</style>
