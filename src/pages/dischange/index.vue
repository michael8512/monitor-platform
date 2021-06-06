<template>
    <div class="dischange">
        <div class="dischange-left">
            <back-fram :title="'监控覆盖统计'" :width="'45rem'" :height="'21rem'" class="statistics item">
                <div class="statistics-left">
                    <img src="./images/chart-bk.png" alt="">
                    <p class="num"> {{ statistics.percentage }} </p>
                    <p class="numTitle"> 覆盖率 </p>
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
        <div class="dischange-content">
            <!-- <back-fram :title="'监管概况'" :width="'100%'" :height="'62rem'" class=" "> -->
                <duty-statistic></duty-statistic>
            <!-- </back-fram> -->
            <!-- <back-fram :title="'设备报警数据统计'" :width="'100%'" :height="'calc( 100% - 62rem - 1.2rem )'" class=" "> -->
                <over-times></over-times>
            <!-- </back-fram> -->
        </div>
        <div class="dischange-right">
            <back-fram :title="'报警趋势'" :width="'45rem'" :height="'20rem'" class="item">
                <alarm-trend />
            </back-fram>
            <back-fram :title="'今日设备报警排行'" :width="'45rem'" :height="'calc( 100% - 20rem - 1.2rem  )'" class=" item">
                <alarm-top />
            </back-fram>
            

        </div>
    </div>
</template>

<script>
import DutyStatistic from './compoents/dutyStatistic.vue';
import alarmTrend from './compoents/alarm-trend'
import alarmTop from './compoents/alarm-top'
import EquipmentOverview from './compoents/eEquipment-overview'
import backFram from '../common/back-fram.vue'
import { post } from 'utils/http'
import { TweenMax, Power2 } from 'gsap';
import OverTimes from './compoents/overTimes.vue';
export default {
  components: { backFram , EquipmentOverview  ,alarmTop,alarmTrend ,DutyStatistic,OverTimes},
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
            post('/api/dischange/getStatistics').then( res => {
                this.statistics = res.data;
            });
        },
        resizehandle({height}) {
            this.scrollHeight = height;
        },
        getMessageGroup() {
            post(`/api/dischange/getMessageGroup`).then(res=>{
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
    .dischange{
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
            //padding: 0em 1.2rem 0rem 0rem;
            flex: none;
            box-sizing: border-box;
            .statistics{
                &-left{
                    margin: 1.3rem 0 0 3.5rem;
                    display: inline-block;
                    position: relative;
                    .num{
                        top: 34%;
                        left: 25%;
                        font-size: 4rem;
                        font-family: DINAlternate-Bold, DINAlternate;
                        font-weight: bold;
                        color: #F1B129;
                        line-height: 4.7rem;
                        position: absolute;
                    }
                    .numTitle{
                        position: absolute;
                        top: 75%;
                        left: 36%;
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
            //padding: 0rem 0rem 0rem 1.2rem;
            flex: none;
            box-sizing: border-box;
        }

        
    }
</style>