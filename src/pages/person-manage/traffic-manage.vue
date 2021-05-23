<template>
<div class="traffic-manage">
    <div class="panel-title">通行管理</div>
    <div class="panel-content">
      <div class="legend">
        <div class="legend-item">入场</div>
        <div class="legend-item">出场</div>
      </div>
      <div class="chart" ref="myChart"></div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts';
import { mapState } from 'vuex';
import { post } from 'utils/http';

export default {
  name: 'annual-growth',
  data() {
    return {
      myChart: null,
      option: null,
      inNums: [],
      outNums: [],
      xLabels: ['0:00', '3:00', '6:00', '9:00', '12:00', '15:00', '18:00', '21:00', '24:00'],
    };
  },
  mounted() {
    this.getData();
  },
  computed: {
    ...mapState(['ratioX', 'fontSize']),
  },
  watch: {
    fontSize(nData, oData) {
      if(this.myChart) {
        this.myChart.resize();
      }
    }
  },
  methods: {
    getData() {
      post(`/api/record/passManager`).then(res=>{  
        this.outNums = [];    
        this.inNums = [];    
        const {in1, in2, in3, in4, in5, in6, in7, in8, out1, out2, out3, out4, out5, out6, out7, out8} = res.data || {};
        this.outNums = [out1, out2, out3, out4, out5, out6, out7, out8];
        this.inNums = [in1, in2, in3, in4, in5, in6, in7, in8];

        this.initChart();
      })
    },
    initChart() {
      const inNums = this.inNums;
      const outNums = this.outNums;
      const xLabels = this.xLabels;
      this.option = {
        grid: {
          top: '10%',
          left: '5%',
          right: '5%',
          bottom: '10%',
          containLabel: true,
        },
        tooltip: {
          trigger: 'axis',
          formatter: (value) => {
            return `
              <p><span>${value[0].seriesName}</span>: <span>${value[0].value}</span></p>
              <p><span>${value[1].seriesName}</span>: <span>${value[1].value}</span></p>
            `
          },
          axisPointer: {
            lineStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0,
                  color: 'rgba(0, 255, 233,0)'
                }, {
                  offset: 0.5,
                  color: 'rgba(255, 255, 255,1)',
                }, {
                  offset: 1,
                  color: 'rgba(0, 255, 233,0)'
                }],
                global: false
              }
            },
          },
        },
        xAxis: [{
          type: 'category',
          axisLine: {
            show: false,
          },
          splitArea: {
            show: false,
            color: '#f00',
          },
          axisLabel: {
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: 1.2*this.fontSize,
          },
          splitLine: {
            show: false
          },
          boundaryGap: false,
          data: xLabels
        }],
        yAxis: [
          {
            type: 'value',
            min: 0,
            name: '数量',
            nameTextStyle: {
              fontSize: 1.2*this.fontSize,
              color: 'rgba(255, 255, 255, 0.4)',
              align: 'right'
            },
            position: 'left',
            splitNumber: 4,
            splitLine: {
              show: true,
              lineStyle: {
                color: 'rgba(255,255,255,0.1)',
                type: 'dashed'
              }
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              show: true,
              fontSize: 1.2*this.fontSize,
              textStyle: {
                color: 'rgba(255, 255, 255, 0.4)',
              },
            },
          },
          
        ],
        series: [
          {
            name: '出场',
            yAxisIndex: 0,
            type: 'line',
            symbol: `circle`,
            symbolSize: 1.8*this.fontSize,
            itemStyle: {
              normal: {
                color: 'rgba(0, 0, 0, 0)',
                borderColor: "rgba(25, 220, 231, 1)",
                borderWidth: 1,
              },
            },
            lineStyle: {
              normal: {
                color: "rgba(25, 220, 231, 1)",
                width: 1
              },
            },
            label: {
              show: false,
            },
            tooltip: {
              show: true
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(25, 220, 231, 1)'
                  },
                  {
                    offset: 0.6,
                    color: 'rgba(15, 193, 162,0)'
                  }
                ], false),
              }
            },
            data: inNums
          },
          {
            name: '入场',
            yAxisIndex: 0,
            type: 'line',
            symbol: `circle`,
            symbolSize: 1.8*this.fontSize,
            itemStyle: {
              normal: {
                color: 'rgba(0, 0, 0, 0)',
                borderColor: "rgba(255, 179, 48,1)",
                borderWidth: 1,
              },
            },
            lineStyle: {
              normal: {
                color: 'rgba(255, 179, 48,1)',
                width: 1
              },
            },
            tooltip: {
              show: true
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(255, 179, 48,1)'
                  },
                  {
                    offset: 0.6,
                    color: 'rgba(255, 179, 48,0)'
                  }
                ], false),
              }
            },
            data: outNums
          },
          {
            name: '出场',
            yAxisIndex: 0,
            type: 'scatter',
            symbol: `circle`,
            symbolSize: 0.5*this.fontSize,
            itemStyle: {
              color: {
                type: 'radial',
                r: 1,
                colorStops: [
                  { offset: 0, color: 'rgba(25, 220, 231, 1)' },
                  { offset: 1, color: 'rgba(25, 220, 231, 1)' }
                ],
                global: false
              },
            },
            data: inNums
          },
          {
            name: '入场',
            yAxisIndex: 0,
            type: 'scatter',
            symbol: `circle`,
            symbolSize: 0.5*this.fontSize,
            itemStyle: {
              color: {
                type: 'radial',
                r: 1,
                colorStops: [
                  { offset: 0, color: 'rgba(255, 179, 48,1)' },
                  { offset: 1, color: 'rgba(255, 179, 48,1)' }
                ],
                global: false
              },
            },
            data: outNums
          },
        ]
      };

      this.myChart = echarts.init(this.$refs.myChart);
      this.myChart.setOption(this.option);
      // window.onresize = this.myChart.resize;
    }
  }
}
</script>
<style lang="scss" scoped>
.traffic-manage{
  width: 100%;
  .panel-content {
    position: relative;
    box-sizing: border-box;
    height: 15rem;
    width: 100%;
    .chart {
      margin-top: 1.6rem;
      height: 100%;
      width: 100%;
    }
    .legend {
      margin-top: 1rem;
      display: flex;
      width: 100%;
      justify-content: center;
      font-family: PingFangSC-Regular;
      font-size: 1.2rem;
      color: rgba(255, 255, 255, .4);
      &-item {
        position: relative;
        margin: 0 1.2rem;
        padding-left: 4.6rem;
        line-height: 2rem;
        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          width: 2rem;
          height: 2rem;
          background-image: url('./images/point-green.png');
          background-size: contain;
        }
        &:last-child::before {
          background-image: url('./images/point-yellow.png');
          background-size: contain;
        }
      }
    }
  } 
}

</style>
