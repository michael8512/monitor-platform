<template>
  <vis-border title="退场教育统计" width="59rem" height="46rem">
    <div class="leave-education-statistic">
      <div class="panel-content">
        <div class="project-list">
          <div class="project-list-item" v-for="item in list" :key="item.projectName">
            <div class="name">{{item.projectName}}</div>
            <div class="detail">
              <div class="detail-item total">
                <div class="label">人员总数</div>
                <div class="value">{{item.total}}</div>
              </div>
              <div class="detail-item finished">
                <div class="label">完成教育退场人数</div>
                <div class="value">{{item.finished}}</div>
              </div>
              <div class="detail-item unfinished">
                <div class="label">未完成人数</div>
                <div class="value">{{item.unfinished}}</div>
              </div>
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
import VisBorder from 'common/back-fram';

export default {
  name: 'leave-education-statistic',
  components: {
    VisBorder,
  },
  data(){
    return {
      list: []
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
      get(`/api/education/leaveList`).then(res=>{
        this.list = res.data || [];
      });
    },
  }
}
</script>
<style lang="scss" scope>
.leave-education-statistic {
  height: calc(100% - 4.2rem);
  .panel-content {
    height: 100%;
    position: relative;
    padding:0 1.6rem 1.6rem;
    box-sizing: border-box;

    .project-list {
      &-item {
        width: 55.8rem;
        height: 14rem;
        background-image: url('./images/leave-bg.png');
        background-size: contain;
        background-repeat: no-repeat;
        box-sizing: border-box;
        padding: 0 1.4rem;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        margin-top: 3rem;

        .name {
          line-height: 3.6rem;
          font-size: 1.6rem;
          font-family: AlibabaPuHuiTi-Medium, AlibabaPuHuiTi;
          font-weight: 500;
          color: #0087FF;
          border-bottom: 1px solid rgba(0,135,255, 0.4);
        }

        .detail {
          flex-grow: 1;
          display: flex;
          justify-content: space-around;
          align-items: center;
          margin-top: 1.2rem;
          &-item {
            text-align: center;
            .label {
              font-size: 1.4rem;
              font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
              font-weight: 400;
              color: #FFFFFF;
              line-height: 2rem;
            }
            .value {
              margin-top: 1rem;
              font-size: 3.2rem;
              font-family: DIN-Bold, DIN;
              font-weight: bold;
              color: #FFFFFF;
              line-height: 3.9rem;
            }
            &:nth-child(2) .value {
              color: #0087FF;
            }
            &:nth-child(3) .value {
              color: #CA0D0D;
            }
          }
        }
      }
    }
  }
}
</style>
