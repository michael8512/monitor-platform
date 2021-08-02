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
      player: null,
      keyword: '溧阳市'
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
        center: [119.48, 31.4],
        zoom: 11,
        mapStyle: "amap://styles/darkblue", //设置地图的显示样式
      });

      this.deviceList.forEach(({longitude, latitude, name})=> {
        const marker = new AMap.Marker({
          position: new AMap.LngLat(longitude, latitude),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
          title: name,
          clickable: true,
        });
        // 将创建的点标记添加到已有的地图实例：
        this.map.add(marker);
      });
      this.object3Dlayer = new AMap.Object3DLayer();
      this.map.add(this.object3Dlayer);

      //获取慈溪行政边界的数据
      this.getBorderData(this.keyword).then(res=>{
        let bounds = res.districtList[0].boundaries;
        this.mapCenter = res.districtList[0].center;
        // 重新设置地图中心点
        this.map.setCenter(new AMap.LngLat(this.mapCenter.lng, this.mapCenter.lat));
        this.createPolygon(bounds);//绘制行政边界的面状图
        this.createBorder(bounds, 5000);//绘制行政边界
        this.createBorder(bounds, 10000);//绘制行政边界

      });
    },
    createPolygon(bounds) {
      let polygons = [];

      if (bounds) {
        for (let i = 0, l = bounds.length; i < l; i++) {
          let polygon = new AMap.Polygon({
            strokeWeight: 1,
            path: bounds[i],
            fillOpacity: 0.7,
            fillColor: 'rgba(10, 67, 88, 0.8)',
            strokeColor: '#0c5b6f'
          });
          polygons.push(polygon);
        }
      }
      this.map.add(polygons);
      
      // this.map.setFitView(polygons);//视口自适应
    },
    // 根据关键词获取行政边界数据
    getBorderData(keyword) {
      return new Promise((resolve, reject)=> {
        AMap.plugin('AMap.DistrictSearch', ()=>{
          let opts = {
            subdistrict: 0,   //获取边界不需要返回下级行政区
            extensions: 'all',  //返回行政区边界坐标组等具体信息
            level: 'district'  //查询行政级别为 市
          };

          this.district = new AMap.DistrictSearch(opts);

          this.district.search(keyword, (status, res)=>{
            resolve(res);
          });
        });
      });
    },
    // 绘制边界
    createBorder(coordList, zHeight=10000) {
      let height = [];
      let path = coordList[0].map(item=>{
        height.push(zHeight);
        return new AMap.LngLat(item.lng, item.lat);
      });
      var meshLine = new AMap.Object3D.MeshLine({
        path: path ,
        height: height,
        color: '#0c5b6f',
        width: 2
      });
      this.object3Dlayer.add(meshLine);
    },
    clickMarker() {
      this.map.on('click', (param) => {
        console.log(param);
      });
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
