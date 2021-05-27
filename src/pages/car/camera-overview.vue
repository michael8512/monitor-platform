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

        <div class="content" v-if="currentTab === 'video'">
          <div class="process-list">
            <div class="process-list-item" v-for="item in processList" :key="item.id">
              <div class="name">{{item.name}}</div>
              <div class="dot"></div>
              <img class="pic" :src="item.picUrl" />
            </div>
          </div>
        </div>
        <div class="content" v-else>
          <div class="process-list">
            <div class="process-list-item" v-for="item in processList" :key="item.id">
              <div class="name">{{item.name}}</div>
              <div class="dot"></div>
              <img class="pic" :src="item.picUrl" />
            </div>
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
      ],

      processList: [],
      currentTab: 'video'
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
      if(this.currentTab === 'video') {
        get(`/api/camera/processList`).then(res=>{
          this.processList = res.data;
        });
      } else {
        get(`/api/camera/processList`).then(res=>{
          this.processList = res.data;
        });
      }
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

    .content {
      padding: 2rem 2rem;
      position: relative;
      .process-list {
        height: 100%;
        &::after {
          content: '';
          position: absolute;
          top: 3rem;
          left: 9rem;
          height: 100%;
          width: 1px;
          background-color: #137EDD;
          z-index: 1;
        }

        &-item {
          display: flex;
          margin-top: 4rem;
          position: relative;
          z-index: 2;
          
          .name {
            width: 5.6rem;
            text-align: right;
            font-size: 1.4rem;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: rgba(255, 255, 255, 0.7);
          }
          .dot {
            width: 1.2rem;
            height: 1.2rem;
            border-radius: 50%;
            background-color: #137EDD;
            margin: 0 1rem;
          }
          .pic {
            width: 48rem;
            height: 20rem;
            object-fit: contain;
          }
        }
      }
    }
  }
}
</style>
