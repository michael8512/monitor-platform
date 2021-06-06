<template>
    <div class="equipment-overview">
        <div v-for="(item,index) in equipmentList" :key="index" class="item">
            <p class="item-title"> {{ item.title }} </p>
            <img :src="item.url" alt="">
            <p class="item-num-wrap"> <span class="item-num">  {{ item.num }} </span> {{ index === 3 ? '%' : '台' }}   </p>
        </div>
    </div>
</template>

<script>
import { post } from 'utils/http';

export default {
    data(){
        return{
            equipmentList:[
                {
                    title: '设备总数',
                    url: require('../images/equipment-num.png'),
                    num: '0'
                },{
                    title: '在线数量',
                    url: require('../images/inline.png'),
                    num: '0'
                },{
                    title: '离线数量',
                    url: require('../images/outLine.png'),
                    num: '0'
                },{
                    title: '统计在线率',
                    url: require('../images/inline-percentage.png'),
                    num: '0'
                },
            ]
        }
    },
    mounted(){
        this.getEquipmentList();
    },
    methods:{
        getEquipmentList(){
            post('/api/crane/getEquipmentList').then( res => {
                this.equipmentList[0].num = res.data.totle;
                this.equipmentList[1].num = res.data.inline;
                this.equipmentList[2].num = res.data.outLine;
                this.equipmentList[3].num = res.data.percentage;
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .equipment-overview{
        padding: 1.2rem;
        display: flex;
        justify-content: space-between;
        
        .item{
            background: rgba(18, 112, 196, 0.3);
            padding: 0.6rem 0;
            width: 10rem;
            height: 14rem;
            display: inline-block;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            &-title{
                text-align: center;
                padding: 1rem 0;
                font-size: 1.4rem;
            }
            &-num{
                font-size: 2rem;
                font-family: DIN-Bold, DIN;
                font-weight: bold;
                color: #2598FF;
                line-height: 2rem;
                display: inline-block;
                &-wrap{
                    padding-top: 0.8rem;
                    text-align: center;
                }
            }
            img{
                margin: auto;
                display: block;
                width: 5rem;
                height: 5rem;
            }
        }
    }
</style>