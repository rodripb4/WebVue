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
                    v-model="first_name"
                  />
                  <v-text-field
                    label="Apellidos"
                    name="apellidos"
                    prepend-icon="person"
                    type="text"
                    solo
                    :state="null"
                    v-model="last_name"
                  />
                  <v-text-field
                    label="Email"
                    name="direccion"
                    prepend-icon="person"
                    type="text"
                    solo
                    :state="null"
                    v-model="email"
                  />
                  <v-text-field
                    label="Username"
                    name="login"
                    prepend-icon="person"
                    type="text"
                    solo
                    :state="null"
                    v-model="username"
                  />
                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                    solo
                    :state="null"
                    v-model="password"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <button class="btn btn-primary" @click="crearUsuario()"><router-link class="button is-light" to="/">Registrar</router-link></button>
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
      items: ["Administrador", "Cliente"],
      user: null,
      body:null,
      cliente: new Cliente("", "", "", "", "", "", "", ""),
      clientes: new Cliente("", "", "", "", "", "", "", ""),
      username:null,
      password:null,
      email:null,
      first_name:null,
      last_name:null,
    };
  },
  props: {
    source: String
  },
  methods: {
    crearUsuario(){
      console.log(this.username)
      axios.post('http://127.0.0.1:8000/api/users/',{
        username: this.username,
        password: this.password,
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,

      })
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
      this.$router.push("/")


    },
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