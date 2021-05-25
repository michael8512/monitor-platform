<template>
    <div class="crane-wrap">
        321
        <div class="my-bar-title">
            432
        </div>
        <back-fram :bkTitle="'xxx'" class="other">
            <div class="d">
                232132
            </div>
        </back-fram>
    </div>
</template>

<script>
import backFram from '../common/back-fram.vue'
export default {
  components: { backFram },
    data(){
        return{

        }
    }
}
</script>

<style lang="scss" scoped>
    .crane-wrap{
        // background: olivedrab;
        height: 100%;
        width: 100%;
        .other{
            width: 500px;
            height: 400px;
            margin: 200px;
            .d{
                background: olivedrab;
                padding: 12px;
            }
        }
    }
</style>