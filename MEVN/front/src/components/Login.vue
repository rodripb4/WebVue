<template>
    <v-app id="inspire">
    <v-content>
      
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer />
            
              
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    id="text"
                    label="Usuario"
                    name="login"
                    prepend-icon="person"
                    type="text"
                    solo
                    v-model="username"
                  />

                  <v-text-field
                    id="password"
                    label="Contraseña"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                    solo
                     v-model="password"
                  />
                </v-form>
                 <button class="btn btn-primary" @click="login()">Entrar</button>
              </v-card-text>
              <v-card-actions>
               
                <v-spacer />
                   
                <router-link class="button is-light" to="/registro">Registrame</router-link>
              </v-card-actions>
            </v-card>
              
          </v-col>
        </v-row>
      </v-container>

    </v-content>
  </v-app>

  
</template>
<script >

import axios from "axios";
import { global } from "../global";
import swal from "sweetalert";
 


  export default {
     data () {
    return {
      searchString: null,
      url: global.url,
      user: null,
      email:"",
      pass:"",
      rol:"",
      body:null,
      username:"",
      password:"",
      token: localStorage.getItem('user-token') || null,
    }
  },  
    props: {
      source: String,
    },
   
    methods:{

      login(){
        axios.post('http://127.0.0.1:8000/auth/',{
          username: this.username,
          password: this.password,
        })
        .then(res => {
          this.token = res.data.token;
          console.log(this.token)
          localStorage.setItem('user-token', res.data.token)
          this.$router.push("/Inicio")
        })
        .catch(err =>{
          localStorage.removeItem('user-token')
          console.log(err)
        })

      },

         onSubmit () {
           this.body={email:this.email, password:this.pass, rol:this.rol }
        return axios({
          method: 'POST',
          url: this.url+"signin/",
          data:this.body
          
        })
          .then(response => response.data)
          .then(data => {
            
            console.log(data)       
            localStorage.setItem('token',data.token)
            setTimeout(() => {
              this.$router.push("/Inicio")
              console.log(this.$router.name)
            }, 1500)

          
          }).catch(err=>{
            console.log(err+"Ese usuario no existe")
            swal({
  title: "Usuario Invalido",
  text: "Si no dispone de una cuenta de usuario registrese",
  icon: "warning",
 
  dangerMode: true,
})

          })
      },
    
    }
  }
   
</script>