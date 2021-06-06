<template>
    <div class="alarm-top">
        <div class="item">
            <div class="item-no">  项目名称 </div>
            <div class="item-times"> 报警次数 </div>
            <div class="item-during"> 报警时长  </div>
            <div class="item-percentage"> 最大载重百分比  </div>
        </div>
        <div class="item" v-for="(item,index) in topList" :key="index">
            <div class="item-no"> <span class="no"> {{ index + 1 }} </span> <span>  {{ item.title }} </span> </div>
            <div class="item-times"> {{ item.times }} </div>
            <div class="item-during"> {{ item.during }}  </div>
            <div class="item-percentage"> {{ item.percentage }}  </div>
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
        post('/api/lift/getTop').then( res => {
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
            margin: 1.2rem 0;
            text-align: center;
            .no{
                display: inline-block;
                padding: 0.2rem 0.8rem;
                background: #7E8E9D;
                border-radius: 2px;
                margin: 1.2rem;
                &>span {
                    font-size: 1.2rem;
                }
            }
            &:nth-child(2) .no{
                background: #CC5151;
            }
            &:nth-child(3) .no{
                background: #F1B129;
            }
            &:nth-child(4) .no{
                background: #2598FF;
            }
            
            &-no{
                flex: 1;

            }
            &-times,&-during,&-percentage{
                flex: 1;
                line-height: 4.5rem;
                font-size: 20px;
                font-family: DINAlternate-Bold, DINAlternate;
                font-weight: bold;
                color: #CC5151;
            }
        }
        .item:first-child{
            height: 3rem;
            .item-no,.item-times,.item-during,.item-percentage{
                font-size: 14px;
                font-family: AlibabaPuHuiTi-Medium, AlibabaPuHuiTi;
                font-weight: 500;
                color: #FFFFFF;
                line-height: 3rem;
            }
           
        }
    }
</style>