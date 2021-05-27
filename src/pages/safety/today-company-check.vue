<template>
  <vis-border title="今日企业抽查" width="59.2rem" height="45rem" >
    <div class="today-company-check">
      <div class="panel-content">
        <div class="detail">
          <div class="detail-item">
            <div class="label">项目总数</div>
            <div class="value">{{total}}</div>
          </div>
        </div>

        <div class="project">
          <div class="project-check">
            <div class="project-check-item" v-for="item in projectList" :key="item.name">
              <div class="label">{{item.label}}</div>
              <div class="value">{{item.value}}</div>
            </div>
          </div>
          <div class="image-box">
            <dash-board title="完成率" :data="percent"></dash-board>
          </div>
        </div>

        <div class="check-list">
          <div class="check-list-item" v-for="item in checkList" :key="item.name">
            <div class="data">{{item.value}}<span class="unit">次</span></div>
            <div class="label">{{item.label}}</div>
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
      total: 67,
      percent: 65,
      checkList: [],
      projectList: [
        { label: '今日安检抽查项目', value: '', name: 'check' },
        { label: '未抽查项目数', value: '', name: 'uncheck'},
      ],
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
      get(`/api/safetyCheck/statistic`).then(res=>{
        const { check, percent, uncheck, list } = res.data;
        const projectList = this.projectList;
        projectList[0].value = check;
        projectList[1].value = uncheck;

        this.checkList = list;

        this.percent = percent;
      })
    }
  }
}
</script>
<style lang="scss" scope>
.today-company-check {
  width: 100%;
  height: calc(100% - 4.2rem);
  .panel-content {
    height: 100%;
    // display: flex;
    // justify-content: space-between;
    // align-items: center;
    padding: 1.2rem 2.4rem;
    box-sizing: border-box;

    .label {
      font-size: 1.4rem;
      font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
      font-weight: 400;
      color: #FFFFFF;
      line-height: 2rem;
    }
    .detail {
      .value {
        font-size: 3.2rem;
        font-family: DIN-Bold, DIN;
        font-weight: bold;
        color: #FFFFFF;
        line-height: 5rem;
      }
    }

    .project {
      display: flex;
      justify-content: space-between;
    }

    .project-check {
      position: relative;
      width: 37rem;
      height: 11.6rem;
      background: linear-gradient(180deg, rgba(19, 126, 221, 0.5) 0%, rgba(5, 87, 125, 0.17) 68%, rgba(7, 17, 63, 0) 100%);
      border-top: 1px solid #0087FF;
      padding: 2rem 1.4rem;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;

      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        height: 8.9rem;
        width: 1px;
        transform: translate(-50%, -50%);
        background-image: url('./images/divider-y.png');
        background-size: contain;
        background-repeat: no-repeat;
      }
      &::before {
        content: '';
        position: absolute;
        bottom: -20%;
        left: 50%;
        height: 1rem;
        width: 37rem;
        transform: translate(-50%, 0);
        background-image: url('./images/divider-x.png');
        background-size: contain;
        background-repeat: no-repeat;
      }


      &-item {
        text-align: center;
        .value {
          margin-top: 2rem;
          font-size: 3.2rem;
          font-family: DIN-Bold, DIN;
          font-weight: bold;
          color: #EBBA0F;
          line-height: 4rem;

          &:last-child {
            color: #CA0D0D;
          }
        }
      }
    }
    .image-box {
      width: 13.8rem;
      height: 11.2rem;
    }

    .check-list {
      display: flex;
      justify-content: space-between;
      margin-top: 3.7rem;;
      &-item {
        text-align: center;
        width: 9.1rem;
        height: 13.8rem;
        background-image: url('./images/check-bg.png');
        background-size: contain;
        background-repeat: no-repeat;
        position: relative;
        
        .data {
          position: absolute;
          white-space: nowrap;
          top: 45%;
          left: 50%;
          transform: translate(-50%, -100%);
          font-size: 2.4rem;
          font-family: PingFang-SC-Bold, PingFang-SC;
          font-weight: bold;
          color: #EBBA0F;
          line-height: 33px;
          text-shadow: 0px 0px 24px #EBBA0F;

          .unit {
            font-size: 1.2rem;
            font-family: PingFang-SC-Bold, PingFang-SC;
            font-weight: bold;
            line-height: 17px;
          }
        }
        .label {
          position: absolute;
          white-space: nowrap;
          bottom: 0;
          left: 50%;
          transform: translate(-50%, 0);
          font-size: 1.2rem;
          font-family: PingFang-SC-Bold, PingFang-SC;
          font-weight: bold;
          color: rgba(255, 255, 255, 0.71);
          line-height: 1.7rem
        }
      }
    }
  } 
}
</style>
