<template>
  <vis-border title="车辆未冲洗设备故障报警信息" width="46rem" height="43rem">
    <div class="car-error-alarm">
      <div class="panel-content">
        <div class="input-search-wraper">
          <input-search placeholder="请输入搜索内容" width="27rem" />
        </div>
        
        <div class="message-list">
          <div class="message-list-item" v-for="item in list" :key="item.id">
            <img class="item-pic" :src="item.picUrl" />
            <div class="item-content">
              <div class="car-plate">设备编号：{{item.deviceName}}</div>
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
      get(`/api/notify/carErrorAlarm`).then(res=>{
        this.list = res.data;
      })
    },
  }
}
</script>
<style lang="scss" scope>
.car-error-alarm {
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

      &-item {
        width: 40.8rem;
        height: 7.5rem;
        background: rgba(19, 126, 221, 0.04);
        border: 1px solid rgba(19, 126, 221, 0.24);
        display: flex;
        justify-content: space-between;
        margin: 2rem 1rem;

        .item-pic {
          width: 11.1rem;
          height: 7.5rem;
          display: flex;
          justify-content: center;
          align-items: center;
          object-fit: contain;
        }

        .item-content {
          font-size: 1.2rem;
          padding: 1rem 2rem;
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
</style>

