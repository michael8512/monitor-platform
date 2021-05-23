<template>
  <div class="my-letters">
    <div class="letters-wraper" v-for="(item, index) in countList" :key="index">
      <div class="letter-scroll-wraper" :style="`transform: translateY(-${letterDic[item]*5.5}rem)`">
        <div
          class="letter-scroll-wraper-item number-letter"
          v-for="letter in letters"
          :key="letter">{{letter}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'number-letter',
  props: {
    data: {
      default: 0
    }
  },
  data() {
    return {
      numbers: '',
      letters: [0,1,2,3,4,5,6,7,8,9,'.'],
      letterDic: {
        '0': 0,
        '1': 1,
        '2': 2,
        '3': 3,
        '4': 4,
        '5': 5,
        '6': 6,
        '7': 7,
        '8': 8,
        '9': 9,
        '.': 10,
      }
    };
  },
  computed: {
    countList() {
      let numbers = this.data ? Number(this.data) : 0;
      return (''+numbers).split('');
    },
  },
}
</script>
<style lang="scss" scoped>
.my-letters {
  margin-top: 0.6rem;
  height: 5.5rem;
  display: inline-block;
}
.letters-wraper {
  display: inline-block;
  width: 3.4rem;
  height: 5.5rem;
  overflow: hidden;
  margin-right: 0.5rem;
}

.letter-scroll-wraper {
  display: inline-block;
  width: 3.4rem;
  height: auto;
  transition: all 1.5s;

  .number-letter {
    height: 5.5rem;
    line-height: 5.5rem;
    width: 3.4rem;
    text-align: center;
    border-radius: 0.3rem;
    font-family: numberFont;
    font-size: 4.8rem;
    color: rgba(246, 150, 38, 1);
    background-color: rgba(7, 41, 67, 1);
  }
}
</style>
