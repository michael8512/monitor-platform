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
  </div>
</template>

<script>

export default {
  name: 'page-head',
  data(){
    return {
      leftTabs: [
        { label: '项目概况', isActive: true, route: '/static' },
        { label: '视频实时监控', isActive: false, route: '/camera' },
        { label: '扬尘监控', isActive: false, route: '/dust' },
        { label: '车辆未冲洗抓拍', isActive: false, route: '/car' },
        { label: '吊塔安全', isActive: false, route: '/crane' },
        { label: '施工升降机', isActive: false, route: '/lift' },
        { label: '卸料平台', isActive: false, route: '/dischange' },
      ],
      rightTabs: [
        { label: '人员在岗', isActive: false, route: '/working' },
        { label: '卸料平台', isActive: false, route: '/dischange' },
        { label: '安全检查', isActive: false, route: '/safety' },
        { label: '安全教育', isActive: false, route: '/education' },
        { label: '基坑监测', isActive: false, route: '/monitor' },
        { label: '高支模监测', isActive: false, route: '/model' },
        { label: '消息中心', isActive: false, route: '/message' },
      ]
    }
  },
  methods: {
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
    }
  }
}
</script>
<style lang="scss">

.page-head {
  position: relative;
  width: 100%;
  background-image: url('./images/title-bg.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
  z-index: 200;
  height: 8.6rem;

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
      margin-left: 3rem;
      &-item {
        margin-top: 6rem;
        position: relative;
        width: 13rem;
        height: 3.1rem;
        text-align: center;
        margin-left: -2.9rem;

        &::after {
          content: '';
          background: url('./images/tab-bg.png');
          position: absolute;
          top: 0;
          left: 0;
          width: 13rem;
          height: 3.1rem;
        }
      }
    }

    &-right {
      margin-right: 1rem;
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
}
</style>
