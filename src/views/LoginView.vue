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
    //window.addEventListener('beforeunload', this.alertLogin);
    // axios.get('https://www.twse.com.tw/rsrc/lib/table/zh.json?_=1675876122814', { params: { ID: 123 } })
    //   .then((res) => { console.table(res.data) })
    //   .catch((error) => { console.error(error) })
    //   .finally(() => { /* 不論失敗成功皆會執行 */ })
  },
  methods: {

    handleLogin() {
      axios.get('http://watbud.ddns.net:7777/WeatherForecast')
        .then((res) => { 
          console.table(res.data) 
          console.log(
            '%c Announcement, getFormattedData',
            'color:#BB3D00;font-family:system-ui;font-size:2rem;font-weight:bold',
            'res.data',
            res.data,
          );
        
        
        })
        .catch((error) => {
          console.log('%c error:', 'color: red', error);
          if (error.code == "ERR_NETWORK") {
            //alert("API not responding");
            //alert("The backend server is down, please contact the author");
            if (window.confirm('The backend server is down, please contact the author')) {
              this.alertLogin();
            } else {
              // 使用者點擊了“取消”按鈕
            }
          }
        })
        .finally(() => { /* 不論失敗成功皆會執行 */ })

    },
    alertLogin(){
      console.log('%c alertLogin', 'color: red');
      this.$cookies.set('login', JSON.stringify({ A: 5 }))
      const keys = this.$cookies.keys()
      //RPG_GameView
      this.$router.push('/RPG_Game');
    },
    removeCookie() {
      this.$cookies.remove('login')
      const keys =this.$cookies.keys() 

      console.log('%c this.$cookies.keys:', 'color: red', keys);
    }
  }
})
</script>