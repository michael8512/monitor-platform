<template>
  <vis-border title="入场教育统计" width="59.4rem" height="47.5rem" >
    <div class="education-statistic">
      <div class="panel-content">
        <div class="image-box">
          <dash-board title="覆盖率" :data="percent+'%'"></dash-board>
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
        { label: '项目人员总数', value: '', name: 'total' },
        { label: '已完成入场教育人数', value: '', name: 'arrived'},
        { label: '离线数量', value: '', name: 'offline'},
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
      get(`/api/education/statistic`).then(res=>{
        const { total, percent, arrived, offline } = res.data;
        const details = this.details;
        details[0].value = total;
        details[1].value = arrived;
        details[2].value = offline;

        this.percent = percent;
      })
    }
  }
}
</script>
<style lang="scss">
.education-statistic {
  width: 100%;
  height: calc(100% - 4.2rem);
  .panel-content {
    height: 100%;
    display: flex;
    justify-content: space-around;
    padding: 0 2rem;
    align-items: center;
    box-sizing: border-box;

    .detail {
      display: flex;
      justify-content: space-around;
      flex-direction: column;
      width: 26.7rem;
      height: 35.1rem;
      background-image: url('./images/statistic-bg.png');
      background-size: cover;
      background-repeat: no-repeat;
      border: 1px solid #0087FF;

      &-item {
        padding: 0 1.4rem;
        box-sizing: border-box;
        text-align: center;
        line-height: 4rem;
        display: flex;
        justify-content: space-between;

        .label {
          font-size: 1.4rem;
          font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
          font-weight: 400;
          color: #FFFFFF;
        }

        .value {
          font-size: 3.2rem;
          font-family: DIN-Bold, DIN;
          font-weight: bold;
          color: #FFFFFF;
        }

        &:nth-child(2) .value {
          color: #0087FF;
        }

        &:nth-child(3) .value {
          color: #CA0D0D;
        }
      }
    }
    .image-box {
      width: 26rem;
      height: 21rem;
      .value {
        font-size: 6rem;
        color: #ffffff;
      }
      .label {
        font-size: 1.6rem;
      }
    }

  } 
}
</style>
