<template>
  <div class="model" v-resize="resizeContent">
    <div class="model-content">
      <div class="model-content-top">
        <education-statistic></education-statistic>
        <education-alarm-rank></education-alarm-rank>
        <today-class-education></today-class-education>
      </div>
      <div class="model-content-bottom">
        <leave-education-statistic></leave-education-statistic>
        <education-alarm-trend></education-alarm-trend>
        <other-education></other-education>
      </div>
    </div>
  </div>
</template>

<script>
import { get } from 'utils/http';
import { mapState } from "vuex";
import TodayClassEducation from './today-class-education';
import EducationStatistic from './education-statistic.vue';
import EducationAlarmRank from './education-alarm-rank.vue';
import EducationAlarmTrend from './education-alarm-trend.vue';
import LeaveEducationStatistic from './leave-education-statistic.vue';
import OtherEducation from './other-education.vue';

export default {
  name: 'model',
  components: {
    TodayClassEducation,
    EducationStatistic,
    EducationAlarmRank,
    EducationAlarmTrend,
    LeaveEducationStatistic,
    OtherEducation,
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

.model {
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
