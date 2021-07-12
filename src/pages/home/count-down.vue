<template>
  <div class="count-down">
    <div class="count-down-item">
      <div class="label">工期倒计时</div>
      <number-letter :data="time1"></number-letter>
      <div class="unit">天</div>
    </div>
    <div class="count-down-item">
      <div class="label">安全施工累计时间</div>
      <number-letter :data="time2"></number-letter>
      <div class="unit">天</div>
    </div>
  </div>
</template>

<script>
import { get } from 'utils/http';
import { mapState } from "vuex";
import NumberLetter from './number-letter';

export default {
  name: 'count-down',
  components: {
    NumberLetter
  },
  data() {
    return {
      time1: 0,
      time2: 0,
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
      get(`/api/all/getCountdown`).then(res=>{
        this.time1 = res.data.countdown;
        this.time2 = res.data.cumulative;
      })
    }
  }
}
</script>
<style lang="scss" scope>
.count-down {
  display: flex;
  justify-content: space-around;
  width: 100%;
  &-item {
    text-align: center;
    margin-bottom: 1.8rem;
    font-family: PingFangSC-Semibold;
    font-size: 1.8rem;
    color: rgba(230, 230, 230, 1);
  }
  .unit {
    display: inline-block;
    line-height: 5.5rem;
    font-family: PingFangSC-Semibold;
    color: rgba(230, 230, 230, 1);
    margin-left: 0.6rem;
    transform: translateY(-1rem);
  }
}
</style>
