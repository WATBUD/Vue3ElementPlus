<template>
  
  <el-row class="myclass">
    <el-col>
      <h5 class="mb-2">CatchAllRouter</h5>
     
    </el-col>
  </el-row>
</template>



<script lang="ts" setup>

import router from "@/router/index";

const NavigatorFour = 'Navigator 4'

function routeDesignation(pathName:string) {
  console.log('%c routeDesignation:', 'color: red', router);
  router.push({
    path: "/" + pathName,
    params: {
    }
  });
}

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

</script>
