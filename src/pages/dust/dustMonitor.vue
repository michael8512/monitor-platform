<!--
 * @Description: 实时监测
 * @Author: hexy
 * @Date: 2021-05-27 15:43:34
 * @LastEditors: hexy
 * @LastEditTime: 2021-05-30 15:01:28
 * @FilePath: /monitor-platform/src/pages/dust/dustMonitor.vue
-->
<template>
  <back-fram title="实时监测" class="line-chart-container">
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
      get(`/api/dust/monitor`).then((res) => {
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
      const data2 = [...values].reverse();
      this.option = {
        grid: {
          top: "8%",
          left: "3.5%",
          right: "2%",
          bottom: "15%",
        },
        legend: {
          show: true,
          top: '10%',
          textStyle:{
          color: "#FFFFFF"
          }
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
                color: "#fff",
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
                color: "#fff",
              },
            },
            axisTick: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "PM2.5",
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
            data: values,
          },
          {
            name: "PM10",
            type: "line",
            symbol: "circle", // 默认是空心圆（中间是白色的），改成实心圆
            showAllSymbol: true,
            symbolSize: 6,
            lineStyle: {
              normal: {
                color: "#0087FF", // 线条颜色
              },
              borderColor: "#0087FF",
            },
            itemStyle: {
              color: "#0087FF",
              borderColor: "#0087FF",
              borderWidth: 1,
            },
            data: data2,
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
.line-chart-container {
  margin: 2.1rem 2.3rem 3rem 0;
  .line-chart {
    height: 22rem;
  }
}
</style>
