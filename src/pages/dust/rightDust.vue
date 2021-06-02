<!--
 * @Description: 右侧栏
 * @Author: hexy
 * @Date: 2021-05-28 20:33:27
 * @LastEditors: hexy
 * @LastEditTime: 2021-05-30 13:55:28
 * @FilePath: /monitor-platform/src/pages/dust/rightDust.vue
-->

<template>
  <div :class="className">
    <over-dust-top></over-dust-top>
    <over-rate></over-rate>
    <over-dust-bottom></over-dust-bottom>
  </div>
</template>

<script>
import Weather from "./component/weather";
import NationControlStation from "./component/nationControlStation";
import CameraStatics from "./component/cameraStatics.vue";
import OverRate from "./component/overRate.vue";
import OverDustBottom from "./component/overDustBottom.vue";
import OverDustTop from "./component/overDustTop.vue";
export default {
  components: {
    Weather,
    NationControlStation,
    CameraStatics,
    OverRate,
    OverDustBottom,
    OverDustTop,
  },
  props: {
    className: String,
  },
  data() {
    return {};
  },
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
    width: 49.65rem;
    // .my-background-frame .title{
    //   line-height: 4rem;
    // }
  }

  .camera-container {
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
