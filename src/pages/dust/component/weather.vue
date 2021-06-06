<!--
 * @Description: 设备列表
 * @Author: hexy
 * @Date: 2021-05-26 17:04:28
 * @LastEditors: hexy
 * @LastEditTime: 2021-06-06 17:20:37
 * @FilePath: /monitor-platform/src/pages/dust/component/weather.vue
-->
<template>
  <back-fram title="天气情况" class="weather" height="18.3rem">
    <div class="weather-container">
      <div
        class="wea-item"
        v-for="{ id, name, value, unit } in weatherArr"
        :key="id"
      >
        <div class="wea-title">{{ name }}</div>
        <div class="wea-value">{{ `${value} ${unit}` }}</div>
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
      weatherArr: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      get(`/api/dust/weather`).then(({ code, data }) => {
        if (code !== 0) {
          return;
        }
        this.$data.weatherArr = data;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.weather {
  margin-bottom: 2.4rem;
  .weather-container {
    display: flex;
    justify-content: space-around;
    margin: 1.7rem 1.5rem 2.5rem 1.5rem;
  }
  .wea-item {
    flex: 1;
    text-align: center;
    &:last-child {
      > div {
        border-right-color: #137edd;
      }
    }
  }
  .wea-title {
    color: #fff;
    background: rgba(19, 126, 221, 0.25);
    border: 1px solid #137edd;
    height: 3.6rem;
    line-height: 3.6rem;
    border-right-color: transparent;
  }
  .wea-value {
    border: 1px solid #137edd;
    height: 6.3rem;
    line-height: 6.3rem;
    border-top: 0;
    font-size: 1rem;
    font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.7);
    border-right-color: transparent;
  }
}
</style>
