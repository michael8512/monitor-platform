<template>
  <div class="safety" v-resize="resizeContent">
    <div class="safety-content">
      <div class="safety-content-left">
        <camera-statistic-cover></camera-statistic-cover>
        <check-list></check-list>
      </div>
      <div class="safety-content-center">
        <today-company-check></today-company-check>
        <safety-trend></safety-trend>
      </div>
      <div class="safety-content-right">
        <today-company-self></today-company-self>
        <danger-capture></danger-capture>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CameraStatisticCover from './camera-statistic-cover';
import CheckList from './check-list.vue';
import TodayCompanyCheck from './today-company-check';
import TodayCompanySelf from './today-company-self';
import SafetyTrend from './safety-trend.vue';
import DangerCapture from './danger-capture.vue';

export default {
  name: 'safety',
  components: {
    CameraStatisticCover,
    CheckList,
    TodayCompanyCheck,
    TodayCompanySelf,
    SafetyTrend,
    DangerCapture,
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

.safety {
  position: relative;
  width: 100%;
  height: 100%;

  &-content {
    position: relative;
    box-sizing: border-box;
    display: flex;
    height: 100%;
    justify-content: space-between;
    z-index: 2;

    &-left {
      width: 59rem;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    &-center {
      width: 59rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    &-right {
      width: 59rem;
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
