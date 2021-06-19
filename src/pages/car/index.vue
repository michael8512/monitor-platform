<template>
  <div class="camera" v-resize="resizeContent">
    <div class="camera-content">
      <div class="camera-content-left">
        <monitor-cover-statistic></monitor-cover-statistic>
        <!-- <dirty-calendar></dirty-calendar> -->
        <device-monitor></device-monitor>
      </div>
      <div class="camera-content-center">
        <supervision-statistic></supervision-statistic>
        <!-- <attendance-statistic></attendance-statistic> -->
        <car-break-raw></car-break-raw>
      </div>
      <div class="camera-content-right">
        <rank-list></rank-list>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import MonitorCoverStatistic from './monitor-cover-statistic';
import DeviceMonitor from './device-monitor.vue';
import RankList from './rank-list.vue';
import DirtyCalendar from './dirty-calendar.vue';
import SupervisionStatistic from './supervision-statistic.vue';
import AttendanceStatistic from './attendance-statistic.vue';
import CarBreakRaw from './car-break-raw.vue';

export default {
  name: 'car',
  components: {
    MonitorCoverStatistic,
    DeviceMonitor,
    RankList,
    DirtyCalendar,
    SupervisionStatistic,
    AttendanceStatistic,
    CarBreakRaw,
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

.camera {
  position: relative;
  width: 100%;
  height: 100%;

  &-content {
    position: relative;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    height: 100%;
    justify-content: space-between;
    z-index: 2;

    &-left {
      width: 50rem;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    &-center {
      height: 100%;
      box-sizing: border-box;
      flex: 1;
      padding: 0 2rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    &-right {
      width: 50rem;
      height: 100%;
      display: flex;
      flex-direction: column;
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
