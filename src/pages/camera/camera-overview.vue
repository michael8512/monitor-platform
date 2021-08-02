<template>
  <vis-border title="视频布点图" width="100%" height="100%">
    <div class="project-map">
      <div class="panel-content">
        <div class="content" id="container"></div>
        <div class="dialog" v-if="videoData">
          <div class="close" @click="closeDialog">Close</div>
          <div class="dialog-content" id="deviceDialog"></div>
        </div>
      </div>
    </div>
  </vis-border>
</template>

<script>
import { get } from 'utils/http';
import { mapState } from "vuex";
import VisBorder from 'common/back-fram';

export default {
  name: 'page',
  components: {
    VisBorder
  },
  data(){
    return {
      currentTab: 'video',
      deviceList: [],
      videoData: null,
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
      get(`/api/device/map`).then(res=>{
        this.deviceList = res.data;
        this.initMap();
      });
    },
    getVideo(deviceId) {
      get(`/api/device/getVideo`, {deviceId}).then(res=>{
        this.videoData = res.data;
        setTimeout(()=> {
          this.play(res.data);
        })
      });
    },
    initMap() {
      this.map = new window.AMap.Map("container", {
        center: [119.48, 31.4],
        zoom: 8,
        mapStyle: "amap://styles/darkblue", //设置地图的显示样式
      });

      this.deviceList.forEach(item=> {
        const marker = new AMap.Marker({
          position: new AMap.LngLat(item.x, item.y),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
          title: item.deviceId
        });
        // 将创建的点标记添加到已有的地图实例：
        this.map.add(marker);

        AMap.event.addListener(marker, 'click', (e)=> {
          let deviceId =e.target.G.title;
          //得到的数据
          console.log(deviceId);
          this.getVideo(deviceId);
        });
      })
    },
    play({url, token}) {
      console.log(url, token)
      let player = this.player;
      if (player) { 
        player.destroy() 
      }
      player = new ImouPlayer('#deviceDialog');

      const width = 70*this.fontSize;
      const height = parseInt(width * 9 / 16);
      const params = {
        src: [{url, kitToken: token}],
        width: width,
        height: height,
        autoplay: true,
        controls: true
      };
      player.setup(params);
    },
    closeDialog() {
      this.videoData = null;
    }
  }
}
</script>
<style lang="scss" scope>

.project-map {
  height: calc(100% - 4.2rem);
  .panel-content {
    position: relative;

    .content {
      height: 100%;
      padding: 2rem 2rem;
      position: relative;
      overflow: hidden;
      box-sizing: border-box;

      .point-list {
        position: relative;
        height: 100%;
        background-size: 100% 100%;
        // background-image: url('./images/factory-bg.jpeg');
        &-item {
          position: absolute;
          top: 0;
          left: 0;
          width: 3.8rem;
          height: 5rem;
          background-image: url('./images/camera.png');
          background-size: contain;
          background-repeat: no-repeat;
        }
      }
    }

    .dialog {
      width: 80rem;
      height: 45rem;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      padding: 2rem 1rem;
      box-sizing: border-box;
      background-image: url('../common/images/box-bg.png');
      background-size: 100% 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      &-content {
        position: relative;
        z-index: 1;
        width: 100%;
        height: 100%;
      }

      .close {
        font-size: 2rem;
        color: #fff;
        position: absolute;
        right: 2rem;
        top: 1rem;
        cursor: pointer;
        z-index: 4;
      }
    }

  }
}
</style>
