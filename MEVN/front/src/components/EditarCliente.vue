<template>
  <div class="general">
    <div class="center">
      <section id="content">
        <h1 class="subheader">Edita Cliente</h1>
        <form class="mid-form" v-on:submit.prevent="save()">
          <div class="form-group">
            <label for="title">Nombre</label>
            <input type="text" name="title" v-model="cliente.nombre" />
          </div>

          <div class="form-group">
            <label for="precio">Apellidos</label>
            <input type="text" name="title" v-model="cliente.apellido" />
          </div>
          <div class="form-group">
            <label for="stock">Direccion</label>
            <input type="text" name="stock" v-model="cliente.direccion" />
          </div>
     <div class="form-group">
            <label for="stock">Telefono</label>
            <input type="text" name="stock" v-model="cliente.telefono" />
          </div>
           <div class="form-group">
            <label for="stock">DNI</label>
            <input type="text" name="stock" v-model="cliente.dni" />
          </div>
      <div>
      <div>
      <button @click="save()" class="btn btn-success">Guardar</button>
      </div>
      </div>
        </form>
      </section>
    </div>
    <div class="clearfix"></div>
  </div>
</template>

<script>
import { global } from "../global";
import Cliente from "../models/Cliente";
import axios from "axios";
import swal from "sweetalert";
export default {
  name: "EditarCliente",
  data() {
    return {
      file: "",
      url: global.url,
      cliente: new Cliente("", "", "", "", "", "", "", ""),
      clientes: new Cliente("", "", "", "", "", "", "", ""),
    
      isEdit: true
    };
  },
  mounted() {
    this.clienteId = this.$route.params.id;
    console.log(this.clienteId);
    this.getclientes(this.clienteId);
  },
  methods: {
   save() {
      var clienteId = this.$route.params.id;
   
      axios
        .put(this.url + "editarcliente/" + clienteId, this.cliente)
        .then(res => {
          if (res.data.status == "success") {
             swal(
              "Edición finalizada",
              "El articulo se ha editado correctamente :)",
              "success"
            );
           this.$router.push("/Cliente");
          } else {
            swal(
              "Edición fallida",
              "El articulo no se ha editado bien :(",
              "error"
            );
          }
        })
        .catch(error => {
          console.log(error+"22");
             
        });
    },
    fileChange() {
      this.file = this.$refs.file.files[0];
      console.log(this.file);
    },
   getclientes(clienteId){
    axios.get(this.url+"cliente/"+clienteId).then(res => {
        if (res.data.status == "success") {
          this.cliente = res.data.cliente;
          console.log(this.cliente);
        }
      });
    },

     deleteCliente(clienteId) {
      axios.delete(this.url + "clientes-delete/" + clienteId).then(res => {
        console.log(res);
        swal(
          "Cliente Eliminado",
          "El Cliente se ha borrado correctamente",
          "success"
        );
        this.$router.push("/Cliente");
      });
    }
  }
};
</script>