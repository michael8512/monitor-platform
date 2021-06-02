<template>
  <vis-border title="安监抽查记录" width="59.2rem" height="45rem">
    <div class="check-list">
      <div class="panel-content">

        <div class="scroll-wraper" ref="scrollBody">
          <div class="scroll-list">
            <div class="scroll-list-item panel-content-item" v-for="item in dataList" :key="item.id">
              <div class="date">{{item.date}}</div>
              <div class="desc">{{item.text}}</div>
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
      tableRowHeight: 3.8,
      keepScroll: null,
      timer: null,
      dataList: [],

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
      get("/api/safetyCheck/checkList").then(res=>{
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
  }
}
</script>
<style lang="scss" scope>
.check-list {
  .panel-content {
    overflow: hidden;
    height: 100%;
    padding: 1rem 2rem;
    box-sizing: border-box;

    .scroll-list {
      height: 100%;
      &-item {
        width: 100%;
        box-sizing: border-box;
        font-family: MicrosoftYaHei;
        font-size: min(1.4rem, 14px);;
        line-height: 5rem;
        display: flex;
        align-items: center;
        padding: 0 1.6rem;
        padding-left: 0;
        background-color: rgba(18,112,196,0.2);
        margin-top: 1rem;
        color: rgba(179, 179, 179, 1);

        .desc {
          text-align: left;
          flex-grow: 1;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          padding-left: 2rem;
          box-sizing: border-box;
        }

        .date {
          width: 16rem;
          text-align: center;
          box-sizing: border-box;
          font-size: 1.4rem;
          font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
          font-weight: 400;
          color: rgba(255,255,255,0.6);
          background-color: rgba(18,112,196,0.1);
        }
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
