<template>
    <div class="vis-animation" ref="container">
        <img v-if="loaded" :src="src" :style="`width: ${sizeW}; height: ${sizeH}`">
        <img v-if="!loaded&&imgList.length>0" :src="imgList[0]" :style="`width: ${sizeW}; height: ${sizeH}`">
    </div>
</template>

<script>
    export default {
        name: "vis-animation",
        props: {
            time: {
                type: Number,
                default: 1000
            },
            imgList:{
                type: Array,
                default: ()=>[]
            },
            pause: {
                type: Boolean,
                default: false
            },
            width: {
                type: String,
            },
            height: {
                type: String,
            },
        },
        data(){
            return {
                loaded: false,
                progress: 0,
                src: '',
                index: 0,
                interval: 0,
                then: null
            };
        },
        computed: {
            sizeW() {
                return this.width || 0;
            },
            sizeH() {
                return this.height || 0;
            }
        },
        mounted(){
            if(!this.width && !this.height){
                return ;
            }
            if(this.imgList && this.imgList.length > 0) {
                this.loadImage();
            }
        },
        watch:{
            imgList(v){
                if(v && v.length > 0){
                    this.loadImage();
                }
            },
            pause(n,o){
                if(o && !n && this.imgList.length > 0){
                    this.play();
                }
            },
        },
        methods:{
            loadImage(){
                this.imgList.forEach((v)=>{
                    this.preLoadImg(v);
                });
            },
            preLoadImg(src){
                let image = new Image();
                image.onload = ()=>{
                    this.progress++;
                    this.play();
                };
                image.onerror  = ()=>{
                    this.progress++;
                    this.play();
                };
                image.src = src;
            },
            play(){
                if(this.progress === this.imgList.length){
                    this.interval = this.time/this.imgList.length;
                    this.then = Date.now();
                    this.animate();
                }
            },
            animate(){
                if(!this.pause){
                    requestAnimationFrame(()=>{
                        this.animate();
                    });
                }
                let now = Date.now();
                let delta = now - this.then;
                if(delta > this.interval){
                    this.loaded=true;
                    this.then = now - (delta % this.interval);
                    this.src = this.imgList[this.index%(this.imgList.length)];
                    this.index = (this.index+1)%this.imgList.length;
                }
                if(this.pause&&this.index=== 0){
                    this.loaded=true;
                    this.src = this.imgList[this.index];
                }
            }
        }
    };
</script>