<template>
<div class="general">
    <Slider texto="Busquedad"></Slider>
    <div class="center">
  <section id="content">
  <div class="subheader" v-if="articles"> <h1>Articulos encontrados</h1>   </div>     
   <div class="subheader" v-else> <h1>Sin resultados</h1>   </div>     
    <div id="articles" v-if="articles">
               <Articulos :articles="articles"></Articulos>       
                    <!--AÑADIR ARTICULOS VIA JS-->
                </div>
         

 <div v-else>
   <h2>No hay artículos que coincidan con tu busquedad</h2> 
  </div>    

  </section>
    <Sidebar></Sidebar>
    </div>
    <div class="clearfix"></div>
  </div>
</template>

<script>
import Slider from "./Slider";
import Sidebar from "./SidebarArticulos.vue";
import axios from "axios";
import {global} from '../global';
import Articulos from './Articulos';

export default {
  name: "Buscar",
  components:{
   Articulos,
     Slider,
    Sidebar,
 
  },
  mounted() {
    
      var buscarString= this.$route.params.buscarString;
      this.getArticleBySearch(buscarString);
  },
  data() {
   
    return {
       url: global.url,
      articles: []
    };
  },
  methods: {
    getArticleBySearch(buscarString) {
      axios.get(this.url+"buscar/"+buscarString).then(res => {
        if (res.data.status == "success") {
          this.articles = res.data.articulo;
          console.log(this.articles);
        }
      });
    }
  }
};
</script>