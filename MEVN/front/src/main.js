import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import Vuelidate from 'vuelidate';
import VueMoment from 'vue-moment';
import moment from 'moment';
import 'moment/locale/es';
import LastArticle from './components/LastArticle.vue';
import  Inicio from './components/Inicio.vue';
import ErrorComponent from'./components/ErrorComponent.vue';
import BootstrapVue from 'bootstrap-vue'
import Factura from './components/Factura.vue';
import Cliente from './components/Cliente.vue';
import Buscar from './components/Buscar.vue';
import Redirect from './components/redirect.vue';
import Articulo from './components/Articulo.vue';
import EditarCliente from './components/EditarCliente.vue';
import CrearArticulo from './components/CrearArticulo.vue';
import CrearCliente from './components/CrearCliente.vue';
import EditarArticulo from './components/EditarArticulo.vue';
import Login from './components/Login.vue';
import Registro from './components/Registro.vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import vuetify from './plugins/vuetify';
import Vuetify from 'vuetify/lib'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
//import hooks from './router/hooks'
Vue.use(Vuetify);
Vue.use(VueRouter);
Vue.use(BootstrapVue)
Vue.use(Vuelidate);
Vue.use(vuetify);

Vue.use(VueMoment,{
  moment
});


const  routes=[
  //RUTAS BLOG CLIENTE
  {path:'/Home', component: LastArticle},
  {path:'/LastArticle', component: LastArticle},
  {path:'/Inicio', component:Inicio},
  {path:'/articulo/:id', name:'Articulo', component: Articulo},
  {path:'/Cliente/:id', name:'EditarCliente', component: EditarCliente},
  {path:'/Cliente', component:Cliente},
  {path:'/redirect/:searchString',  component:Redirect},
  {path:'/buscador/:searchString', component:Buscar},
  {path:'/Factura', name:'Factura', component:Factura},
  {path:'/creararticulo', name:'creararticulo', component:CrearArticulo},
  {path:'/crearcliente', name:'crearcliente', component:CrearCliente},
  {path:'/editararticulo/:id', name:'editararticulo', component:EditarArticulo},
  {path:'/',component:Login,  name:'Login'},
  {path:'/registro',component:Registro,  name:'Registro'},
  

  //RUTAS GESTION

  {path:'*', component: ErrorComponent}
  
]
//hooks(this.routes)
const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')


