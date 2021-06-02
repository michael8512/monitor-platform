<template>
  <div class="wrap-dust">
    <div class="left-container">
      <left-top-dust className="left-top-container"></left-top-dust>
      <dust-monitor></dust-monitor>
    </div>

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
import LeftTopDust from "./leftTopDust.vue";
import RightDust from "./rightDust.vue";

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
  },
  data() {
    return {};
  },
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
  .left-container {
    flex: 1;
  }
  .left-top-container {
    display: flex;
    justify-content: space-between;
    &:first-child {
      margin-right: 2.3rem;
    }
  }
  .right-container {
    width: 49.65rem;
  }
}
</style>
