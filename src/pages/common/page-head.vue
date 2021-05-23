<template>
  <div class="page-head">
    <div class="tabs">
      <div
        class="tabs-item"
        v-for="(item, index) in tabs"
        :key="index"
        :class="item.label === '智慧工地可视化监管平台' ? 'page-title':''"
        @click="gotoPage(item)"
      >
        <div :class="item.isActive ? 'tab-text-active': 'tab-text'">
          <router-link :to="item.route">{{item.label}}</router-link>
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
      tabs: [
        { label: '项目概况', isActive: true, route: '/static' },
        { label: '视频实时监控', isActive: false, route: '/video' },
        { label: '扬尘监控', isActive: false, route: '/dust' },
        { label: '车辆未冲', isActive: false, route: '/car' },
        { label: '吊塔安全', isActive: false, route: '/crane' },
        { label: '施工升降机', isActive: false, route: '/lift' },
        { label: '智慧工地可视化监管平台', isActive: false, route: '/home' },
        { label: '安全检查', isActive: false, route: '/safety' },
        { label: '人员定位', isActive: false, route: '/person' },
        { label: '卸料平台', isActive: false, route: '/dischange' },
        { label: '临边防护', isActive: false, route: '/guard' },
        { label: '实名制考勤', isActive: false, route: '/attendance' },
        { label: '', isActive: false, route: '' },
      ]
    }
  },
  methods: {
    gotoPage({label}) {
      this.tabs.forEach(item=>{
        item.isActive = item.label === label ? true : false;
      })
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
    justify-content: center;

    &-item:not(.page-title) {
      margin-top: 6rem;
    }

    &-item a {
      text-decoration: none;
      display: block;
      min-width: 8rem;
      margin: 0 1.2rem;
      line-height: 2.9rem;
      font-family: MicrosoftYaHei;
      font-size: 1.8rem;
      color: rgba(179, 179, 179, 1);
      cursor: pointer;
      transition: all 0.2s;
    }
  }

  .tab-text a{
    text-decoration: none;
    display: block;
    position: relative;
    font-size: 1.6rem;
    font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 2.2rem;
  }

  .page-title a{
    display: block;
    line-height: 6rem;
    margin: 0 4rem;
    font-family: FZZYJW--GB1-0;
    font-size: 4rem;
    color:rgba(255,255,255,1);
    background: linear-gradient(180deg, #FFFFFF 0%, #1272CC  100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>
