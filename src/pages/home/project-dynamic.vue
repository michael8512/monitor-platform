<template>
  <vis-border title="最新动态" width="45.4rem" height="31rem">
    <div class="project-dynamic">
      <div class="panel-content">
        <div class="scroll-wraper" ref="scrollBody">
          <div class="scroll-list">
            <div class="scroll-list-item panel-content-item" v-for="item in dataList" :key="item.id">
              <div class="text type">{{item.type}}</div>
              <div class="text">{{item.text}}</div>
              <div class="date">{{item.date}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </vis-border>
</template>

<script>
import { post } from 'utils/http';
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
      post("/api/all/dynamic").then(res=>{
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
.project-dynamic {
  .panel-content {
    overflow: hidden;
    height: 100%;
    padding: 0 1.6rem 3rem;
    box-sizing: border-box;


    .scroll-list {
      height: 23.4rem;
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


      .text {
        color: rgba(179, 179, 179, 1);
        margin-right: 1rem;
      }
      .date {
        font-size: 1.4rem;
        font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
        font-weight: 400;
        color: rgba(255,255,255,0.6);
      }

      .type {
        padding: 0 0.7rem;
        line-height: 2.4rem;
        border-radius: 2px;
        border: 1px solid #979797;    
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
