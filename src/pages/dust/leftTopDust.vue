<!--
 * @Description:
 * @Author: hexy
 * @Date: 2021-05-27 22:26:16
 * @LastEditors: hexy
 * @LastEditTime: 2021-06-19 23:22:21
 * @FilePath: /monitor-platform/src/pages/dust/leftTopDust.vue
-->

<template>
  <div :class="className" class="container">
    <div class="left-container">
      <weather></weather>
      <!-- <dust-calendar></dust-calendar> -->
      <camera-statics title="设备在离线统计" :data="staticsData"></camera-statics>
    </div>
    <div class="right-container">
      <nation-control-station></nation-control-station>
      <!-- <div class="camera-container">
        <camera-statics title="监控覆盖统计" :data="staticsData"></camera-statics>
        <camera-statics title="监控设备概况" :data="staticsData"></camera-statics>
      </div> -->
    </div>
  </div>
</template>

<script>
import DustCalendar from "./component/dustCalendar.vue";
import Weather from "./component/weather";
import NationControlStation from "./component/nationControlStation";
import { get } from "utils/http";
import CameraStatics from "./component/cameraStatics.vue";
export default {
  components: {
    Weather,
    DustCalendar,
    NationControlStation,
    CameraStatics,
  },
  props: {
    className: String,
  },
  data() {
    return {
      staticsData: {},
    };
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      get(`/api/dust/statics`).then(({ code, data }) => {
        if (code !== 0) {
          return;
        }
        this.$data.staticsData = data;
      });
    },
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  .left-container {
    width: 49.65rem;
    margin-right: 2.6rem;
  }
  .right-container {
    flex: 1;
  }

  .camera-container {
    width: 100%;
    margin-top: 2.8rem;
    display: flex;
    justify-content: space-between;
    > div {
      flex: 1;
      &:last-child {
        margin-left: 2.4rem;
      }
    }
  }
}
</style>
