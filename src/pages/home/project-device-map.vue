<template>
  <vis-border title="设备布点图" width="100%" height="100%">
    <div class="project-map">
      <div class="panel-content"></div>
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

      values: [],
      xLabels: []
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
      get(`/api/construction/deviceDistribution`).then(res=>{
        
      })
    },
    initChart() {
      
    }
  }
}
</script>
<style lang="scss">
.project-map {
  height: calc(100% - 4.2rem);
  .panel-content {
    position: relative;
  }
}
</style>
