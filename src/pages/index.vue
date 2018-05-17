<template>
  <div class="index-wrap">
    <div class="index-left">
      <div class="index-left-block">
        <h2>全部产品</h2>
        <template v-for=" product in productList">
          <h3>{{ product.title }}</h3>
          <ul>
            <li v-for="item in product.list">
              <a href="item.url">{{ item.name }}</a>
              <span v-if="item.hot" class="hot-tag">HOT</span>
            </li>
            <div v-if="!product.last" class="hr"></div>
          </ul>
        </template>
      </div>
      <div class="index-left-block lastest-news">
        <h2>最新消息</h2>
        <ul>
          <li v-for="item in newsList">
            <a href="item.url" class="new-item">{{ item.title }}</a>
          </li>
        </ul>
      </div>
    </div>

    <div class="index-right">
      <!-- slideShow 组件插入位置; 使用标签名 使用组件 -->
      <slide-show :slides="slides" :inv="invTime" ></slide-show>
      <div class="index-board-list">
        <div
          class="index-board-item"
          v-for="(item,index) in boardList"
          :class="[{ 'line-last':index % 2 !== 0 }, 'index-board-'+item.id ]" >     <!-- 动态绑定 class 属性-->
            <div class="index-board-item-inner">
              <h2>{{ item.title }}</h2>
              <p>{{ item.description }}</p>
              <div class="index-board-button">
                <!-- router-link 页面跳转，动态绑定链接地址，默认带有 a 链接 -->
                <router-link class="button" :to="{ path:'detail/'+ item.toKey }">立即购买</router-link>
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import slideShow from '../components/slideShow'     // ===> slideShow 组件

  export default {
    // ===> created 为关键字，生命周期，组件创建完毕以后，发出http请求
    created: function () {

      this.$http.get('jsonServer/getNewsList')
        .then((res) => {
          console.log('访问了数据 in index.vue at line 58');
          console.log(res.data);
          // newsList must be an Array && attribute must be an Object
          this.newsList = res.data.data ;
        }, (err) => {
          console.log(err)
        })
    },
    components:{        // ===> slideShow 为 index.vue 的 组件
      slideShow
    },
    data(){
      return {
        invTime:2000,     // ===> 定义slides 时间间距 ===> 在子组件 slideShow 中使用
        slides:[
          {
            src:require('../assets/slideShow/pic1.jpg'),
            title:'React',
            href:'detail/analysis'
          },
          {
            src:require('../assets/slideShow/pic2.jpg'),
            title:'Android',
            href:'detail/count'
          },
          {
            src:require('../assets/slideShow/pic3.jpg'),
            title:'Amazon',
            href:'http://www.baidu.com'
          },
          {
            src:require('../assets/slideShow/pic4.jpg'),
            title:'GitHub',
            href:'detail/forecast'
          }
        ],        //  = == > 数组 对象  ===>  在子组件 slideShow 中使用
        boardList:[
          {
            title:'开放产品',
            description:'这是一款开放产品',
            id:'car',
            toKey:'analysis',
            saleout:false
          },
          {
            title:'营销产品',
            description:'帮助你的产品更好的找到定位',
            id:'earth',
            toKey:'count',
            saleout:false
          },
          {
            title:'使命必达',
            description:'使命必达快速迭代永远保持最前端的速度',
            id:'loud',
            toKey:'forecast',
            saleout:true
          },
          {
            title:'永攀高峰',
            description:'帮你勇闯高峰，到达事业的顶峰',
            id:'hill',
            toKey:'publish',
            saleout:false
          }
        ],
        newsList:[            // ===> 装载最新消息   ==> 装载 http请求 获取的数据

        ],        //  = == > 数组 对象
        productList:{        //  = == > 对象[ pc 、app 对象 ]
          pc:{
            title:'PC产品',
            list:[
              {
                name:'数据统计',
                url:'http://starcraft.com'
              },
              {
                name:'数据预测',
                url:'http://warcraft.com'
              },
              {
                name:'流量分析',
                url:'http://overwatch.com',
                hot:true
              },
              {
                name:'广告分析',
                url:'http://hearstone.com'
              }
            ]
          },
          app:{
            title:'APP产品',
            last:true,
            list:[
              {
                name:'91助手',
                url:'http://weixin.com'
              },
              {
                name:'产品助手',
                url:'http://twitter.com',
                hot:true
              },
              {
                name:'智能地图',
                url:'http://maps.com'
              },
              {
                name:'团队语音',
                url:'http://phone.com'
              }
            ]
          }
        },      // 装载 产品信息

      }
    },
  }
</script>

<!-- CSS style  -->
<style scoped>     /*  CSS style  [ scoped 属性设置，使得 内部样式 不外泄 ] */
/* 整体内容区 */
 .index-wrap{
   width: 1200px;
   margin: 0 auto;
   overflow: hidden;
   /*height: 500px;background: greenyellow;*/
 }
/* 左区域块*/
 .index-left{
   width: 300px;
 /*  height: 200px;background: red ;*/
   float: left;
   text-align: left;
 }
/* 右区域块*/
 .index-right{
   width: 900px;
  /* height: 200px;background: blue;*/
   float: left;
 }
 /* - - - - - - - 左区域块 具体设置 -- - - - - - - -  -*/
 .index-left-block{
   margin: 15px;
   background: #fff;
   box-shadow: 0 0 1px #ddd;
 }
 .index-left-block h2{
   background: #4fc086;
   color: #fff;
   padding: 5px 15px 5px 15px ;
 }
 .index-left-block h3{
   padding: 0 15px ;
   font-weight: bold;
   color: #222;
 }
 .index-left-block ul{
   padding: 10px 15px;
 }
 .index-left-block li{
   padding: 5px;
 }

 .index-left-block .hr{
   margin-bottom: 20px;
 }
 .hot-tag{
   background: red;
   color: #fff;
   margin-left: 10px;
 }

 .lastest-news{
   min-height: 512px;
 }
 .new-item{
   display: inline-block;
   width: 230px;  overflow: hidden;  text-overflow: ellipsis;  /* 单行文本溢出处理 */
   white-space: nowrap;
   /* 规定文本段落 是否换行 */
 }


/* - - - - - - - 右区域块 具体设置 -- - - - - - - -  -*/
 .index-board-list{
   overflow: hidden;
   /*background: greenyellow;*/
 }
 .index-board-item{
   float: left;
   width: 400px;/*height: 400px;*/
   background: #fff;
   box-shadow: 0 0 1px #ddd;/* box-shadow : 水平 ， 竖直 ，模糊度 ， 颜色 */
   padding: 20px;  margin-right: 20px;  margin-bottom: 20px;
 }
 .line-last{
   margin-right: 0;
 }
   /* v-for 循环创建的 4个类 */
  .index-board-car    {
   background: url(../assets/images/1.png) no-repeat left center;
  }
  .index-board-earth {
    background: url(../assets/images/2.png) no-repeat left center;
  }
  .index-board-loud  {
    background: url(../assets/images/3.png) no-repeat left center;
  }
  .index-board-hill  {
    background: url(../assets/images/4.png) no-repeat left center;
  }

  .index-board-item-inner{
    width: 280px;
    float: right;
  }

  .index-board-item h2{
    font-size: 18px;
    font-weight: bold;
    color: #000;
    margin-bottom: 15px;
  }
  .index-board-button{
    background: #4fc08d;  color: #fff;
    display: inline-block;
    margin-top: 20px;  padding: 10px 20px;
    cursor: pointer;
  }


/**/
/**/
</style>
