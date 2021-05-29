<template>
  <vis-border title="出场概况统计" width="59rem" height="45.1rem">
    <div class="monitor-distribution">
      <div class="panel-content">
        <div class="distribution-list">
          <div class="distribution-list-item" v-for="item in list" :key="item.group">
            <div class="label">{{item.group}}</div>
            <div class="process-wraper">
              <div class="process process-value-1">
                <div class="bar" :style="`width: ${item.value1}%`"></div>
                <div class="value">{{item.value2}}</div>
              </div>
              <div class="process process-value-2">
                <div class="bar" :style="`width: ${item.value2}%`"></div>
                <div class="value">{{item.value2}}</div>
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
      get(`/api/foundation/distribution`).then(res=>{
        this.list = res.data;
      });
    },

  }
}
</script>
<style lang="scss">
.monitor-distribution {
  height: calc(100% - 4.2rem);
  .panel-content {
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    box-sizing: border-box;

    .distribution-list {

      &-item {
        display: flex;
        margin: 2rem 0;
        align-items: center;
        
        .label {
          width: 5,6rem;
          font-size: 1.4rem;
          font-family: AlibabaPuHuiTi-Medium, AlibabaPuHuiTi;
          font-weight: 500;
          color: rgba(255,255,255,0.6);
          line-height: 2rem;
          text-align: right;
          margin-right: 1rem;
        }

        .process-wraper {
          width: 50rem;
          .process {
            display: flex;
            height: 0.9rem;
            width: 100%;
            box-sizing: border-box;
            margin: 1rem 0;
            .value {
              font-size: 1.6rem;
              font-family: DIN-Medium, DIN;
              font-weight: 500;
              color: #FFFFFF;
              line-height: 0.9rem;
              margin-left: 1.2rem;
            }

            
            .bar {
              background: linear-gradient(-90deg, #0087FF 0%, rgba(6, 16, 62, 0) 100%);
              opacity: 0.92;
            }
            &-value-2 .bar {
              background: linear-gradient(-90deg, #EBBA0F 0%, #06103F 100%);
            }
            
          }
          
        }

      }
    }
  }
}
</style>
