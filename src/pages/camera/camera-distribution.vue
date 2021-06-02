<template>
  <vis-border title="视频分布情况" width="50rem" height="31rem">
    <div class="camera-distribution">
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

      values: [],
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
      get(`/api/camera/distribution`).then(res=>{
        this.xLabels = [];
        this.values = [];
        (res.data || []).forEach(({name, total})=>{
          this.xLabels.push(name);
          this.values.push(total);
        })
        this.initChart();
      })
    },
    initChart() {
      const { fontSize, values, xLabels } = this;
      this.option = {
        grid: {
          top: '7%',
          left: '10%',
          right: '5%',
          bottom: '15%',
        },
        xAxis: {
          data: xLabels,
          axisLine: {
            lineStyle: {
              color: '#3d5269'
            }
          },
          axisLabel: {
            color: 'rgba(255,255,255,.5)',
            fontSize: 1.2*fontSize
          }
        },
        yAxis: {
          name: "个",
          nameTextStyle: {
            color: 'rgba(255,255,255,.5)',
            fontSize: 1.2*fontSize
          },
          axisLine: {
            lineStyle: {
              color: '#3d5269'
            }
          },
          axisLabel: {
            color: 'rgba(255,255,255,.5)',
            fontSize: 1.2*fontSize
          },
          splitLine: {
            show:true,
            lineStyle: {
              color: '#2d3d53'
            }
          },
          interval: 25,
        },
        series: [{
          type: 'bar',
          barWidth: 2*fontSize,
          itemStyle:{
            normal:{
              color:new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0.5,
                color: '#0087FF'
              }, {
                offset: 1,
                color: 'transparent'
              }], false)
            }
          },
          data: values
        }]
      };

      this.myChart = echarts.init(this.$refs.myChart);
      this.myChart.setOption(this.option);
    }
  }
}
</script>
<style lang="scss" scope>
.camera-distribution {
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
