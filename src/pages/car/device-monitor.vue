<template>
  <vis-border title="监控设备统计" width="50rem" height="54.2rem">
    <div class="device-monitor">
      <div class="panel-content">
        <div class="device-list">
          <div class="device-list-item" v-for="item in deviceList" :key="item.name">
            <div class="label">{{item.label}}</div>
            <div class="value">{{item.value}}</div>
          </div>
        </div>

        <div class="percent">
          <div class="label">在线率：</div>
          <div class="process">
            <div class="bar" :style="`width: ${percent}`"></div>
            <div class="value">{{percent}}</div>
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

export default {
  name: 'page',
  components: {
    VisBorder
  },
  data(){
    return {
      deviceList: [
        { label: '设备总数', value: 0 },
        { label: '在线设备', value: 0 },
        { label: '离线设备', value: 0 },
      ],
      percent: 0
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
      get(`/api/car/deviceMonitor`).then(res=>{
        const { total, online, offline, percent } = res.data;
        this.deviceList = [
          { label: '设备总数', value: total },
          { label: '在线设备', value: online },
          { label: '离线设备', value: offline },
        ];
        this.percent = percent;
      })
    },
  }
}
</script>
<style lang="scss" scope>
.device-monitor {
  height: calc(100% - 4.2rem);
  .panel-content {
    position: relative;
    height: 100%;
    padding: 1.4rem;
    .device-list {
      &-item {
        line-height: 4.7rem;
        padding: 0 3rem;
        display: flex;
        justify-content: space-between;
        margin: 5.5rem 0;
        background: linear-gradient(-90deg, rgba(0, 0, 0, 0) 20%, rgba(19, 126, 221, 0.54) 100%);
        .label {
          font-size: 1.6rem;
          font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.7);
        }
        .value {
          height: 3.3rem;
          font-size: 2.4rem;
          font-family: AlibabaPuHuiTi-Bold, AlibabaPuHuiTi;
          font-weight: bold;
          color: #FFFFFF;
        }
      }
    }

    .percent {
      height: 2.2rem;
      box-sizing: border-box;
      .label {
        font-size: 1.4rem;
        font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
        font-weight: 400;
        color: rgba(255, 255, 255, 0.7);
        line-height: 2rem;
        margin-bottom: 1rem;
      }
      .process {
        display: flex;
        background: rgba(19, 126, 221, 0.19);
        border: 1px solid #137EDD;
        height: 100%;
        .bar {
          height: 100%;
          background: #137EDD;
        }
        .value {
          font-size: 2.8rem;
          font-family: AlibabaPuHuiTi-Bold, AlibabaPuHuiTi;
          font-weight: bold;
          color: #0087FF;
          line-height: 3.8rem;
          transform: translateY(-4rem);
        }
      }
    }
  }

}
</style>
