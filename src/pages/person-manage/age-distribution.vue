<template>
  <div class="age-distribution">
    <div class="panel-title">年龄分布</div>
    <div class="panel-content">
      <div class="top">
        <div class="top-item" v-for="(item, index) in list" :key="index" @click="gotoPage(item)">
          <div class="label">{{item.label}}</div>
          <div class="value">{{item.value}}</div>
        </div>
      </div>
      <div class="bottom">
        <div class="bottom-item" v-for="(item, index) in list" :key="index" :style="`width: ${item.width}`">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { post } from 'utils/http';

export default {
  name: 'age-distribution',
  data(){
    return {
      list: []
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    gotoPage(data) {
      if (data && data.linkHref) {
        window.open(data.linkHref);
      }
    },
    getData() {
      post(`/api/smartWorker/age`).then(res=>{
        const { one=0, two=0, three=0, four=0, sum=1 } = res.data || {};
        this.list = [
          { label: '18~30', value: one, width: `${100*one/sum}%`, linkHref: `/api/WorkerList/ageUrl?minAge=18&maxAge=30` },
          { label: '31~40', value: two, width: `${100*two/sum}%`, linkHref: `/api/WorkerList/ageUrl?minAge=31&maxAge=40` },
          { label: '41~50', value: three, width: `${100*three/sum}%`, linkHref: `/api/WorkerList/ageUrl?minAge=41&maxAge=50` },
          { label: '51以上', value: four, width: `${100*four/sum}%`, linkHref: `/api/WorkerList/ageUrl?minAge=51` },
        ]
        this.$store.commit('UPDATE_REALNAME_TOTAL', sum);
      })
    }
  }
}
</script>
<style lang="scss">
.age-distribution {

  .panel-content {
    padding: 1.2rem 0;
    .top {
      display: flex;
      justify-content: space-between;
      &-item {
        position: relative;
        padding-left: 1rem;
        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          width: 0.4rem;
          height: 100%;
          background-image: url('./images/divider-y.png');
          background-size: contain;
          background-repeat: no-repeat;
        }
        .label {
          font-family: PingFangSC-Regular;
          font-size: 1.2rem;
          color: #b2b2b2;
        }
        .value {
          font-family: DIN-Regular;
          font-size: 1.8rem;
          color: #19dce7;
          margin-top: 0.6rem;
          &::after {
            content: '人';
            margin-left: 0.4rem;
            font-family: PingFangSC-Regular;
            font-size: 1.2rem;
            color: #b2b2b2;
          }
        }
      }
    }

    .bottom {
      display: flex;
      justify-content: space-between;
      margin-top: 1.6rem;
      &-item {
        height: 1.6rem;
        margin: 0 0.2rem;

        &:first-child {
          background-color: #2abff2;
        }
        &:nth-child(2) {
          background-color: #1796c0;
        }
        &:nth-child(3) {
          background-color: #0e7698;
        }
        &:last-child {
          background-color: #0e5a73;
        }
      }
    }
  }
}
</style>
