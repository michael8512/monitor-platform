<template>
  <vis-border title="车辆违规信息" width="64rem" height="45.1rem">
    <div class="car-break-raw-message">
      <div class="panel-content">
        <div class="input-search-wraper">
          <input-search></input-search>
        </div>
        
        <div class="message-list">
          <div class="message-list-item" v-for="item in list" :key="item.id">
            <img class="item-pic" :src="item.picUrl" />
            <div class="item-content">
              <div class="car-plate">车牌号：{{item.car}}</div>
              <div class="text">{{item.text}}</div>
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
import InputSearch from '../common/input-search.vue';

export default {
  name: 'page',
  components: {
    VisBorder,
    InputSearch
  },
  data(){
    return {
      list: [
        { label: '设备总数', value: 0 },
        { label: '正常状态数', value: 0 },
        { label: '报警状态数', value: 0 },
      ],
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
      get(`/api/notify/carMessageList`).then(res=>{
        this.list = res.data;
      })
    },
  }
}
</script>
<style lang="scss" scope>
.car-break-raw-message {
  height: calc(100% - 4.2rem);
  .panel-content {
    position: relative;
    height: 100%;
    padding: 1.4rem 2rem;


    .input-search-wraper {
      display: flex;
      margin-right: 2rem;
      flex-direction: row-reverse;
    }

    .message-list {
      height: 33.6rem;
      margin-top: 1rem;
      display: flex;
      flex-wrap: wrap;

      &-item {
        width: 28rem;
        height: 10rem;
        background-image: url('./images/car-bg.png');
        background-size: cover;
        background-repeat: no-repeat;
        display: flex;
        justify-content: space-between;
        margin: 0.4rem 1rem;
        padding: 1.6rem 0.8rem;
        box-sizing: border-box;

        .item-pic {
          width: 9.7rem;
          height: 6.4rem;
          margin-right: 0.8rem;
          object-fit: contain;
        }

        .item-content {
          flex-grow: 1;

          .car-plate {
            font-size: 1.2rem;  
            font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
            font-weight: 400;
            color: rgba(255, 255, 255, 0.73);
            line-height: 1.7rem;
            margin-bottom: 0.8rem;;
          }

          .text {
            font-size: 1.2rem;
            font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
            font-weight: 400;
            color: rgba(255, 255, 255, 0.7);
            display: -webkit-box;    
            -webkit-box-orient: vertical;    
            -webkit-line-clamp: 3;    
            overflow: hidden;
            
          }
        }

      }
    }

  }

}
</style>
