<template>
  <div class="dust-wrap">
    <device-list />
    <div>
      <nation-control-station />
      <monitor />
    </div>
    <div>
      <device-info />
      <warning />
    </div>
  </div>
</template>

<script>
import backFram from "../../common/back-fram.vue";
import NationControlStation from "./nationControlStation.vue";
import DeviceList from "./deviceList.vue";
import DeviceInfo from "./deviceInfo.vue";
import Warning from "./warning.vue";
import Monitor from "../monitor.vue";

export default {
  components: {
    backFram,
    NationControlStation,
    DeviceList,
    DeviceInfo,
    Warning,
    Monitor,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.dust-wrap {
  height: 100%;
  width: 100%;
  display: flex;
  > div {
    margin-right: 23px;
    width: 100%;
    &:first-child {
      flex: 1.5;
    }
    &:nth-child(2) {
      flex: 2.5;
    }
    &:last-child {
      flex: 1.5;
      margin-right: 0;
    }
  }
}
</style>
