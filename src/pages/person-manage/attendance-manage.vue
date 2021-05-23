<template>
  <div class="attendace-manage">
    <div class="panel-title">出勤管理</div>
    <div class="panel-content">
      <div class="panel-content-top">
        <div class="left">
          <div class="left-item" v-for="(item, index) in staticList" :key="index" @click="gotoPage(item)">
            <div class="left-item-label">{{item.label}}</div>
            <div class="left-item-value">{{item.value}}</div>
          </div>
        </div>
        <div class="right">
          <div class="legend">
            <div class="legend-item spot">
              <div class="icon"></div>
              <div class="label">现场</div>
            </div>
            <div class="legend-item attendance">
              <div class="icon"></div>
              <div class="label">出勤</div>
            </div>
          </div>
          <div class="job-attendance">
            <div class="scroll-wraper" ref="scrollBody2">
              <div class="scroll-list">
                <div class="scroll-list-item job-attendance-item" v-for="(item, index) in jobList" :key="index">
                  <div class="name">{{item.workName}}</div>
                  <div class="ratio">
                    <div class="spot">
                      <div class="progress" :style="`width: ${item.innerWidth}`"></div>
                      <div class="value">{{item.nowAttendance}}</div>
                    </div>
                    <div class="total">
                      <div class="progress" :style="`width: ${item.width}`"></div>
                      <div class="value">{{item.attendance}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
      <div class="panel-content-bottom">
        <div class="scroll-wraper" v-resize="resizehandle" ref="scrollBody">
          <div class="scroll-list">
            <div class="scroll-list-item group-staticList-item" v-for="(item, index) in dataList" :key="index">
              <div class="name">{{item.groupName}}</div>
              <div class="total">
                <div class="label">总人数</div>
                <div class="value">{{item.workerCount}}</div>
              </div>
              <div class="arrived">
                <div class="label">已到人数</div>
                <div class="value">{{item.arriveNum}}</div>
              </div>
              <div class="late">
                <div class="label">未到人数</div>
                <div class="value">{{item.absentNum}}</div>
              </div>
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
import { TweenMax, Power2 } from 'gsap';

export default {
  name: 'attendence-manage',
  data(){
    return {
      staticList: [],
      dataList: [],
      timer: null,
      jobList: [],

      tween: null,
      scrollTime: 0.75,
      holdTime: 1.25,
      scrollHeight: 0,
      tableRowHeight: 4.8,
      tableRowHeight2: 2.9,
      keepScroll: null,
      keepScroll2: null,
      timer: null,
      timer2: null,
    }
  },
  mounted() {
    this.getWorkAttendance();
    this.getAttendenceStatic();
    this.getGroupInfo();

    this.timer = setInterval(this.getAttendenceStatic, 5*60*1000);
  },
  unmounted() {
    clearInterval(this.timer);
  },
  computed: {
    ...mapState(['fontSize']),
  },
  methods: {
    gotoPage(data) {
      if(data && data.linkHref) {
        window.open(data.linkHref);
      }
    },
    getWorkAttendance() {
      post(`/api/record/workAttendance`).then(res=>{
        const _list = (res.data || []).sort((a,b)=>b.attendance-a.attendance);
        if(_list.length) {
          const max = _list[0].attendance;
          this.jobList = _list.map(item=>{
            return {
              ...item,
              width: 100*item.attendance/max + '%',
              innerWidth: 100*item.nowAttendance/max + '%',
            }
          });
          this.getActualBehavior2();
        }
      });
    },
    getAttendenceStatic() {
      post(`/api/record/maxGroup`).then(res=>{
        const {attendance, groupName, nowAttendance} = res.data || {};
        this.staticList = [
          {label: '今日出勤', value: nowAttendance || 0, linkHref: '/api/WorkerList/attendanceUrl'},
          {label: '实时现场', value: attendance || 0, linkHref: '/api/WorkerList/workerOnStructionUrl'},
          {label: '出勤最多班组', value: groupName || ''},
        ]
      });
    },
    getGroupInfo() {
      post(`/api/record/groupInformation`).then(res=>{
        this.dataList = (res.data || []).map(item=> {
          return item;
        });

        this.dataList.length >4 && this.getActualBehavior();
      });
    },
    resizehandle({height}) {
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
    getActualBehavior2() {
      const scrollBody = this.$refs.scrollBody2;
      const { tableRowHeight2, jobList, scrollTime, fontSize } = this;
      
      TweenMax.to(scrollBody, scrollTime, {
        scrollTop: tableRowHeight2 * fontSize,
        ease: Power2.easeNone,
        onComplete: ()=> {
          let first = jobList.shift();
          jobList.push(first);
          scrollBody.scrollTop = 0;
          this.scrollHandle2();
        }
      });
    },
    scrollHandle2() {
      this.keepScroll2 && clearTimeout(this.keepScroll2);
      this.keepScroll2 = setTimeout(()=>{
        this.getActualBehavior2();
      }, this.holdTime * 1000);
    },
  }
}
</script>
<style lang="scss">
.attendace-manage {
  width: 100%;
  
  .panel-content {
    height: 45.8rem;
    width: 100%;

    &-top {
      display: flex;

      .left {
        &-item {
          position: relative;
          width: 13.3rem;
          text-align: center;
          padding: 1rem 0;
          &-label {
            font-family: PingFangSC-Regular;
            font-size: 1.4rem;
            margin-bottom: 1.6rem;
            color: #e6e6e6;
          }
          &-value {
            font-family: MyriadPro-Regular;
            font-size: 2.4rem;
            color: #19dce7;
          }
        }
      }
      .left-item:nth-child(2) {
        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          height: 1px;
          width: 100%;
          background: url('./images/divider.png');
          background-size: 100% 100%;
        }
        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          height: 1px;
          width: 100%;
          background: url('./images/divider.png');
          background-size: 100% 100%;
        }
      }

      .right {
        margin-top: 1.4rem;
        width: 35rem;
        .legend {
          display: flex;
          justify-content: center;
          &-item {
            display: flex;
            font-family: PingFangSC-Regular;
            font-size: 1.2rem;
            color: #b2b2b2;
            margin: 0 2rem;
          }
          .label{
            margin-left: 0.8rem;
          }
          .icon {
            transform: translateY(0.4rem);
            width: 1rem;
            height: 1rem;
            background-color: #0c718e;
          }
          .attendance .icon {
            background-color: #114470;
          }
        }
        .job-attendance {
          height: 17.4rem;
          &-item {
            color: white;
            margin-top: 1.2rem;
            display: flex;
            .name {
              width: 14rem;
              text-align: right;
              font-family: PingFangSC-Regular;
              font-size: 1.2rem;
              color: #b2b2b2;
            }
            .ratio {
              position: relative;
              height: 1.2rem;
              width: 100%;
              flex-grow: 1;
              margin-left: 1rem;
              .value {
                margin-left: 0.5rem;
                font-size: 1.2rem;
	              color: #e6e6e6;
              }
              .progress {
                margin-top: 0.2rem;
                height: 100%;
                background-color: rgba(42,150,239, 0.3)
              }
              .spot {
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                width: 100%;
                display: flex;
                z-index: 2;
                .progress {
                  background-color: rgba(0,218,213, 0.3)
                }
              }
              .total {
                position: relative;
                height: 100%;
                display: flex;
                z-index: 1;
              }
            }
          }
        }
      }
    }

    &-bottom {
      height: 19.2rem;
      .group-staticList-item {
        display: flex;
        justify-content: space-between;
        padding: 0.3rem 1.6rem;
        margin: 0.8rem 0;
        height: 4rem;
        box-sizing: border-box;
        background-image: linear-gradient(90deg, 	rgba(42,191,242,0.3) 0%, 	rgba(42,191,242,0) 100%);
        .name {
          font-size: 1.4rem;
          color: #ffffff;
          position: relative;
          display: flex;
          align-items: center;
          width: 10rem;
          white-space: nowrap;
          &::before {
            content: '';
            position: relative;
            width: 1.6rem;
            height: 1.6rem;
            margin-right: 0.6rem;
            background-image: linear-gradient(180deg, 
              #27c3c3 0%, 
              #14e1e1 0%, 
              #00ffff 0%, 
              #14fbfb 0%, 
              #27f7f7 0%, 
              #2a91ef 100%);
            background-image: url('./images/person-icon.png');
            background-size: contain;
          }
        }
        .total,
        .arrived,
        .late {
          .label {
            font-family: PingFangSC-Regular;
            font-size: 1rem;
            color: #b2b2b2;
          }
          .value {
            font-family: PingFangSC-Regular;
            font-size: 1rem;
            color: #19dce7;
          }
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
