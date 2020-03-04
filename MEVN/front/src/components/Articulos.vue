<template>
  <div id="articles-list">
    <article class="article-item" v-for="articles in articles" :key="articles._id">
      <div class="image-wrap">
        <img :src="url+'get-imagen/'+articles.imagen" :alt="articles.nombre" v-if="articles.imagen" />
      </div>

   <h2>  <router-link :to="{name:'Articulo', params:{id: articles._id}}">{{articles.nombre}}</router-link> </h2>
   <br>
      
        <h4 style="font-style: italic">{{articles.precio}}€ sin iva</h4>
   

      <div class="clearfix"></div>
    </article>
  </div>
</template>

<script>
import { global } from "../global";

export default {
  name: "Articulos",

  props: ["articles"],
  data() {
    return {
      url: global.url
    };
  }
};
</script>