<template>
  <section id="ArrayPanel">
    <div class="visible-scrollbar" style="position: absolute;
      background: #0000ff8a;
      width: 100%;
      height: 100%;
      color: yellow;
      z-index: 0;
      font-size: 5px;word-break: keep-all; ">


       <div v-for="(item, index) in _ArrayProp" :key='item'>
       {{ index }} :{{ item }} 
        <!-- index:{{ index }}  -->
      </div>
       </div>
      <!-- <ul style="display: flex;flex-direction: column-reverse;">
        <li style="color: yellow;font-size: 200%;width: 10%;" 
        v-for="(item, index) in _ArrayProp" :key='index'>
          name: {{ item}},
        </li>
      </ul> -->

  </section>
</template>

<script lang ="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    _ArrayProp: {
     type: Object,
      default: () => ({})
    }
  },
  // setup(props) {
  //   const arrayLength = computed(() => props._ArrayProp.length)
  //   return {
  //     arrayLength
  //   }
  // },
  data() {
    return {
      list: [
        { id: '123456789', name: '選項 1' },
        { id: '234567890', name: '選項 2' },
        { id: '345678901', name: '選項 3' },
      ],
    }
  },
  computed: {
    keys() {
      //console.log('%c computed:', 'color: red', this.$props._ArrayProp );
      console.log('%c Childcomputed:', 'color: red', Object.keys(this._ArrayProp));

      return Object.keys(this._ArrayProp);
      //return this._ArrayProp

    }
  },
  methods: {
    // viewAllCoordinates(Array){
    //   console.log('%c viewAllCoordinates:', 'color: red');
    //    this.showArray= Array;
    // },
  },
  mounted() {
    console.log('%c Child_mounted:', 'color: red',this._ArrayProp);

  },
})



</script>