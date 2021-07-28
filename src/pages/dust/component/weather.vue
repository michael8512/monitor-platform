<!--
 * @Description: 设备列表
 * @Author: hexy
 * @Date: 2021-05-26 17:04:28
 * @LastEditors: hexy
 * @LastEditTime: 2021-06-19 23:33:34
 * @FilePath: /monitor-platform/src/pages/dust/component/weather.vue
-->
<template>
  <back-fram title="天气情况" class="weather" height="32.7rem">
    <div class="weather-container">
      <div
        class="wea-item"
        v-for="(item, index) in weatherArr"
        :key="index"
      >
      <div
        class="wea-item"
        v-for="{ name, value, unit } in item"
        :key="name"
      >
        <div class="wea-title">{{ name }}</div>
        <div class="wea-value">{{ `${value} ${unit}` }}</div>
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
      weatherArr: [
        [{
          id: 0,
          name: 'PM2.5',
          value: 40,
          unit: 'ug/m³'
        },
        {
          id: 2,
          name: 'PM10',
          value: 43,
          unit: 'ug/m³'
        },
        {
          id: 3,
          name: '空气质量',
          value: '优',
          unit: ''
        }],
        [{
          id: 4,
          name: '温度',
          value: 25,
          unit: '℃'
        },
        {
          id: 6,
          name: '湿度',
          value: 25,
          unit: ''
        },
        {
          id: 7,
          name: 'AQI指数',
          value: '',
          unit: ''
        }],
      ],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      get(`/api/all/getWeatherInfo`).then(({ code, data }) => {
        if (code !== 0) {
          return;
        }
        const {city, pm25, pm10, temp, weather, wet, aqi, pubTime, level} = data;
        this.weatherArr[0][0].value = pm25;
        this.weatherArr[0][1].value = pm10;
        this.weatherArr[0][2].value = weather;

        this.weatherArr[1][0].value = temp;
        this.weatherArr[1][1].value = wet;
        this.weatherArr[1][2].value = aqi;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.weather {
  margin-bottom: 2.4rem;
  .weather-container>div {
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
