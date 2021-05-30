<template>
  <vis-border title="高支模监测分布" width="59rem" height="45.1rem">
    <div class="model-monitor-distribution">
      <div class="panel-content chart" ref="myChart"></div>
    </div>
  </vis-border>
</template>

<script>
import { get } from 'utils/http';
import echarts from 'echarts';
import DashBoard from 'common/dash-board';
import { mapState } from "vuex";
import VisBorder from 'common/back-fram';

export default {
  name: 'page',
  components: {
    VisBorder,
    DashBoard
  },
  data(){
    return {
      myChart: null,
      option: null,

      values1: [],
      values2: [],
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
      get(`/api/model/distribution`).then(res=>{

        (res.data || []).forEach(({ group, value1, value2 }) => {
          this.xLabels.push(group);
          this.values1.push(value1);
          this.values2.push(value2);
        });

        this.initChart();
      });
    },
    initChart() {
      const { fontSize, values1, values2, xLabels } = this;
      this.option = {
        grid: {
          top: '7%',
          left: '5%',
          right: '5%',
          bottom: '15%',
        },
        xAxis: {
          type: 'category',
          data: xLabels,
          axisTick: {
            show: false, // 不显示坐标轴刻度线
          },
          axisLine: {
            show: false, // 不显示坐标轴线
          },
          axisLabel: {
            show: true,
            interval: 0,
            textStyle: {
              color: 'rgba(255,255,255,0.4)', // X轴文字颜色
              fontSize: 1.2*fontSize,
            },
          },
        },
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false // 不显示网格线
            },
            axisLine: {
              show: false, // 不显示坐标轴线
            },
          },
          {
            type: 'value',
            min: 0,
            max: 100,
            axisLabel: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            axisLine: {
              show: false, // 不显示坐标轴线
            },
          },
        ],
        series: [
          {
            data: values1,
            type: 'bar',
            barWidth: 2.4*fontSize,
            yAxisIndex: 0,
            label: {
              show: true,
              position: 'top',
              textStyle: {
                color: '#c8d8e3'
              }
            },
            itemStyle: {
              fontSize: 16,
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  1,
                  0,
                  0,
                  [
                    {
                      offset: 0,
                      color: 'rgba(0,135,255,0)', // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: 'rgba(0,135,255,0.8)', // 100% 处的颜色
                    },
                  ],
                  false
                ),
              },
            },
          },
          {
            data: values2,
            type: 'bar',
            barWidth: 2.4*fontSize,
            yAxisIndex: 1,
            label: {
              show: true,
              position: 'top',
              textStyle: {
                color: '#c8d8e3'
              }
            },
            itemStyle: {
              fontSize: 16,
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  1,
                  0,
                  0,
                  [
                    {
                      offset: 0,
                      color: 'rgba(0,218,255,0)', // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: 'rgba(0,218,255,0.8)', // 100% 处的颜色
                    },
                  ],
                  false
                ),
              },
            },
          },
        ],
      };

      this.myChart = echarts.init(this.$refs.myChart);
      this.myChart.setOption(this.option);
    }
  }
}
</script>
<style lang="scss">
.model-monitor-distribution {
  height: calc(100% - 4.2rem);
  .panel-content {
    height: 100%;
    position: relative;
  }
  .chart {
    margin-top: 1.6rem;
    height: 100%;
    width: 100%;
  }
}
</style>
