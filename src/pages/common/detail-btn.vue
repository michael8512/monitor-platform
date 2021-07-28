<template>
  <div class="detail-btn" @click="jumpOut">详情</div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: 'detail-btn',
  props: {
    url: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapState(['fontSize', 'baseUrl']),
  },
  methods: {
    jumpOut() {
      this.$store.commit('UPDATE_IFRAME_DATA', {url: this.url, visible: true});
    },
  },
}
</script>
<style lang="scss" scope>
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
