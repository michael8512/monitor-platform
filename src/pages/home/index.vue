<template>
  <div class="page" v-resize="resizeContent">
    <div class="video-wraper">
      <video id="video" type="video/mp4" autoplay="autoplay" width="100%" loop muted>
        <source :src="videoSrc" type="video/mp4" v-if="videoSrc">
      </video>
    </div>
    <div class="page-content">
      <div class="page-content-left">
        <project-statistic></project-statistic>
        <project-dynamics></project-dynamics>
        <project-milestone></project-milestone>
      </div>
      <div class="page-content-center">
        <count-down></count-down>
      </div>
      <div class="page-content-right">
        <env-monitor></env-monitor>
        <weather-forecast></weather-forecast>
        <person-car-status></person-car-status>
        <device-status></device-status>
      </div>
    </div>
  </div>
</template>

<script>
import { get } from 'utils/http';
import { mapState } from "vuex";
import ProjectStatistic from './project-statistic';
import ProjectDynamics from './project-dynamics.vue';
import ProjectMilestone from './project-milestone.vue';
import EnvMonitor from './env-monitor.vue';
import WeatherForecast from './weather-forecast.vue';
import PersonCarStatus from './person-car-status.vue';
import DeviceStatus from './device-status.vue';
import CountDown from './count-down.vue';

export default {
  name: 'page',
  components: {
    ProjectStatistic,
    ProjectDynamics,
    ProjectMilestone,
    EnvMonitor,
    WeatherForecast,
    PersonCarStatus,
    DeviceStatus,
    CountDown
  },
  data() {
    return {
      ratioX: 1,
      ratioY: 1,
      videoSrc: ''
    };
  },
  mounted() {
    this.getVideo();
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
    getVideo() {
      get("/api/construction/video/getVideo").then(res=>{
        if (res.data) {
          this.videoSrc = res.data.video;
        }
      });
    }
  }
}
</script>
<style lang="scss">

.page {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #010c1b;

  .video-wraper {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
    opacity: 1;
  }

  &-content {
    position: relative;
    box-sizing: border-box;
    display: flex;
    height: calc(100% - 7.9rem);
    padding: 3.2rem 3.2rem 0;
    z-index: 2;
    &-left {
      width: 50rem;
      height: 85%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    &-center {
      box-sizing: border-box;
      width: calc(100% - 100rem);
      padding: 0 3rem;
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
      margin-top: -2rem;
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
