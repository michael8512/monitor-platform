<template>
  <div class="foundation" v-resize="resizeContent">
    <div class="foundation-content">
      <div class="foundation-content-top">
        <foundation-monitor-statistic></foundation-monitor-statistic>
        <monitor-distribution></monitor-distribution>
        <monitor-device-statistic></monitor-device-statistic>
      </div>
      <div class="foundation-content-bottom">
        <alarm-rank-list></alarm-rank-list>
        <alarm-trend></alarm-trend>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import MonitorDeviceStatistic from './monitor-device-statistic';
import FoundationMonitorStatistic from './foundation-monitor-statistic.vue';
import AlarmRankList from './alarm-rank-list.vue';
import AlarmTrend from './alarm-trend.vue';
import MonitorDistribution from './monitor-distribution.vue';

export default {
  name: 'foundation',
  components: {
    MonitorDeviceStatistic,
    FoundationMonitorStatistic,
    AlarmRankList,
    AlarmTrend,
    MonitorDistribution,
  },
  data() {
    return {
      ratioX: 1,
      ratioY: 1,
      videoSrc: ''
    };
  },
  computed: {
    ...mapState([]),
  },
  methods: {
    resizeContent({width, height}) {
      this.ratioX = width / 1920;
      this.ratioY = height / 1080;
      document.documentElement.style.fontSize = 10 * this.ratioX + 'px';
    },
  }
}
</script>
<style lang="scss" scope>

.foundation {
  position: relative;
  width: 100%;
  height: 100%;

  &-content {
    position: relative;
    box-sizing: border-box;
    display: flex;
    height: 100%;
    justify-content: space-between;
    flex-direction: column;
    z-index: 2;

    &-top {
      height: 100%;
      box-sizing: border-box;
      padding: 0 2rem;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }

    &-bottom {
      height: 100%;
      padding: 0 2rem;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }

  .panel-title {
    position: relative;
    line-height: 3;
    font-family: MicrosoftYaHei;
    padding-left: 1.2rem;
    font-size: 1.6rem;
    letter-spacing: 0px;
    color: rgba(230, 230, 230, 1);

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      width: 0;
      height: 0;
      border-top: 0.75rem solid transparent;
      border-left: 0.7rem solid rgba(41, 215, 215, 0.8);
      border-bottom: 0.75rem solid transparent;
      transform: translateY(-50%);
    }
    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 2px;
      background-image: linear-gradient(90deg,  rgba(36, 60, 82, 1) 0%,  rgba(0, 4, 17, 1) 100%);
    }
  }
}
</style>
