<template>
  <div>
    <this-dialog :is-show="isShowCheckDialog" @on-close="CloseCheckOrder">
      请检查你的支付状态！
      <div class="button" @click="SuccessPay">
        支付成功
      </div>
      <div class="button" @click="FailPay">
        支付失败
      </div>
    </this-dialog>

     <!-- when fail to pay -->
    <this-dialog class="auto-close" :is-show="isShowFailDialog" @on-close="closeAutoDialog">
      <p>购买失败 ！</p>
      <auto-close-dialog @auto-close="closeFailDialog"></auto-close-dialog>
    </this-dialog>

    <!-- when success to pay  -->
    <this-dialog class="auto-close"
                 :is-show="isShowSuccessDialog"
                 @on-close="closeAutoDialog">
      <p>购买成功 ！</p>
      <auto-close-dialog @auto-close="closeSuccessDialog"
                         :payStatus="payStatus"
                         :goToOrder="goToOrder">
      </auto-close-dialog>
    </this-dialog>
  </div>
</template>

<script>
  import Dialog from './base/dialog'
  import AutoCloseDialog from  './base/AutoCloseDialog.vue'

  export default {
    components: {
      thisDialog: Dialog,
      AutoCloseDialog ,
    },
    props: {
      isShowCheckDialog: {
        type: Boolean,
        default: false
      },

    },
    data(){
      return {
        isShowSuccessDialog:false ,
        isShowFailDialog :false,
        payStatus: {
          type:Boolean,
          default:false
        },
        goToOrder:{
          type:Boolean ,
          default:false
        },
      }
    },
    methods:{
      /* to check-out the pay-status */
      CloseCheckOrder(){
        this.$emit('close-check-dialog')
      },

      /* if fail to pay,show the Fail-dialog page && close check-order page */
      FailPay(){
        this.$emit('close-check-dialog');
        this.isShowFailDialog = true ;
        this.payStatus = false ;
      },

      /* if Success to Pay, show the success page && close check-order page */
      SuccessPay(){
        this.$emit('close-check-dialog');
        this.isShowSuccessDialog = true ;
        this.payStatus = true ;
        this.goToOrder = true ;
      },

      /* when the Fail-dialog is showing , it will be auto-close after 5 seconds */
      closeFailDialog(){
        this.isShowFailDialog = false ;
        /*console.log('closeFailDialog is running');*/
      },

      /* when the success-dialog is showing , it will be auto-close after 5s */
      closeSuccessDialog(){
        this.isShowSuccessDialog = false ;
      },

      /* when click the 'close' button , the dialog will be close */
      closeAutoDialog(){
        this.isShowFailDialog = false ;
        this.isShowSuccessDialog = false ;

        this.goToOrder =false ;
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .button{
    background: #4fc08d;
    display: inline-block;
    padding: 10px 20px;
    cursor: pointer;
  }

  .auto-close p{
    color: red;
  }
</style>
