<template>
  <div id="app" >
    <div v-if="route!='Login' && route!='Registro'" >

   <HeaderComponent></HeaderComponent>
    </div>
   <div class="clearfix" v-if="route!='Login' && route!='Registro'">
   </div>
    <div class="modal-body">

   </div>
    <div class="center">
      
      <router-view></router-view>
      
    </div>
    <div class="clearfix"></div>
    <FooterComponent></FooterComponent>
  </div>
</template>

<script>
import HeaderComponent from "./components/HeaderComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";
export default {
  name: "app",
  components: {
    HeaderComponent,
    FooterComponent
  },
  computed: {
  route: function  currentRouteName() {
    console.log(this.$route.name)
        return this.$route.name;
    }
  },  mounted() {
this.verificartoken()
  },methods:{
    verificartoken() {
      if (localStorage.getItem('usertoken') === undefined || localStorage.getItem('usertoken') === null) {
  
                 this.$router.push('/');
          console.log("No hay token")
      }else{
        console.log("hay token"+localStorage.getItem('usertoken'))
       
      }
    },
 
  }, 
 
}
</script>

<style>
@import "./assets/css/style.css";
</style>