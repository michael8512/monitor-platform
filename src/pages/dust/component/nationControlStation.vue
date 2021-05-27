<!--
 * @Description: 国控站
 * @Author: hexy
 * @Date: 2021-05-26 17:16:00
 * @LastEditors: hexy
 * @LastEditTime: 2021-05-27 16:54:30
 * @FilePath: /monitor-platform/src/pages/dust/nationControlStation.vue
-->
<template>
  <back-fram title="附近国控站" class="nation-container">
    <div class="amap-container">
      <el-amap
        vid="nationMap"
        :amap-manager="amapManager"
        :events="mapEvents"
        :zoom="13"
      >
        <el-amap-marker
          v-for="(item, index) in mapMarker"
          :key="index"
          :position="item.position"
          :label="item.label"
        />
      </el-amap>
    </div>
  </back-fram>
</template>

<script>
import backFram from "../../common/back-fram.vue";
import AMap, { AMapManager } from "vue-amap";
import Vue from "vue";

Vue.use(AMap);
// 初始化vue-amap
AMap.initAMapApiLoader({
  // 高德key
  key: "e71e153de3311313adfad0a213093363",
  // 插件集合 （插件按需引入）
  plugin: ["AMap.Geolocation"],
});
export default {
  components: { backFram },
  data() {
    let amapManager = new AMapManager();
    return {
      amapManager,
      mapEvents: {
        init(o) {
          o.setMapStyle("amap://styles/darkblue"); //自定义的高德地图的样式，我选的是马卡龙
        },
      }, // 数据格式：
      mapMarker: [
        {
          position: [104.083588, 30.648569],
          label: { content: "办公地点", offset: [-20, -30] },
        },
        {
          position: [61.59996, 90.177646],
          label: { content: "学校地点", offset: [-20, -30] },
        },
      ],
    };
  },
};
</script>

<style lang="scss">
.nation-container {
  .title {
    height: 34px;
  }
  .amap-container {
    height: 300px;

    #nationMap .amap-logo {
      display: none !important;
    }
  }
}
</style>
