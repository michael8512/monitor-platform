<template>
  <div class="dash-board" :class="{showImage}">
    <div class="value">{{data}}</div>
    <div class="label">{{title}}</div>
  </div>
</template>

<script>

export default {
  name: 'dash-board',
  props: {
    title: {
      type: String,
      default:''
    },
    data: {
      
    },
    showImage:{
      type: String,
      default:false
    }
  },
}
</script>
<style lang="scss" scope>

.dash-board {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url('./images/meter.png');
  background-repeat: no-repeat;
  background-size: contain;
  box-sizing: border-box;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    background-image: url('./images/needle.png');
    background-repeat: no-repeat;
    background-size: contain;
  }
  &.showImage::after{
    width: 100%;
    height: 100%;
    background-size: 1.4rem 6.9rem;
    background-position: center;
  }

  .value {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 4rem;
    font-family: DINAlternate-Bold, DINAlternate;
    font-weight: bold;
    color: #137EDD;
    line-height: 8rem;
  }

  .label {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0);
    text-align: center;
    font-size: 1.4rem;
    font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 2rem;
  }
}
</style>
