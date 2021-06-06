<template>
  <vis-border title="随手隐患拍" width="63rem" height="47rem">
    <div class="danger-capture">
      <div class="panel-content">
        <div class="arrow arrow-left"></div>
        <img class="capture" :src="picList[currentIndex] ? picList[currentIndex].picUrl:''" />
        <div class="arrow arrow-right"></div>
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
      picList: [],
      currentIndex: 0
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
      get(`/api/safetyCheck/captureList`).then(res=>{
        this.picList = res.data;
      });
      
    },
  }
}
</script>
<style lang="scss" scope>
.danger-capture {
  height: calc(100% - 4.2rem);
  .panel-content {
    height: 100%;
    padding: 1.2rem;
    box-sizing: border-box;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .capture {
      width: 50rem;
      height: 31.3rem;
      object-fit: contain;
    }
    .arrow {
      width: 2.1rem;
      height: 5.5rem;
      background-repeat: no-repeat;
      background-size: contain;
      cursor: pointer;
      &-right {
        background-image: url('./images/right.png');
      }
      &-left {
        background-image: url('./images/left.png');
      }
    }
  }
}
</style>
