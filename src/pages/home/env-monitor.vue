<template>
  <div class="env-monitor">
    <div class="panel-title">环境监测</div>
    <div class="panel-content">
      <div class="panel-content-item" v-for="item in list" :key="item.name">
        <div class="item-icon" :class="item.icon"></div>
        <div class="item-content">
          <div class="label">{{item.label}}</div>
          <div class="value">
            <span class="value-data">{{item.value}}</span>
            <span class="value-unit">{{item.unit}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get } from 'utils/http';
import { mapState } from "vuex";

export default {
  name: 'page',
  data(){
    return {
      list: [
        {
          name: 'pm25',
          label: 'PM2.5',
          icon: 'icon-pm25',
          unit: 'ug/m³',
          value: 0
        },
        {
          name: 'pm10',
          label: 'PM10',
          icon: 'icon-pm10',
          unit: 'ug/m³',
          value: 0
        },
        {
          name: 'noise',
          label: '噪声',
          icon: 'icon-noise',
          unit: 'd',
          value: 50
        },
        {
          name: 'windSpeed',
          label: '风速',
          icon: 'icon-wind',
          unit: 'm/s',
          value: 3
        },
        {
          name: 'temper',
          label: '温度',
          icon: 'icon-temperature',
          unit: '℃',
          value: 34
        },
        {
          name: 'humidity',
          label: '湿度',
          icon: 'icon-humidity',
          unit: '%',
          value: 40
        },
      ]
      
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
      get(`/api/construction/getEnvironmentalMonitoring`).then(res=>{
        const list = this.list;
        const mapData = res.data;
        list.forEach((item, index)=>{
          item.value = mapData[item.name];
        })
      })
    }
  }
}
</script>
<style lang="scss">
.env-monitor {
  .panel-content {
    display: grid;
    padding: 2.4rem 0 1.6rem;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr 1fr;
    grid-row-gap: 2.5rem;
    grid-column-gap: 1.6rem;

    &-item {
      display: inline-block;
      width: 13.8rem;
      height: 5.5rem;
      .item-icon{
        float: left;
        box-sizing: border-box;
        width: 5.5rem;
        height: 5.5rem;
        border-radius: 2px;
	      border: solid 1px rgba(25, 43, 60, 1);
        background-size: contain;
        background-position: center center;
        background-repeat: no-repeat;
      }
      .item-content {
        float: right;
        display: flex;
        height: 100%;
        justify-content: space-between;
        flex-direction: column;
        .label {
          box-sizing: border-box;
          padding-left: 0.4rem;
          width: 7.7rem;
          height: 2.4rem;
          line-height: 2.4rem;
          background-color: rgba(34, 57, 78, 0.3);
          font-family: MicrosoftYaHei;
          font-size: 12px;
          color: rgba(179, 179, 179, 1);
        }
        .value {
          box-sizing: border-box;
          padding-left: 0.6rem;
          width: 7.7rem;
          height: 2.4rem;
          line-height: 2.4rem;
          background-color: rgba(34, 57, 78, 0.3);
          font-size: 12px;
          color: rgba(179, 179, 179, 1);
          &-data {
            margin-right: 0.6rem;
            color: rgba(25, 220, 231, 1);
            font-size: 1.8rem;
            font-family: DINPro-Regular;
          }
        }
      }
      .icon {
        &-pm25 {
          background-image: url('./images/icon-pm25.png');
        }
        &-pm10 {
          background-image: url('./images/icon-pm10.png');
        }
        &-wind {
          background-image: url('./images/icon-wind.png');
        }
        &-noise {
          background-image: url('./images/icon-noise.png');
        }
        &-humidity {
          background-image: url('./images/icon-humidity.png');
        }
        &-temperature {
          background-image: url('./images/icon-temperature.png');
        }
      }
    }
  }
}
</style>
