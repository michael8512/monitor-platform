<template>
  <div class="labour">
    <div class="panel-title">劳务实名制</div>
    <div class="panel-content">
      <div class="panel-content-item">
        <div class="label">已实名人数</div>
        <div class="value">{{realNameTotal}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: 'page',
  computed: {
    ...mapState(['realNameTotal']),
  },

}
</script>
<style lang="scss" scope>
.labour {
  .panel-content {
    width: 41.2rem;
    height: 13.3rem;
    background-image: url('./images/labour.jpg');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    margin: 1.2rem 2rem 0;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;

    &-item {
      padding-left: 4rem;
      .label {
        font-size: 1.6rem;
        color: #b2b2b2;
      }
      .value {
        font-size: 2.4rem;
        color: #19dce7;
      }
    }
  }
}
</style>
