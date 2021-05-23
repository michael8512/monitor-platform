<template>
  <div class="project-dynamics">
    <div class="panel-title">项目动态</div>
    <div class="panel-content">
      <div class="scroll-wraper" v-resize="resizehandle" ref="scrollBody">
        <div class="scroll-list">
          <div class="scroll-list-item panel-content-item" v-for="item in dataList" :key="item.dynamic">
            <span class="date">{{item.data}}</span>
            <span class="text" @click="jumpTo(item.showUrl)">{{item.dynamic}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get } from 'utils/http';
import { mapState } from "vuex";
import { TweenMax, Power2, TweenLineLite } from 'gsap';

export default {
  name: 'page',
  data(){
    return {
      tween: null,
      scrollTime: 0.75,
      holdTime: 1.25,
      scrollHeight: 0,
      tableRowHeight: 5.2,
      keepScroll: null,
      timer: null,
      dataList: []
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
      get("/api/construction/getConstructionDynamic").then(res=>{
        if (res.data) {
          this.dataList = res.data;
          
          this.dataList.length >3 && this.getActualBehavior();
        }
      });
    },
    resizehandle({width, height}) {
      this.scrollHeight = height;
    },
    getActualBehavior() {
      const scrollBody = this.$refs.scrollBody;
      const { tableRowHeight, dataList, scrollTime, scrollHeight, fontSize } = this;

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
<style lang="scss">
.project-dynamics {
  .panel-content {
    height: 15.6rem;
    overflow: hidden;

    &-item {
      width: 100%;
      margin-top: 1rem;
      padding: 0 1.4rem;
      background-image: linear-gradient(90deg,	rgba(42, 191, 242, 0.2) 0%, 	rgba(4, 29, 68, 0.2) 100%);
      font-family: MicrosoftYaHei;
      font-size: min(1.2rem, 12px);;
      line-height: 4.2rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;

      .date {
        margin-right: min(1.2rem, 12px);;
        color: rgba(25, 220, 231, 1);
      }

      .text {
        color: rgba(179, 179, 179, 1);
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
