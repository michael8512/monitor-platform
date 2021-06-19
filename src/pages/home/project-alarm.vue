<template>
  <vis-border title="报警统计" width="45.4rem" height="60.6rem">
    <div class="project-alarm">
      <div class="panel-content">
        <div class="tab">
          <div class="tab-item" v-for="item in tabList" :key="item.name" :class="item.isActive ? 'tab-item-active':''">
            {{item.label}}
          </div>
        </div>  

        <div class="date-list">
          <div class="date-list-item" v-for="item in dateList" :key="item.name" >
            <div class="label">{{item.label}}</div>
            <div class="value">{{item.value}}</div>
          </div>
        </div>

        <div class="scroll-wraper" ref="scrollBody">
          <div class="scroll-list">
            <div class="scroll-list-item panel-content-item" v-for="item in dataList" :key="item.id">
              <div class="order" :class="`order-${item.id}`">{{item.id}}</div>
              <div class="text">{{item.name}}</div>
              <div class="text">{{item.type}}</div>
              <div class="total">{{item.total}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </vis-border>
</template>

<script>
import { get } from 'utils/http';
import { mapState } from "vuex";
import { TweenMax, Power2 } from 'gsap';
import VisBorder from 'common/back-fram';
export default {
  name: 'page',
  components: {
    VisBorder
  },
  data(){
    return {
      tween: null,
      scrollTime: 0.75,
      holdTime: 1.25,
      tableRowHeight: 5.8,
      keepScroll: null,
      timer: null,
      dataList: [],

      tabList: [
        { name: 'dust', label: '扬尘超标', isActive: true },
        { name: 'car', label: '车辆违规', isActive: false },
      ],

      dateList: [
        { value: 4, label: '今日', name: 'today'},
        { value: 8, label: '本周', name: 'week'},
        { value: 30, label: '本月', name: 'month'},
      ]
    }
  },
  mounted() {
    this.getData();
  },
  computed: {
    ...mapState([]),
    fontSize() {
      return document.documentElement.style.fontSize.split('px')[0] || 10;
    }
  },
  methods: {
    getData() {
      get("/api/home/getConstructionDynamic").then(res=>{
        if (res.data) {
          this.dataList = res.data;
          
          this.dataList.length >6 && this.getActualBehavior();
        }
      });
    },
    getActualBehavior() {
      const scrollBody = this.$refs.scrollBody;
      const { tableRowHeight, dataList, scrollTime, fontSize } = this;

      TweenMax.to(scrollBody, scrollTime, {
        scrollTop: tableRowHeight * fontSize,
        ease: Power2.easeNone,
        onComplete: ()=> {
          let first = dataList.shift();
          dataList.push(first);
          scrollBody.scrollTop = 0;
          this.scrollHandle();
        }
      });
    },
    scrollHandle() {
      this.keepScroll && clearTimeout(this.keepScroll);
      this.keepScroll = setTimeout(()=>{
        this.getActualBehavior();
      }, this.holdTime * 1000);
    },
    jumpTo(url){
      window.open(url);
    }
  }
}
</script>
<style lang="scss" scope>
.project-alarm {
  .panel-content {
    overflow: hidden;
    height: 100%;
    padding: 0 1.6rem 3rem;
    box-sizing: border-box;

    .tab {
      display: flex;
      justify-content: center;
      margin-top: 2.4rem;

      &-item {
        width: 13rem;
        line-height: 3.6rem;
        background: #07113A;
        box-shadow: 0px 0px 1.6rem 0px #0090FF inset;
        border: 1px solid #1270C4;
        text-align: center;
        margin: 0 0.6rem;
        font-size: 1.4rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 0.7);

        &-active {
          color: #2598FF;
        }
      }
    }

    .date-list {
      display: flex;
      justify-content: center;

      &-item {
        width: 12rem;
        height: 8rem;
        background: rgba(18, 112, 196, 0.5);
        border: 1px solid #1270C4;
        padding: 0.3rem;
        box-sizing: border-box;
        margin: 2.4rem 1rem;

        .label {
          text-align: center;
          line-height: 2.2rem;
          font-size: 16px;
          font-family: AlibabaPuHuiTi-Medium, AlibabaPuHuiTi;
          font-weight: 500;
          color: #FFFFFF;
          background: rgba(18,112,196,0.3);
        }
          
        .value {
          font-size: 4rem;
          text-align: center;
          font-family: DINAlternate-Bold, DINAlternate;
          font-weight: bold;
          color: #F1B129;
          line-height: 5rem;
        }
      }
    }

    .scroll-list {
      height: 34rem;
    }

    &-item {
      width: 100%;
      margin-top: 0.8rem;
      padding: 0 1.2rem;
      box-sizing: border-box;
      background-color: rgba(18,112,196,0.2);
      font-family: MicrosoftYaHei;
      font-size: min(1.4rem, 14px);;
      line-height: 5rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .order {
        margin-right: min(1.2rem, 12px);;
        width: 2rem;
        text-align: center;
        line-height: 2rem;
        font-size: 1.4rem;
        font-family: DINAlternate-Bold, DINAlternate;
        font-weight: bold;
        color: #FFFFFF;
        background-color: #7E8E9D;

        &-1 {
          background-color: #CC5151;
        }
        &-2 {
          background-color: #F1B129;
        }
        &-3 {
          background-color: #2598FF;
        }
      }

      .text {
        color: rgba(179, 179, 179, 1);
        margin-right: 2rem;
      }
      .total {
        font-size: 2rem;
        font-family: DINAlternate-Bold, DINAlternate;
        font-weight: bold;
        color: #CC5151;
      }
    }
  }
  .scroll-wraper {
    position: relative;
    height: 100%;
    overflow: auto;
    z-index: 1;
    &::-webkit-scrollbar {
      display: none;
    }
  }

}
</style>
