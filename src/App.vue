<template>
	<div id="app">
    <div class="page" v-resize="resizeContent">
      <!-- 回退头部 -->
      <page-head></page-head> 

      <!-- <div class="video-wraper">
        <video id="video" type="video/mp4" autoplay="autoplay" width="100%" height="100%" loop muted>
          <source :src="videoSrc" type="video/mp4" v-if="videoSrc">
        </video>
      </div> -->
      <div class="page-content">
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

.page {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,1);

  .video-wraper {
    position: fixed;
    min-width: 100%;
    min-height: 100%;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
    opacity: 1;
    video {
      object-fit: fill;
    }
  }

  &-content {
    position: relative;
    box-sizing: border-box;
    display: flex;
    height: calc(100% - 7.9rem);
    padding: 3.2rem 0 0;
    z-index: 2;
    margin-top: -2rem;
    &-left {
      width: 50rem;
      padding-left: 3.2rem;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background-image: linear-gradient(-90deg, rgba(1,12,27,0.1) 00%,  rgba(1,12,27,1) 100%);
    }
    &-center {
      width: calc(100% - 100rem);      
    }
    &-right {
      width: 50rem;
      padding-right: 3.2rem;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background-image: linear-gradient(90deg, rgba(1,12,27,0) 0%, #010d1b 100%);
    }
  }

  .panel-title {
    position: relative;
    line-height: 3;
    font-family: MicrosoftYaHei;
    padding-left: 1.2rem;
    font-size: 1.6rem;
    letter-spacing: 0px;
    color: rgba(230, 230, 230, 1);

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      width: 0;
      height: 0;
      border-top: 0.75rem solid transparent;
      border-left: 0.7rem solid rgba(41, 215, 215, 0.8);
      border-bottom: 0.75rem solid transparent;
      transform: translateY(-50%);
    }
    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 2px;
      background-image: linear-gradient(90deg,  rgba(36, 60, 82, 1) 0%,  rgba(0, 4, 17, 1) 100%);
    }
  }
}

</style>
