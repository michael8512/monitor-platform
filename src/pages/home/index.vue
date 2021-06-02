<template>
  <div class="home" v-resize="resizeContent">
    <div class="home-content">
      <div class="home-content-left">
        <project-statistic></project-statistic>
        <project-type></project-type>
        <project-distribution></project-distribution>
      </div>
      <div class="home-content-center">
        <project-device-map></project-device-map>
      </div>
      <div class="home-content-right">
        <project-alarm></project-alarm>
        <project-dynamic></project-dynamic>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ProjectStatistic from './project-statistic';
import ProjectAlarm from './project-alarm.vue';
import ProjectType from './project-type.vue';
import ProjectDynamic from './project-dynamic.vue';
import ProjectDistribution from './project-distribution.vue';
import ProjectDeviceMap from './project-device-map.vue';

export default {
  name: 'home',
  components: {
    ProjectStatistic,
    ProjectAlarm,
    ProjectType,
    ProjectDynamic,
    ProjectDistribution,
    ProjectDeviceMap
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

.home {
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
      width: 45.4rem;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    &-center {
      box-sizing: border-box;
      flex: 1;
      padding: 0 2rem;
      
    }
    &-right {
      width: 45.4rem;
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
