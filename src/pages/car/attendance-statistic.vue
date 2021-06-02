<template>
  <vis-border title="出场概况统计" width="100%" height="26.1rem">
    <div class="attendance-statistic">
      <div class="panel-content">
        <div class="attendance-list">
          <div class="attendance-list-item" v-for="item in attendanceList" :key="item.name">
            <div class="label">{{item.name}}</div>
            <div class="process">
              <div class="bar" :style="`width: ${item.value}%`"></div>
              <div class="value">{{item.value}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </vis-border>
</template>

<script>
import { get } from 'utils/http';
import DashBoard from 'common/dash-board';
import { mapState } from "vuex";
import VisBorder from 'common/back-fram';

export default {
  name: 'page',
  components: {
    VisBorder,
    DashBoard
  },
  data(){
    return {
      attendanceList: []
    }
  },
  mounted() {
    this.getData();
  },
  computed: {
    ...mapState(['fontSize']),
  },
  methods: {
    getData() {
      get(`/api/car/attendance`).then(res=>{
        this.attendanceList = res.data;
      });
    },

  }
}
</script>
<style lang="scss" scope>
.attendance-statistic {
  height: calc(100% - 4.2rem);
  .panel-content {
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    .attendance-list {

      &-item {
        display: flex;
        margin: 4rem 0;
        
        .label {
          width: 7rem;
          font-size: 1.4rem;
          font-family: AlibabaPuHuiTi-Medium, AlibabaPuHuiTi;
          font-weight: 500;
          color: rgba(255,255,255,0.6);
          line-height: 2rem;
          text-align: right;
          margin-right: 1rem;
        }

        .value {
          font-size: 2rem;
          font-family: DIN-Medium, DIN;
          font-weight: 500;
          color: #FFFFFF;
          line-height: 2rem;
          margin-left: 1.6rem;
        }

        .process {
          display: flex;
          height: 2rem;
          width: 64.7rem;
          border: 1px solid #137EDD;
          box-sizing: border-box;
        }

        .bar {
          height: 100%;
          background: linear-gradient(-90deg, #0087FF 0%, rgba(6, 16, 62, 0) 70%);
          opacity: 0.92;
        }
      }
    }
  }
}
</style>
