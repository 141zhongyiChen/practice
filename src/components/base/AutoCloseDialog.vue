<template>
    <span :class="colors[nowIndex].color" v-if="!payStatus">{{ this.iTimeLeft }}秒后 将自动关闭 ! </span>
    <span :class="colors[nowIndex].color" v-else="payStatus">{{ this.iTimeLeft }}秒后 将自动跳转 至 订单页面 ! </span>
</template>
<script>
    export default {
      props:{
        payStatus: {
          type:Boolean,
          default:false
        },
        goToOrder:{
          type:Boolean,
          default:false
        },
      },

      data() {
        return {
          iTimeLeft: 5 ,
          nowIndex:0,
          colors:[
                {
                    idx:1 ,
                    color:'red'
                },
                {
                    idx:2 ,
                    color:'purple'
                },
                {
                    idx:3 ,
                    color:'yellow'
                },
                {
                    idx:4 ,
                    color:'skyBlue'
                },
                {
                    idx:5 ,
                    color:'lightPink'
                },
                {
                    idx:6 ,
                    color:'grey'
                },
            ]
        }
      },

      methods:{
        autoClose(){
           let _this =this ;     // save the pointer
           window.setTimeout(function () {
             let inv=window.setInterval(function () {
               if(_this.iTimeLeft <= 1){
                 window.clearInterval(inv) ;
                 _this.$emit('auto-close') ;
                 // When goToOrder is true, try to redirect the path
                 if(_this.goToOrder == true ) {
                   _this.$router.push({ path:'/orderList' }) ;
                 }

                 return ;
               }
               _this.iTimeLeft-- ;
               _this.nowIndex-- ;
               /*console.log('AutoCloseDialog is running');
               console.log(_this.iTimeLeft);
               console.log(_this.nowIndex);*/
             },1000);
           },500)
        }
      },
      mounted(){
        this.autoClose() ;
        this.nowIndex = this.colors.length-1 ;
        /*console.log('支付状态：'+this.payStatus);
        console.log('是否跳转：'+this.goToOrder);*/
      }
    }
</script>

<style scoped>
  span{
    position: absolute;  top: 0; left: 25px;
    font-weight: bold;
  }
  .red{
    color:red ;
  }
  .purple{
    color: purple;
  }
  .skyBlue{
    color: skyblue;
  }
  .lightPink{
    color: lightpink;
  }
  .yellow{
    color: #4fc08d;
  }
  .grey{
    color: gray;
  }
</style>
