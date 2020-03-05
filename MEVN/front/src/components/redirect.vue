<template>
    <h1>Redirigiendo...</h1>
</template>
<script>
export default {
    name:"Redirect", 
    mounted(){
        var buscarString = this.$route.params.buscarString;
        this.$router.push('/buscador/'+buscarString);
    }
}
</script>