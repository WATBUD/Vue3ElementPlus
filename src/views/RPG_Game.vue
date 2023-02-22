<template>
    <section id="MainScreen">
      <div class="visible-scrollbar" style="position: absolute; background: red;width: 50%;height:50%;z-index: 0;">
      <ul>
      <li style="color: blue;font-size: 48px;" v-for="(item, index) in monsterlist" :key='index'>
        index: {{index}}, 
        name: {{ item.name }} 
      </li>
    </ul>
      </div>
      <div style="position: absolute;display: flex; z-index: 22;bottom: 0px;right: 0px;z-index: 44;">
      <button type="button" style="
              background: #1eff007a;
              width: 10vw;
              height: 10vh;" v-on:click="BackpackBool = !BackpackBool">背包</button>
          <button type="button" style="
            background: #000dffe0;
            width: 10vw;
            height: 10vh;" @click=" AbilityTableBool = !AbilityTableBool">能力</button>
        </div>
      

      <div v-if="BackpackBool" class="FillAreaScreen" style="background:#000dffe0;">
              BackpackBool
      </div>
      <div v-if="AbilityTableBool" class="FillAreaScreen" style="background:#1eff007a;">
                  AbilityTableBool
      </div>
    </section>
</template>
<script lang ="ts">
import { defineComponent } from 'vue';
import "./RPG_Game.css";
//import { DefaultMonster } from '<file>';

export class DefaultMonster {
  id:number;
  name: number;
  constructor(index:any=0) {
    this.id = index;
    this.name = 7;
  }
}


//var timer= null;
export default defineComponent({
  data() {
    return {
      timer: 0,
      monsterlist: [
        new DefaultMonster() ,
      ],
      list: [ 
        { id: '123456789', name: '選項 1' },
        { id: '234567890', name: '選項 2' },
        { id: '345678901', name: '選項 3' },
      ],
      BackpackBool: false,
      AbilityTableBool: false,
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
    this.timer = setInterval(this.spawnMonster, 1000);

  },
  beforeUnmount() {
    clearInterval(this.timer);
  },
  methods: {
    spawnMonster() {
      console.log('%c this.timer:', 'color: red', this.timer);
      this.monsterlist.push(new DefaultMonster(this.monsterlist.length) );
      this.list.push({ id: this.list.length.toString(), name: '選項'+ this.list.length.toString() });
      console.log('%c spawnMonster:', 'color: red', this.list);

    },
    handleLogin() {
      this.$cookies.set('login', JSON.stringify({ A: 5 }))
      const keys = this.$cookies.keys()
      console.log('%c this.$cookies.keys:', 'color: red', keys);

    },
    removeCookie() {
      this.$cookies.remove('login')
      const keys = this.$cookies.keys()

      console.log('%c this.$cookies.keys:', 'color: red', keys);
    }
  }
})



</script>