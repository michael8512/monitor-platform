<!--
 * @Description: 
 * @Author: hexy
 * @Date: 2021-05-30 19:07:10
 * @LastEditors: hexy
 * @LastEditTime: 2021-05-30 23:54:22
 * @FilePath: /monitor-platform/src/pages/onDuty/leftDuty.vue
-->
<template>
  <div :class="className" class="container">
    <camera-statics title="监控覆盖统计" :data="staticsData"></camera-statics>
    <device-info></device-info>
    <message
      className="message-container"
      :data="tableData"
      scrollY="38rem"
    ></message>
  </div>
</template>

<script>
import { get } from "utils/http";
import CameraStatics from "./component/cameraStatics.vue";
import DeviceInfo from "./component/deviceInfo.vue";
import Message from "./component/message.vue";
export default {
  components: {
    CameraStatics,
    DeviceInfo,
    Message,
  },
  props: {
    className: String,
  },
  data() {
    return {
      tableData: [],
      staticsData: {},
    };
  },
  mounted() {
    this.getData();
    this.getTableData();
  },
  methods: {
    getData() {
      get(`/api/onDuty/statics`).then(({ code, data }) => {
        if (code !== 0) {
          return;
        }
        this.$data.staticsData = data;
      });
    },
    getTableData() {
      get(`/api/onDuty/message`).then(({ code, data }) => {
        if (code !== 0) {
          return;
        }
        this.$data.tableData = data;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
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
