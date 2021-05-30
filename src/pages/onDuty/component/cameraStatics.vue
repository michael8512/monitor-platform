<!--
 * @Description: 监控统计
 * @Author: hexy
 * @Date: 2021-05-28 20:22:36
 * @LastEditors: hexy
 * @LastEditTime: 2021-05-30 17:02:05
 * @FilePath: /monitor-platform/src/pages/onDuty/component/cameraStatics.vue
-->
<template>
  <back-fram
    :title="title"
    class="camera-statics"
    :height="'26.2rem'"
    width="auto"
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
        <div class="statics">
          <div class="statics-item">
            <div class="item-title">总数量</div>
            <div class="item-value">{{ data.total }}</div>
          </div>
          <div class="statics-item">
            <div class="item-title">在线</div>
            <div class="item-value online">{{ data.online }}</div>
          </div>
          <div class="statics-item">
            <div class="item-title">离线</div>
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
  margin: auto 2rem;
  height: 23.3rem;
}
.statics {
  width: 23.6rem;
  background: linear-gradient(
    180deg,
    #137edd80 0%,
    rgba(5, 87, 125, 0.17) 68%,
    rgba(7, 17, 63, 0) 100%
  );
  display: flex;
  justify-content: space-around;
  align-items: center;

  .statics-item {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .item-title {
    color: #fff;
    font-size: 1.4rem;
  }
  .item-value {
    font-size: 3.2rem;
    color: #fff;
    font-weight: bold;
    font-family: DIN-Bold, DIN;
    &.online {
      color: #0087ff;
    }
    &.offline {
      color: #ca0d0d;
    }
  }
}
.cover-rate {
  // flex: 1;
  width: 16em;
  height: 18rem;
}
</style>
