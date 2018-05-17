<template>
  <div>
    <!-- 顶部 -->
    <div class="app-head">
      <div class="app-head-inner">
        <!-- require vue-router module -->
        <router-link :to="{ path: '/'}" >
          <img src="../assets/logo.png">
        </router-link>
        <div class="head-nav">
          <ul class="nav-list">
            <li> {{ username }}</li>
            <li v-if="username!== ''" class="nav-pile">|</li>
            <li v-if="username!== ''" @click="quit">退出</li>
            <li v-if="username=== ''" @click="logClick">登录</li>
            <li class="nav-pile">|</li>
            <li v-if="username=== ''" @click="regClick">注册</li>
            <li v-if="username=== ''" class="nav-pile">|</li>
            <li @click="aboutClick">关于</li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 内容区 -->
    <div class="container">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <!-- 底部区 -->
    <div class="app-foot">
      <p>© 2018 this is my first try @ 3-12-21:59</p>
    </div>
    <!-- return to top -->
    <div class="back-to-top">Back</div>

    <!-- Login dialog press down from components dialog -->
    <my-dialog :isShow="isShowLogDialog" @on-close="closeDialog('isShowLogDialog')">
        <log-form @has-log="onSuccessLog"></log-form>
    </my-dialog>
    <!-- Reg dialog press down from components dialog -->
    <my-dialog :isShow="isShowRegDialog" @on-close="closeDialog('isShowRegDialog')">
        <reg-form></reg-form>
    </my-dialog>
    <!-- About dialog press down from components dialog -->
    <my-dialog :isShow="isShowAboutDialog" @on-close="closeDialog('isShowAboutDialog')">
        <p>本报告在调研数据的基础上，采用定性与定量相结合的方式深入分析了专车市场发展的驱动因素与阻碍因素、
         专车市场背后的产业格局、专车企业的竞争格局、用户对专车市场的依赖程度、专车对其他交通工具运力的补充效应等，
         通过这五个章节的研究反映专车市场的发展态势和面临的问题。
         报告力求客观、深入、准确地反映中国专车市场发展情况，为政府、企事业单位和社会各界提供决策依据。</p>
    </my-dialog>
<!--
    <my-dialog :is-show="isShowAboutDialog" @on-close="closeDialog('isShowAboutDialog')">
      <p>本报告在调研数据的基础上，采用定性与定量相结合的方式深入分析了专车市场发展的驱动因素与阻碍因素、专车市场背后的产业格局、专车企业的竞争格局、用户对专车市场的依赖程度、专车对其他交通工具运力的补充效应等，通过这五个章节的研究反映专车市场的发展态势和面临的问题。报告力求客观、深入、准确地反映中国专车市场发展情况，为政府、企事业单位和社会各界提供决策依据。 </p>
    </my-dialog>

    <my-dialog :is-show="isShowLogDialog" @on-close="closeDialog('isShowLogDialog')">
      <log-form @has-log="onSuccessLog"></log-form>
    </my-dialog>

    <my-dialog :is-show="isShowRegDialog" @on-close="closeDialog('isShowRegDialog')">
      <reg-form></reg-form>
    </my-dialog>
    -->
  </div>
</template>

<script>
import Dialog from  './base/dialog.vue'
import LogForm from './logForm.vue'
import RegForm from './registerForm.vue'
export  default {
  components:{      // register components
    MyDialog:Dialog,        //  use <myDialog> tag
    LogForm,
    RegForm
  },
  data(){
    return {
      username:'',
      isShowAboutDialog:false,      // ==> About flag
      isShowLogDialog:false,        //  ==> 是否 登录 标志
      isShowRegDialog:false ,        //  ==> 是否 注册 标志
      isBackToTop :   false
    }
  },
  methods:{
    aboutClick(){
      this.isShowAboutDialog = true ;
    },
    logClick(){
      this.isShowLogDialog = true ;
    },
    regClick(){
      this.isShowRegDialog = true ;
    },
    quit(){           // quit 退出登录状态  ===> 改变
      this.username = '' ;
    },

    closeDialog(attr){
      this[attr] = false   ;       // 点击关闭会话，更新
    },
    onSuccessLog(data){
      console.log(data.data.username+'test from layout.vue at line 98 ');
      this.closeDialog('isShowLogDialog');
      this.username = data.data.username ;
    }

  }

}

/* Back-to-top codes  */
$(function () {
  let timer = null;
  let isTop = true;
  let curTop = 0 ;

  $(window).scroll(function () {
    //获取窗口滚动的高度
     curTop =$(window).scrollTop();
     if(curTop>350){
       $('.back-to-top').show() ;
     }else {
       $('.back-to-top').hide() ;
     }
    /*console.log(curTop);*/
    //回到顶部过程中用户滚动滚动条，停止定时器
    if (!isTop) {
      clearInterval(timer);
    };
    isTop = false;
  });

  $('.back-to-top').click(function () {
    //设置定时器
    timer = window.setInterval(function(){
      //获取滚动条距离顶部高度
      curTop = document.documentElement.scrollTop || document.body.scrollTop;
       let iSpeed = Math.floor(-curTop / 7);

      document.documentElement.scrollTop = document.body.scrollTop = curTop+iSpeed;
      //到达顶部，清除定时器
      if (curTop == 0) {
        clearInterval(timer);
      };
      isTop = true;
      /* console.log(8888);*/
    },30);
  })

})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
  /* 初始化 样式 开始 -- - -  - */
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  body {
    background: #f0f2f5;
    font-family: "Helvetica Neue",Helvetica,Arial,"Hiragino Sans GB","Hiragino Sans GB W3","Microsoft YaHei UI","Microsoft YaHei","WenQuanYi Micro Hei",sans-serif;
    font-size: 14px;
    color: #444;
  }
  /*------ 样式初始化 结束  -- - - - - -  */

  /*- -  head style - - -*/
  .app-head{
    background:#363636;  color: white;
    height: 90px;  line-height: 90px;
    width: 100%;
  }

  /* head-inner */
  .app-head-inner{
    width: 1200px;
    /*background: greenyellow;*/
    margin: 0 auto;
  }

  /* head-inner img*/
  .app-head-inner img {
    width: 50px;  margin-top: 20px;
  }

  /* head nav */
  .head-nav{
    float: right;
  }

  /* head-nav ul */
  .head-nav ul{
    overflow: hidden;
  }

  /* head-nav li */
  .head-nav li{
    cursor: pointer;  float: left;
  }

  .nav-pile {
    padding: 0px 10px;
  }
  /* footer */
  .app-foot {
    clear: both;
    margin-top: 30px;
    height: 80px;  width: 100%;  line-height: 80px; text-align: center;
    background: #e3e4e8;
  }
  /* container */
  .container {
    width: 1200px;
    margin: 0 auto;
  }

  .back-to-top{
    width: 50px;  height:25px;  border-radius: 4px;  background: #4fc08d;
    text-align: center; line-height: 25px;
    position: fixed;bottom: 40px;  right: 0px;
    display: none;
  }

  .back-to-top:hover{
    cursor: pointer;
    background: lightgreen;
  }
/* - - - - 全局样式 - -- - - - */

</style>
