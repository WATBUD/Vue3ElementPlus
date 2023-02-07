<template>
      <div id="NavArea" style="
                  position: sticky;
                  width: 100%;
                  height: 29px;
                  background: rgb(45, 45, 45);
                  z-index: 9999;
                  ">
        <div id="HomePage" class="NavItemStyle" style="
                  width: 100px;
                  height: 100%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  color: rgb(255, 255, 255);
                  " @click="routeDesignation()"> HomePage
      
        </div>
      </div>
      
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav> -->
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script lang="ts">
import router from "@/router/index";
import "./NavUI.css";
export default {
  name: "App",
  data() {
    return {
      //source:"https://en.wikipedia.org/wiki/Main_Page",
      source: "./interviewer_louis.html",

    };
  },
  // beforeMount() {

  // },
  computed: {

  },
  methods: {
    routeDesignation() {
      console.log('%c routeDesignation:', 'color: red', router);

      router.push({
        path: "/",
        params: {
        }
      });
    }
    ,
  },
};
</script>