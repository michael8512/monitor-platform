<template>
  <vis-border title="入场教育预警排行" width="59.2rem" height="43rem">
    <div class="education-alarm-rank">
      <div class="panel-content">
        <div class="table-tr">
          <div class="table-tr-td" v-for="item in thList" :key="item.name">
            {{item.label}}
          </div>
        </div>
        <div class="scroll-wraper" ref="scrollBody">
          <div class="scroll-list">
            <div class="scroll-list-item rank-item" v-for="item in dataList" :key="item.id">
              <div class="rank-wraper">
                <div class="rank" :class="`rank-${item.id}`">{{item.id}}</div>
              </div>
              <div class="type">{{item.type}}</div>
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
      tableRowHeight: 3.8,
      keepScroll: null,
      timer: null,
      dataList: [],

      thList: [
        { name: 'name', label: '项目排名'},
        { name: 'total', label: '项目类型'},
        { name: 'online', label: '违规次数'},
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
      get("/api/car/carList").then(res=>{
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
.education-alarm-rank {
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
        width: 33.3%;
        font-size: 1.4rem;
        font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
        font-weight: 400;
        color: #FFFFFF;
        box-sizing: border-box;
        text-align: center;
      }
    }

    .scroll-list {
      height: 32rem;
    }

    .rank-item {
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

      .rank-wraper {
        text-align: center;
        width: 33.3%;
        justify-content: center;
        display: flex;
      }

      .rank {
        position: relative;
        border-radius: 50%;
        width: 2rem;
        height: 2rem;
        color: #fff;
        line-height: 2rem;
        text-align: center;

        &-1, &-2, &-3 {
          &::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 2.2rem;
            height: 2.2rem;
            border-radius: 50%;
          }
        }
        
        &-1 {
          background-color: #CA0D0D;
          &::after {
            border: 1px solid #CA0D0D;
          }
        }
        &-2 {
          background-color: #EBBA0F;
          &::after {
            border: 1px solid #EBBA0F;
          }
        }
        &-3 {
          background-color: #137EDD;
          &::after {
            border: 1px solid #137EDD;
          }
        }
      }


      div {
        width: 33.3%;
      }

      .total {
        width: 33.3%;
        font-size: 1.4rem;
        font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
        font-weight: 400;
        color: rgba(255,255,255,0.6);
        text-align: center;
      }

      .type {
        width: 33.3%;
        padding: 0 0.7rem;
        line-height: 2.4rem;
        border-radius: 2px;
        text-align: center;
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
