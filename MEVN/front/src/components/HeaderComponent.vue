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
                           <router-link to="/Cliente">Clientes</router-link>
                        </li>
                        <li>  
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
export default {
    data:()=>({
         icons: {
        mdiAccount
      }
    }),
    name:'HeaderComponent',
     methods:{
         cerrarsesion(){
             localStorage.removeItem('token')
             
            
            setTimeout(() => {
              this.$router.push("/")
            }, 1500)
         }
     }
}
</script>