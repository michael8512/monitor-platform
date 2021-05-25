<template>
  <vis-border title="项目分布" width="45.4rem" height="31rem">
    <div class="project-distribution">
      <div class="panel-content">
        
      </div>
    </div>
  </vis-border>
</template>

<script>
import { get } from 'utils/http';
import echarts from 'echarts';
import { mapState } from "vuex";
import VisBorder from 'common/back-fram';

export default {
  name: 'page',
  components: {
    VisBorder
  },
  data(){
    return {
      myChart: null,
      option: null,
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
      get(`/api/construction/getConstructionMilepost`).then(res=>{
        const mapPosition = this.mapPosition;
        
      })
    },
    jumpTo(url){
      window.open(url);
    }
  }
}
</script>
<style lang="scss">
.project-distribution {
  .panel-content {
    position: relative;
    
  }
}
</style>
