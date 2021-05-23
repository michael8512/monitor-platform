<template>
    <div class="vis-animation">
        <!--<img v-if="loaded" :src="src">-->
        <img v-if="!loaded&&imgList.length>0" :src="imgList[0]">
        <canvas style="width: 100%;height: 100%;" ref="canvasContainer"></canvas>

    </div>
</template>

<script>
    export default {
        name: "vis-animation-low",
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
            }
        },
        data(){
            return {
                loaded: false,
                progress: 0,
                src: '',
                index: 0,
                interval: 0,
                then: null,
                ctx: null,
                imgInstance: {},
                canvasInstance: {}
            };
        },
        mounted(){
            this.canvas = this.$refs.canvasContainer;
            this.ctx = this.canvas.getContext('2d');
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
            }
        },
        methods:{
            loadImage(){
                this.imgList.forEach((v)=>{
                    this.preLoadImg(v);
                });
            },
            preLoadImg(src){
                let image = new Image();
                this.imgInstance[src] = image;
                image.onload = ()=>{
                    let canvas = document.createElement('canvas');
                    let ctx  = canvas.getContext('2d');
                    canvas.width = this.canvas.width;
                    canvas.height = this.canvas.height;
                    ctx.drawImage(this.imgInstance[src],
                        0,
                        0,
                        this.canvas.width,
                        this.canvas.height);
                    this.canvasInstance[src] = canvas;
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
                    this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
                    this.ctx.drawImage(
                        this.canvasInstance[this.src],
                        0,
                        0
                    );
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
<style lang="sass">
    .vis-animation img
        width: 100%
        height: 100%
    .vis-animation
        width: 100%
        height: 100%
</style>