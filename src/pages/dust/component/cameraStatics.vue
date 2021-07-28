<!--
 * @Description: 监控统计
 * @Author: hexy
 * @Date: 2021-05-28 20:22:36
 * @LastEditors: hexy
 * @LastEditTime: 2021-06-19 23:37:42
 * @FilePath: /monitor-platform/src/pages/dust/component/cameraStatics.vue
-->
<template>
  <back-fram :title="title" class="camera-statics" :height="'28.1rem'" width="auto">
    <div class="camera-container">
      <detail-btn url="dustInfo" />
      <div class="statics">
        <div class="statics-item">
          <div class="item-title">总数量</div>
          <div class="item-value">{{data.total || 0}}</div>
        </div>
        <div class="statics-item">
          <div class="item-title">在线</div>
          <div class="item-value online">{{data.online || 0}}</div>
        </div>
        <div class="statics-item">
          <div class="item-title">离线</div>
          <div class="item-value offline">{{data.offline || 0}}</div>
        </div>
      </div>
      <div class="cover-rate">
        <dash-board title="覆盖率" :data="data.percent"></dash-board>
      </div>
    </div>
  </back-fram>
</template>

<script>
import backFram from "../../common/back-fram.vue";
import { mapState } from "vuex";
import DetailBtn from 'common/detail-btn';
import DashBoard from 'common/dash-board';

export default {
  components: { backFram, DetailBtn, DashBoard },
  props: {
    title: {
      type: String
    },
    data: {
      type: Object
    },
  },
  data() {
    return {

    };
  },
  computed: {
    ...mapState(['fontSize', 'baseUrl']),
  },
  mounted() {
    
  },
};
</script>

<style lang="scss" scoped>
.camera-container{
  display: flex;
  align-items: center;
  justify-content:space-around;
  margin: auto 2.4rem;
  height: 22rem;
  > div:first-child {
    height: 11.6rem;
  }
}
.statics{
  width: 23.6rem;
  background: linear-gradient(180deg, #137edd80 0%, rgba(5, 87, 125, 0.17) 68%, rgba(7, 17, 63, 0) 100%);
  display: flex;
  justify-content: space-around;
  align-items: center;

  .statics-item{
    display: flex;
    padding-top: 1rem;
    flex-direction:column;
    align-items: center;
  }
  .item-title{
    color: #fff;
    font-size: 1.4rem;
  }
  .item-value{
    font-size: 3.2rem;
    color: #fff;
    font-weight: bold;
    font-family: DIN-Bold, DIN;
    &.online{
      color: #0087FF;
    }
    &.offline{
      color: #CA0D0D;
    }
  }
}
.cover-rate{
  width: 15.2rem;
  height: 12.4rem;
}
</style>
