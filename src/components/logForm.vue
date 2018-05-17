<template>
  <div class="login-form">
    <div class="g-form">
      <!-- username input -->
      <div class="g-form-line">
        <span class="g-form-label">UserName</span>
        <div class="g-form-input">
          <input type="text" v-model="usernameModel" placeholder="请输入用户名">
        </div>
        <span class="g-form-error">{{ userErrors.errorText }}</span>
      </div>
      <!-- password input -->
      <div class="g-form-line">
        <span class="g-form-label">PassWord</span>
        <div class="g-form-input">
          <input type="password" v-model="passwordModel" placeholder="请输入密码">
        </div>
        <span class="g-form-error">{{ passwordErrors.errorText }}</span>
      </div>
      <!-- button click -->
      <div class="g-form-line">
        <div class="g-form-btn">
          <a class="button" @click="onLogin">登录</a>
        </div>
        <span class="g-form-error">{{ errorText }}</span>
      </div>
    </div>
  </div>
</template>


<!-- JS code  -->
<script>
export default {
  data(){
    return {
      usernameModel: '',
      passwordModel: '',
      errorText: ''
    }
  },
  computed:{
    userErrors(){
      let errorText,status ;
      if(!/@/g.test(this.usernameModel)){
        status = false ;
        errorText = '邮箱地址不合法' ;
      }else {
        status = true ;
        errorText = '';
      }
      if(!this.usernameFlag){      // ===> when nothing input , will not should error warning
        errorText = '' ;
        this.usernameFlag = true ;
      }

      return {
        status,
        errorText
      }
    },
    passwordErrors(){
      let errorText , status ;
      if(!/^\w{6}$/.test(this.passwordModel)){
        status = false ;
        errorText = 'the lengthen of password must be at least six'
      }else {
        status = true ;
        errorText = '';
      }
      if(!this.passwordFlag){      // ===> when nothing input , will not should error warning
        errorText = '' ;
        this.passwordFlag = true ;
      }
      return{
        status,
        errorText
      }
    }
  },
  methods:{
    onLogin(){
      if(!this.userErrors.status || !this.passwordErrors.status){
        this.errorText = this.userErrors.errorText || this.passwordErrors.errorText ;
        /* alert(this.errorText) ;*/
      }else {
        this.errorText = '' ;
        /* 接下来 进行 请求 [ 具体设置详情 看 webpack.dev.conf.jd 中 add-myself  notes ] */
        this.$http.get('jsonServer/login')
          .then((res) => {
            this.$emit('has-log', res.data) ;     // 触发 父组件 has-log 事件 ；
            console.log(res.data);
            console.log('触发了 emit 事件 in logForm.vue at line 91');
          }, (error) => {
            console.log(error)
          })
      }
    }
  }
}
</script>

<!-- CSS  inward style -->
<style scoped>
  .g-form {

  }

/* About the Login information style*/
  .g-form-line{
    padding: 15px 0px;
    /*border: 2px dashed greenyellow;*/
  }
  .g-form-label{
    width: 100px;
    font-size: 16px;
    display: inline-block;
  }
  .g-form-input{
    display: inline-block;
  }
  .g-form-input input{
    height: 30px;  width: 200px;  line-height: 30px;
    padding: 0 10px;  border: 1px solid #ccc;
    vertical-align: middle;
  }
/* About the Login button style */
  .g-form-btn{
    padding-left:160px;
  }
  .button{
    display: inline-block;
    background: #4fc08d;  color: #fff;
    padding: 10px 20px;
    cursor: pointer;
  }
  .button:hover {
    background: #19aaeb;
  }

/* Error warning */
   .g-form-error{
     color: red;
     padding-left: 15px;
   }
</style>
