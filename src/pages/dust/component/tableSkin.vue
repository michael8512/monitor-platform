<!--
 * @Description: 表格皮肤
 * @Author: hexy
 * @Date: 2021-05-28 21:05:55
 * @LastEditors: hexy
 * @LastEditTime: 2021-05-30 15:12:26
 * @FilePath: /monitor-platform/src/pages/dust/component/tableSkin.vue
-->

<template>
  <div :class="className" class="table-container">
    <div class="table-header table-item">
      <span v-for="{ title, id } in tableHeader" :key="id"> {{ title }}</span>
    </div>
    <div class="scroll-tab" :style="`height: ${scrollY}`">
      <div
        class="table-item"
        v-for="{ name, type, value, PM10 } in data"
        :key="type"
      >
        <span class="overflow" title="name">{{ name }}</span>
        <span>{{ type }}</span>
        <span>{{ value }}</span>
        <span v-if="PM10">{{ PM10 }}</span>
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
    scrollY: String,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.table-container {
  border: 1px solid rgba(42, 111, 180, 0.4);
  margin: 0 1.7rem;

  .overflow {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
.scroll-tab {
  overflow-y: auto;
}
.table-item {
  height: 3.9rem;
  line-height: 4rem;
  display: flex;
  padding-left: 1rem;
  font-size: 14px;
  font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.7);
  &:nth-child(2n) {
    background-color: rgba(42, 111, 180, 0.4);
  }
  > span {
    flex: 1;
    text-align-last: left;
  }
}
.table-header {
  color: #fff;
  background-color: rgba(19, 126, 221, 0.4);
  border: 1px solid rgba(42, 111, 180, 0.4);
  height: 3.8rem;
}
</style>
