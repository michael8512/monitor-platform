<template>
    <div class="regulatory-profile">
        <div class="chart" ref="myCharts"></div>
        <div class="middle">
            <p > {{ indexs.composite || '--' }} </p>
            <p> 综合指数 </p>
        </div>
        <div class="right">
            <div class="right-top">
                <div>  
                    <p> 安全指数 </p>
                    <p class="num"> {{ indexs.safety }} </p>
                </div>
                <div>  
                    <p> 使用指数 </p>
                    <p  class="num"> {{ indexs.used }} </p>
                </div>
            </div>
            <div class="right-bottom">
                <div>  
                    <p> 建设规范 </p>
                    <p class="num"> {{ indexs.construct }} </p>
                </div>
                <div>  
                    <p> 管理指数 </p>
                    <p class="num"> {{ indexs.manage }} </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { post } from 'utils/http'
import echarts from 'echarts'
export default {
    data(){
        return{
            option:[],
            dataList:[],
            indexs:{}
        }
    },
    mounted(){
        this.getData();
    },
    methods:{
        getData(){
            post('/api/lift/getRegulatory').then( res => {
                this.dataList = res.data;
                this.init();
            });
            post('/api/lift/getCompositeIndex').then( res => {
                this.indexs = res.data;
            })
        },
        init(){
            let myChart = echarts.init(this.$refs.myCharts);
            this.option = {
                radar: {
                    radius: "60%",
                    indicator: [
                        { name: '安全指数', max: 6500},
                        { name: '管理', max: 16000},
                        { name: '', max: 30000},
                        { name: '使用', max: 38000},
                        { name: '建设', max: 52000},
                    ],
                    splitArea :{
                        areaStyle:{
                            show: true,
                            color : ['rgba(250,250,250,0)','rgba(200,200,200,0)'],
                        }
                    },
                    splitLine:{
                        lineStyle:{
                            color: 'rgba(19, 126, 221, 1)'
                        }
                    },
                    axisLine: {
                        show: false
                    }
                },
                series: [{
                    name: '监管概况',
                    type: 'radar',
                    color: 'rgba(235, 186, 15, 1)',
                    data: this.dataList,
                    areaStyle:{
                        color: ['rgba(235, 186, 15, 0.3)','rgba(235, 186, 15,0.3)']
                    },
                    
                }]
            }
            myChart.setOption(this.option);
        }
    }
}
</script>

<style lang="scss" scoped>
    .regulatory-profile{
        height: calc(100% - 4.2rem);
        width: 100%;
        display: flex;
        .chart{
            height: calc(100% - 1.2rem);
            flex: 1;
            margin: 0 !important;
            padding: 1.2rem;
        }
        .middle{
            flex: 1;
            background: url('../images/middle-bk.png') center no-repeat;
            text-align: center;
            &>p:first-child{
                font-size: 6rem;
                color: #FFFFFF;
                line-height: 7.3rem;
                padding-top: 3rem;
            }
        }
        .right{
            flex: 1;
            background: url('../images/right-bk.png') center no-repeat;
            font-size: 1.6rem;
            line-height: 2.2rem;
            color: rgba(255, 255, 255, 0.7);
            .num{
                color: #137EDD;
                font-size: 2.4rem;
            }
            &-top,&-bottom{
                height: 45%;
                text-align: center;
                &>div{
                    display: inline-block;
                    width: 45%;
                    margin: auto;
                    padding-top: 3.3rem;
                }
            }
        }
    }
</style>