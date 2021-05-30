<!--
 * @Description: 右侧栏
 * @Author: hexy
 * @Date: 2021-05-28 20:33:27
 * @LastEditors: hexy
 * @LastEditTime: 2021-05-30 23:55:06
 * @FilePath: /monitor-platform/src/pages/onDuty/middleDuty.vue
-->

<template>
  <div :class="className">
    <duty-statistic></duty-statistic>
    <over-times></over-times>
  </div>
</template>

<script>
import DutyStatistic from './component/dutyStatistic.vue';
import OverTimes from './component/overTimes.vue';
export default {
  components: {
    DutyStatistic,
    OverTimes
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
</style>
