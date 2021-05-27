<template>
  <div class="wrap-dust">
    <div class="left-container">
      <div class="left-top-container">
        <div class="dust-calendar">
        <device-list />

        </div>
        <div>
          <nation-control-station />
          
        </div>
      </div>
      <dust-monitor></dust-monitor>
    </div>

    <div class="right-container">
      <device-info />
      <warning />
    </div>
  </div>
</template>

<script>
import backFram from "../common/back-fram.vue";
import NationControlStation from "./component/nationControlStation.vue";
import DeviceList from "./component/deviceList.vue";
import DeviceInfo from "./component/deviceInfo.vue";
import Warning from "./component/warning.vue";
import DustMonitor from './dustMonitor.vue';

export default {
  components: {
    backFram,
    NationControlStation,
    DeviceList,
    DeviceInfo,
    Warning,
    DustMonitor,
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
    margin-right: 2.3rem;
    .left-top-container{
      
    }
    
  }
  .left-top-container{
    display: flex;
    justify-content: space-between;
    &:first-child{
    margin-right: 2.3rem;
    }
  }
  .right-container {
    width: 49.65rem;
  }
}
</style>
