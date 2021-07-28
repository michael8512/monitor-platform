<!--
 * @Description: 设备列表
 * @Author: hexy
 * @Date: 2021-05-26 17:04:28
 * @LastEditors: hexy
 * @LastEditTime: 2021-05-30 15:31:31
 * @FilePath: /monitor-platform/src/pages/dust/component/overDustTop.vue
-->
<template>
  <back-fram title="超标次数排行" class="over-top" height="24.8rem">
    <detail-btn url="alarmList" />
    <table-skin
      className="over-top-container"
      :data="tableData"
      :tableHeader="tableHeader"
      scrollY="12.3rem"
    ></table-skin>
  </back-fram>
</template>

<script>
import backFram from "../../common/back-fram.vue";
import { get } from "utils/http";
import TableSkin from "./tableSkin.vue";
import { map } from 'lodash';
import DetailBtn from 'common/detail-btn';

export default {
  components: { backFram, TableSkin, DetailBtn },
  data() {
    return {
      tableData: [],
      tableHeader: [
        { title: '所属项目', id: 1 },
        { title: '设备名称', id: 2 },
        { title: 'PM2.5', id: 3 },
        { title: 'PM10', id: 4 },
      ]
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    getTableData() {
      get(`/api/all/getAlarmOrder`).then(({ code, data }) => {
        if (code !== 0) {
          return;
        }
        this.tableData = map(data, ({projectName, deviceId, pm25, pm10})=> {
          return {
            name: projectName,
            type: deviceId,
            PM10: pm10,
            value: pm25
          }
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.over-top {
  margin-bottom: 2rem;
  .over-top-container {
    margin: 2rem 1.7rem;
  }
}
</style>
