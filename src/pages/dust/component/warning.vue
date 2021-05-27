<!--
 * @Description: 今日预警
 * @Author: hexy
 * @Date: 2021-05-26 17:17:43
 * @LastEditors: hexy
 * @LastEditTime: 2021-05-27 16:48:01
 * @FilePath: /monitor-platform/src/pages/dust/warning.vue
-->
<template>
        <back-fram title="今日预警" class="other">
            <div class="d">
                232132
            </div>
        </back-fram>
</template>

<script>
import backFram from '../../common/back-fram'
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
