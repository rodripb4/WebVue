<template>
    <div class="center">
      <section id="content">
        <article class="article-item" v-if="article">
          <div class="imgA">
            <img 
            :src="url+'get-imagen/'+article.imagen" :alt="article.nombre" v-if="article.imagen" class="imgstyle"
            />
          </div>
          <h1 class="subheader">{{article.nombre}}</h1>
          <p>{{article.descripcion}}</p>
          <div class="clearfix"></div>
          <router-link :to="'/editararticulo/'+article._id" class="btn btn-warning">Editar</router-link>
                <a @click="deleteArticle(article._id)" class="btn btn-danger">Eliminar</a>
         <p class="display-4" style="text-align:right">{{article.precio}}€</p>
        </article>
      </section>
       <div class="clearfix"></div>
    </div>
</template>

<script>
import {global} from '../global';
import axios from "axios";
import swal from "sweetalert";
export default {
    name: 'Articulo',
    
    data(){
        return {
            url: global.url,
            article:null
        }
    }, mounted(){
      var  articleId=this.$route.params.id;
      this.getArticle(articleId);
    },
    methods:{
        getArticle(articleId){
            axios.get(this.url+'articulo/'+articleId).then(res=>{
                    if(res.data.status=='success'){
                        this.article= res.data.articulo; 
                    }
            });
        },

        
        deleteArticle(articleId){
         axios.delete(this.url+'articulo/'+articleId).then(res=>{
           console.log(res);
               swal('Articulo Eliminado','El articulo se ha borrado correctamente','success' );
          this.$router.push('/Inicio');
         });
        }
    }

}
</script>