<template>
  <div class="general">
    <div class="center">
      <section id="content">
        <h1 class="subheader">Crear Articulo</h1>
        <form class="mid-form" v-on:submit.prevent="guardarArticulo()">
          <div class="form-group">
            <label for="title">Nombre</label>
            <input type="text" name="title" v-model="article.nombre" />
          </div>

          <div class="form-group">
            <label for="precio">Precio</label>
            <input type="text" name="title" v-model="article.precio" />
          </div>

         <div class="form-group">
            <label for="stock">Stock</label>
            <input type="text" name="stock" v-model="article.stock" />
          </div>
           <div class="form-group">
    <label for="exampleFormControlSelect1">Categoria</label>
    <select class="form-control" id="exampleFormControlSelect1" v-model="article.categoria" v-on:click.prevent="getCategori()">
     
      <option v-for="item of this.categori" :key="item"  >
        {{item.title}}</option>

    </select>
  </div>
          <div class="form-group">
            <label for="content">Descripcion</label>
            <textarea name="content" v-model="article.descripcion" />
          </div>
          <div class="form-group">
           

            <label for="imagen">Imagen</label>
            <input type="file" id="file" ref="file" name="file0" @change="fileChange()" />
          </div>

          <input type="submit" value="Guardar" class="btn btn-success" />
        </form>
      </section>
      <Sidebar></Sidebar>
    </div>
    <div class="clearfix"></div>
  </div>
</template>

<script>
import Sidebar from "./SidebarArticulos.vue";
import { global } from "../global";
import Articulo from "../models/Articulo";
import axios from "axios";
import swal from 'sweetalert';
export default {
  name: "CrearArticulo",
  components: {
    Sidebar
  },
  data() {
    return {
      file: "",
      url: global.url,
      article: new Articulo("", "", "", "", ""),
       categori:[{

       }]
    };
  },
  mounted() {},
  methods: {
    guardarArticulo() {
      console.log(this.article);
      axios
        .post(this.url + "guardar", this.article)
        .then(res => {
          if (res.data.status == "success") {
            if (
              this.file != null &&
              this.file != undefined &&
              this.file != ""
            ) {
              //subida del archivo, crep un formulario ficticio para poder guardat mi imagen
              const formData = new FormData();
              formData.append("file0", this.file, this.file.name);
              var articleId = res.data.article._id;
              axios
                .post(this.url + "upload-imagen/" + articleId, formData)
                .then(res => {
                  if (res.data.article) {
                    swal(
                      "Articulo Creado",
                      "el articulo se ha creado correctamente :)",
                      "success"
                    );
                    this.article = res.data.article;
                    this.$router.push("/Blog");
                  }
                })
                .catch(err => {
                  console.log(err);
                });
            } else {
            swal(
                      "Articulo Creado",
                      "el articulo se ha creado correctamente :)",
                      "succes"
                    );
              this.article = res.data.article;
              this.$router.push("/Blog");
            }
            console.log(res.data);
          }else{
            swal(
                      "Creación fallida",
                      "El articulo no se ha creado bien :(",
                      "error"
                    );

            
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    fileChange() {
      this.file = this.$refs.file.files[0];
      console.log(this.file);
    },
  }
 
};
</script>