<template>
  <div class="work-distribution">
    <div class="panel-title">工种分布</div>
    <div class="panel-content">
      <div class="chart-title">工种前10人数统计</div>
      <div class="chart" ref="myChart"></div>
    </div>
  </div>
</template>

<script>
import { post } from 'utils/http';
import { mapState } from "vuex";
import echarts from 'echarts';

export default {
  name: 'page',
  data(){
    return {
      myChart: null,
      option: null,
      values: [],
      xLabels: [],
      bgValues: [],

      workCodeMap: {}
    }
  },
  mounted() {
    this.getData();
  },
  computed: {
    ...mapState(['fontSize']),
  },
  watch: {
    fontSize(nData, oData) {
      if(this.myChart) {
        this.myChart.resize();
      }
    }
  },
  methods: {
    gotoPage(workCode) {
      window.open(`/api/WorkerList/workTypeUrl?workCode=${workCode}`);
    },
    getData() {
      post("/api/smartWorker/workType").then(res=>{
        if (res.data) {
          this.bgValues = [];
          this.xLabels = [];
          this.values = [];
          const workCodeMap = {};
          (res.data || []).forEach(item=>{
            this.bgValues.push(100);
            this.xLabels.push(item.workName);
            this.values.push(item.count);

            workCodeMap[item.workName] = item.workCode;
          });
          this.workCodeMap = workCodeMap;
          this.initChart();
        }
      });
    },
    initChart() {
      this.option = {
        legend: {
          data: ['直接访问', '背景'],
          show: false
        },
        grid: {
          left: '5%',
          right: '5%',
          bottom: '5%',
          top: '15%',
          height: '90%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: this.xLabels,
          axisLabel: {
            show: true,
            color: 'rgb(170,170,170)',
            fontSize: 12,
            rotate: 20,
            interval:0,
          },
          axisTick: {
            show: false
          },
          axisLine: {show: false}
        },
        yAxis: [
          {
            type: 'value',
            nameTextStyle:{
              color:"rgb(178,178,178)"  
            },
            name: '人',
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: 'rgb(170,170,170)',
              formatter: '{value}'
            },
            axisLine: {show: false}
          },
          {
            type: 'value',
            gridIndex: 0,
            max: 100,
            splitNumber: 12,
            splitLine: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
          }
        ],
        series: [
          {
            name: '合格率',
            type: 'bar',
            barWidth: '30%',
            xAxisIndex: 0,
            yAxisIndex: 0,
            itemStyle: {
              normal: {
                barBorderRadius: 0,
                color: 'rgba(25,220,231,0.3)'
              }
            },
            data: this.values,
            zlevel: 11,
            label: {
              normal: {
                color: '#19dce7',
                show: true,
                position: 'top'
              }
            }
          },
          {
            name: '背景',
            type: 'bar',
            barWidth: '50%',
            xAxisIndex: 0,
            yAxisIndex: 1,
            barGap: '-135%',
            data: this.bgValues,
            itemStyle: {
              normal: {
                color: 'rgba(255,255,255,0.1)',
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.2)',
              }
            },
            zlevel: 9
          },
        ]
      };

      this.myChart = echarts.init(this.$refs.myChart);
      this.myChart.setOption(this.option);
      this.myChart.on('click', (params)=>{
        if(params.name && this.workCodeMap[params.name])  {
          this.gotoPage(this.workCodeMap[params.name])
        }
      });
      // window.onresize = this.myChart.resize;
    }
  }
}
</script>
<style lang="scss">
.work-distribution {
  .panel-content {
    position: relative;
    box-sizing: border-box;
    height: 20rem;
    width: 100%;
    .chart-title {
      margin: 1.6rem 0 1rem;
      font-family: PingFangSC-Regular;
      font-size: 1.4rem;
      color: #ffffff;
    }
    .chart {
      height: 100%;
      width: 100%;
    }
  }
}
</style>
