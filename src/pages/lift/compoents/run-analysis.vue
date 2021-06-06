<template>
    <div class="run-analysis">
        <div>
            <div class="title"> 运行统计 </div>
            <div class="tips-wrap">
                <div v-for="(item,index) in runList" :key="index" class="item">
                    <p> {{ item.title }} </p>
                    <p class="num"> {{ item.num }} <span> {{ item.unit }} </span> </p>
                </div>
            </div>
        </div>
        <div class="used-level">
            <div class="title"> 利用等级 </div>
            <div class="tips-wrap">
                <div class="item">
                    <p> U1-U3很少使用 </p>
                    <p class="num"> {{ useLevel.low }}  </p>
                </div>
                <div class="item">
                    <p> U4不频繁使用 </p>
                    <p class="num"> {{ useLevel.middle }}  </p>
                </div>
                <div class="item">
                    <p> U5中等频繁使用 </p>
                    <p class="num"> {{ useLevel.nomal }}  </p>
                </div>
            </div>
        </div>
        <div class="status">
            <div class="title"> 载荷状态 </div>
            <div v-for="(item,index) in statusList" :key="index" class="item">
                <!-- <div class="no"> {{ 'Q' + (index + 1) }} </div> -->
                <span> {{ 'Q' + (index + 1) }} {{ item.title }} </span>
                <div class="item-num"> {{ item.num }}  </div>
            </div>

        </div>
        <div class="work-lwvel">
            <div class="title"> 工作级别 </div>
            <div class="level-wrap">
                <div v-for="(item,index) in workLevel" :key="index"  class="item">
                    <p> {{ 'A' + (index +1) }} </p>
                    <p> {{ item }} </p>
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
            runList:[],
            workLevel:[],
            useLevel:{},
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
        }
    },
    mounted(){
        this.getData();
    },
    methods:{
        getData(){
            post('/api/lift/getRun').then( res => {
                this.runList = res.data;
            })
            post('/api/lift/getWorkLevel').then( res => {
                this.workLevel = res.data;
            })
            post('/api/lift/getLevel').then( res => {
                this.useLevel = res.data;
            })
            post('/api/lift/getStatus').then( res => {
                this.statusList[0].num = res.data.low;
                this.statusList[1].num = res.data.middle;
                this.statusList[2].num = res.data.high;
                this.statusList[3].num = res.data.nomal;
            });
        },
       
    }
}
</script>

<style lang="scss" scoped>
    .run-analysis{
        height: calc(100% - 6.2rem);
        width: 100%;
        padding: 1.2rem;
        &>div{
            padding: 1.2rem;
        }
        .title{
            // display: inline-block;
            ::after{
                content:'';
                background: url('../images/rect.png') ;
            }
        }
        .tips-wrap{

            .item{
                padding: 0.6rem 0;
                width: 33%;
                display: inline-block;
                text-align: center;
                color: rgba(255, 255, 255, 0.7);
                font-size: 1.6rem;
                .num{
                    color: #137EDD;
                    font-size: 2.4rem;
                    span{
                        font-size: 1.4rem;
                    }
                }
            }
        }
        .status{
            .item{
                position: relative;
                color: rgba(255, 255, 255, 0.7);
                font-size: 1.6rem;
                padding: 2.4rem 0 0.4rem 1.2rem;
              
                .item-num{
                    color: #137EDD;
                    position: absolute;
                    right: 7.2rem;
                    top: 1.2rem;
                }
            }
        }
        .work-lwvel{
            .level-wrap{
                padding: 1.2rem 0;
                text-align: center;
                display: flex;
                .item{
                    flex: 1;
                    color: rgba(255, 255, 255, 0.7);
                    font-size: 1.6rem;
                    &>p:nth-child(2){
                        color: #137EDD;
                        font-size: 2.4rem;
                    }
                }
            }
        }
        .num{
            padding-top: 1.2rem;
        }
       
        
    }
</style>