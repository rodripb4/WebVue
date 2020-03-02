<template>
  <div class="general">
    <div class="center">
      <section id="content">
          
        <h1 class="subheader">Crear Cliente</h1>
        <form class="mid-form" v-on:submit.prevent="save()">
          <div class="form-group">
            <label for="title">Nombre</label>
            <input type="text" name="title" v-model="clientes.nombre" />
          </div>

          <div class="form-group">
            <label for="precio">Apellido</label>
            <input type="text" name="title" v-model="clientes.apellido" />
          </div>

         <div class="form-group">
            <label for="stock">Dirección</label>
            <input type="text" name="stock" v-model="clientes.direccion" />
          </div>
          <div class="form-group">
            <label for="content">Telefono</label>
            <input type="text" name="stock" v-model="clientes.telefono" />
          </div>
            <div class="form-group">
            <label for="content">Email</label>
            <input type="text" name="stock" v-model="clientes.email" />
          </div>
           <div class="form-group">
            <label for="content">DNI</label>
            <input type="text" name="stock" v-model="clientes.dni" />
          </div>
           
          <div class="form-group">
            <label for="content">Roles</label>
            <select v-model="clientes.rol" class="form-control" id="exampleFormControlSelect1">
              <option>Administrador</option>
              <option>Cliente</option>
            </select>
          </div>
           <div class="form-group">
            <label for="content">Password</label>
             <input type="text" name="stock" v-model="clientes.password" />
          </div>
       
          <input type="submit" value="Guardar" class="btn btn-success" />
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
import swal from 'sweetalert';
export default {
  name: "CrearCliente",
  data() {
    return {
      file: "",
      url: global.url,
      clientes: new Cliente("", "", "", "", "", "", "",""),
    };
  },
  mounted() {},
  methods: {
     save () {
          
        return axios({
          method: 'POST',
          url: this.url+"cliente/guardar",
         data:this.clientes
          
        })
          .then(response => response.data )
          .then(data => {
            
            console.log(data)
         if(data.status!="error"){
 localStorage.setItem('token',data.token)
   swal(
              "Cliente Creado",
              "el Cliente se ha creado correctamente :)",
              "success"
            );
            setTimeout(() => {
              this.$router.push("/LastArticle")
            }, 1500)
         }else{
            swal(
              "Direccion Existente",
              "Esa direccion ya existe prueba con otra ",
              "error"
            );
         }
 
           
          
          }).catch(err=>{
            console.log(err+"Ese usuario no existe")
    
          })
      },
  }
};
</script>