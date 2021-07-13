<template>
  <vis-border title="项目类型" width="45.4rem" height="31rem">
    <div class="project-type">
      <div class="panel-content chart" ref="myChart"></div>
    </div>
  </vis-border>
</template>

<script>
import { post } from 'utils/http';
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
      post(`/api/all/getProjectCount`).then(res=>{
        const { projectTypeCountList } = res.data || {};
        this.xLabels = [];
        this.values = [];
        (projectTypeCountList || []).forEach(({projectType, typeCount})=>{
          this.xLabels.push(projectType);
          this.values.push(typeCount);
        })
        this.initChart();
      })
    },
    initChart() {
      const { fontSize, values, xLabels } = this;
      this.option = {
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
                offset: 0,
                color: '#5ef3ff'
              }, {
                offset: 1,
                color: '#06a4f4'
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
.project-type {
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
