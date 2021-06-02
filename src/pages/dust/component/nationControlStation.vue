<!--
 * @Description: 国控站
 * @Author: hexy
 * @Date: 2021-05-26 17:16:00
 * @LastEditors: hexy
 * @LastEditTime: 2021-05-30 16:21:26
 * @FilePath: /monitor-platform/src/pages/dust/component/nationControlStation.vue
-->
<template>
  <back-fram title="附近国控站" class="nation-container">
    <div class="amap-container">
      <div id="container" class="nation-container"></div>
    </div>
  </back-fram>
</template>

<script>
import backFram from "../../common/back-fram";
// import AMap, { AMapManager } from "vue-amap";
import { get } from "utils/http";
// import Vue from "vue";

// Vue.use(AMap);
// // 初始化vue-amap
// AMap.initAMapApiLoader({
//   // 高德key
//   key: "e71e153de3311313adfad0a213093363",
//   // 插件集合 （插件按需引入）
//   plugin: ["AMap.Geolocation", "AMap.HeatMap"],
// });
export default {
  components: { backFram },
  data() {
    return {};
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      let map = new window.AMap.Map("container", {
        center: [119.6915, 29.78189],
        zoom: 8,
        mapStyle: "amap://styles/darkblue", //设置地图的显示样式
      });
      if (!this.isSupportCanvas()) {
        this.$Message.info(
          "热力图仅对支持canvas的浏览器适用,您所使用的浏览器不能使用热力图功能,请换个浏览器试试~"
        );
      }
      let heatmap;
      //从接口获取数据
      //官网示例数据结构 http://a.amap.com/jsapi_demos/static/resource/heatmapData.js
      get("/api/dust/map").then(({ code, data }) => {
        if (code === 0) {
            map.plugin(["AMap.Heatmap"], function () {
              //初始化heatmap对象
              heatmap = new AMap.Heatmap(map, {
                radius: 25, //给定半径
                opacity: [0, 0.8],
                gradient: {
                  0.5: "blue",
                  0.65: "rgb(117,211,248)",
                  0.7: "rgb(0, 255, 0)",
                  0.9: "#ffea00",
                  1.0: "red",
                },
              });
              //设置数据集
              heatmap.setDataSet({
                data: data,
                max: 5,
              });
            });
          }
      });
    },
    isSupportCanvas() {
      //判断浏览区是否支持canvas
      var elem = document.createElement("canvas");
      return !!(elem.getContext && elem.getContext("2d"));
    },
  },
};
</script>

<style lang="scss">
.nation-container {
  .amap-container {
    height: 30rem;
    background: transparent;
    padding: 0 0.5rem;
    .nation-container{
      height: 29.8rem;
      .amap-logo {
      display: none !important;
    }
    }
  }
}
</style>
