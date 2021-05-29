<template>
  <vis-border title="车辆违规趋势" width="100%" height="24.1rem">
    <div class="car-break-raw">
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
    VisBorder,
  },
  data(){
    return {
      myChart: null,
      option: null,
      xLabels: [],
      values1: [],
      values2: []
      
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
      get(`/api/car/breakRaw`).then(res=>{
        res.data.forEach(({time, total, value})=>{
          this.xLabels.push(time);
          this.values1.push(total);
          this.values2.push(value);
        })

        this.initChart();
      });
    },
    initChart() {
      const { fontSize, values1, values2, xLabels } = this;
      this.option = {
        grid: {
          left: '5%',
          right: '5%',
          top: '10%',
          bottom: '15%',
          containLabel: true
        },
        legend: {
          show: true,
          x: 'center',
          y: 'top',
          icon: 'stack',
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            color: 'rgba(255, 255, 255, 0.4)'
          },
          data: ['车辆出场次数', '违规次数']
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          axisLabel: {
            color: 'rgba(255, 255, 255, 0.4)'
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: 'rgba(19, 126, 221, 0.49)'
            }
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: '#195384'
            }
          },
          data: xLabels
        }],
        yAxis: [{
          type: 'value',
          name: '',
          min: 0,
          max: 100,
          axisLabel: {
            formatter: '{value}',
            textStyle: {
              color: 'rgba(255, 255, 255, 0.4)'
            }
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(19, 126, 221, 0.49)'
            }
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#11366e'
            }
          }
        }],
        series: [
          {
            name: '车辆出场次数',
            type: 'line',
            symbol: 'circle',
            symbolSize: 8,
            itemStyle: {
              normal: {
                color: '#EBBA0F',
                lineStyle: {
                  color: "#EBBA0F",
                  width: 1
                },
              }
            },
            markPoint: {
              itemStyle: {
                normal: {
                  color: 'red'
                }
              }
            },
            data: values1
          },
          {
            name: '违规次数',
            type: 'line',
            symbol: 'circle',
            symbolSize: 8,
            itemStyle: {
              normal: {
                color: '#137EDD',
                lineStyle: {
                  color: "#137EDD",
                  width: 1
                },
              }
            },
            data: values2
          }]
      };

      this.myChart = echarts.init(this.$refs.myChart);
      this.myChart.setOption(this.option);
    }
  }
}
</script>
<style lang="scss">
.car-break-raw {
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
