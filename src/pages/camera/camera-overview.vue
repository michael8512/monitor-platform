<template>
  <vis-border title="视频分布/形象进度" width="100%" height="100%">
    <div class="project-map">
      <div class="panel-content">
        <div class="tabs">
          <div 
            class="tabs-item" 
            @click="clickTab(item.name)"
            :class="item.isActive ? 'tabs-item-active':''" 
            v-for="item in tabList" :key="item.name">
            {{item.label}}
          </div>
        </div>
      </div>
    </div>
  </vis-border>
</template>

<script>
import { get } from 'utils/http';
import echarts from 'echarts';
import { mapState } from "vuex";
import VisBorder from 'common/back-fram';

export default {
  name: 'page',
  components: {
    VisBorder
  },
  data(){
    return {
      myChart: null,
      option: null,

      values: [],
      xLabels: [],

      tabList: [
        { name: 'video', label: '视频分布', isActive: true },
        { name: 'processing', label: '形象进度', isActive: false },
      ]
    }
  },
  mounted() {
    this.getData();
  },
  computed: {
    ...mapState(['fontSize']),
  },
  methods: {
    getData() {
      get(`/api/construction/deviceDistribution`).then(res=>{
        
      })
    },
    initChart() {
      
    },
    clickTab(name) {
      this.tabList.forEach(item=>{
        item.isActive = item.name === name ? true : false;
      });
    }
  }
}
</script>
<style lang="scss">
.project-map {
  height: calc(100% - 4.2rem);
  .panel-content {
    position: relative;

    .tabs {
      display: flex;
      &-item {
        box-sizing: border-box;
        text-align: center;
        width: 50%;
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #FFFFFF;
        line-height: 4.7rem;
        border-bottom: 1px solid rgba(19,126,221,0.6);
        transition: all 0.3s;

        &-active {
          color: #0087FF;
          border-bottom: 2px solid #0087FF;
        }
      }
    }
  }
}
</style>
