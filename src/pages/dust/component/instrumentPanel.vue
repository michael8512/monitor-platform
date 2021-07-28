<!--
 * @Description: 仪表盘
 * @Author: hexy
 * @Date: 2021-05-30 13:03:04
 * @LastEditors: hexy
 * @LastEditTime: 2021-05-30 14:47:39
 * @FilePath: /monitor-platform/src/pages/dust/component/instrumentPanel.vue
-->
<template>
  <div class="panel-container">
    <div class="panel" ref="myChart"></div>
    <div class="background-image"></div>
  </div>
</template>

<script>
import backFram from "../../common/back-fram.vue";
import echarts from "echarts";
import { mapState } from "vuex";
export default {
  components: { backFram },
  props: {
    data: {
      type: Number,
    }
  },
  data() {
    return {
      myChart: null,
      option: null,
    };
  },
  computed: {
    ...mapState(["fontSize"]),
  },
  watch: {
    data() {
      this.initChart();
    }
  },
  methods: {
    initChart() {
      const { fontSize } = this;
      var dataArr = [
        {
          value: this.data,
          name: "综合健康评分",
        },
      ];
      var color = new echarts.graphic.LinearGradient(0, 0, 1, 0, [
        {
          offset: 0,
          color: "#137EDD", // 0% 处的颜色
        },
        {
          offset: 1,
          color: "#CA0D0D", // 100% 处的颜色
        },
      ]);
      var colorSet = [[1, color]];
      var rich = {
        bule: {
          fontSize: 4 * fontSize,
          fontFamily: "DINAlternate-Bold",
          color: "#137EDD",
          fontWeight: "bold",
          padding: [-25, 0, 0, 0],
        },
        radius: {
          fontSize: 1.4 * fontSize,
          color: "#137EDD",
          textAlign: "center",
          padding: [-50, 0, 0, 0],
        },
      };
      this.option = {
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%",
        },
        series: [
          {
            type: "gauge",
            name: "外层辅助",
            radius: "100%",
            startAngle: "225",
            endAngle: "-45",
            splitNumber: "100",
            pointer: {
              show: false,
            },
            detail: {
              show: false,
            },
            data: [
              {
                value: 1,
              },
            ],
            axisLine: {
              show: true,
              lineStyle: {
                color: [[1, "#137edd80"]],
                width: 2,
                opacity: 1,
              },
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: true,
              length: 20,
              lineStyle: {
                color: "#051932",
                width: 0,
                type: "solid",
              },
            },
            axisLabel: {
              show: false,
            },
          },
          {
            type: "gauge",
            radius: "93.5%",
            startAngle: "225",
            endAngle: "-45",
            pointer: {
              show: false,
            },
            detail: {
              formatter: function (value) {
                return "{bule|" + value + "%}\n{radius|覆盖率}{size|}";
              },
              rich: rich,
              offsetCenter: ["0%", "0%"],
            },
            data: dataArr,
            title: {
              show: false,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: colorSet,
                width: 12,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                opacity: 1,
              },
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
              length: 25,
              lineStyle: {
                color: "#00377a80",
                width: 2,
                type: "solid",
              },
            },
            axisLabel: {
              show: false,
            },
          },
          {
            name: "灰色内圈", //刻度背景
            type: "gauge",
            z: 2,
            radius: "70%",
            startAngle: "225",
            endAngle: "-45",
            //center: ["50%", "75%"], //整体的位置设置
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: [[1, "#137edd80"]],
                width: 2,
                opacity: 1, //刻度背景宽度
              },
            },
            splitLine: {
              show: false,
            },
            // data: [{
            //     show: false,
            //     value: '80'
            // }], //作用不清楚
            axisLabel: {
              show: false,
            },
            pointer: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            detail: {
              show: 0,
            },
          },
          {
            name: "白色圈刻度",
            type: "gauge",
            radius: "70%",
            startAngle: 225, //刻度起始
            endAngle: -45, //刻度结束
            z: 4,
            axisTick: {
              show: false,
            },
            splitLine: {
              length: 5, //刻度节点线长度
              lineStyle: {
                width: 2,
                color: "#137edd80",
              }, //刻度节点线
            },
            axisLabel: {
              color: "rgba(255,255,255,0)",
              fontSize: 12,
            }, //刻度节点文字颜色
            pointer: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                opacity: 0,
              },
            },
            detail: {
              show: false,
            },
            data: [
              {
                value: 0,
                name: "",
              },
            ],
          },
        ],
      };

      this.myChart = echarts.init(this.$refs.myChart);
      this.myChart.setOption(this.option);
    },
  },
};
</script>

<style lang="scss" scoped>
.panel-container,
.panel {
  height: 100%;
  width: 100%;
  position: relative;
}
.background-image {
  z-index: 0;
  width: 27px;
  height: 13px;
  opacity: 0.8;
  position: absolute;
  bottom: 17%;
  left: 24%;
  border-width: 0 19px 13px 19px;
  border-style: none solid solid;
  border-color: transparent transparent #1c244d80;
}
</style>
