<template>
  <vis-border title="污染日历" width="50rem" height="55rem">
    <div class="dirty-calendar">
      <div class="panel-content">
        <div class="grid">
          <div 
            class="grid-item" 
            :class="`grid-item${item.date <=0 ? '-offset':''}`"
            v-for="item in days" 
            :style="`backgroundColor: ${item.color}`"
            :key="item.date">
            {{item.date}}
          </div>
        </div>
        <div class="heat-bar">
          <div class="num">
            <div class="num-item" v-for="item in nums" :key="item">{{item}}</div>
          </div>
        </div>
      </div>
    </div>
  </vis-border>
</template>

<script>
import { get } from 'utils/http';
import echarts from 'echarts';
import { mapState } from "vuex";
import VisBorder from 'common/back-fram';
import moment from 'moment';

export default {
  name: 'page',
  components: {
    VisBorder
  },
  data(){
    return {
      min: 0,
      max: 300,
      interval: 50,
      days: [],
      minColor: [255,249,0],
      maxColor: [202,13,13],
    }
  },
  mounted() {
    this.getData();
    console.log(moment().daysInMonth())
  },
  computed: {
    ...mapState(['fontSize']),
    nums() {
      const list = [];
      let start = this.min;
      while(start<=this.max) {
        list.push(start)
        start+=this.interval
      }
      return list;
    },
    offset() {
      return moment().startOf('month').date(1).weekday() -1;
    }
  },
  methods: {
    getColor({value, rRate, gRate, bRate}) {
      return `rgb(${parseInt(255+rRate*value)}, ${parseInt(249+gRate*value)}, ${parseInt(bRate*value)})`
    },
    getData() {
      const {minColor, maxColor, min, max, offset} = this;
      const interval = max-min;
      const rRate = (maxColor[0]-minColor[0])/interval;
      const gRate = (maxColor[1]-minColor[1])/interval;
      const bRate = (maxColor[2]-minColor[2])/interval;

      get(`/api/car/calendar`).then(res=>{
        const mapData = res.data;
        const count = moment().daysInMonth();
        let start = -offset;
        const list = [];

        while (start<=count) {
          const value = mapData[start] || 0;
          const color = value ? this.getColor({value, rRate, gRate, bRate}) : 'transparent';

          list.push({ date: start, value, color });

          start++;
        }
        this.days = list
      });
    }
  }
}
</script>
<style lang="scss" scope>
.dirty-calendar {
  height: calc(100% - 4.2rem);
  .panel-content {
    height: 100%;
    position: relative;
    padding: 2rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .grid {
    display: flex;
    flex-wrap: wrap;
    &-item {
      width: 6.3rem;
      height: 6.5rem;
      background: rgba(19, 126, 221, 0.13);
      border: 1px solid #137EDD;
      line-height: 6.3rem;
      text-align: center;
      font-size: 1.6rem;
      font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
      font-weight: 400;
      color: #137EDD;

      &-offset {
        visibility: hidden;
      }
    }
  }
  .heat-bar {
    margin-top: 5rem;
    height: 6px;
    background: linear-gradient(270deg, rgba(202,13,13,1) 0%, rgba(255,249,0,1) 100%);

    .num {
      display: flex;
      justify-content: space-between;
      transform: translateY(-2.4rem);
      &-item {
        font-size: 1.4rem;
        font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
        font-weight: 400;
        color: rgba(255, 255, 255, 0.7);
        line-height: 2rem;
      }
    }
  }
}
</style>
