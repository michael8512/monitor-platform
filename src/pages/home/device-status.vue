<template>
  <div class="device-status">
    <div class="panel-title">设备安全状态</div>
    <div class="panel-content">
      <div class="device-list">
        <div class="device-list-item" v-for="item in deviceList" :key="item.type">
          <div class="image" :class="`icon-${item.type}`">
            <div class="device-count" :class="`device-count-${item.type}`">{{item.alarmNum}}</div>
          </div>
          <div class="name">{{item.label}}</div>
          <div class="state" :class="item.alarmNum?'alarm':'not-alarm'">
            {{item.alarmNum ? '风险告警':'暂无告警'}}
          </div>
        </div>
      </div>
      <div class="alarm-list">
        <div class="alarm-list-title">
          <div class="capital">告警信息</div>
        </div>
        <div class="alarm-list-table">
          <div class="scroll-wraper" v-resize="resizehandle" ref="scrollBody">
            <div class="scroll-list">
              <div class="scroll-list-item table-row" v-for="item in dataList" :key="item.message">
                <div class="type" :class="`type-${mapType[item.deviceName]}`">[{{item.deviceName}}]</div>
                <div class="message">{{item.alarm}}</div>
                <div class="date">{{item.data}}</div>
              </div>
            </div>
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
      tableRowHeight: 3.2,
      keepScroll: null,
      timer: null,
      deviceList: [
        {
          type: 'tower-crane',
          label: '塔吊',
          alarmNum: 2
        },
        {
          type: 'lift',
          label: '升降机',
          alarmNum: 0
        },
        {
          type: 'frame',
          label: '模架',
          alarmNum: 0
        },
      ],
      alarmDic: {
        'tower-crane': '塔吊',
        'lift': '升降机',
        'frame': '模架',
      },
      dataList: [
        
      ],
      mapType: {
        '塔吊': 'tower-crane',
        '升降机': 'lift',
        '模架': 'frame',
      },
      towerCount: 0,
      liftCount: 0,
      frameCount: 0,
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
      get("/api/construction/getDeviceAlarm").then(res=>{
        if (res.data) {
          const { towerCrane, transom, elevator, alarm } = res.data;
          this.dataList = alarm;
          this.deviceList[0].alarmNum = towerCrane;
          this.deviceList[1].alarmNum = elevator;
          this.deviceList[2].alarmNum = transom;
          alarm.length>3 && this.getActualBehavior();
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
<style lang="scss">
.device-status {
  .panel-content {
    padding: 1rem 0;
  }
  .device-list {
    display: flex;
    justify-content: space-between;
    &-item {
      text-align: center;
      .image {
        position: relative;
        width: 8rem;
        height: 8.1rem;
        background-size: contain;
        background-position: center center;
        background-repeat: no-repeat;

        .device-count {
          position: absolute;
          right: 1rem;
          top: 0.4rem;
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          background-color: rgba(0, 189, 194, 1);
          text-align: center;
          line-height: 2rem;
          color: #fff;

          &-lift {
            background-color: rgba(28, 144, 244, 1);
          }
          &-frame {
            background-color: rgba(214, 126, 44, 1);
          }
        }
      }
      .name {
        position: relative;
        font-family: MicrosoftYaHei;
        font-size: 12px;
        line-height: 2.8rem;
        color: rgba(178, 178, 178, 1);
        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 8rem;
          height: 0.3rem;
          background-image: url('./images/line-with-dot.png');
          background-repeat: no-repeat;
          background-size: 6rem 0.3rem;
          background-position: center center;
        }
      }
      .state {
        margin-top: 0.8rem;
        font-family: MicrosoftYaHei;
        font-size: 12px;
        color: rgba(245, 35, 35, 1);
      }
      .not-alarm {
        color: rgba(178, 178, 178, 0.3);
      }
    }
    .icon {
      &-tower-crane {
        background-image: url('./images/icon-tower-crane.png');
      }
      &-lift {
        background-image: url('./images/icon-lift.png');
      }
      &-frame {
        background-image: url('./images/icon-frame.png');
      }
    }
  }

  .alarm-list {
    margin-top: 1.4rem;

    &-title {
      position: relative;
      border-bottom: 1px solid rgba(36, 58, 80, 1);
      margin-bottom: 1rem;
      
      .capital {
        display: inline-block;
        font-family: MicrosoftYaHei;
        font-size: 1.4rem;
        line-height: 2rem;
        padding: 0 1.6rem;
        color: rgba(245, 35, 35, 1);
        background-color: rgba(34, 56, 78, 1);
      }    
    }
    &-table {
      height: 9.6rem;

      .table-row {
        display: flex;
        line-height: 3.2rem;
        box-sizing: border-box;
        padding-left: 0.6rem;

        .type {
          min-width: 7rem;
          font-family: MicrosoftYaHei;
          font-size: 1.2rem;
          color: rgba(25, 220, 231, 1);

          &-lift {
            color: rgba(28, 144, 244, 1);
          }
          &-frame {
            color: rgba(214, 126, 44, 1);
          }
        }
        .message,
        .date {
          flex-grow: 1;
          font-family: MicrosoftYaHei;
          font-size: 1.2rem;
          color: rgba(179, 179, 179, 1);
        }
        .date {
          flex-grow: 0;
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
