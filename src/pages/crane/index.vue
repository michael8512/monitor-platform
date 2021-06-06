<template>
    <div class="crane">
        <div class="crane-left">
            <back-fram :title="'监控覆盖统计'" :width="'45rem'" :height="'21rem'" class="item">
                <div class="statistics">
                    <div class="statistics-left">
                        <div class="image-box">
                            <dash-board title="综合指数" :data="statistics.percentage"></dash-board>
                        </div>
                    </div>
                    <div class="statistics-right">
                        <div>
                            <p>辖区内项目总数</p>
                            <p class="num"> {{ statistics.projectNum }} </p>
                        </div>
                        <div>
                            <div  class="bottom-item">
                                <p>已安装</p>
                                <p class="num"> {{ statistics.installed }} </p>
                            </div>
                            <div  class="bottom-item">
                                <p>未安装</p>
                                <p class="num"> {{ statistics.NotInstalled }} </p>
                            </div>
                        </div>
                    </div>
                </div>
            </back-fram>
            <back-fram :title="'监测设备概况'" :width="'45rem'" :height="'23rem'" class=" item">
                <equipment-overview />
            </back-fram>

            <back-fram :title="'消息中心'" :width="'45rem'" :height="'calc( 100% - 48rem + 1.4rem )'" class="message-group ">
                <div class="scroll-wraper" v-resize="resizehandle" ref="scrollBody">
                    <div class="scroll-list">
                        <div class="scroll-list-item group-staticList-item" v-for="(item, index) in dataList" :key="index">
                            <img src="./images/warn.png" alt="">
                            <span> {{ item.title }} </span>
                            <div> {{ item.time }} </div>
                        </div>
                    </div>
                </div>
            </back-fram>
        </div>
        <div class="crane-content">
            <back-fram :title="'吊塔设备概况'" :width="'100%'" :height="'100%'" class=" ">
                <tower />
            </back-fram>
        </div>
        <div class="crane-right">
             <back-fram :title="'监管情况'" :width="'45rem'" :height="'26rem'" class=" item">
                 <regulatory-situation/>
            </back-fram>
            <back-fram :title="'报警排行'" :width="'45rem'" :height="'calc( 100% - 20rem - 26rem - 4rem + 1.4rem )'" class=" item">
                <alarm-top />
            </back-fram>
            <back-fram :title="'报警趋势'" :width="'45rem'" :height="'20rem'" class="">
                <alarm-trend />
            </back-fram>

        </div>
    </div>
</template>

<script>
import alarmTrend from './compoents/alarm-trend'
import alarmTop from './compoents/alarm-top'
import RegulatorySituation from './compoents/regulatory-situation'
import EquipmentOverview from './compoents/eEquipment-overview'
import backFram from '../common/back-fram.vue'
import tower from './compoents/tower'
import { post } from 'utils/http'
import { TweenMax, Power2 } from 'gsap';
import DashBoard from 'common/dash-board';

export default {
  components: { backFram , EquipmentOverview , tower , RegulatorySituation ,alarmTop,alarmTrend, DashBoard},
    data(){
        return{
            statistics: {},
             scrollHeight: 0,
             dataList: [],
             scrollTime: 0.75,
             tableRowHeight: 4.8,
              keepScroll: null,
              holdTime: 1.25,
        }
    },
    mounted(){
        this.getStatistics();
        this.getMessageGroup();
    },
    methods:{
        getStatistics(){
            post('/api/crane/getStatistics').then( res => {
                this.statistics = res.data;
            });
        },
        resizehandle({height}) {
            this.scrollHeight = height;
        },
        getMessageGroup() {
            post(`/api/crane/getMessageGroup`).then(res=>{
                this.dataList = (res.data || []).map(item=> {
                    return item;
                });

                this.dataList.length >4 && this.getActualBehavior();
            });
        },
        getActualBehavior() {
            const scrollBody = this.$refs.scrollBody;
            const { tableRowHeight, dataList, scrollTime, scrollHeight, fontSize } = this;
            
            TweenMax.to(scrollBody, scrollTime, {
                scrollTop: tableRowHeight * fontSize,
                ease: Power2.easeNone,
                onComplete: ()=> {
                    let first = dataList.shift();
                    dataList.push(first);
                    scrollBody.scrollTop = 0;
                    this.scrollHandle();
                }
            });
        },
        scrollHandle() {
            this.keepScroll && clearTimeout(this.keepScroll);
            this.keepScroll = setTimeout(()=>{
                this.getActualBehavior();
            }, this.holdTime * 1000);
        },
    }
}
</script>

<style lang="scss" scoped>
    .crane{
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: row;
        font-size: 1.4rem;
        font-family: AlibabaPuHuiTi-Medium, AlibabaPuHuiTi;
        font-weight: 500;
        color: #FFFFFF;
        line-height: 2rem;
        &-left,&-right{
            .item{
                margin-bottom: 1.2rem ;
            }
        }
        &-left{
            padding: 0em 1.2rem 0rem 0rem;
            flex: none;
            box-sizing: border-box;
            .statistics{
                height: calc(100% - 4.3rem);
                display: flex;
                justify-content: space-around;
                align-items: center;
                &-left{
                    .image-box {
                        width: 17rem;
                        height: 13.8rem;
                        .value {
                            color: #F1B129;
                            font-size: 8rem;
                        }
                        .label {
                            font-size: 1.6rem;
                        }           
                    }         
                }
                &-right{
                    display: inline-block;
                    margin-left: 5rem;
                    .num{
                        font-size: 2.8rem;
                        font-family: DINAlternate-Bold, DINAlternate;
                        font-weight: bold;
                        color: #2598FF;
                        line-height: 3.2rem;
                    }
                    .bottom-item{
                        display:inline-block;
                        margin: 1.8rem 4.2rem 0 0;
                    }
                }
            }
            .message-group{
                .scroll-wraper{
                    height: calc( 100% - 4.2rem );
                    .scroll-list{
                        height: 100%;
                        overflow: auto;
                        &-item{
                            width: 42rem;
                            height: 5rem;
                            background: rgba(18, 112, 196, 0.2);
                            position: relative;
                            margin: 1.2rem auto;
                            line-height: 5rem;
                            img{
                                margin: 1.2rem;
                                display: inline-block;
                                vertical-align: middle;

                            }
                            div{
                                top: 0;
                                right: 0.8rem;
                                position: absolute;
                            }
                        }
                    }
                }
            }
        }
        &-content{
            flex: auto;
        }
        &-right{
            padding: 0rem 0rem 0rem 1.2rem;
            flex: none;
            box-sizing: border-box;
        }

        
    }
</style>