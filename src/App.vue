<template>
	<div id="app">
    <div class="page-wraper" v-resize="resizeContent">
      <!-- 回退头部 -->
      <page-head></page-head> 

      <div class="page-wraper-content">
        <router-view/>
      </div>
    </div>
	</div>	
</template>

<script>
import PageHead from './pages/common/page-head';

export default {
  name: 'App',
  components: {
    PageHead
  },
  methods: {
    resizeContent({width, height}) {
      this.ratioX = width / 1920;
      this.ratioY = height / 1080;

      let _fontSize = 10 * this.ratioX;
      document.documentElement.style.fontSize = `${_fontSize}px`;
      document.querySelector('body').style.fontSize = `${_fontSize}px`;

      this.$store.commit('UPDATE_FONT_SIZE', _fontSize);
      this.$store.commit('UPDATE_RATIO_X', this.ratioX);
    },
  }
}
</script>

<style lang="scss">
@font-face {
  font-family: numberFont;
  src: url("./assets/font/s go Digital Regular.ttf");
}
	html, body {
	width: 100%;
	height: 100%;
	margin: 0;
	padding: 0;
	font-size: 10px;
	#app {
		width: 100%;
		height: 100%;
		overflow: hidden;
    background-image: url('./pages/common/images/bg.png');
	}
}
::-webkit-scrollbar{
	width: 4px;
	height: 4px;
}
::-webkit-scrollbar-thumb{
	border-radius: 1em;
	background:rgba(47,84,235,1);
	border-radius:3px;
}
::-webkit-scrollbar-track{
	border-radius: 1em;
	background-color: rgba(50,50,50,.1);
}

.page-wraper {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url('./pages/common/images/bg.png');
  background-size: contain;
  &-content {
    height: calc(100% - 8.6rem);
    padding: 4rem 3rem 2rem;
    box-sizing: border-box;
  }
}

</style>
