<template>
  <vis-border title="基坑监测基本情况" width="61rem" height="47rem">
    <div class="foundation-monitor-statistic">
      <div class="panel-content">
        <div class="chart-wraper">
          <div class="chart" ref="myChart"></div>
          <div class="chart-img"></div>
        </div>

        <div class="device-list">
          <div class="device-list-item" v-for="item in deviceList" :key="item.name">
            <div class="label">{{item.label}}</div>
            <div class="value">{{item.value}}</div>
          </div>
        </div>

       
      </div>
    </div>
  </vis-border>
</template>

<script>
import { get } from 'utils/http';
import { mapState } from "vuex";
import VisBorder from 'common/back-fram';
import echarts from 'echarts';

export default {
  name: 'foundation-monitor-statistic',
  components: {
    VisBorder
  },
  data(){
    return {
      deviceList: [
        { label: '设备总数', value: 0 },
        { label: '正常状态数', value: 0 },
        { label: '报警状态数', value: 0 },
      ],
      percent: 0,
      myChart: null,
      option: null,
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
      get(`/api/foundation/monitor`).then(res=>{
        const { total, normal, alarm } = res.data;
        this.deviceList = [
          { label: '设备总数', value: total },
          { label: '正常状态数', value: normal },
          { label: '报警状态数', value: alarm },
        ];
        this.initChart();
      })
    },
    initChart() {
      const { fontSize } = this;
      this.option = {
        grid: {
          top: '0%',
          left: '0%',
          right: '0%',
          bottom: '0%',
        },
        series: [{
          name: 'circle',
          type: 'pie',
          clockWise: true,
          radius: ['70%', '86%'],
          itemStyle: {
            normal: {
              label: {
                show: false
              },
              labelLine: {
                show: false
              }
            }
          },
          hoverAnimation: false,
          data: [
            {
              value: 60,
              name: '占比',
              itemStyle: {
                normal: {
                  color: 'rgba(159,20,20,1)'
                }
              }
            }, {
              name: '剩余',
              value: 40,
              itemStyle: {
                normal: {
                  color: 'rgba(19,126,221,0.4)'
                }
              }
            }
          ]
        }
      ]};
      this.myChart = echarts.init(this.$refs.myChart);
      this.myChart.setOption(this.option);
    }
  }
}
</script>
<style lang="scss" scope>
.foundation-monitor-statistic {
  height: calc(100% - 4.2rem);
  .panel-content {
    position: relative;
    height: 100%;
    padding: 1.4rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .chart-wraper {
      position: relative;
      .chart {
        height: 26rem;
        width: 26rem;
      }
      .chart-img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 10.2rem;
        height: 9rem;
        background-image: url('./images/foundation.png');
      }
    }

    .device-list {
      &-item {
        width: 25.9rem;
        line-height: 4.7rem;
        padding: 0 1.4rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2.8rem;
        background: linear-gradient(-90deg, rgba(0, 0, 0, 0) 20%, rgba(19, 126, 221, 0.54) 100%);
        .label {
          font-size: 1.4rem;
          font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.7);
        }
        .value {
          font-size: 4rem;
          font-family: AlibabaPuHuiTi-Bold, AlibabaPuHuiTi;
          font-weight: bold;
          color: #FFFFFF;
        }
        &:nth-child(2) .value{
          font-size: 3.2rem;
          color: #137EDD;
        }
        &:last-child .value{
          font-size: 3.2rem;
          color: #CA0D0D;
        }
      }
    }

  }

}
</style>
