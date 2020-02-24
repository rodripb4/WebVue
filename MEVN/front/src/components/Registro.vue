<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Registro</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Nombre"
                    name="nombre"
                    prepend-icon="person"
                    type="text"
                    solo
                    :state="null"
                    v-model="clientes.nombre"
                  />
                  <v-text-field
                    label="Apellidos"
                    name="apellidos"
                    prepend-icon="person"
                    type="text"
                    solo
                    :state="null"
                    v-model="clientes.apellido"
                  />
                  <v-text-field
                    label="Direccion"
                    name="direccion"
                    prepend-icon="home"
                    type="text"
                    solo
                    :state="null"
                    v-model="clientes.direccion"
                  />
                  <v-text-field
                    label="Telefono"
                    name="telefono"
                    prepend-icon="person"
                    type="text"
                    solo
                    :state="null"
                    v-model="clientes.telefono"
                  />
                  <v-text-field
                    label="DNI"
                    name="DNI"
                    prepend-icon="person"
                    type="text"
                    solo
                    :state="null"
                    v-model="clientes.dni"
                  />

                  <v-text-field
                    label="Email"
                    name="login"
                    prepend-icon="person"
                    type="text"
                    solo
                    :state="null"
                    v-model="clientes.email"
                  />

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                    solo
                    :state="null"
                    v-model="clientes.password"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <button class="btn btn-primary" @click="registro()"><router-link class="button is-light" to="/">Registrar</router-link></button>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
import axios from "axios";
import { global } from "../global";
import swal from "sweetalert";
import Cliente from "../models/Cliente.js";
export default {
  data() {
    return {
      url: global.url,
      user: null,
       body:null,
      cliente: new Cliente("", "", "", "", "", "", ""),
      clientes: new Cliente("", "", "", "", "", "", "")
    };
  },
  props: {
    source: String
  },
  methods: {
     registro () {
          
        return axios({
          method: 'POST',
          url: this.url+"signup",
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