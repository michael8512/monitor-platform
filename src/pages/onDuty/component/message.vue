<!--
 * @Description: 
 * @Author: hexy
 * @Date: 2021-05-30 22:52:43
 * @LastEditors: hexy
 * @LastEditTime: 2021-05-30 23:52:31
 * @FilePath: /monitor-platform/src/pages/onDuty/component/message.vue
-->
<template>
  <back-fram title="消息中心" class="message-container" height="43.4rem">
    <div :class="className" class="table-container">
      <div class="scroll-tab" :style="`height: ${scrollY}`">
        <div
          class="table-item"
          v-for="({ id, date, value }, i) in data"
          :key="id"
        >
          <span>
            <span class="ranking" :class="'rank-' + (i + 1)"></span>
          </span>
          <span class="ranking-value">{{ value }}</span>
          <span>{{ date }}</span>
        </div>
      </div>
    </div>
  </back-fram>
</template>

<script>
import backFram from "../../common/back-fram.vue";
export default {
  components: { backFram },
  props: {
    data: {
      type: Array,
      default: [],
    },
    tableHeader: {
      type: Array,
      default: [],
    },
    className: String,
    scrollY: {
      type: String,
      default: "20.3rem",
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.table-container {
  margin: 2rem 1.7rem;
  text-align: center;
}
.scroll-tab {
  overflow-y: auto;
}
.table-item {
  height: 5rem;
  line-height: 5rem;
  display: flex;
  justify-content: space-between;
  padding: 0 3rem;
  font-size: 14px;
  font-family: "AlibabaPuHuiTi-Regular";
  font-weight: 400;
  color: #fff;
  background-color: #1270c420;
  margin: 0.8rem auto;
  font-weight: 500;
  > span {
    text-align: left;
    // width: 20%;
    &:first-child {
      display: flex;
      align-items: center;
    }
  }
  .ranking-value {
    flex: 1;
    padding-left: 1rem;
  }
  .ranking {
    color: #fff;
    width: 2rem;
    flex: initial;
    margin-right: 1.2rem;
    width: 2rem;
    height: 2rem;
    display: block;
    background: #000000;
    border-radius: 2px;
    line-height: 2rem;
  }
}

.table-header {
  color: #fff;
  background-color: #1270c420;
  height: 3rem;
  line-height: 3rem;
  font-size: 1.4rem;
  font-weight: 500;
  .rank {
    width: 2rem;
    flex: initial;
  }
}
</style>
