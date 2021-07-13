<template>
  <vis-border title="项目分布热力图" width="100%" height="100%">
    <div class="project-map">
      <div class="panel-content">
        <div id="container" class="my-map"></div>
      </div>
    </div>
  </vis-border>
</template>

<script>
import { post } from 'utils/http';
import { mapState } from "vuex";
import VisBorder from 'common/back-fram';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/lines';
import 'echarts/lib/chart/effectScatter';

export default {
  name: 'page',
  components: {
    VisBorder
  },
  data(){
    return {
      myChart: null,
      option: null,

      deviceList: [],
      map: null,
      player: null
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
      post(`/api/all/getProjectBaseInfo`).then(res=>{
        this.deviceList = res.data;
        this.initMap();
      })
    },
    initMap() {
      this.map = new window.AMap.Map("container", {
        center: [120.2, 30.23],
        zoom: 8,
        mapStyle: "amap://styles/darkblue", //设置地图的显示样式
      });

      this.deviceList.forEach(({longitude, latitude, name})=> {
        const marker = new AMap.Marker({
          position: new AMap.LngLat(longitude, latitude),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
          title: name
        });
        // 将创建的点标记添加到已有的地图实例：
        this.map.add(marker);
      })
    },

  }
}
</script>
<style lang="scss" scope>
.project-map {
  height: calc(100% - 4.2rem);
  .panel-content {
    position: relative;
    height: 100%;
    padding: 1.4rem;
    box-sizing: border-box;
  }
  .my-map {
    height: 100%;
    background: transparent;
    .amap-logo {
      display: none !important;
    }
  }
}
</style>
