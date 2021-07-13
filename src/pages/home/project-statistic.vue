<template>
  <vis-border title="项目统计" width="45.4rem" height="28.2rem" >
    <div class="project-statistic">
      <div class="panel-content">
        <div class="image-box"></div>
        <div class="text-box">
          <div class="detail-item" v-for="(item, index) in details" :key="index">
            <div class="label">{{item.label}}</div>
            <div class="value">{{item.value}}<span class="unit">{{item.unit}}</span></div>
          </div>
        </div>
      </div>
    </div>
  </vis-border>
</template>

<script>
import { post } from 'utils/http';
import { mapState } from "vuex";
import VisBorder from 'common/back-fram';

export default {
  name: 'page',
  components: {
    VisBorder
  },
  data(){
    return {
      details: [
        { label: '项目总数', value: '', name: 'total' },
        { label: '总投资额', value: '', name: 'money', unit: '亿元' },
      ]
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
      post(`/api/all/getProjectCount`).then(res=>{
        const { projectCount, priceSum } = res.data;
        const details = this.details;
        details[0].value = projectCount;
        details[1].value = priceSum;
      })
    }
  }
}
</script>
<style lang="scss" scope>
.project-statistic {
  width: 100%;
  .panel-content {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 3rem;
    box-sizing: border-box;

    .image-box {
      width: 14.5rem;
      height: 19.9rem;
      background-image: url('./images/building.png');
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
    }
    .text-box {
      height: 21.2rem;
      margin-left: 3rem;
      padding: 1.1rem 1.6rem;
      box-sizing: border-box;

      .detail-item {
        width: 18rem;
        height: 8rem;
        background: rgba(18, 112, 196, 0.5);
        border: 1px solid #1270C4;
        padding: 0.5rem;
        box-sizing: border-box;
        margin: 1rem 0;

        .label {
          text-align: center;
          line-height: 2.2rem;
          font-size: 16px;
          font-family: AlibabaPuHuiTi-Medium, AlibabaPuHuiTi;
          font-weight: 500;
          color: #FFFFFF;
          background: rgba(18,112,196,0.3);
        }
        
        .value {
          font-size: 2.8rem;
          text-align: center;
          font-family: DINAlternate-Bold, DINAlternate;
          font-weight: bold;
          color: #F1B129;
          line-height: 5rem;
        }

        .unit {
          width: 3.2rem;
          font-size: 1.6rem;
          margin-left: 0.4rem;
          font-family: DIN-Regular, DIN;
          font-weight: 400;
          color: #FFFFFF;
        }
      }
    }
  } 
}
</style>
