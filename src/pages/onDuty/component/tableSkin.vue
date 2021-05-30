<!--
 * @Description: 表格皮肤
 * @Author: hexy
 * @Date: 2021-05-28 21:05:55
 * @LastEditors: hexy
 * @LastEditTime: 2021-05-30 22:18:39
 * @FilePath: /monitor-platform/src/pages/onDuty/component/tableSkin.vue
-->

<template>
  <div :class="className" class="table-container">
    <div class="table-header table-item">
      <span v-for="{ title, id } in tableHeader" :key="id"> {{ title }}</span>
    </div>
    <div class="scroll-tab" :style="`height: ${scrollY}`">
      <div
        class="table-item"
        v-for="({ id, name, type, value }, i) in data"
        :key="id"
      >
        <span>
          <span class="ranking" :class="'rank-' + (i + 1)">{{ i + 1 }}</span>
          {{ name }}
          </span>
        <span class="red-color">{{ type }}</span>
        <span class="red-color">{{ value }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
  margin: 0 1.7rem;
  text-align: center;
}
.scroll-tab {
  overflow-y: auto;
}
.table-item {
  height: 5rem;
  line-height: 5rem;
  display: flex;
  padding-left: 3rem;
  font-size: 14px;
  font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
  font-weight: 400;
  color: #fff;
  background-color: #1270c420;
  margin: 0.4rem auto;
  font-weight: 500;
  > span {
    flex: 1;
    text-align: center;
    &.red-color {
      color: #cc5151;
    }
    &:first-child{
      display: flex;
      align-items: center;
    }
  }
    .ranking {
      color: #fff;
      width: 2rem;
      flex: initial;
      margin-right: 1.2rem;

        width: 2rem;
        height: 2rem;
        display: block;
        background: #7e8e9d;
        border-radius: 2px;
        line-height: 2rem;
        &.rank-1 {
          background: #cc5151;
        }
        &.rank-2 {
          background: #f1b129;
        }
        &.rank-3 {
          background: #1270c4;
        }
      
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
