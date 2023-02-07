<template>
  <div class="about">
    <h1>This is an about page test</h1>

    <!-- <router-link :to="{ name: 'GuideView'}">User</router-link> -->

          <el-button type="primary" @click="$router.push('/GuidePage')">
            HomePage
          </el-button>

  </div>
</template>
<script lang="ts" setup>

import router from "@/router/index";


function routeDesignation(pathName: string) {
  console.log('%c routeDesignation:', 'color: red', router);
  router.push({
    path: "/" + pathName,
    params: {
    }
  });
}


</script>
