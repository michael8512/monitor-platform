<!--
 * @Description: 设备列表
 * @Author: hexy
 * @Date: 2021-05-26 17:04:28
 * @LastEditors: hexy
 * @LastEditTime: 2021-05-30 23:11:54
 * @FilePath: /monitor-platform/src/pages/onDuty/component/overDustTop.vue
-->
<template>
  <back-fram title="超标次数排行" class="over-top" height="32.1rem">
    <table-skin
      className="over-top-container"
      :data="tableData"
      :tableHeader="tableHeader"
      scrollY="20.3rem"
    ></table-skin>
  </back-fram>
</template>

<script>
import backFram from "../../common/back-fram.vue";
import { get } from "utils/http";
import TableSkin from "./tableSkin.vue";
export default {
  components: { backFram, TableSkin },
  data() {
    return {
      tableData: [],
      tableHeader: [],
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    getTableData() {
      get(`/api/onDuty/dutyRate`).then(({ code, data }) => {
        if (code !== 0) {
          return;
        }
        this.$data.tableData = data.value;
        this.$data.tableHeader = data.header;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.over-top {
  margin-bottom: 2rem;
  margin-top: 2.2rem;
  .over-top-container {
    margin: 2rem 1.7rem;
  }
}
</style>
