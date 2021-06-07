<template>
  <vis-border title="扬尘超标信息" width="59.2rem" height="48rem">
    <div class="dust-exceed-message">
      <div class="panel-content">
        <div class="input-search-wraper">
          <input-search></input-search>
        </div>
        
        <div class="message-list">
          <div class="message-list-item" v-for="item in list" :key="item.id">
            <div class="text">{{item.text}}</div>
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
      get(`/api/notify/messageList`).then(res=>{
        this.list = res.data;
      })
    },
  }
}
</script>
<style lang="scss" scope>
.dust-exceed-message {
  height: calc(100% - 4.2rem);
  .panel-content {
    position: relative;
    height: 100%;
    padding: 1.4rem 3rem;


    .input-search-wraper {
      display: flex;
      flex-direction: row-reverse;
    }

    .message-list {
      height: 33.6rem;
      margin-top: 1rem;
      background: rgba(19,126,221,0.11);

      &-item {
        position: relative;
        line-height: 3.9rem;
        display: flex;
        padding-left: 4rem;
        padding-right: 4rem;
        
        padding-right: 1.6rem;
        box-sizing: border-box;

        &::before {
          position: absolute;
          top: 0;
          left: 0;
          content: '';
          width: 0.8rem;
          height: 0.8rem;
          border-radius: 50%;
          background: #137EDD;
          transform: translate(2rem, 1.4rem);
        }

        .text {
          width: 50rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          border-bottom: 1px solid rgba(19,126,221,0.36);
          font-size: 1.4rem;
          font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.7);
          
        }
      }
    }

  }

}
</style>
