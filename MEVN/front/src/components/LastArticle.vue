<template>
<div class="general">
    <Slider></Slider>
    <div class="center">
  <section id="content">
    <br>
    <br>
    <h2 class="subheader">Últimos artículos</h2>

    <!--Listado articulos-->
    <div id="articles">
      <Articulos v-bind:articles="articles"></Articulos>
    </div>
  </section>
      <Sidebar></Sidebar>
    </div>
    <div class="clearfix"></div>
  </div>
</template>

<script>
import axios from 'axios';
import Slider from "./Slider";
import Sidebar from "./SidebarArticulos.vue";
import {global} from "../global";
import Articulos from './Articulos';
export default {
  name: "LastArticle",
  components:{
        Slider,
    Sidebar ,
    Articulos
  },
  mounted(){
    this.getLastArticle();
  },
    data() {
   
    return {
       url: global.url,
      articles: []
    };
  },
  methods: {
    getLastArticle() {
        
      axios.get(this.url+"articulos/true").then(res => {
        if (res.data.status == "success") {
          this.articles = res.data.articulos;
          console.log(this.articles);
        }
      });
    }
  }
};
</script>