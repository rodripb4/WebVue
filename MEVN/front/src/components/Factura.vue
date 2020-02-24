<template>
  <div class="general">
    <div class="center">
      <section id="content">
        <h2 class="subheader">Factura</h2>
        <br />
        <div></div>
        <div>
    </div>
        <form>
          <h5>Cliente</h5>
          <div id="search" class="sidebar-item">
            <h3>Buscador</h3>
            <p>Encuentra el cliente que buscas</p>
            <form @submit.prevent="getClienteBySearch(searchString)">
              <input type="text" name="search" v-model="searchString" />
              <input type="submit" name="submit" value="Buscar" class="btn" />
                <b-button variant="outline-primary" @click="getClientes()">Ver Clientes</b-button>
            </form>
          </div>
          <br />
      
<template>
<table class="table table-striped" id="tablacliente">
  <thead>
    <tr>
      <th scope="col">DNI</th>
      <th scope="col">Nombre</th>
      <th scope="col">Apellido</th>
      <th scope="col">Direccion</th>
      <th scope="col">Telefono</th>
     <th scope="col">Email</th>   
    </tr>
  </thead>
  <tbody>
         <tr v-for="clientes in clientes" :key="clientes._id">
         <th>{{clientes.dni}}</th>
         <td>{{clientes.nombre}}</td>
         <td>{{clientes.apellido}}</td>
         <td>{{clientes.direccion}}</td>
         <td>{{clientes.telefono}}</td>
         <td>{{clientes.email}}</td>
         </tr>
  </tbody>
</table>      
</template>
        </form>
        <div>
          <b-button v-b-modal.modal-1>Todos los Producto</b-button>
          <b-modal id="modal-1" size="xl" title="Articulos">
            <v-card class="mx-auto" max-width="300" tile></v-card>

            <div id="search" class="sidebar-item">
              <h3>Buscador</h3>
              <p>Encuentra el articulo que buscas</p>
              <form @submit.prevent="getArticleBySearch(searchString)">
                <input type="text" name="search" v-model="searchString" />
                <input type="submit" name="submit" value="Buscar" class="btn" />
                <b-button variant="outline-primary" @click="getArticulos()" >Ver Todo</b-button>
              </form>
            </div>
            <div class="article-item">
              <v-subheader>ARTICULOS</v-subheader>
              <table class="table">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">Articulo</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Precio Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <article class="article-item" v-for="articles in articles" :key="articles._id">
      <div class="image-wrap">
        <img :src="url+'get-image/'+articles.imagen" :alt="articles.nombre" v-if="articles.imagen" />
      </div>
      <h2><router-link :to="{name:'Articulo', params:{id: articles._id}}">{{articles.nombre}}</router-link> </h2>

      <h4> {{articles.precio}}€</h4>
   <router-link :to="{name:'Articulo', params:{id: articles._id}}">Leer más</router-link>
 <td>

<button   type="button" class="btn btn-info" v-on:click="agregarlineaventa(articles)">+</button>
                    </td>
 
        <td>
                      <div class="col-6">
                       
                        <p>{{articles.precio}}</p>
                      </div>
                    </td>

                     <td>
                      <div class="col-3">
                        <input
                           :id="articles._id"
                           type="number"
                          class="form-control"
                          @click="calculos(articles.precio, articles._id)"
                          value="1"

                        />
                      </div>
                    </td>
               </article>
                  
                    </td>

       
                  </tr>
                </tbody>
              </table>
            </div>
          </b-modal>
        </div>


        <br />
        <br />
        <table class="table mt-9 table-striped" id="tablafactura">
          <thead class="thead-dark">
            <tr>
           

              <th scope="col">NOMBRE ART.</th>
              <th scope="col">PRECIO UNIT.</th>
              <th scope="col">CANT.</th>
              <th scope="col">PRECIO TOTAL</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="lineaf">
            <tr v-for="item in lineafactura" v-bind:key="item.nombre">

        <td><input v-model="item.nombre" ></td>
        <td> <input v-model="item.precio_uni" v-on:change="calculoslineaventa(item)" ></td>
        <td>  <input type="number" v-model="item.cant" v-on:click="calculoslineaventa(item)" ></td>
  
           <td>  <input v-model="item.precio_tota"  ></td>
      
              </tr>
            <tr v-for="checkedName in checkedNames" v-bind:key="checkedName"></tr>
          </tbody>
          <tfoot id="lineafooter">
            <td>
              <v-list-item-title>{{precioS}}</v-list-item-title>
            </td>
            <td></td>
            <td></td>
            <td>SUBTOTAL €    <input id="subtotal" type="text" class="form-control col-lg-12" v-model="subtotal" /></td>
            <td>
             
            </td>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td>IVA %   <input  id="iva"
                          type="number"
                      class="form-control col-9"
                         v-model="iva"
                          @click="calculoiva()"
                      
                        /></td>
              
              <td>
                
           
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td>  TOTAL   <input id="total" type="text" class="form-control col-lg-11 " v-model="total" /></td>
              <td>
             
              </td>
            </tr>
          </tfoot>
        </table>
      </section>
    </div>
    <div class="clearfix"></div>
      <div>
         <button type="button"  @click="downloadPDF" class="btn btn-dark">Download PDF</button>

       </div>
  </div>

</template>

<script src="js/jquery.min.js"></script>

<!-- jsPDF library -->
<script src="js/jsPDF/dist/jspdf.min.js"></script>
<script >
import axios from "axios";
import { global } from "../global";
import Cliente from "../models/Cliente";
import Articulo from "../models/Articulo";
import form from "../models/form";
import jsPDF from 'jspdf'
//import VModal from 'vue-js-modal'

export default {
  name: "Factura",
  
  mounted() {
    this.getClientes(), 
    this.getArticulos(); 
  },
  data() {
    return {
      lineafactura:[
        { nombre:'', precio_uni:'', cant:'', precio_tota:''}
      ] ,
       dialog: false,
     clienteV:null,
      headers: [
        {
          align: "left",
          filterable: false,
          value: "name"
        },
        { text: "Titulo", value: "title" },
        { text: "Precio€", value: "precio" },
        { text: "Cantidad", value: "cantidad" },

        { text: "ADD", value: "action", sortable: false }
      ],
      dialogm1: "",
      factura: [],
      dialog: false,
      totalarticulo: 0,
      cant: 1,
      precio: "",
      calculo: 0,
      checkedNames: [],
    currentPage: 0,
            pageCount: 0,
      subtotal: 0,
      iva: 21.0,
      total: 0,
      dense: false,
      fixedHeader: false,
      height: 300,
      precioS: 0,
      dialog2: false,
      showModal: false,
      searchString: null,
      url: global.url,
      cliente: {
        nombre: "",
        apellidos: "",
        telefono: "",
        direccion: "",
        email: "",
        dni: ""
      },

      clientes: new Cliente("", "", "", "", "", "", ""),
      articles: new Articulo("", "", "", "", ""),
      form: new form("", "", "", 0)
    };
  },
  methods: {
     downloadPDF(){
     
 var mywindow = window.open('', 'PRINT', 'height=400,width=600');
    mywindow.document.write('<html><head>');
	mywindow.document.write('<style>.tabla{width:100%;border-collapse:collapse;margin:16px 0 16px 0;}.tabla th{border:1px solid #ddd;padding:4px;background-color:#d4eefd;text-align:left;font-size:15px;}.tabla td{border:1px solid #ddd;text-align:left;padding:6px;}</style>');
    mywindow.document.write('</head><body >');
         mywindow.document.write("<p><img src='https://lh3.googleusercontent.com/wEnbkSzEREsSvWZIFEhiXcLc3CaYMUhGC27OzgmKUMKuxzEgp7QWGzsmNzgk928pLs6H=s85' width='90px' /> </p>");
 mywindow.document.write(document.getElementById('tablacliente').innerHTML);
     mywindow.document.write(document.getElementById('tablafactura').innerHTML);

    mywindow.document.write('</body></html>');
    mywindow.document.close(); // necesario para IE >= 10
    mywindow.focus(); // necesario para IE >= 10
    mywindow.print();
    mywindow.close();

    
    return true;
     },
    

    calculoslineaventa(item){
      
       item.precio_tota=item.precio_uni*item.cant;
       for(const i  in this.lineafactura ) {
         if(this.lineafactura[i].nombre==item.nombre){
           this.lineafactura[i].precio_tota=item.precio_tota;
           console.log( this.lineafactura[i].precio_tota+"eenntr");
          
         }

}
    this.calculosubtotal();
    this.calculoiva();
    },

calculoiva(){
this.total=(this.subtotal/this.iva)+this.subtotal
},
   
    getClientes() {
      axios
        .get(this.url + "clientes/true")
        .then(res => {
          if (res.data.status == "success") {
            this.clientes = res.data.clientes;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

 agregarlineaventa(articles){
this.cant=   document.getElementById(articles._id).value;

  this.lineafactura.push({nombre:articles.title,precio_uni: articles.precio , cant:this.cant,precio_tota:articles.precio*this.cant  });
 this.calculosubtotal();
 },

calculosubtotal(){
  console.log("subtotall")
  var sum=0;
 this.subtotal=0;
for(const i  in this.lineafactura ) {
  console.log(this.lineafactura[i].precio_tota);
 sum= sum+ parseInt(this.subtotal+this.lineafactura[i].precio_tota);  
}


this.subtotal=sum;
console.log(this.subtotal)
},
    getClienteBySearch(searchString) {
      axios
        .get(this.url + "cliente-search/" + searchString)
        .then(res => {
          if (res.data.status == "success") {
            this.clientes = res.data.clientes;

            console.log(searchString);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getArticleBySearch(searchString) {
      axios.get(this.url + "search/" + searchString).then(res => {
        if (res.data.status == "success") {
          this.articles = res.data.articulos;
          console.log(this.articles);
        }
      });
    },
    getArticulos() {
      console.log("articulos");
      axios
        .get(this.url + "articulos")
        .then(res => {
          if (res.data.status == "success") {
            this.articles = res.data.articulos;
            console.log(this.articles);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

  }
};
</script>

