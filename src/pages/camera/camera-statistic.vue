<template>
  <vis-border title="视频监控汇总" width="50rem" height="28.2rem" >
    <div class="camera-statistic">
      <div class="panel-content">
        <div class="detail">
          <div class="detail-item" v-for="item in details" :key="item.name">
            <div class="label">{{item.label}}</div>
            <div class="value">{{item.value}}</div>
          </div>
        </div>
        <div class="image-box">
          <dash-board title="覆盖率" :data="percent"></dash-board>
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
        { label: '视频监控覆盖项目', value: '', name: 'cover'},
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
      get(`/api/camera/statistic`).then(res=>{
        const { total, percent, cover } = res.data;
        const details = this.details;
        details[0].value = total;
        details[1].value = cover;

        this.percent = percent;
      })
    }
  }
}
</script>
<style lang="scss">
.camera-statistic {
  width: 100%;
  height: calc(100% - 4.2rem);
  .panel-content {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    box-sizing: border-box;

    .detail {
      display: flex;
      justify-content: space-around;
      flex-grow: 1;

      &-item {
        width: 12.6rem;
        height: 11.6rem;
        background: linear-gradient(180deg, rgba(0, 135, 255, 0.52) 1%, rgba(7, 17, 63, 0) 100%);
        border-top: 1px solid #0087FF;
        padding: 1.2rem 0;
        box-sizing: border-box;
        text-align: center;

        .label {
          font-size: 1.4rem;
          font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
          font-weight: 400;
          color: #FFFFFF;
          line-height: 2rem;
        }

        .value {
          font-size: 3.2rem;
          font-family: DIN-Bold, DIN;
          font-weight: bold;
          color: #FFFFFF;
          line-height: 8rem;
        }
      }
    }
    .image-box {
      width: 15.2rem;
      height: 12.4rem;
    }

  } 
}
</style>
