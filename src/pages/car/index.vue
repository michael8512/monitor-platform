<template>
  <div class="camera" v-resize="resizeContent">
    <div class="camera-content">
      <div class="camera-content-left">
        <monitor-cover-statistic></monitor-cover-statistic>
        <camera-distribution></camera-distribution>
      </div>
      <div class="camera-content-center">
        <camera-overview></camera-overview>
      </div>
      <div class="camera-content-right">
        <hat-alarm></hat-alarm>
        <rank-list></rank-list>
      </div>
    </div>
  </div>
</template>

<script>
import { get } from 'utils/http';
import { mapState } from "vuex";
import MonitorCoverStatistic from './monitor-cover-statistic';
import HatAlarm from './hat-alarm.vue';
import RankList from './rank-list.vue';
import CameraDistribution from './camera-distribution.vue';
import CameraOverview from './camera-overview.vue';

export default {
  name: 'camera',
  components: {
    MonitorCoverStatistic,
    HatAlarm,
    RankList,
    CameraDistribution,
    CameraOverview,
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

.camera {
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
      width: 50rem;
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
