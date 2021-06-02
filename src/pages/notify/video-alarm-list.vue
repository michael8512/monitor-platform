<template>
  <vis-border title="视频故障报警信息" width="43.9rem" height="43rem">
    <div class="video-alarm-list">
      <div class="panel-content">
        <div class="table-tr">
          <div class="table-tr-td" v-for="item in thList" :key="item.name">
            {{item.label}}
          </div>
        </div>
        <div class="scroll-wraper" ref="scrollBody">
          <div class="scroll-list">
            <div class="scroll-list-item alarm-item" v-for="item in dataList" :key="item.id">
              <div class="name">{{item.deviceName}}</div>
              <div class="message">{{item.message}}</div>
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

      thList: [
        { name: 'name', label: '视频设备'},
        { name: 'message', label: '报警信息'},
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
      get("/api/notify/videoAlarmList").then(res=>{
        if (res.data) {
          this.dataList = res.data;
          
          // this.dataList.length >11 && this.getActualBehavior();
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
.video-alarm-list {
  padding: 1rem 1.6rem;

  .panel-content {
    overflow: hidden;
    height: 100%;
    box-sizing: border-box;

    .table-tr {
      line-height: 4rem;
      background: rgba(19,126,221,0.24);
      display: flex;
      justify-content: space-between;
      padding: 0 1rem;

      &-td {
        width: 30%;
        font-size: 1.4rem;
        font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
        font-weight: 400;
        color: #FFFFFF;
        box-sizing: border-box;
        text-align: center;
        &:last-child {
          width: 70%;
        }
      }
    }

    .scroll-list {
      height: 32rem;
    }

    .alarm-item {
      width: 100%;
      box-sizing: border-box;
      font-family: MicrosoftYaHei;
      font-size: min(1.4rem, 14px);;
      line-height: 4rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 1rem;
      color: rgba(179, 179, 179, 1);

      &:nth-child(2n+1) {
        background-color: transparent;
      }
      &:nth-child(2n) {
        background-color: rgba(18,112,196,0.2);
      }

      .name {
        width: 30%;
        text-align: center;
        padding: 0 1rem;
      }
      .message {
        width: 70%;
        text-align: center;
        padding: 0 1rem;
        box-sizing: border-box;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
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
