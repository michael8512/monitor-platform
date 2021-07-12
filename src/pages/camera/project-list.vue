<template>
  <vis-border title="项目列表" width="50rem" height="36rem">
    <div class="project-list">
      <div class="panel-content">
        <div class="input-search-wraper">
          <input-search @onSearch="getData"></input-search>
          <div class="jump-page">
            <div class="label"><span class="btn" @click="getData(projectName)">跳转</span>到第</div>
            <input class="page-search" v-model="pageNo"/>
            <div  class="label" >页</div>
          </div>
        </div>
        
        <div class="table-tr">
          <div class="table-tr-td" v-for="item in thList" :key="item.name">
            {{item.label}}
          </div>
        </div>
        <div class="scroll-wraper" ref="scrollBody">
          <div class="scroll-list">
            <div class="scroll-list-item project-item" v-for="item in dataList" :key="item.projectName">
              <div class="text">{{item.projectName}}</div>
              <div class="text">{{item.deviceCount}}</div>
              <div class="text">{{item.deviceOncount}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </vis-border>
</template>

<script>
import { get } from 'utils/http';
import { mapState } from "vuex";
import { TweenMax, Power2 } from 'gsap';
import VisBorder from 'common/back-fram';
import InputSearch from '../common/input-search.vue';
export default {
  name: 'page',
  components: {
    VisBorder,
    InputSearch
  },
  data(){
    return {
      tween: null,
      scrollTime: 0.75,
      holdTime: 1.25,
      tableRowHeight: 3.8,
      keepScroll: null,
      timer: null,
      dataList: [],

      thList: [
        { name: 'name', label: '项目名称'},
        { name: 'total', label: '设备总数'},
        { name: 'online', label: '在线数'},
      ],
      pageSize: 10,
      pageNo: 1,
      projectName: ''
    }
  },
  mounted() {
    this.getData();
  },
  computed: {
    ...mapState([]),
    fontSize() {
      return document.documentElement.style.fontSize.split('px')[0] || 10;
    }
  },
  methods: {
    getData(name) {
      this.projectName = name;
      const { pageSize, pageNo } = this;
      const query = {
        projectName: name, 
        pageSize, 
        pageNo: parseInt(pageNo)
      };
      console.log(query)
      get("/api/device/projectList", query).then(res=>{
        if (res.data) {
          this.dataList = res.data;
          
          this.dataList.length >6 && this.getActualBehavior();
        }
      });
    },
    getActualBehavior() {
      const scrollBody = this.$refs.scrollBody;
      const { tableRowHeight, dataList, scrollTime, fontSize } = this;

      TweenMax.to(scrollBody, scrollTime, {
        scrollTop: tableRowHeight * fontSize,
        ease: Power2.easeNone,
        onComplete: ()=> {
          let first = dataList.shift();
          dataList.push(first);
          scrollBody.scrollTop = 0;
          this.scrollHandle();
        }
      });
    },
    scrollHandle() {
      this.keepScroll && clearTimeout(this.keepScroll);
      this.keepScroll = setTimeout(()=>{
        this.getActualBehavior();
      }, this.holdTime * 1000);
    },
    jumpTo(url){
      window.open(url);
    }
  }
}
</script>
<style lang="scss" scope>
.project-list {
  .panel-content {
    overflow: hidden;
    height: 100%;
    padding: 0 1.6rem 3rem;
    box-sizing: border-box;

    .input-search-wraper {
      display: flex;
      justify-content: space-between;
      margin: 2rem 0;
    }

    .table-tr {
      line-height: 4rem;
      background: rgba(19,126,221,0.24);
      display: flex;
      justify-content: space-between;
      padding: 0 1rem;

      &-td {
        width: 33.3%;
        font-size: 1.4rem;
        font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
        font-weight: 400;
        color: #FFFFFF;
        box-sizing: border-box;
      }
    }

    .scroll-list {
      height: 23.4rem;
    }

    .project-item {
      width: 100%;
      box-sizing: border-box;
      font-family: MicrosoftYaHei;
      font-size: min(1.4rem, 14px);;
      line-height: 3.8rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 1rem;

      &:nth-child(2n+1) {
        background-color: transparent;
      }
      &:nth-child(2n) {
        background-color: rgba(18,112,196,0.2);
      }

      div {
        width: 33.3%;
      }


      .text {
        color: rgba(179, 179, 179, 1);
        margin-right: 1rem;
      }
      .date {
        font-size: 1.4rem;
        font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
        font-weight: 400;
        color: rgba(255,255,255,0.6);
      }

      .type {
        padding: 0 0.7rem;
        line-height: 2.4rem;
        border-radius: 2px;
      }
    }
  }
  .scroll-wraper {
    position: relative;
    height: 100%;
    overflow: auto;
    z-index: 1;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  .jump-page {
    display: flex;
    align-items: center;
    .label {
      font-size: 1.4rem;
      font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
      font-weight: 400;
      color: rgba(255,255,255,0.6);
    }
    .btn {
      color: #137EDD;
      cursor: pointer;
    }
  }

  .page-search {
    width: 3rem;
    height: 3.2rem;
    background: rgba(19, 126, 221, 0.23);
    border: 1px solid #137EDD;
    padding-left: 1rem;
    color: rgba(255,255,255,0.4);
    margin: 0 1rem;
    &:focus {
      outline: none;
    }
  }

}
</style>
