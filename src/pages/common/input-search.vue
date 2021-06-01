<template>
  <div class="input-wraper" :style="`width: ${width}`">
    <input class="input-search" :placeholder="placeholder"/>
    <div class="icon"></div>
  </div>
</template>

<script>

export default {
  name: 'input-search',
  props: {
    width: {
      type: String,
      default: '21.2rem'
    },
    placeholder: {
      default: "请输入项目名称"
    },
  },
}
</script>
<style lang="scss">
.input-wraper{
  position: relative;
  width: 21.2rem;

  .input-search {
    width: 100%;
    height: 3.2rem;
    background: rgba(19, 126, 221, 0.23);
    border: 1px solid #137EDD;
    padding-left: 1rem;
    color: rgba(255,255,255,0.4);
    &:focus {
      outline: none;
    }
  }
  .icon {
    position: absolute;
    z-index: 2;
    right: 0.6rem;
    top: 1rem;
    transform: translateY(0%);
    width: 1.5rem;
    height: 1.5rem;
    background-image: url('./images/search.png');
    background-size: contain;
  }
}
</style>
