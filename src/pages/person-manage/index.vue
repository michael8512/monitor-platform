<template>
  <div class="page" v-resize="resizeContent">
    <div class="page-content">
      <div class="page-content-left">
        <attendance-manage></attendance-manage>
        <traffic-manage></traffic-manage>
        <entry-record></entry-record>
      </div>
      <div class="page-content-center"></div>
      <div class="page-content-right">
        <labour></labour>
        <labour-distribution></labour-distribution>
        <work-distribution></work-distribution>
        <age-distribution></age-distribution>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AttendanceManage from './attendance-manage';
import TrafficManage from './traffic-manage';
import EntryRecord from './entry-record.vue';
import Labour from './labour.vue';
import LabourDistribution from './labour-distribution.vue';
import AgeDistribution from './age-distribution.vue';
import WorkDistribution from './work-distribution.vue';

const video = require('./images/video.mp4');

export default {
  name: 'person-manage',
  components: {
    AttendanceManage,
    TrafficManage,
    EntryRecord,
    Labour,
    LabourDistribution,
    AgeDistribution,
    WorkDistribution,
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

      let _fontSize = 10 * this.ratioX;
      document.documentElement.style.fontSize = `${_fontSize}px`;

      this.$store.commit('UPDATE_FONT_SIZE', _fontSize);
      this.$store.commit('UPDATE_RATIO_X', this.ratioX);
    },
    getVideo() {
      this.videoSrc = video;
    }
  }
}
</script>
<style lang="scss">
.page {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,1);

  .video-wraper {
    position: fixed;
    min-width: 100%;
    min-height: 100%;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
    opacity: 1;
    video {
      object-fit: fill;
    }
  }

  &-content {
    position: relative;
    box-sizing: border-box;
    display: flex;
    height: calc(100% - 7.9rem);
    padding: 3.2rem 0 0;
    z-index: 2;
    margin-top: -2rem;
    &-left {
      width: 50rem;
      padding-left: 3.2rem;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background-image: linear-gradient(-90deg, rgba(1,12,27,0.1) 00%,  rgba(1,12,27,1) 100%);
    }
    &-center {
      width: calc(100% - 100rem);      
    }
    &-right {
      width: 50rem;
      padding-right: 3.2rem;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background-image: linear-gradient(90deg, rgba(1,12,27,0) 0%, #010d1b 100%);
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
