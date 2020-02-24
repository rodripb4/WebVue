<template>


<div class="general">
   <template>


</template>
 

<slider></slider>


    <div class="center">
  <section id="content">
    <h1 class="subheader">Articulos</h1>
    
    <div id="articles" v-if="articles">
               <Articulos :articles="articles"></Articulos>       
                    <!--AÑADIR ARTICULOS VIA JS-->
                </div>
                
  </section>
    <Sidebar></Sidebar>
    </div>
    <div class="clearfix">
      
    </div>
  </div>
</template>

<script>
import Slider from "./Slider";
import Sidebar from "./SidebarArticulos.vue";
import axios from "axios";
import {global} from '../global';
import Articulos from './Articulos';
export default {
   
  name: "Inicio",
  components:{
   Articulos,
     Slider,
    Sidebar,
 
  },
  mounted() {
 
    this.obtenerArticulos();
  },
  data() {
   
    return {
       url: global.url,
      articles: [],
     
    };
  },
  methods: {
    obtenerArticulos() {
      axios.get(this.url+"articulos/").then(res => {
        if (res.data.status == "success") {
          this.articles = res.data.articulos;
          console.log(this.articles);
        }
      });
    }, 
  }
};
</script>