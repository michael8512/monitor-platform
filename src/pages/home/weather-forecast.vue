<template>
  <div class="weather-forecast">
    <div class="panel-title">{{location}}区天气预报</div>
    <div class="panel-content">
      <div class="panel-content-item" v-for="(item, index) in list" :key='index'>
        <div class="week">{{item.week}}</div>
        <div class="date">{{item.date}}</div>
        <img class="icon" :src="item.icon">
        <div class="weather">{{item.text || '--'}}</div>
        <div class="temperature">{{item.temperature}}</div>
      </div>  
    </div>
  </div>
</template>

<script>
import { get } from 'utils/http';
import { mapState } from "vuex";

export default {
  name: 'weather-forecast',
  data(){
    return {
      list: [],
      location: ''
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
      get(`/api/construction/getWeatherFuture`).then(res=>{
        const map = this.list;
        this.location = res.data.location;
        this.list = res.data.weather.map((item, index)=>{
          const { day='', text='', tempMax='', tempMin='', icon, week} = item;
          return {
            week,
            date: day,
            icon,
            text,
            temperature: `${tempMax}˚̊/${tempMin}˚̊`
          }
        });
      })
    }
  }
}
</script>
<style lang="scss" scope>
.weather-forecast {
  .panel-content {
    padding: 1.2rem 0 1.6rem;
    display: grid;
    grid-template-columns: repeat(5, 1fr);

    &-item {
      box-sizing: border-box;
      padding: 1.5rem 0;
      width: 8rem;
      height: 21rem;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.1);
	    border: solid 1px rgba(34, 57, 77, 1);
      .week,
      .date,
      .weather {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        line-height: 28px;
        color: rgba(179, 179, 179, 1);
      }
      .temperature {
        font-family: DINAlternate-Bold;
        font-size: 14px;
        line-height: 28px;
        color: rgba(25, 220, 231, 1);
      }
      .icon{
        width: 4.4rem;
        height: 4.4rem;
      }
    }
  }
}
</style>
