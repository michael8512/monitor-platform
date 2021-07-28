<!--
 * @Description: 设备列表
 * @Author: hexy
 * @Date: 2021-05-26 17:04:28
 * @LastEditors: hexy
 * @LastEditTime: 2021-06-06 18:01:22
 * @FilePath: /monitor-platform/src/pages/dust/component/overDustBottom.vue
-->
<template>
  <back-fram title="超标次数排行" class="over" height="41rem">
    <div class="over-container">
      <div
        class="over-item"
        v-for="{ id, name, value, type } in overArr"
        :key="id"
      >
        <div class="over-title">{{ name }}</div>
        <div class="over-value" :class="type">{{ `${value}` }}</div>
      </div>
    </div>
    <table-skin
      :data="tableData"
      :tableHeader="tableHeader"
      scrollY="20rem"
    ></table-skin>
  </back-fram>
</template>

<script>
import backFram from "../../common/back-fram.vue";
import { get } from "utils/http";
import TableSkin from "./tableSkin";
import { map } from 'lodash';

export default {
  components: { backFram, TableSkin },
  data() {
    return {
      overArr: [
        {
          id: 0,
          name: '今日',
          value: 0,
          type: 'day'
        },
        {
          id: 2,
          name: '本周',
          value: 0,
          type: 'week'
        },
        {
          id: 3,
          name: '本月',
          value: 0,
          type: 'month'
        },
      ],
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
    this.getData();
    this.getTableData();
  },
  methods: {
    getData() {
      get(`/api/all/getAlarmCount`).then(({ code, data }) => {
        if (code !== 0) {
          return;
        }
        const { todayCount, thisWeekCount, thisMonthCount} = data;
        this.overArr[0].value = todayCount;
        this.overArr[1].value = thisWeekCount;
        this.overArr[2].value = thisMonthCount;
      });
    },
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
.over {
  margin: 2.6rem 0 2.4rem 0;
  .over-container {
    display: flex;
    justify-content: space-around;
    margin: 1.2rem 1.5rem 1.7rem 1.5rem;
  }
  .over-item {
    width: 11.5rem;
    text-align: center;
  }
  .over-title {
    color: #fff;
    background: rgba(19, 126, 221, 0.25);
    border: 1px solid #137edd;
    height: 2.9rem;
    line-height: 3rem;
  }
  .over-value {
    border: 1px solid #137edd;
    height: 4rem;
    line-height: 4rem;
    border-top: 0;
    font-size: 2.3rem;
    font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.7);
  }
  .week{
    color: #EBBA0F;
  }
  .month{
    color: #00DAFF;
  }
}
</style>
