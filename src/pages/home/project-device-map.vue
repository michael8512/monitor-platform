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
      get(`/api/construction/deviceList`).then(res=>{
        this.deviceList = (res.data || []).map(item=> {
          return {
            value: item,
            itemStyle: {color:'rgba(200,0,0,1)'}
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
          itemStyle: {
            normal: {
              areaColor: {
                type: 'radial',
                x: 0.5,
                y: 0.5,
                r: 0.8,
                colorStops: [
                  { offset: 0, color: 'rgba(147, 235, 248, 0.1)'},
                  { offset: 0.5, color: 'rgba(147, 235, 248, 0.2)'},
                ],
                globalCoord: true,
              }
            },
          },
          color: '#fff',
          regions: areaData
        },
        series: [
          {
            type: 'map',
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
                areaColor: 'rgba(18,112,196,0.6)',
                borderColor: '#111'
              },
            },
            data: areaData
          },
          {
            type: 'effectScatter',
            coordinateSystem: 'geo',
            showEffectOn: 'render',
            zlevel:1,
            rippleEffect: {
              period: 15,
              scale: 4,
              brushType: 'fill'
            },
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
                color:'rgba(200,0,0,1)',
                shadowBlur: 10,
                shadowColor: '#333'
              }
            },
            symbolSize: 15,
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
<style lang="scss">
.project-map {
  height: calc(100% - 4.2rem);
  .panel-content {
    position: relative;
    height: 100%;
  }
}
</style>
