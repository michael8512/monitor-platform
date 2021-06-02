<!--
 * @Description: 养成日历
 * @Author: hexy
 * @Date: 2021-05-27 22:14:19
 * @LastEditors: hexy
 * @LastEditTime: 2021-06-02 11:00:49
 * @FilePath: /monitor-platform/src/pages/dust/component/dustCalendar.vue
-->
<template>
  <back-fram title="扬尘监测日历" class="calendar" height="42.9rem">
    <!-- 日期 -->
    <ul class="days df-box">
      <!-- 核心 v-for循环 每一次循环用<li>标签创建一天 -->
      <li
        v-for="(val, i) in daysArr"
        :key="val + '' + i"
        class="days-item"
        :class="{
          'no-border': !Boolean(val),
          active: val === thisDate,
        }"
      >
        <span v-if="!val" class="last-month"></span>
        <span v-else class="other-month">{{ val }}</span>
      </li>
    </ul>

    <div class="bar-container">
      <div class="tag">
        <span v-for="value in tags" :key="value">{{ value }}</span>
      </div>
      <div class="bar"></div>
    </div>
  </back-fram>
</template>

<script>
import backFram from "../../common/back-fram.vue";
export default {
  components: { backFram },
  data() {
    return {
      currentDay: 1,
      currentMonth: 1,
      currentYear: 1970,
      currentWeek: 1,
      days: [],
      tags: [0, 50, 100, 150, 200, 250, 300],
    };
  },
  created: function () {
    //在vue初始化时调用
    this.init(null);
  },
  methods: {
    init() {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth();
      const day = new Date(year, month, 1).getDay(); // 今天周几 0-6
      const daysLength = new Date(year, month - 1, 0).getDate(); // 当月的天数
      const thisMonth = new Array(daysLength).keys(); // 0-daysLength-1
      const daysArr = [...new Array(day - 1), ...thisMonth]; // 少补一个0
      daysArr.push(daysLength); // 加上当月最后一天
      this.thisDate = now.getDate();
      this.daysArr = daysArr;
    },
  },
};
</script>

<style lang="scss" scoped>
.df-box {
  display: flex;
}
.days {
  flex-wrap: wrap;
  margin: 1.4rem 2.8rem 1rem 2.8rem;
  .days-item {
    width: 6.08rem;
    height: 5.1rem;
    background: rgba(19, 126, 221, 0.13);
    border: 1px solid #137edd;
    color: #137edd;
    font-size: 1.6rem;
    text-align: center;
    line-height: 5.2rem;
  }
  .active {
    background-color: #007eff;
    color: #fff;
  }
  .no-border {
    border-color: transparent;
    background-color: transparent;
  }
}
.tag {
  display: flex;
  justify-content: space-around;
  font-size: 1.4rem;
  font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.7);
  // line-height: 2rem;
}
.bar {
  margin: 0 2.8rem;
  height: 6px;
  background: linear-gradient(270deg, #0087ff 0%, #0020ff 100%);
}
</style>
