<template>
  <div class="project-statistic">
    <div class="panel-title">工程概况展示</div>
    <div class="panel-content">
      <div class="image-box">
        <vis-animation
          class="head-animation" 
          :width="'25.8rem'"
          :height="'23.5rem'"
          :img-list="loadingList" 
          :time="timer" 
          :pause="pause"></vis-animation>
      </div>

      <div class="text-box">
        <div class="detail-item" v-for="(item, index) in details" :key="index">
          <span class="label">{{item.label}}:</span>
          <span class="value">{{item.value}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get } from 'utils/http';
import { mapState } from "vuex";
import VisAnimation from "common/animation/animation";
const buildingContext = require.context('./images/animation-frames/building', false, /\.png$/); //引用文件

export default {
  name: 'page',
  components: {
    VisAnimation
  },
  data(){
    return {
      timer: 3040,
      loadingList: buildingContext.keys().map(buildingContext),
      pause: false,
      details: [
        { label: '项目名称', value: '', name: 'name' },
        { label: '开工时间', value: '', name: 'startDate' },
        { label: '竣工时间', value: '', name: 'endDate' },
        { label: '建筑面积', value: '', name: 'area' },
        { label: '建筑高度', value: '', name: 'height' },
        { label: '建筑层数', value: '', name: 'layer' },
        { label: '建筑功能', value: '', name: 'effect' },
      ]
    }
  },
  mounted() {
    this.getData();
  },
  computed: {
    ...mapState([]),
  },
  methods: {
    getData() {
      get(`/api/construction/getConstructionSurvey`).then(res=>{
        const mapData = res.data;
        const details = this.details;
        details.forEach((item, index)=> {
          item.value = mapData[item.name] || '';
        });
      })
    }
  }
}
</script>
<style lang="scss">
.project-statistic {
  width: 100%;
  .panel-content {
    display: flex;
    justify-content: center;
    align-items: center;
    .img-box {
      width: 25.8rem;
      height: 23.5rem;
    }
    .text-box {
      height: 21.2rem;
      margin-left: 3rem;
      padding: 1.1rem 1.6rem;
      box-sizing: border-box;
      background-image: linear-gradient(180deg, 
        rgba(42, 191, 242, 0.28) 0%, 
        rgba(4, 29, 68, 0.28) 100%);

      .detail-item {
        .label,
        .value {
          font-family: MicrosoftYaHei;
          font-size: min(1.2rem, 12px);
          line-height: 2.9rem;
          color: rgba(179, 179, 179, 1);
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
        .label {
          margin-right: 1.6rem;
        }
      }
    }
  } 
}
</style>
