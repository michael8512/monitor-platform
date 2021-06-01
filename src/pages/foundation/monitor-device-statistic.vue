<template>
  <vis-border title="基坑监测基本情况" width="59.5rem" height="45.1rem" >
    <div class="foundation-monitor-device-statistic">
      <div class="panel-content">
        <div class="image-box">
          <dash-board title="在线率" :data="percent+'%'"></dash-board>
        </div>

        <div class="detail">
          <div class="detail-item" v-for="item in details" :key="item.name">
            <div class="label">{{item.label}}</div>
            <div class="value">{{item.value}}</div>
          </div>
        </div>
      </div>
    </div>
  </vis-border>
</template>

<script>
import { get } from 'utils/http';
import { mapState } from "vuex";
import VisBorder from 'common/back-fram';
import DashBoard from 'common/dash-board';

export default {
  name: 'page',
  components: {
    VisBorder,
    DashBoard
  },
  data(){
    return {
      details: [
        { label: '项目总数', value: '', name: 'total' },
        { label: '在线设备数', value: '', name: 'online'},
        { label: '离线设备数', value: '', name: 'offline'},
      ],
      percent: 0,
    }
  },
  mounted() {
    this.getData();
  },
  computed: {
    ...mapState([]),
  },
  methods: {
    getData() {
      get(`/api/car/statistic`).then(res=>{
        const { total, percent, online, offline } = res.data;
        const details = this.details;
        details[0].value = total;
        details[1].value = online;
        details[2].value = offline;

        this.percent = percent;
      })
    }
  }
}
</script>
<style lang="scss" scope>
.foundation-monitor-device-statistic {
  width: 100%;
  height: calc(100% - 4.2rem);
  .panel-content {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    padding: 0 2rem;
    box-sizing: border-box;

    .detail {
      background: rgba(7, 17, 58, 0.5);
      box-shadow: 0px 0px 8px 0px rgba(0, 144, 255, 0.85);
      border: 1px solid rgba(18, 112, 196, 0.6);
      display: flex;
      flex-direction: row;

      &-item {
        box-sizing: border-box;
        padding: 24px;
        width: 12.7rem;
        height: 11.6rem;
        text-align: center;
        position: relative;

        .label {
          font-size: 1.4rem;
          font-family: AlibabaPuHuiTi-Medium, AlibabaPuHuiTi;
          font-weight: 500;
          color: #FFFFFF;
          line-height: 2rem;
        }

        .value {
          margin-top: 1rem;
          font-size: 3.2rem;
          font-family: DINAlternate-Bold, DINAlternate;
          font-weight: bold;
          color: #2598FF;
          line-height: 4rem;
        }
        &:nth-child(2) {
          &::before,
          &::after {
            content: '';
            position: absolute;
            top: 50%;
            transform: translate(0, -50%);
            height: 6rem;
            width: 1px;
            background-color: rgba(19,126,221,0.4);
          }
          &::before {
            left: 0;
          }
          &::after {
            right: 0;
          }
        }
      }
    }
    .image-box {
      width: 19rem;
      height: 15rem;
      .value {
        color: #FFFFFF;
        font-size: 6rem;
      }
      .value {
        font-size: 2.4rem;
      }
    }
  } 
}
</style>
