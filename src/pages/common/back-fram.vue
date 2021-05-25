<template>
  <div class="my-background-frame" :style="`width: ${width}; height: ${height}`">
    <p class="title"> {{ title }} </p>
    <slot />
  </div>
</template>

<script>
export default {
  props:{
    title:{
      type: String,
      default:''
    },
    width: {
      default: 'auto'
    },
    height: {
      default: 'auto'
    },

  }
}
</script>

<style lang="scss" scoped>
  .my-background-frame{
    background-image: url('./images/box-bg.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: relative;
    .title {
      position: relative;
      font-size: 1.8rem;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #FFFFFF;
      line-height: 4.2rem;
      padding-left: 1.6rem;
      box-sizing: border-box;
      border-bottom: 1px solid rgba(0,144,220,0.4);
      
      &::after{
        z-index: 1;
        content: '';
        width: 1.2rem;
        height: 1.2rem;
        position: absolute;
        top: 0.8rem;
        right: 0.8rem;
        background: url('./images/box-title-right.png');
      }
      &::before{
        z-index: 1;
        width: 2.8rem;
        height: 0.4rem;
        content: '';
        position: absolute;
        bottom: -0.2rem;
        left: 1.2rem;
        background: url('./images/box-title-left.png');
      }
    }
  }
</style>