<!--
 * @Description: 设备信息
 * @Author: hexy
 * @Date: 2021-05-26 17:05:53
 * @LastEditors: hexy
 * @LastEditTime: 2021-05-27 19:56:11
 * @FilePath: /monitor-platform/src/pages/dust/component/deviceInfo.vue
-->
<template>
  <back-fram title="设备信息" class="other" :height="'26.2rem'">
    <div class="d">232132</div>
  </back-fram>
</template>

<script>
import backFram from "../../common/back-fram.vue";
export default {
  components: { backFram },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.crane-wrap {
  // background: olivedrab;
  height: 100%;
  width: 100%;
  .other {
    width: 500px;
    height: 400px;
    margin: 200px;
    .d {
      background: olivedrab;
      padding: 12px;
    }
  }
}
</style>
