<template>
    <div class="my-background-frame">
        <p> {{ bkTitle }} </p>
        <slot/>
    </div>
</template>

<script>
export default {
    props:{
        bkTitle:{
            type: String,
            default:''
        }
    }
}
</script>

<style lang="scss" scoped>
    .my-background-frame{
        background: url('./images/标题bg.png') no-repeat center center;
        // background: linear-gradient(270deg, rgba(0, 43, 184, 0) 0%, #0091DD 100%);
        // opacity: 0.2;
        // height: 42px;
        background-size: 100% 100% ;
        position: relative;
        &::after{
            z-index: 999;
            content: '';
            width: 1.2rem;
            height: 1.2rem;
            position: absolute;
            top: 0.8rem;
            right: 0.8rem;
            background: url('./images/标题右.png');
        }
        &::before{
            z-index: 99;
            width: 2.8rem;
            height: 0.4rem;
            content: '';
            position: absolute;
            top: 4.2rem;
            left: 1.2rem;
            background: url('./images/标题左.png');
        }
        p{
            width: 7.2rem;
            height: 2.5rem;
            font-size: 1.8rem;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: #FFFFFF;
            line-height: 2.5rem;
            padding: 1.2rem 2.4rem;

        }
    }
</style>