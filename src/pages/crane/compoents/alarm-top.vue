<template>
    <div class="alarm-top">
        <div class="item" v-for="(item,index) in topList" :key="index">
            <div class="item-no"> <span class="no"> {{ index + 1 }} </span> <span>  {{ item.title }} </span> </div>
            <div class="item-area"> {{ item.area }} </div>
            <div class="item-num"> {{ item.num }}  </div>
        </div>
    </div>
</template>

<script>
import { post } from 'utils/http'
export default {
    data(){
        return{
            topList:[]
        }
    },
    mounted(){
        post('/api/crane/getTop').then( res => {
            this.topList = res.data;
        })
    }
}
</script>

<style lang="scss" scoped>
    .alarm-top{
        width: 100%;
        height: calc( 100% - 5.4rem );
        overflow: auto;
        .item{
            display: flex;
            flex-direction: row;
            position: relative;
            background: rgba(18, 112, 196, 0.2);
            height: 4.5rem;
            margin-top: 1.2rem;
            .no{
                display: inline-block;
                padding: 0.2rem 0.8rem;
                background: #7E8E9D;
                border-radius: 2px;
                margin: 1.2rem;
            }
            &:first-child .no{
                background: #CC5151;
            }
            &:nth-child(2) .no{
                background: #F1B129;
            }
            &:nth-child(3) .no{
                background: #2598FF;
            }
            
            &-no{
                flex: 1;

            }
            &-area{
                flex: 1;
                line-height: 4.5rem;
            }
            &-num{
                flex: none;
                font-size: 20px;
                font-family: DINAlternate-Bold, DINAlternate;
                font-weight: bold;
                color: #CC5151;
                line-height: 4.5rem;
                width: 4rem;
            }
        }
    }
</style>