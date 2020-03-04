<template>
    <header id="header">
      <div class="center">
                <!-- Menu -->
                  <div id="logo">
                    <img src="../assets/LocalHost.png" class="app-logo" alt="Logotipo"/>
                </div>
                   <nav id="menu" class="col-lg-12" >
                    <ul class="" >
                        <li >
                          <router-link to="/Home">Inicio</router-link>
                        </li>
                        <li>
                          <router-link to="/Inicio" >Articulos</router-link>
                        </li>
                        <li>
                          <!--<li v-show="this.rol=='Administrador'">-->
                           <router-link to="/Cliente">Clientes</router-link>
                        </li>
                        <li> 
                          <!--<li v-show="this.rol=='Administrador'">-->
                          <router-link to="/Factura" >Facturas</router-link>
                        </li>
                        <li> <button v-on:click="cerrarsesion()">Cerrar<i class="far fa-trash-alt"></i></button>
                        </li>          
                     </ul> 
                </nav>
      </div>
       <div class="clearfix"></div>
        </header>
</template>

<script>
 import {
    mdiAccount,
   
  } from '@mdi/js'
import Axios from 'axios';
import Users from '../models/Users'
export default {
    data:()=>({
         icons: {
        mdiAccount

      },
     user: new Users("", "", "", "", "", "", "")
    }),
      mounted(){
     this.verificarRol();
    },
    name:'HeaderComponent',
     methods:{

       verificarRol(){
         Axios.get('http://127.0.0.1:8000/api/users/'),{
         }.then(res =>{
           this.Users= res.data.id;
            console.log(res.data.Users);
         }).catch(err =>{
           console.log(err)
         })
       },
       
         cerrarsesion(){
             localStorage.removeItem('token')
             
            
            setTimeout(() => {
              this.$router.push("/")
            }, 1500)
         }
     }
}
</script>