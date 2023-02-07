<template>
  <!-- <CascaderUI msg="Welcome to Your Vue.js + TypeScript App" /> -->
  <!-- <div class="home">
      <img alt="Vue logo" src="../assets/logo.png">
  </div> -->
  <el-row :gutter="20">
    <el-col :span="4">
      <el-scrollbar style="background: white;width: 100%;height: 100%;">
        <MenuUI />
      </el-scrollbar>
    </el-col>
    <el-col :span="20">
      <el-scrollbar style="background: white;width: 100%;height: 100%;">

      <router-view/>
      </el-scrollbar>
    </el-col>
  </el-row>


</template>

<script lang="ts">
//import CascaderUI from '@/components/CascaderUI.vue'; // @ is an alias to /src
import MenuUI from '@/components/MenuUI.vue';

import { defineComponent } from 'vue';

export default defineComponent({
  //name: 'HomeViewTS',
  components: {
    MenuUI,
  },
});
</script>
