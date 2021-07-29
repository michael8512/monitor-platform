<template>
  <div class="entry-record">
    <div class="panel-title">进出场记录</div>
    <div class="panel-content">
      <div class="scroll-wraper" v-resize="resizehandle" ref="scrollBody">
        <div class="scroll-list">
          <div class="scroll-list-item panel-content-item" v-for="item in dataList" :key="item.dynamic">
            <div class="clock">
              <div class="time">{{item.time}}</div>
              <div class="date">{{item.date}}</div>
            </div>
            <div class="person">
              <img :src="item.picture" class="face"/>
              <div class="name">{{item.name}}</div>
            </div>
            <div class="inOut">
              <div class="label">出／入场</div>
              <div :class="`value ${item.direction?'value-in':'value-out'}`">{{item.direction ? '入场':'出场'}}</div>
            </div>
            <div class="place" >
              <div class="label">地点</div>
              <div class="value">{{item.place}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { post } from 'utils/http';
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
      post("/api/record/latestHistory").then(res=>{
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
  }
}
</script>
<style lang="scss" scope>
.entry-record {
  .panel-content {
    height: 15.6rem;
    overflow: hidden;

    &-item {
      width: 100%;
      margin-top: 1rem;
      padding: 0 1.4rem;
      background-image: linear-gradient(90deg, 	rgba(42,191,242,0.3) 0%, 	rgba(42,191,242,0) 100%);
      font-family: MicrosoftYaHei;
      font-size: min(1.2rem, 12px);;
      height: 4.2rem;
      box-sizing: border-box;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .clock {
        position: relative;
        padding-left: 1.6rem;
        width: 6rem;
        &::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          width: 0.6rem;
          height: 0.6rem;
          border-radius: 50%;
          background-color: rgba(25, 220, 231, 1);
        }
        color: rgba(25, 220, 231, 1);

        .time {
          font-size: 1.2rem;
        }
        .date {
          font-size: 1.2rem;
          zoom: 0.8;
        }
      }

      .person {
        display: flex;
        align-items: center;
        width: 8rem;
        .face {
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
          margin-right: 1rem;
        }
        .name {
          font-family: PingFangSC-Semibold;
          font-size: 1.4rem;
          color: #ffffff;
        }
      }

      .inOut {
        font-family: PingFangSC-Regular;
        .label {
          font-size: 1rem;
          color: #b3b3b3;
        }
        .value {
          position: relative;
          font-size: 1.2rem;
          &::after {
            content: '';
            position: absolute;
            top: 0.1rem;
            margin-left: 0.4rem;
            width: 1.8rem;
            height: 1.4rem;
            background-size: contain;
          }
          &-in {
            color: #19dce7;
            &::after {
              background-image: url('./images/in.png');
            }
          }
          &-out {
            color: #ffb330;
            &::after {
              background-image: url('./images/out.png');
            }
          }
        }
      }

      .place {
        width: 14rem;
        font-family: PingFangSC-Regular;
        white-space: nowrap;
        .label {
          font-size: 1rem;
          color: #b3b3b3;
        }
        .value {
          font-size: 1.2rem;
          color: #ffffff;
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
