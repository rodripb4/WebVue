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
import axios from "axios";
import swal from 'sweetalert';
import { required, minLength } from "vuelidate/lib/validators";
export default {
  name: "CrearArticulo",
  components: {
    Sidebar
  },
  data() {
    return {
      file: "",
      submitted: false,
      url: global.url,
      article: {
        nombre: "",
        descripcion:"",
        imagen: null,
        precio:"",
        stock:""
      }
    };
  },
  validations: {
    article: {
      nombre: {
        required,
        minLength: minLength(2)
      },
      descripcion: {
        required
      }
    }
  },
  mounted() {},
  methods: {
    guardarArticulo() {
      this.submitted == true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        swal(
          "Creación fallida",
          "El articulo no se ha creado bien :(",
          "error"
        );
        return false;
      } else {
       console.log(this.article.stock);
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
                       res.data.article.message,
                        "success"
                      );
                      this.article = res.data.articulo;
                      this.$router.push("/Inicio");
                    }
                  })
                  .catch(err => {
                    console.log(err);
                    this.$router.push("/Inicio");
                  });
              } else {
                swal(
                  "Articulo Creado",
                  res.data.message,
                  "succes"
                );
                this.article = res.data.articulo;
                this.$router.push("/Inicio");
              }
              console.log(res.data);
            } else {
              swal(
                "Creación fallida",
                res.data.message,
                "error"
              );
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    fileChange() {
      this.file = this.$refs.file.files[0];
      console.log(this.file);
    }
  }
};
</script>