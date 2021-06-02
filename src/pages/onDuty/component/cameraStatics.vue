<!--
 * @Description: 监控统计
 * @Author: hexy
 * @Date: 2021-05-28 20:22:36
 * @LastEditors: hexy
 * @LastEditTime: 2021-05-30 22:58:14
 * @FilePath: /monitor-platform/src/pages/onDuty/component/cameraStatics.vue
-->
<template>
  <back-fram
    :title="title"
    class="camera-statics"
    :height="'23.2rem'"
    width="45.4rem"
  >
    <div class="camera-container">
      <div class="cover-rate">
        <instrument-panel
          :color="color"
          :dataArr="dataArr"
          :titleColor="titleColor"
        ></instrument-panel>
      </div>
      <div class="camera-left">
          <div class="statics-item">
            <div class="item-title">辖区内项目总数</div>
            <div class="item-value">{{ data.total }}</div>
          </div>
        <div class="statics">
          <div class="statics-item">
            <div class="item-title">已安装</div>
            <div class="item-value online">{{ data.online }}</div>
          </div>
          <div class="statics-item">
            <div class="item-title">未安装</div>
            <div class="item-value offline">{{ data.offline }}</div>
          </div>
        </div>
      </div>
    </div>
  </back-fram>
</template>

<script>
import backFram from "../../common/back-fram.vue";
import InstrumentPanel from "./instrumentPanel.vue";
export default {
  components: { backFram, InstrumentPanel },
  props: {
    title: String,
    data: Object,
  },
  data() {
    return {
      color: ["#CC9F01", "#30B0B3"],
      titleColor: ["#137EDD", "#fff"],
      dataArr: [
        {
          value: 60,
          name: "覆盖率",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.camera-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: auto 3rem;
  height: 23.3rem;
}
.statics {
  width: 18rem;
  margin-top: 1rem;
  display: flex;
  >div{
    flex: 1;
  }

}
  .statics-item {
    display: flex;
    flex-direction: column;
    align-items: left;
  }
  .item-title {
    color: #fff;
    font-size: 1.4rem;
  }
  .item-value {
    font-size: 3.2rem;
      color: #0087ff;
    font-weight: bold;
    font-family: 'DIN-Bold, DIN;'
  }
.cover-rate {
  // flex: 1;
  width: 16em;
  height: 18rem;
}
.camera-left{
  padding-left: 6rem;
}
</style>
