<template>
new Vue -> init -> $mount -> render -> vnode -> dom(el:#app) -> update(patch) -> re-render
  <div></div>
</template>



<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
el: '#app',
data: function () {
    return {
      //source:"https://en.wikipedia.org/wiki/Main_Page",
      message : 'get Data!',

    };
},
beforeUpdate: function () {//對 vm._render() 生成的virtual dom進行 watch
  console.log('%c beforeUpdate:', 'color: red')
  console.log("el屬性： " + this.$el)
  console.log("data資料： " + this.message)
},
beforeCreate: function () {
    console.log('%c beforeCreate:', 'color: red')
    console.log("el屬性： " + this.$el)
    console.log("data資料： " + this.message)
},
created: function() { //step1 get data
  console.log('%c created:', 'color: red')
  console.log("el屬性： " + this.$el)
  console.log("data資料： " + this.message)
},
beforeMount: function () { //vm._render 生成了virtual dom
    console.log('%c beforeMount:', 'color: red')
    console.log("el屬性： " + this.$el)
    console.log("data資料： " + this.message)

},
mounted: function () { //mount 後是 update mounted: vm._isMounted 設置為true Get Render Global Variables 
    console.log('%c mounted:', 'color: red')
    console.log("el屬性： " + this.$el)
    console.log("data資料： " + this.message)

},
methods: {
  handleOnClick: function() {
    console.log(this.message)
  }
},
})

</script>
