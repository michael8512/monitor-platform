<template>
  <div class="labour-distribution">
    <div class="panel-title">劳务分布</div>
    <div class="panel-content">
      <div class="chart" ref="myChart"></div>
    </div>
  </div>
</template>

<script>
import { post } from 'utils/http';
import { mapState } from "vuex";
import echarts from 'echarts';

export default {
  name: 'labour-distribution',
  data(){
    return {
      data: [],
      xLabels: [],
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
    gotoPage(companyCode) {
      window.open(`/api/WorkerList/labourUrl?companyCode=${companyCode}`);
    },
    getData() {
      post(`/api/smartWorker/labour`).then(res=>{
        this.xLabels = [];
        this.data = [];
        const companyCodeMap = {};

        (res.data || []).forEach(({companyName, count, companyCode})=>{
          this.xLabels.push(companyName);
          this.data.push(count);

          companyCodeMap[companyName] = companyCode;
        });
        this.companyCodeMap = companyCodeMap;
        this.initChart();
      })
    },
    initChart() {
      const {data, xLabels} = this;
      let values = [];
      for (let i = 0; i < xLabels.length; i++) {
        values.push({
          name: xLabels[i],
          value: data[i]
        })
      }
      const colorList = ["#09a2f2","#32b16c","#8fc31f","#fae111","#f39800","#eb6877","#f8b551","#13b51b","#6183dd",'#cc77f5'];
      const rich = {
        name: {
          color: "#b2b2b2",
          fontSize: this.fontSize,
          padding: [0, 0],
          fontWeight:'400',
          align: 'right'
        },
        percent: {
          color: "#19dce7",
          align: 'right',
          fontSize:this.fontSize,
          fontWeight:'500',
          padding: [0, 5]
        },
      }
      this.option = {
        grid: {
          left: '10%',
          right: '10%',
          bottom: '10%',
          top: '10%',
          width: 'auto',
          width: 'height',
          containLabel: true,
        },
        series: [
          {
            itemStyle: {
              normal: {
                color: function(params) {
                  return colorList[params.dataIndex]
                },
                borderColor: '#172659',
                borderWidth: 3
              }
            },
            type: 'pie',
            radius: ['40%', '68%'],
            center: ["50%", "60%"],
            labelLine: {
              normal: {
                lineStyle: {
                  color: '#34569D'
                }
              }
            },
            label: {
              normal: {
                formatter: params => {
                  return (
                    '{name|' + params.name + '}\n{percent|' + params.value + '}{name|人}'
                  );
                },
                rich: rich,
                padding: [0, 0, 0, 0],
                // alignTo: 'edge'
              },
            },
            data: values
          },
          {
            itemStyle: {
              normal: {
                color: 'rgba(62,109,255,0.4)',
              }
            },
            type: 'pie',
            hoverAnimation: false,
            radius: ['40%', '48%'],
            center: ["50%", "60%"],
            label: {
              normal: {
                show:false
              }
            },
            data: [
              {
                value: 1,
              }
            ],
            z:2
          },
        ]
      }

      this.myChart = echarts.init(this.$refs.myChart);
      this.myChart.setOption(this.option);

      this.myChart.on('click', (params)=>{
        if(params.name && this.companyCodeMap[params.name])  {
          this.gotoPage(this.companyCodeMap[params.name])
        }
      });

      // window.onresize = this.myChart.resize;
    }
  }
}
</script>
<style lang="scss" scope>
.labour-distribution {
  margin-right: 3.2rem;
  .panel-content {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    box-sizing: border-box;
    height: 24.7rem;
    width: 100%;
    .chart {
      margin-top: 2.6rem;
      height: 100%;
      width: 100%;
    }    
  }
}
</style>
