<template>
  <vis-border title="项目分布" width="45.4rem" height="31rem">
    <div class="project-distribution">
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
      normalValues: [],
      intelValues: [],
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
      get(`/api/home/distribution`).then(res=>{
        this.normalValues = [];
        this.intelValues = [];
        this.xLabels = [];

        (res.data || []).forEach(({normal, intelligence, type})=> {
          this.normalValues.push(normal);
          this.intelValues.push(intelligence);
          this.xLabels.push(type)
        });
        this.initChart();
      })
    },
    initChart() {
      const { fontSize, intelValues, normalValues, xLabels } = this;
      this.option = {
        legend: {
          data: ['常规工地', '智慧工地'],
          right: 'center',
          top: 12,
          textStyle: {
            color: 'rgba(255,255,255,.5)',
            fontSize: 1.4*fontSize
          },
          itemWidth: 1.2*fontSize,
          itemHeight: 1.2*fontSize,
        },
        xAxis: {
          data: xLabels,
          axisLabel: {
            inside: false,
            textStyle: {
              color: 'rgba(255,255,255,.5)',
              fontSize: 1.2*fontSize
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#363F63'
            }
          },
        },
        yAxis: {
          axisLine: {
            lineStyle: {
              color: '#363F63',
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              fontSize: 1.2*fontSize,
              color: 'rgba(255,255,255,.5)',
            }
          },
          splitLine:{
            lineStyle: {
              color: '#363F63',
              z: -10
            }
          }
        },
        series: [
          { // For shadow
            type: 'bar',
            name:'常规工地',
            stack: '总量',
            itemStyle: {
              color: '#44C4D8'
            },
            barGap: '-100%',
            barCategoryGap: '60%',
            data: normalValues,
            animation: false
          },
          {
            type: 'bar',
            name:'智慧工地',
            stack: '总量',
            itemStyle: {
              color: '#F1B129'
            },
            data: intelValues
          }
        ]
      };

      this.myChart = echarts.init(this.$refs.myChart);
      this.myChart.setOption(this.option);
    }
  }
}
</script>
<style lang="scss" scope>
.project-distribution {
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
