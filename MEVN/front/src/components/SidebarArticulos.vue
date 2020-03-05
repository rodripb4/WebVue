<template>
  <aside id="sidebar">
    <div id="nav-blog" class="sidebar-item">
    <router-link to="/creararticulo" class="btn btn-success">Crear Articulo</router-link>
    </div>

    <div id="search" class="sidebar-item">
      <h3>Buscador</h3>
      <p>Encuentra el artículo que buscas</p>
      <form @submit.prevent="gosearch">
        <input type="text" name="search" v-model="buscarString"/>
        <input type="submit" name="submit" value="Buscar" class="btn" />
      </form>
    </div>
  </aside>
</template>

<script>
export default {
  name: "SidebarArticulos",
  data(){
    return{
      buscarString: null
    }
  }, methods:{
    gosearch(){
          this.$router.push('/redirect/'+this.buscarString);
    }
  }
};
</script>