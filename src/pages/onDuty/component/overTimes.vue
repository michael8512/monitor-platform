<template>
  <vis-border title="项目分布" class="over-chart-container" height="56.4rem">
    <div class="over-distribution">
      <div class="over-times-item">
        <div class="item-title">项目人员分布</div>
        <div class="panel-content over-chart" ref="myChart"></div>
      </div>
      <div class="over-times-item">
        <div class="item-title">动态分布</div>
        <div class="panel-content over-chart" ref="myChart2"></div>
      </div>
    </div>
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
      myChart2: null,
      option: null,
      normalValues: [],
      intelValues: [],
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
      get(`/api/construction/distribution`).then((res) => {
        this.normalValues = [];
        this.intelValues = [];
        this.xLabels = [];

        (res.data || []).forEach(({ normal, intelligence, type }) => {
          this.normalValues.push(normal);
          this.intelValues.push(intelligence);
          this.xLabels.push(type);
        });
        this.initChart();
      });
    },
    initChart() {
      const { fontSize, intelValues, normalValues, xLabels } = this;
      this.option = {
        grid: {
          top: "12%",
          left: "3.5%",
          right: "2%",
          bottom: "15%",
        },
        legend: {
          data: ["常规工地", "智慧工地"],
          right: "center",
          top: 0,
          textStyle: {
            color: "rgba(255,255,255,.5)",
            fontSize: 1.4 * fontSize,
          },
          itemWidth: 1.2 * fontSize,
          itemHeight: 1.2 * fontSize,
        },
        xAxis: {
          data: xLabels,
          axisLabel: {
            inside: false,
            textStyle: {
              color: "rgba(255,255,255,.5)",
              fontSize: 1.2 * fontSize,
            },
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "#363F63",
            },
          },
        },
        yAxis: {
          type: "value",
          axisLine: {
            show: false,
            lineStyle: {
              color: "#363F63",
            },
          },
            max : 100,
            min : 0,
          
            interval:25, //每次增加几个
          axisTick: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              fontSize: 1.2 * fontSize,
              color: "rgba(255,255,255,.5)",
            },
          },
          splitLine: {
            lineStyle: {
              color: "#363F63",
              z: -10,
            },
          },
        },
        series: [
          {
            // For shadow
            type: "bar",
            name: "常规工地",
            // stack: '总量',
            itemStyle: {
              color: "#44C4D8",
            },
            data: normalValues,
            animation: false,
            barWidth: 1.4 * fontSize,
            label: {
              show: true,
              position: "top",
              textStyle: {
                color: "#fff",
              },
            },
          },
          {
            type: "bar",
            name: "智慧工地",
            // stack: '总量',
            itemStyle: {
              color: "#F1B129",
            },
            barWidth: 1.4 * fontSize,
            label: {
              show: true,
              position: "top",
            },
            data: intelValues,
            label: {
              show: true,
              position: "top",
              textStyle: {
                color: "#fff",
              },
            },
          },
        ],
      };

      this.myChart = echarts.init(this.$refs.myChart);
      this.myChart.setOption(this.option);
      this.myChart2 = echarts.init(this.$refs.myChart2);
      this.myChart2.setOption(this.option);
    },
  },
};
</script>
<style lang="scss" scoped>
.over-chart-container {
  width: 100%;
  margin-top: 2.2rem;
  // flex: 1;
  height: 56.4rem;
}
.over-distribution {
  height: calc(100% - 4.3rem);
  padding-left: 3rem;
  width: 100%;
  .panel-content {
    position: relative;
  }
  .over-times-item {
    height: 49%;
  }
  .item-title {
    font-size: 1.6rem;
    font-family: AlibabaPuHuiTi-Bold;
    font-weight: bold;
    color: #ffffff;
    position: relative;
    padding-left: .8rem;
    padding-top: 1.8rem;
    &::after {
      position: absolute;
      content: "";
      width: 3px;
      height: 16px;
      background: #1171cd;
      left: 0;
      bottom: .4rem;
    }
  }
  .over-chart {
    width: 100%;
  height: calc(100% - 3rem);
  }
}
</style>
