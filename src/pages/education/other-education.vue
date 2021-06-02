<template>
  <vis-border title="其他教育统计" width="59rem" height="45.1rem">
    <div class="other-education">
      <div class="panel-content">
        <div class="project-list">
          <div class="project-list-item">
            <div class="item-title">教育人数统计</div>
            <div class="item-content">
              <div class="item-content-item" v-for="(item, index) in personList" :key="index">
                <div class="label">{{item.label}}</div>
                <div class="value">{{item.value}}<span class="unit">人</span></div>
              </div>
            </div>
          </div>

          <div class="project-list-item">
            <div class="item-title">安全教育统计</div>
            <div class="item-content">
              <div class="item-content-item" v-for="(item, index) in safetyList" :key="index">
                <div class="label">{{item.label}}</div>
                <div class="value value-safety">{{item.value}}<span class="unit">人</span></div>
              </div>
            </div>
          </div>

          <div class="project-list-item">
            <div class="item-title">其他教育统计</div>
            <div class="item-content">
              <div class="item-content-item" v-for="(item, index) in otherList" :key="index">
                <div class="label">{{item.label}}</div>
                <div class="value value-other">{{item.value}}<span class="unit">人</span></div>
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
  name: 'other-education',
  components: {
    VisBorder,
  },
  data(){
    return {
      personList: [],
      safetyList: [],
      otherList: [],
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
      get(`/api/education/other`).then(res=>{
        const { personData, otherData, safetyData }= res.data;
        this.personList = [
          { label: 'VR安全教育', value: personData.vr },
          { label: '技能培训人员总数', value: personData.total },
          { label: '参与人数', value: personData.attendence },
          { label: '未参与人数', value: personData.off },
        ];
        this.safetyList = [
          { label: '安全教育培训次数', value: safetyData.training },
          { label: '安全教育数', value: safetyData.total },
        ];
        this.otherList = [
          { label: '其他类型培训次数', value: otherData.training },
          { label: '其他类型数', value: otherData.other },
        ];
      });
    },
  }
}
</script>
<style lang="scss" scope>
.other-education {
  height: calc(100% - 4.2rem);
  .panel-content {
    height: 100%;
    position: relative;
    padding:0 1.6rem 1.6rem;
    box-sizing: border-box;

    .project-list {
      &-item {
        box-sizing: border-box;
        padding: 0 1.4rem;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        margin-top: 1.6rem;

        .item-title {
          font-size: 1.8rem;
          font-family: AlibabaPuHuiTi-Medium, AlibabaPuHuiTi;
          font-weight: 500;
          color: #FFFFFF;
          line-height: 2.5rem;
        }
        .item-content {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-around;

          .label {
            margin-top: 1.6rem;
            font-size: 1.6rem;
            font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
            font-weight: 400;
            color: rgba(255, 255, 255, 0.7);
            line-height: 2.2rem;
          }

          .value {
            font-size: 4rem;
            font-family: DIN-Medium, DIN;
            font-weight: 500;
            color: #FFFFFF;
            line-height: 4.8rem;
            &-other {
              color: #00DAFF;
            }
            &-safety {
              color: #137EDD;
            }
          }
          .unit {
            font-size: 1.4rem;
            font-family: PingFang-SC-Medium, PingFang-SC;
            font-weight: 500;
            line-height: 2rem;
          }
        }
      }
    }
  }
}
</style>
