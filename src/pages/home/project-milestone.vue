<template>
  <div class="project-milestone">
    <div class="panel-title">项目里程碑</div>
    <div class="panel-content">
      <vis-animation
          class="head-animation" 
          :img-list="loadingList" 
          :time="timer" 
          :width="'45.7rem'"
          :height="'41.5rem'"
          :pause="pause">
          </vis-animation>
      <div class="label-wraper">
        <div
          class="label-wraper-item"
          v-for="({date, title, left, top, showUrl}, index) in list"
          :key="index"
          :style="`transform: translate(${left}, ${top});`"
        >
          <div class="date">{{date}}</div>
          <div class="name" @click="jumpTo(showUrl)">{{title}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get } from 'utils/http';
import { mapState } from "vuex";
import VisAnimation from "common/animation/animation";
const headContext = require.context('./images/animation-frames/milestone2', false, /\.png$/); //引用文件

export default {
  name: 'page',
  components: {
    VisAnimation
  },
  data(){
    return {
      timer: 5040,
      loadingList: headContext.keys().map(headContext),
      pause: false,

      mapPosition: {
        0: {
          left: '20rem',
          top: '32.8rem'
        },
        1: {
          left: '23.4rem',
          top: '24.4rem'
        },
        2: {
          left: '16.5rem',
          top: '18.4rem'
        },
        3: {
          left: '13rem',
          top: '10.7rem'
        },
        4: {
          left: '29.6rem',
          top: '6.5rem'
        },
        5: {
          left: '16.5rem',
          top: '0.8rem'
        },
      },

      list: [
        {
          date: '2020-06-12',
          title: '局EPC工程总承包管理三年推进会',
        },
        {
          date: '2020-08-25',
          title: '会展区最后一根框架',
        },
        {
          date: '2020-12-19',
          title: '省住建设厅，建设工会研讨会',
        },
        {
          date: '2021-01-12',
          title: '江北新区质安站开展专题党课',
        },
        {
          date: '2021-03-23',
          title: '会展及会议宴会钢结构封顶',
        },
        {
          date: '2021-08-19',
          title: '新区公建中心，沿山项目在扬子国际会议中心举办',
        },
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
      get(`/api/construction/getConstructionMilepost`).then(res=>{
        const mapPosition = this.mapPosition;
        this.list = res.data.map((item, index) => {
          return {
            ...item,
            ...mapPosition[index]
          }
        });
      })
    },
    jumpTo(url){
      window.open(url);
    }
  }
}
</script>
<style lang="scss">
.project-milestone {
  .panel-content {
    position: relative;
    width: 35.7rem;
    height: 30rem;
    .head-animation {
      width: 100%;
      height: 100%;
    }

    .label-wraper {
      width: 100%;
      height: 100%;
      z-index: 2;
      &-item {
        position: absolute;
        left: 0;
        top: 0;
        font-size: 1.2rem;
        font-family: MicrosoftYaHei;
        .date {
          color: rgba(255, 255, 255, 1);
        }
        .name {
          margin-top: 0.4rem;
          color: rgba(179, 179, 179, 1);
        }
      }
    }
  }
}
</style>
