<template>
  <div class="scroll-wraper" v-resize="resizehandle" ref="scrollBody">
    <div class="scroll-list">
      <div class="scroll-list-item" v-for="item in dataList" :key="item[keyIndex]">
        <slot :data="{...item}"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { TweenMax, Power2, TweenLineLite } from 'gsap';
import axios from 'axios';
export default {
  name: 'CarouselBox',
  props: {
    dataList: {
      default: []
    },
    getList: {
      default: ()=>{}
    },
    keyIndex: {
      default: 'name'
    }
  },
  data () {
    return {
      id: 1,
      tween: null,
      scrollTime: 0.75,
      holdTime: 1.25,
      scrollHeight: 0,
      tableRowHeight: 40,
      keepScroll: null,
      timer: null
    };
  },
  mounted() {
    this.getData();

    this.timer = setInterval(()=>{
      this.getData();
    }, 30000);
  },
  beforeDestroy() {
    this.timer && clearInterval(this.timer);
    this.keepScroll && clearTimeout(this.keepScroll);
  },
  methods: {
    getData() {
      axios.post("/api/call/getRoomStat").then(res=>{
        if (res.data && res.data.data) {
          let data = res.data.data;
          this.dataList = data;
          this.getActualBehavior();
        }
      });
    },
    resizehandle({width, height}) {
      this.scrollHeight = height;
    },
    getActualBehavior() {
      const scrollBody = this.$refs.scrollBody;
      const { tableRowHeight, dataList, scrollTime, scrollHeight } = this;

      TweenMax.to(scrollBody, scrollTime, {
        scrollTop: tableRowHeight,
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
<style lang="scss" scoped>
.scroll-wraper {
  position: relative;
  height: calc(100% - 26px);
  overflow: auto;
  z-index: 1;
  &::-webkit-scrollbar {
    display: none;
  }
}

.scroll-list {
  transform: translateY(-40px);

  &-item {
    display: flex;
    justify-content: space-between;
    line-height: 40px;
    font-family: MicrosoftYaHei;
    font-size: 14px;
    color: #189aae;
    .name{
      display: inline-block;
      box-sizing: border-box;
      width: 30%;
      height: 40px;
      padding: 0 8px;
      text-align: center;
      vertical-align: middle;
      &:first-child{
        flex: 1;
      }
    }
  }
}
</style>
