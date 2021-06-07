<template>
  <vis-border title="监测设备概况" width="61rem" height="47rem" >
    <div class="monitor-device-statistic">
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
.monitor-device-statistic {
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
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      &-item {
        box-sizing: border-box;
        width: 15.5rem;
        height: 11.4rem;
        position: relative;
        margin: 0 1.6rem;

        .label {
          text-align: center;
          font-size: 1.4rem;
          font-family: AlibabaPuHuiTi-Medium, AlibabaPuHuiTi;
          font-weight: 500;
          color: #FFFFFF;
          line-height: 3.9rem;
          box-sizing: border-box;
          background-color: rgba(0,135,255,0.3);
        }

        .value {
          text-align: center;
          font-size: 4rem;
          font-family: DINAlternate-Bold, DINAlternate;
          font-weight: bold;
          color: #FFFFFF;
          line-height: 7.5rem;
          background: linear-gradient(180deg, rgba(19, 126, 221, 0.45) 0%, rgba(6, 16, 62, 0) 100%);
        }
        &:nth-child(2) {
          .value {
            color: #0087FF;
          }
        }
        &:last-child {
          .value {
            color: #CA0D0D;
          }
        }
      }
    }
    .image-box {
      width: 26.3rem;
      height: 21.2rem;
      .value {
        color: #FFFFFF;
        font-size: 6rem;
      }
      .label {
        font-size: 2.4rem;
      }
    }
  } 
}
</style>
