<template>
  <div class="wrap-dust">
    <left-duty  className="left-container"></left-duty>
    <middle-duty className="middle-container"></middle-duty>

    <right-dust className="right-container"></right-dust>
  </div>
</template>

<script>
import backFram from "../common/back-fram.vue";
import NationControlStation from "./component/nationControlStation.vue";
import DeviceList from "./component/weather.vue";
import DeviceInfo from "./component/deviceInfo.vue";
import Warning from "./component/warning.vue";
import DustMonitor from "./dustMonitor.vue";
import LeftTopDust from "./leftDuty.vue";
import RightDust from "./rightDust.vue";
import MiddleDuty from './middleDuty.vue';
import CameraStatics from './component/cameraStatics.vue';
import LeftDuty from './leftDuty'

export default {
  components: {
    backFram,
    NationControlStation,
    DeviceList,
    DeviceInfo,
    Warning,
    DustMonitor,
    LeftTopDust,
    RightDust,
    MiddleDuty,
    LeftDuty,
    CameraStatics
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
.wrap-dust {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  > div {
    width: 100%;
  }
  .left-container ,.right-container {
    width: 45.4rem;
  }
  .middle-container{
    margin: 0 2.2rem;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
}
</style>
