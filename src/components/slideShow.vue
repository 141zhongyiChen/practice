<!-- template  -->
<template>
  <div class="slide-show" @mouseover="clearInv" @mouseout="runInv"  >
    <!-- slide-img -->
    <div class="slide-img">
      <a :href="slides[nowIndex].href">
        <transition name="slide-trans">
          <img  v-if="isShow" :src="slides[nowIndex].src">   <!-- 此处的 nowIndex 为 当前正在执行 的索引 -->
        </transition>
        <transition name="slide-trans-old">
          <img  v-if="!isShow" :src="slides[nowIndex].src">  <!-- 此处的 nowIndex 为 上一次执行 的索引 -->
        </transition>
      </a>
      <h2>{{ slides[nowIndex].title }}</h2>
    </div>
    <!-- slide-pages -->
    <ul class="slide-pages">
      <li  @click="goto(prevIndex)">《</li>
      <li v-for="(item ,index) in slides" @click="goto(index)">
        <a :class="{ currentIndex:index===nowIndex }">{{ index+1 }}</a>
      </li>
      <li  @click="goto(nextIndex)">》</li>
    </ul>
  </div>
</template>

<!-- these are about some data and functions -->
<script>
  export default {
    props:{
      slides:{
        type:Array,
        default:[]
      },     //  ===> 通过 props，与 index父组件 进行通信 ===> slides 来自于父组件的 slides
      inv:{
        type:Number,
        default:1000
      }        //  ===> 通过 props，与 index父组件 进行通信 ===> inv 来自于 父组件的 invTime
    },
    data(){
      return {
        nowIndex:0,     // ===> 作为 前后图片切换的 标志
        isShow:true     //  ===> 是否渲染标志   ===> 动画切换 标志
      }
    },
    computed:{
      prevIndex(){    // ===> 前一页
        if(this.nowIndex === 0){
            return this.slides.length - 1 ;   // ===> 若到达第一页，返回到最后一页
        }else {
            return this.nowIndex - 1  ;       // ===> 否则 返回到 当前页面的 前一页
        }
      },
      nextIndex(){    // ===> 后一页
        if(this.nowIndex === this.slides.length-1){
            return 0 ;
        }else {
            return this.nowIndex +1 ;
        }
      }
    },
    methods:{
      goto (index) {
        this.isShow = false ;
        setTimeout(() => {
          this.isShow = true ;
          this.nowIndex = index ;
          /*this.$emit('pagesonchange',index)*/    // ===> （测试）子组件 向 父组件 通信
        }, 10)
      },
      runInv () {                 // ===> 启动定时器
        this.invId = setInterval(() => {
          this.goto(this.nextIndex)   // ===> 调用 nextIndex 方法，使得 Index 自增
        }, this.inv)
      },
      clearInv () {
        clearInterval(this.invId)
      },
    },
    mounted () {        // ===> 生命周期 ==> el 被 新创建的vm.$el替换，并挂载到实例上去之后调用该钩子 ==> 启动定时器
      this.runInv();
    }
  }
</script>



<!-- these are  all about  inward styles -->
<style scoped>

/* slide-show container */
  .slide-show {
    width: 900px;  height: 500px;
    margin: 15px 15px 15px 0;/*background: red;*/
    overflow: hidden;
    position: relative;
  }

/* slide transition style */
  .slide-trans-enter-active{
    transition: all .7s ;
  }
  .slide-trans-enter{
    transform: translateY(-506px);
  }
  .slide-trans-old-leave-active{
    transition: all .5s;
    transform: translateX(-900px);
  }

/* slide-img style*/
  .slide-img{
    width: 100%;
  }
  .slide-img img{
    position: absolute;  top: 0;   /* 以 slide-show 作为参考 ;  */
    width: 100%;
  }
  .slide-img h2{
    position: absolute;  bottom: 0;
    width: 100%;  height: 30px;padding-left: 15px;
    background: #000;opacity: .5;filter: opacity(50);
    color:#fff ;
  }

/* slide-pages style*/
  .slide-pages{
    position: absolute;  bottom: 10px;  right: 15px;
  }
  .slide-pages li{
    display: inline-block;
    color: white;
    padding: 0 10px;
    cursor: pointer;
  }
  .slide-pages li .currentIndex{
    text-decoration: underline;
    color: yellowgreen;
  }


/**/
/**/
/**/
/**/
</style>
