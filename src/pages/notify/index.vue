<template>
  <div class="notify" v-resize="resizeContent">
    <div class="notify-content">
      <div class="notify-content-top">
        <foundation-monitor-statistic></foundation-monitor-statistic>
        <car-break-raw-message></car-break-raw-message>
        <intelligent-recognition></intelligent-recognition>
      </div>
      <div class="notify-content-bottom">
        <video-alarm-list></video-alarm-list>
        <dust-alarm></dust-alarm>
        <dust-clear-record></dust-clear-record>
        <car-error-alarm></car-error-alarm>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import IntelligentRecognition from './intelligent-recognition';
import FoundationMonitorStatistic from './dust-exceed-message.vue';
import VideoAlarmList from './video-alarm-list.vue';
import AlarmTrend from './alarm-trend.vue';
import CarBreakRawMessage from './car-break-raw-message';
import DustAlarm from './dust-alarm.vue';
import DustClearRecord from './dust-clear-record.vue';
import CarErrorAlarm from './car-error-alarm.vue';

export default {
  name: 'camera',
  components: {
    IntelligentRecognition,
    FoundationMonitorStatistic,
    VideoAlarmList,
    AlarmTrend,
    CarBreakRawMessage,
    DustAlarm,
    DustClearRecord,
    CarErrorAlarm,
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

.notify {
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
