<template>
  <vis-border title="扬尘超标率" height="25.2rem">
    <div class="panel-content chart" ref="myChart"></div>
  </vis-border>
</template>

<script>
import { get } from "utils/http";
import echarts from "echarts";
import { mapState } from "vuex";
import VisBorder from "common/back-fram";

export default {
  name: "page",
  components: {
    VisBorder,
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
      const barData = [...values].reverse();
      this.option = {
        grid: {
          top: "20%",
          left: "10%",
          right: "5%",
          bottom: "13%",
        },
        legend: {
          right: "center",
          top: 0,
          textStyle: {
            color: "rgba(255,255,255,.5)",
            fontSize: 1.4 * fontSize,
          },
          itemWidth: 1.2 * fontSize,
          itemHeight: 1.2 * fontSize,
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
                color: "rgba(216,216,216,0.2)",
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
            name: "小时",
            min: 0,
            max: 100,
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(216,216,216,0.2)",
              },
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "rgba(216,216,216,0.2)",
              },
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "rgba(216,216,216,0.2)",
              },
            },
            axisTick: {
              show: false,
            },
            max : 100,
            min : 0,
            interval:25, //每次增加几个
          },
        ],
        series: [
          {
            name: "在岗率",
            type: "line",
            // symbol: "circle", // 默认是空心圆（中间是白色的），改成实心圆
            showAllSymbol: true,
            symbolSize: 6,
            itemStyle: {
              color: '#979797'
            },
            data: values,
          },
          {
            name: "在岗时长",
            type: "bar",
            barWidth: 1.4 * fontSize,
            lineStyle: {
              normal: {
                color: "rgba(0,135,255,1)", // 线条颜色
              },
            },
            itemStyle: {
              color: "#44C4D8",
            },
            data: barData,
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
.chart {
  margin-top: 1.6rem;
  height: 18.4rem;
  width: 100%;
}
</style>
