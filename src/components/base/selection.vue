
<template>
  <div class="selection-component">

    <div class="selection-show" @click="toggleDrop">
      <span >{{ selections[nowIndex].label }}</span>
      <div class="arrow" ></div>
    </div>

    <div class="selection-list" v-if="isDrop">
      <ul>
        <li v-for="(item , index) in selections" @click="chooseSelection(index)">
          {{ item.label }}
        </li>
      </ul>
    </div>

  </div>
</template>

<!--  Script codes -->

<script>

    export default {
      props:{
        selections:{
          type:Array,
          default:[{
            label:'test',
            value:0
          }]
        }
      },
      data() {
            return {
              isDrop:false,
              nowIndex:0
            }
        },
      methods:{
        toggleDrop(){
          this.isDrop = !this.isDrop ;    // toggle the selection-option Show-flag
        },
        chooseSelection(index){
          this.nowIndex = index ;       // ==> Update nowIndex to the index of user's choice
          this.isDrop = false ;        // ==> When Update option finish, hide the selection-options
          this.$emit('on-change',this.selections[this.nowIndex])
        }
      }
    }

</script>


<!-- Css codes -->
<style scoped>
  .selection-component {
    position: relative;
    display: inline-block;
  }

  .selection-show {
    position: relative;
    background: #fff;
    border: 1px solid #e3e3e3;border-radius: 3px;
    padding: 0 20px 0 10px;
    display: inline-block;
    height: 25px;line-height: 25px;
    cursor: pointer;
  }

  .selection-show:hover{
    border: 1px solid #4fc08d;
  }

  .selection-show .arrow{
    display: inline-block;
    /* 绘制 下三角 */
    width: 0px;  height: 0px;
    border-right:4px solid transparent;
    border-left:4px solid transparent;
    border-top: 5px solid gray;

    margin-left: 6px;
    margin-top: -1px;
    margin-right: -14px;
    vertical-align: middle;
  }

  /* selection-list */
  .selection-list{
    display: inline-block;
    position: absolute;  left: 0;  top: 25px;z-index: 5;
    width: 100%;
    background: #fff;
    border-top: 1px solid #e3e3e3;  border-bottom: 1px solid #e3e3e3;
  }
  /* selection options */
  .selection-list li{
    padding: 5px 15px 5px 10px;
    border-left: 1px solid #e3e3e3;
    border-right: 1px solid #e3e3e3;
    background: #fff;
    white-space: nowrap;  overflow: hidden;  text-overflow: ellipsis;
    cursor: pointer;
  }

  .selection-list li:hover{
    background: #e3e3e3;
    border: 1px solid #4fc08d;
  }
</style>
