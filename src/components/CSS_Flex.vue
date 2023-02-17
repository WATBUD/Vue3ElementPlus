<template>

<div class="container">
  <div class="B B1">B1</div>
  <div class="B B2">B2</div>
  <div class="B B3">B3</div>
</div>
</template>

<style lang="css">
.container {
  display: -webkit-flex;
  display: flex;
  width: 500px;
  height: 150px;
  background-color: #eee;
}

.B {
  width: 100px;
  height: 100px;
}

.B1 {
  background-color: rgba(255, 255, 0, .5);
  -webkit-flex-grow: 1;
  -moz-flex-grow: 1;
  flex-grow: 1;
}

.B2 {
  background-color: rgba(255, 0, 255, .5);
  -webkit-flex-grow: 2;
  -moz-flex-grow: 2;
  flex-grow: 2;
}

.B3 {
  background-color: rgba(0, 255, 255, .5);
  flex-grow: 3;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({

});




</script>
