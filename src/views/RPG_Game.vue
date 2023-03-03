<template>
  <section id="MainScreen">
    <div class="visible-scrollbar" style="position: absolute; background: red;width: 50%;height:50%;z-index: 0;">
      <ul style="display: flex;flex-direction: column-reverse;">
        <li style="color: blue;font-size: 200%;width: 100%;" v-for="(item, index) in CentralManager._LogMessage" :key='index'>
          <!-- index: {{ index }} -->
          log=> {{ item}}
          <!-- healthPoints: {{ item["healthPoints"]  }} -->
        </li>
      </ul>
    </div>
    <canvas id="MiniMap">
    </canvas>
    <div style="position: absolute;display: flex; z-index: 22;bottom: 0px;right: 0px;z-index: 44;">
      <button type="button" style="background: #1eff007a;
                width: 10vw;
                height: 10vh;" v-on:click="CentralManager._BackpackBool = !CentralManager._BackpackBool ">背包</button>
      <button type="button" style="
              background: #000dffe0;
              width: 10vw;
              height: 10vh;" @click="CentralManager._AbilityTableBool = !CentralManager._AbilityTableBool">能力</button>
      <button type="button" style="
                  background: #000dffe0;
                  width: 10vw;
                  height: 10vh;" @click="  CentralManager.viewAllCoordinates()">顯示怪物資訊</button>
      <button type="button" style="
                    background: #000dffe0;
                    width: 10vw;
                    height: 10vh;" @click="removeCookie()">登出遊戲</button>
    </div>
    <div v-if="CentralManager._BackpackBool" class="FillAreaScreen" style="background:#000dffe0;">
      BackpackBool
    </div>
    <div v-if="CentralManager._AbilityTableBool" class="FillAreaScreen" style="background:#1eff007a;">
      AbilityTableBool
    </div>
    
  </section>
  <ArrayPanel v-if="CentralManager._CoordinatesPanal"
                :_ArrayProp="CentralManager._monsterManager.getMonsterMaplist()"
  ></ArrayPanel>
</template>

<script lang ="ts">
import { defineComponent } from 'vue';

import "./RPG_Game.css";
//import { MonsterManager, monsterMaplist, SlimeMonster } from './RPG_Game';
import ArrayPanel from '@/components/ArrayPanel.vue';
import * as RPG_GameModule from './MapAreaMonsterTable.js';
const _CentralManager =new RPG_GameModule.CentralManager()
export default defineComponent({
  components: {
    ArrayPanel
  },
  // props: {
  //   _CentralManager: {
  //     type:Object
  //   }
  // },
  data() {
    return {
      timer: 0,
      CentralManager: _CentralManager,
      //CentralManager: _CentralManager,new RPG_GameModule.CentralManager() 
      list: [
        { id: '123456789', name: '選項 666' },
        { id2131: '234567890', name: '選項 2' },
        { id222: '345678901', name: '選項 3' },
      ],
      loginForm: {
        username: '',
        password: '',
        token: ''
      },
    }
  },
  mounted() {
    this.CentralManager.enterMap("NOVICE_MAP");
    this.timer = setInterval(this.spawnMonster, 1000);
    //var aaa= RPG_GameModule.callEval("SlimeMonster");
    //console.log('%c eval(abyssMap[0].name):', 'color: red', aaa);
  },
  beforeUnmount() {
    clearInterval(this.timer);
  },
  methods: {
    spawnMonster() {
      //console.log('%c spawnMonster:', 'color: red', this.timer);
      //this.monsterMaplist=[];
      //this.monsterMaplist = JSON.parse(JSON.stringify(_CentralManager._monsterManager.getMonsterMaplist()));
      //this.list=[];
      //this.list= this.monsterMaplist;
      //console.log('%c spawnMonster:', 'color: red', this.list);
      //this.list= JSON.parse(JSON.stringify(_CentralManager._monsterManager.getMonsterMaplist()));

      
      this.$forceUpdate();
      //_CentralManager.generateSpecifieMonster("GoblinMonster");



      //this.list.push({ id: this.list.length.toString(), name: '選項' + this.list.length.toString() });
      //console.log('%c spawnMonster:', 'color: red', this.list);

    },
    // viewAllCoordinates(){
    //   console.log('%c viewAllCoordinates:', 'color: red');
    //   this.CentralManager._CoordinatesPanal =! this.CentralManager._CoordinatesPanal;
    //   this.CentralManager.viewAllCoordinates();
    //   //this.$forceUpdate();
    //   // this.list.push({ id: '345678901', name: '選項 3' });
    //   // this.list = this.monsterMaplist;

    // },
    removeCookie() {
      this.$cookies.remove('login')
      const keys = this.$cookies.keys()
      this.$router.push('/EnterPage');
      console.log('%c this.$cookies.keys:', 'color: red', keys);
    }
  }
})



</script>