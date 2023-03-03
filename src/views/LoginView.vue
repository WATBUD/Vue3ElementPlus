<template>
  <div class="row vertical" data-width="20rem">
    <el-input v-model="loginForm.username" type="text" placeholder="Username" />
    <el-input v-model="loginForm.password" type="password" placeholder="Password" />
    <el-button type="primary" @click="handleLogin">Login</el-button>
    <el-button @click="removeCookie">Clear</el-button>
  </div>
</template>
<script lang ="ts">
import axios from 'axios';
import { defineComponent } from 'vue';
export default defineComponent({
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        token: ''
      },
      info: {
      }
    }
  },
  mounted() {
    // axios.get('https://www.twse.com.tw/rsrc/lib/table/zh.json?_=1675876122814')
    //   .then(response => (this.info = response))
    //   .catch(function (error) { // 请求失败处理
    //     console.log(error);
    // });
    axios.get('https://localhost:7039/weatherforecast')
      .then((res) => { console.table(res.data) })
      .catch((error) => { 
        console.log('%c error:', 'color: red', error);
        if(error.code=="ERR_NETWORK"){
          //alert("API not responding");
          alert("The backend server is down, please contact the author");

        }
      })
    .finally(() => { /* 不論失敗成功皆會執行 */ })

    
















      
    // axios.get('https://www.twse.com.tw/rsrc/lib/table/zh.json?_=1675876122814', { params: { ID: 123 } })
    //   .then((res) => { console.table(res.data) })
    //   .catch((error) => { console.error(error) })
    //   .finally(() => { /* 不論失敗成功皆會執行 */ })



  },
  methods: {

    handleLogin() {
      this.$cookies.set('login', JSON.stringify({ A: 5 }))
      const keys = this.$cookies.keys() 
      //RPG_GameView
      this.$router.push('/RPG_Game');
      console.log('%c this.$cookies.keys:', 'color: red', keys);

    },
    removeCookie() {
      this.$cookies.remove('login')
      const keys =this.$cookies.keys() 

      console.log('%c this.$cookies.keys:', 'color: red', keys);
    }
  }
})
</script>