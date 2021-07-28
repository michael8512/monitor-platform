<template>
  <div class="page-head">
    <div class="page-title">智慧工地可视化监管平台</div>
    <div class="tabs">
      <div class="tabs-left">
        <div
          class="tabs-left-item"
          v-for="(item, index) in leftTabs"
          :key="index"
          @click="gotoPage(item, 'left')"
        >
          <div :class="item.isActive ? 'tab-text-active': 'tab-text'">
            <router-link :to="item.route">{{item.label}}</router-link>
          </div>
        </div>
      </div>
      <div class="tabs-right">
        <div
          class="tabs-right-item"
          v-for="(item, index) in rightTabs"
          :key="index"
          @click="gotoPage(item, 'right')"
        >
          <div :class="item.isActive ? 'tab-text-active': 'tab-text'">
            <router-link :to="item.route">{{item.label}}</router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="full-screen" @click="checkFullScreen"></div>
    <div class="jump-btn" @click="jumpOut">管理中心</div>

    <div class="dialog" v-if="iframeData.visible">
      <div class="close" @click="closeDialog">Close</div>
      <div class="dialog-content" id="deviceDialog">
        <iframe 
          v-if="iframeData.visible"
          class="iframe-wraper-content full-screen" 
          webkitAllFullScreen
          mozallowfullscreen
          allowfullscreen
          :src="baseUrl+iframeData.url"></iframe>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { post } from 'utils/http'
export default {
  name: 'page-head',
  data(){
    return {
      leftTabs: [
        { label: '项目概况', isActive: true, route: '/' },
        { label: '视频监控', isActive: false, route: '/camera' },
        { label: '扬尘监控', isActive: false, route: '/dust' },
        { label: '车辆未冲洗抓拍', isActive: false, route: '/car' },
        { label: '吊塔安全', isActive: false, route: '/crane' },
        { label: '施工升降机', isActive: false, route: '/lift' },
        { label: '卸料平台', isActive: false, route: '/dischange' },
      ],
      rightTabs: [
        { label: '人员在岗', isActive: false, route: '/working' },
        { label: '安全检查', isActive: false, route: '/safety' },
        { label: '安全教育', isActive: false, route: '/education' },
        { label: '基坑监测', isActive: false, route: '/foundation' },
        { label: '高支模监测', isActive: false, route: '/model' },
        { label: '消息中心', isActive: false, route: '/notify' },
      ],
      isFullScreen: false,
    }
  },
  mounted() {
    this.getUrl();
    const currentPath = this.$router.history.current.fullPath;
    this.leftTabs.forEach((item)=>{
      if (item.route === currentPath){
        item.isActive = true;
      } else {
        item.isActive = false;
      }
    })
    this.rightTabs.forEach((item)=>{
      if (item.route === currentPath){
        item.isActive = true;
      } else {
        item.isActive = false;
      }
    })
  },
  computed: {
    ...mapState(['baseUrl', 'iframeData']),
  },
  methods: {
    getUrl() {
      post(`/api/all/getUrl`).then(res=>{
        this.$store.commit('UPDATE_BASEURL', res.data);
      });
    },
    gotoPage({label}, direction) {
      if (direction === 'left') {
        this.leftTabs.forEach(item=>{
          item.isActive = item.label === label ? true : false;
        });
        this.rightTabs.forEach(item=>{
          item.isActive = false;
        })
      } else {
        this.rightTabs.forEach(item=>{
          item.isActive = item.label === label ? true : false;
        })
        this.leftTabs.forEach(item=>{
          item.isActive = false;
        })
      }
    },
    jumpOut() {
      this.$store.commit('UPDATE_IFRAME_DATA', {visible: true, url: ''});
    },
    closeDialog() {
      this.$store.commit('UPDATE_IFRAME_DATA', {visible: false, url: ''});
    },
    checkFullScreen() {
      if (!this.isFullScreen) {
        this.openFullScreen();
      } else {
        this.cancelFullScreen();
      }
    },
    openFullScreen() {
      let docElm = document.querySelector("html");
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      } //FireFox
      else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      } //Chrome等
      else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      } //IE11
      else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
      }
      this.isFullScreen = true;
    },
    cancelFullScreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      this.isFullScreen = false;
    }
  }
}
</script>
<style lang="scss" scope>

.page-head {
  position: relative;
  width: 100%;
  background-image: url('./images/title-bg.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
  z-index: 200;
  height: 8.6rem;

  .jump-btn {
    position: absolute;
    top: 2rem;
    right: 2rem;
    color: rgba(25, 166, 231, 1);
    font-size: 1.4rem;
    z-index: 10;
    cursor: pointer;
  }
  .full-screen {
    position: absolute;
    top: 2.6rem;
    right: 9rem;
    font-size: 1.4rem;
    width: 1rem;
    height: 1rem;
    background-image: url('./images/full-screen.jpg');
    background-size: contain;
    z-index: 10;
    cursor: pointer;
  }

  .tabs {
    display: flex;
    justify-content: space-between;

    a {
      position: relative;
      line-height: 3.1rem;
      z-index: 2;
      text-decoration: none;
      display: block;
      position: relative;
      font-size: 1.4rem;
      font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
      font-weight: 400;
      color: #FFFFFF;
      
    }

    &-left, &-right {
      display: flex;
      margin-left: 5rem;
      &-item {
        margin-top: 6rem;
        position: relative;
        width: 13rem;
        height: 3.1rem;
        text-align: center;
        margin-left: -2.9rem;

        &::after {
          content: '';
          background-image: url('./images/tab-bg.png');
          background-size: contain;
          background-repeat: no-repeat;
          position: absolute;
          top: 0;
          left: 0;
          width: 13rem;
          height: 3.1rem;
        }
      }
    }

    &-right {
      margin-left: 0;
      margin-right: 13rem;
      &-item::after {
        transform: rotateY(180deg);
      }
      .tab-text-active::after {
        transform: rotateY(180deg);
      }
    }
  }

  .tab-text-active a {
    color: rgba(25, 166, 231, 1);
    &::after {
      content: '';
      background: url('./images/tab-bg-hover.png');
      position: absolute;
      top: 0;
      left: 0;
      width: 13rem;
      height: 3.1rem;
      z-index: 4;
    }
  }

  .page-title {
    position: absolute;
    left: 50%;
    top: 1rem;
    line-height: 6rem;
    font-family: FZZYJW--GB1-0;
    font-size: 4rem;
    color:rgba(255,255,255,1);
    background: linear-gradient(180deg, #FFFFFF 0%, #1272CC  100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    transform: translate(-50%, 0);
  }

  .dialog {
    width: 90%;
    height: 90%;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 2rem 1rem;
    box-sizing: border-box;
    background-image: url('./images/box-bg.png');
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;

    &-content {
      position: relative;
      z-index: 1;
      width: 100%;
      height: 100%;
    }

    .iframe-wraper-content {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: calc(100% - 4rem);
      height: calc(100% - 4rem);
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
</style>
