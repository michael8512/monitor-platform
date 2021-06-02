<!--
 * @Description: 设备信息
 * @Author: hexy
 * @Date: 2021-05-26 17:05:53
 * @LastEditors: hexy
 * @LastEditTime: 2021-05-30 23:44:02
 * @FilePath: /monitor-platform/src/pages/onDuty/component/deviceInfo.vue
-->
<template>
  <back-fram title="监测设备概况" class="device-container" :height="'22.8rem'">
    <div class="device-content">
      <div
        class="device-item"
        v-for="{ id, value, unit, key, title } in data"
        :key="id"
      >
        <div class="device-title">{{ title }}</div>
        <div class="device-icon" :class="key"></div>
        <div class="device-value">
          <span class="value">{{ value }}</span
          >{{ unit }}
        </div>
      </div>
    </div>
  </back-fram>
</template>

<script>
import backFram from "../../common/back-fram.vue";
import { get } from "utils/http";
export default {
  components: { backFram },
  data() {
    return {
      data: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      get(`/api/onDuty/deviceInfo`).then(({ code, data }) => {
        if (code !== 0) {
          return;
        }
        this.$data.data = data;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.device-container {
  margin: 2.2rem 0;
}
.device-content {
  display: flex;
  padding-top: 2rem;
  margin: auto 1.7rem;
  .device-item {
    flex: 1;
    height: 14rem;
    background: rgba(18, 112, 196, 0.3);
    border: 1px solid #1270c4;
    margin-right: 0.7rem;
    padding: 1rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    .device-title {
      font-weight: 500;
      color: #ffffff;
      font-size: 1.4rem;
    }
    .device-icon{
      width: 5rem;
      height: 5rem;
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      &.total{
        background-image: url(../image/total.png);
      }
      &.online{
        background-image: url(../image/online.png);
      }
      &.offline{
        background-image: url(../image/offline.png);
      }
      &.rate{
        background-image: url(../image/rate.png);
      }
    }
    .device-value {
      font-size: 1.6rem;
      color: #ffffff;
      line-height: 2.2rem;
      .value {
        font-weight: bold;
        color: #2598ff;
        font-size: 2.2rem;
        line-height: 2.2rem;
        margin-right: .5rem;
      }
    }
  }
}
</style>
