<template>
  <vis-border title="智能识别信息" width="59.5rem" height="45.1rem" >
    <div class="intelligent-recognition">
      <div class="panel-content">
        <div class="image-box">
          <img class="img" :src="picUrl" />
        </div>

        <div class="recognition">
          <div class="recognition-item">
            <div class="label">安全帽佩戴情况</div>
            <div class="value">{{hatState}}</div>
          </div>
          <div class="recognition-item">
            <div class="label">工作服穿戴情况</div>
            <div class="value">{{clothesState}}</div>
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
      hatState: '',
      clothesState: '',
      picUrl: ''
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
      get(`/api/notify/recognition`).then(res=>{
        const { picUrl, hatState, clothesState } = res.data;
        this.picUrl = picUrl;
        this.hatState = hatState;
        this.clothesState = clothesState;
      })
    }
  }
}
</script>
<style lang="scss" scope>
.intelligent-recognition {
  width: 100%;
  height: calc(100% - 4.2rem);
  .panel-content {
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    box-sizing: border-box;

    .recognition {

      &-item {
        box-sizing: border-box;
        width: 23rem;
        height: 15.6rem;
        position: relative;

        .label {
          font-size: 1.4rem;
          font-family: AlibabaPuHuiTi-Medium, AlibabaPuHuiTi;
          font-weight: 500;
          color: #FFFFFF;
          line-height: 4rem;
          padding-left: 1.6rem;
          box-sizing: border-box;
          background-color: rgba(0,135,255,0.3);
        }

        .value {
          text-align: center;
          font-size: 3.6rem;
          font-family: DINAlternate-Bold, DINAlternate;
          font-weight: bold;
          color: #07A85C;
          line-height: 11.6rem;

          background: linear-gradient(180deg, rgba(19, 126, 221, 0.45) 0%, rgba(6, 16, 62, 0) 100%);
        }
        &:last-child {
          .value {
            color: #CA0D0D;
          }
        }
      }
    }
    .image-box {
      width: 29rem;
      height: 37.6rem;
      background-image: url('./images/img-box-bg.png');
      background-repeat: no-repeat;
      background-size: contain;
      padding: 0.8rem;
      box-sizing: border-box;
      .img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  } 
}
</style>
