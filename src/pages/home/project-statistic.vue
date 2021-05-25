<template>
  <vis-border title="智慧工地分布情况" width="45.4rem" height="28.2rem" >
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
import { get } from 'utils/http';
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
        { label: '智慧工地', value: '', name: 'intelligence', unit: '个' },
        { label: '常规工地', value: '', name: 'normal', unit: '次' },
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
      get(`/api/construction/getConstructionSurvey`).then(res=>{
        const mapData = res.data;
        const details = this.details;
        details.forEach((item, index)=> {
          item.value = mapData[item.name] || '';
        });
      })
    }
  }
}
</script>
<style lang="scss">
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
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      grid-row-gap: 2rem;
      grid-column-gap: 2rem;

      .detail-item {
        width: 11rem;
        height: 8rem;
        background: rgba(18, 112, 196, 0.5);
        border: 1px solid #1270C4;
        padding: 0.3rem;
        box-sizing: border-box;

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
          font-size: 4rem;
          text-align: center;
          font-family: DINAlternate-Bold, DINAlternate;
          font-weight: bold;
          color: #F1B129;
          line-height: 5rem;
        }

        .unit {
          width: 3.2rem;
          font-size: 1.6rem;
          font-family: DIN-Regular, DIN;
          font-weight: 400;
          color: #FFFFFF;
        }
      }
    }
  } 
}
</style>
