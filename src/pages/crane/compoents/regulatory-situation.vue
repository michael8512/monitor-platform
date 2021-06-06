<template>
    <div class="regulatory-situation">
        <div class="top">
            <div class="left">
                <img src="../images/pointer.png" alt="">
            </div>
            <div class="right">
                <p> 综合指数 </p>
                <div class="num"> {{ regulatorySituatio.compositeIndex }} </div>
                <div class="btn"> {{ regulatorySituatio.compositeIndex > 50 ? '较差' : '正常' }} </div>
            </div>
        </div>
        <div class="bottom">
            <div v-for="(item,index) in situationList" :key="index" class="item">
                <div> {{ item.num }} </div>
                <p > {{ item.title }} </p>
            </div>
        </div>
    </div>
</template>

<script>
import { post } from 'utils/http'
export default {
    data(){
        return{
            regulatorySituatio:{

            },
            situationList:[
                {
                    title:'安全指数',
                    num:''
                },{
                    title:'使用指数',
                    num:''
                },{
                    title:'建设规范',
                    num:''
                },{
                    title:'管理指数',
                    num:''
                },
            ]
        }
    },
    mounted(){
        post('/api/crane/getRegulatorySituatio').then( res => {
            this.regulatorySituatio = res.data;
            this.situationList.map( item => {
                res.data.situationList.map( data => {
                    item.num = data;
                })
            })
        });
    }
}
</script>

<style lang="scss" scoped>
    .regulatory-situation{
        font-size: 16px;
        font-family: AlibabaPuHuiTi-Medium, AlibabaPuHuiTi;
        font-weight: 500;
        color: #FFFFFF;
        // line-height: 22px;
        text-align: center;
        .top{
            width: 100%;
            display: flex;
            flex-direction: row;
            height: 15rem;
            .left{
                position: relative;
                flex: 1;
                background: url('../images/chart-bk.png') center no-repeat;
                img{
                    position: absolute;
                    top: 38%;
                    left: 48%;
                    // -webkit-transform:rotate(45deg);
                    // -moz-transform:rotate(45deg);
                }
            }
            .right{
                flex: 1;
                padding: 2rem 0;
                .num{
                    font-size: 50px;
                    font-family: DINAlternate-Bold, DINAlternate;
                    font-weight: bold;
                    color: #F1B129;
                    line-height: 58px;
                    margin: 0.8rem 0;
                }
                .btn{
                    margin: auto;
                    width: 4.8rem;
                    height: 2.4rem;
                    border-radius: 2px;
                    border: 1px solid #979797;
                    line-height: 2.4rem;
                }
            }
        }
        .bottom{
            width: 100%;
            display: flex;
            flex-direction: row;
            .item{
                flex: 1;
                display: inline-block;
                div{
                    margin: 0.8rem 0;
                    font-size: 28px;
                    font-family: DINAlternate-Bold, DINAlternate;
                    font-weight: bold;
                    color: #2598FF;
                }
            }
        }
    }
</style>        