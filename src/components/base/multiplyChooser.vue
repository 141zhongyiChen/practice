
<template>
  <div class="chooser-component">
    <ul class="chooser-list">
      <li v-for="(item,index) in selections"
          @click="toggleSelection(index)"
          :title="item.label"
          :class="{active: checkActive(index)}"
          >
        {{ item.label }}
      </li>
    </ul>
  </div>
</template>


<script>
  /* Lodash is a javascript module  */
  import _ from 'lodash'
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
        nowIndexes:[0]
      }
    },
    methods:{
      /* mark the index : if not,do push ; if true,remove this index from origin-Array */
      toggleSelection(index){
        if(this.nowIndexes.indexOf(index) === -1 ){
          this.nowIndexes.push(index) ;
        }else {
          this.nowIndexes = _.remove(this.nowIndexes,(idx)=>{ // this idx meant the per value of Array nowIndexes
            return idx !== index ;    // Update the nowIndexes array
          });
        }

        /* to record the multiply-chooser's value like  '{ label:'客户版',value:'0'} '  */
        let nowObjArray = _.map(this.nowIndexes,(idx)=>{
          return this.selections[idx] ;
        });
        this.$emit('on-change',nowObjArray) ;
      },

      /* To checkout, if exist,return true;   */
      checkActive(index){
        return this.nowIndexes.indexOf(index) !== -1 ;
      }
    }
  }
</script>

<style scoped>
  .chooser-component{
    position: relative;
    display: inline-block;
  }

  .chooser-list li{
    display:inline-block;
    border: 1px solid #e3e3e3;border-radius: 3px;
    padding: 0 8px; margin-right: 5px;
    height: 25px;line-height: 25px;
    text-align: center;
    cursor: pointer;
  }

  .chooser-list li:hover{
    border: 1px solid #4fc08d;
    border-radius: 3px;
  }

  .chooser-list li.active{
    border-color: #4fc08d;
    background: #4fc08d;
    color: #fff;
  }
</style>
