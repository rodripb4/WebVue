 
<template>
  <div id="app">
    <HeaderComponent></HeaderComponent>
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
  }
};
</script>

<style>
@import "./assets/css/style.css";
</style>
