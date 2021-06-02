<template>
  <vis-border title="设备布点图" width="100%" height="100%">
    <div class="project-map">
      <div class="panel-content chart" ref="myChart"></div>
    </div>
  </vis-border>
</template>

<script>
import { get } from 'utils/http';
import echarts from 'echarts';
import { mapState } from "vuex";
import VisBorder from 'common/back-fram';
const geoData = require('./geo.json');

export default {
  name: 'page',
  components: {
    VisBorder
  },
  data(){
    return {
      myChart: null,
      option: null,

      deviceList: []
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
      get(`/api/home/deviceList`).then(res=>{
        this.deviceList = (res.data || []).map(item=> {
          return {
            value: item,
            itemStyle: {color:'#F1B129'}
          }
        });
        this.initChart();
      })
    },
    initChart(cityName='china') {
      const { fontSize, deviceList } = this;

      const areaData = geoData.features.map(({properties: {name}})=>{
        return { name };
      });

      echarts.registerMap(cityName, geoData);

      this.option = {
        geo: {
          map: cityName,
          roam: true,
          zoom: 4,
          left: '10%',
          top: '30%',
          label: {
            normal: {
              show: true,
              textStyle: {color: 'rgba(255,255,255,0.5)', fontSize: 1.4*fontSize}
            },
            emphasis: {
              show: true,
              textStyle: {color: 'rgba(0,0,0,0.8)', fontSize: 1.4*fontSize}
            }
          },
          itemStyle: {
            normal: {
              color: '#25fffb',
              areaColor: 'rgba(18,112,196,0.5)',
              borderColor: '#111'
            },
          },
          color: '#fff',
          regions: areaData
        },
        series: [
          // {
          //   type: 'map',
          //   map: cityName,
          //   roam: true,
          //   zoom: 4,
          //   left: '10%',
          //   top: '30%',
          //   label: {
          //     normal: {
          //       show: true,
          //       textStyle: {color: 'rgba(255,255,255,0.5)', fontSize: 1.4*fontSize}
          //     },
          //     emphasis: {
          //       show: true,
          //       textStyle: {color: 'rgba(0,0,0,0.8)', fontSize: 1.4*fontSize}
          //     }
          //   },
          //   itemStyle: {
          //     normal: {
          //       color: '#25fffb',
          //       areaColor: 'rgba(18,112,196,0.5)',
          //       borderColor: '#111'
          //     },
          //   },
          //   data: areaData
          // },
          {
            type: 'scatter',
            coordinateSystem: 'geo',
            zlevel:1,
            symbol: 'pin',
            symbolSize: [40,40],
            hoverAnimation: true,
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                offset: [15, 0],
                color: '#1DE9B6',
                show: true
              },
            },
            itemStyle: {
              normal: {
                color:'#1DE9B6',
              }
            },
            data: deviceList
          }, 
        ]
      };

      this.myChart = echarts.init(this.$refs.myChart);
      this.myChart.setOption(this.option);
    },
  }
}
</script>
<style lang="scss" scope>
.project-map {
  height: calc(100% - 4.2rem);
  .panel-content {
    position: relative;
    height: 100%;
  }
}
</style>
