<template>
    <div class="tower">
        <div class="tower-top">
            <div class="tower-top-left">
                <div v-for="(item,index) in leftList" :key="index" class="item">
                    <div class="item-title"> {{ item.title }} </div>
                    <p class="item-content"> <span> {{ item.num }} </span> {{ item.unit }} </p>
                </div>
            </div>
            <div class="tower-top-content">
                <span> 今日运行分析 </span>
            </div>
            <div class="tower-top-right">
                <div v-for="(item,index) in leftList" :key="index" class="item">
                    <div class="item-title"> {{ item.title }} </div>
                    <p class="item-content"> <span> {{ item.num }} </span> {{ item.unit }} </p>
                </div>
            </div>
        </div>
        <div class="tower-status">
            <div class="tower-status-left ">
                <p class="my-bar-title"> 核载状态 </p>
                <div v-for="(item,index) in statusList" :key="index" class="item">
                    <div class="no"> {{ 'Q' + (index + 1) }} </div>
                    <span> {{ item.title }} </span>
                    <div class="item-num"> {{ item.num }}  </div>
                </div>
            </div>
            <div class="tower-status-right ">
                <p class="my-bar-title"> 利用等级 </p>
                <div class="item">
                    <div class="no"> U1-U3 </div>
                    <span> 很少使用 </span>
                    <div class="item-num"> {{ levelNum.low }}  </div>
                </div>
                <div class="item">
                    <div class="no"> U4 </div>
                    <span> 不频繁使用 </span>
                    <div class="item-num"> {{ levelNum.nomal }}  </div>
                </div>
                <div class="item">
                    <div class="no"> U5 </div>
                    <span> 中等频繁使用 </span>
                    <div class="item-num"> {{ levelNum.middle }}  </div>
                </div>
            </div>
        </div>
        <div class="tower-level">
            <p class="my-bar-title"> 工作级别 </p>
            <div class="item-wrap">
                <div v-for="(item,index) in workLevelList" :key="index" class="item">
                    <div class="no"> {{ 'A' + ( index + 1) }} </div>
                    <div class="item-num"> {{ item }}  </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { post } from 'utils/http'
export default {
    data(){
        return{
            leftList:[
                {
                    title:'塔吊总数',
                    num: '',
                    unit: '台'
                },{
                    title:'累计工作循环',
                    num: '',
                    unit: '次'
                },{
                    title:'累计报警次数',
                    num: '',
                    unit: '次'
                },
            ],
            rightList:[
                {
                    title:'累计工作时间',
                    num: '',
                    unit: '小时'
                },{
                    title:'累计运载重量',
                    num: '',
                    unit: 'kg'
                },{
                    title:'累计吊高',
                    num: '',
                    unit: 'm'
                },
            ],
            statusList:[
                {
                    title: '很少调运额定载荷，经常调运较轻载荷',
                    num: 0
                },{
                    title: '很少调运额定载荷，经常调运中等载荷',
                    num: 0
                },{
                    title: '很少调运额定载荷，经常调运较重载荷',
                    num: 0
                },{
                    title: '经常调运额定载荷',
                    num: 0
                },
            ],
            levelNum:{},
            workLevelList:[]
        }
    },
    mounted(){
        post('/api/crane/getTodayRun').then( res => {
            this.leftList[0].num = res.data.totalNum;
            this.leftList[1].num = res.data.run;
            this.leftList[2].num = res.data.alarm;
            this.rightList[0].num = res.data.time;
            this.rightList[1].num = res.data.weight;
            this.rightList[2].num = res.data.heigh;
        });
        this.getStatus();
        this.getLevel();
        this.getWorkLevel();
    },
    methods:{
        getStatus(){
            post('/api/crane/getStatus').then( res => {
                this.statusList[0].num = res.data.low;
                this.statusList[1].num = res.data.middle;
                this.statusList[2].num = res.data.high;
                this.statusList[3].num = res.data.nomal;
            });
        },
        getLevel(){
            post('/api/crane/getLevel').then( res => {
                this.levelNum = res.data;
            })
        },
        getWorkLevel(){
            post('/api/crane/getWorkLevel').then( res => {
                this.workLevelList = res.data;
            })
        },
    }
}
</script>

<style lang="scss" scoped>
    .tower{
        height: calc( 100% - 5.4rem );
        width: 100%;
        &-top{
            width: 100%;
            height: 45rem;
            background: url('../images/content-bk.png') center no-repeat;
            background-position:  center bottom;
            position: relative;

            &-left, &-right{
                width: 11rem;
                height: 100%;
                position: absolute;
                .item{
                    margin-top: 4.4rem;
                    &-title{
                        width: 100%;
                        height: 2.4rem;
                        background: rgba(18, 112, 196, 0.5);
                        text-align: center;
                        line-height: 2.4rem;
                    }
                    &-content{
                        box-sizing: border-box;
                        width: 100%;
                        height: 5rem;
                        background: rgba(18, 112, 196, 0.3);
                        border: 1px solid rgba(18, 112, 196, 0.3);
                        text-align: center;
                        span{
                            padding: 0.4rem 0;
                            display: inline-block;
                            font-size: 4rem;
                            font-family: DINAlternate-Bold, DINAlternate;
                            font-weight: bold;
                            color: #EBBA0F;
                            line-height: 4.7rem;
                        }
                    }
                }
            }
            &-left{
                left: 3rem;
            }
            &-content{
                position: absolute;
                left: 33%;
                top: 1.8rem;
                width: 24rem;
                height: 4rem;
                background: linear-gradient(270deg, rgba(2, 45, 122, 0) 0%, #1483E3 51%, rgba(2, 45, 122, 0) 100%);
                text-align: center;
                span{
                    font-size: 2rem;
                    font-family: AlibabaPuHuiTi-Bold, AlibabaPuHuiTi;
                    font-weight: bold;
                    color: #7BC1FF;
                    line-height: 4rem;
                }
            }
            &-right{
                right: 3rem;
            }
        }
        &-status{
            //height: calc( 100% - 35rem - 10rem );
            overflow: auto;
            padding: 2.4rem 0;
            width: 100%;
            display: flex;
            flex-direction: row;
            &-left, &-right{
                display: inline-block;
                flex: 1;
                box-sizing: border-box;
                .item{
                    background: rgba(18, 112, 196, 0.2);
                    height: 4.5rem;
                    margin-top: 1.2rem;
                    position: relative;
                    
                    span{
                        color: #FFFFFF;
                    }
                    
                }
            }
            &-left{
                margin-left: 2.4rem;

            }
            &-right{
                margin: 0 1.2rem;
            }
        }
        &-level{
            padding: 2.4rem 0;
            margin-left: 2.4rem;
            width: 100%;
            // background: cornflowerblue;
            height: 10rem;
            .item{
                margin-left: 1.2rem;
                background: rgba(18, 112, 196, 0.2);
                display: inline-block;
                // width: 8rem;
                flex: 1;
                height: 5rem;
                position: relative;
            }
            .item-wrap{
                width: calc( 100% - 4.8rem);
                height: 8rem;
                display: flex;
                flex-direction: row;
                margin-top: 1.2rem;
                .item:first-child{
                    margin-left: 0;
                }
            }
            
        }
        .no{
            display: inline-block;
            padding: 0.2rem 0.4rem;
            background: #7E8E9D;
            border-radius: 2px;
            margin: 1.2rem;
        }
        .item-num{
            height: 2.4rem;
            font-size: 2rem;
            font-family: DINAlternate-Bold, DINAlternate;
            font-weight: bold;
            color: #CC5151;
            line-height: 2.4rem;
            position: absolute;
            right: 1.2rem;
            top: 1.2rem;
            display: inline-block;
        }
    }
</style>