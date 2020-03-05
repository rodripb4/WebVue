<template>
  <div class="general">

      <section id="content">
        <h1 class="subheader">Factura</h1>
        <br />
        <div></div>
        <div>
       
    </div>

        <form class="col-lg-12" >
          <h2>Cliente</h2>
          <div id="search" class="sidebar-item">
            <h3>Buscador</h3>
            <p>Escoga un cliente:</p>
            <form @submit.prevent="getClienteBySearch(searchString)">
              <input type="text" name="search" v-model="searchString" />
              <input type="submit" name="submit" value="Buscar" class="btn" />
                <b-button variant="outline-primary" @click="getClientes()">Ver Todo</b-button>
            </form>
          </div>
          <br />
      
<template>
<table class="table table-striped table-responsive " id="tablacliente">
  <thead>
    <tr>
      <th scope="col">DNI</th>
      <th scope="col">Nombre</th>
      <th scope="col">Apellido</th>
      <th scope="col">Direccion</th>
      <th scope="col">telefono</th>
     <th scope="col">email</th>   

    </tr>
  </thead>
  <tbody>
 

                  <tr v-for="clientes in clientes" :key="clientes._id">
                    <th id="cdni" >{{clientes.dni}}</th>
                    <td id="cname">{{clientes.nombre}}</td>
                    <td id="capellido">{{clientes.apellido}}</td>
                    <td id="cdireccion">{{clientes.direccion}}</td>
                    <td id="ctelefono">{{clientes.telefono}}</td>
                    <td id="cemail">{{clientes.email}}</td>
                  </tr>
        
            
  
  </tbody>
</table>
  
           <b-button v-b-modal.modal-1>+Producto</b-button>
             <div class="clearfix col-md-2"></div>
   <div class="table-responsive ">
            <table class="table table-striped col-lg-12 " id="tablafactura">
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
  
           <td>  <input v-model="item.precio_tota"></td>
      <td><button type="button" class="close" v-on:click="eliminalinea(item)"  aria-label="Close">
  <span aria-hidden="true">&times;</span>
</button></td>
              </tr>
            <tr v-for="checkedName in checkedNames" v-bind:key="checkedName"></tr>
          </tbody>
          <tfoot id="lineafooter">
          
            <td></td>
                  <td></td>
            <td></td>
            <td>SUBTOTAL € <input id="subtotal" type="text" class="form-control col-lg-12" v-model="subtotal" /></td>
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
             <td></td>
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
       
         </div>
</template>
        </form>
        <div>
       
          <b-modal id="modal-1" size="xl" title="Articulos">
            <v-card class="mx-auto" max-width="300" ></v-card>

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
                    <th scope="col">Eliga el artículos</th>
                 
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <article class="article-item" v-for="articles in articles" :key="articles._id">
      <div class="image-wrap">
        <img :src="url+'get-imagen/'+articles.imagen" :alt="articles.nombre" v-if="articles.imagen" />
      </div>

   <h2>  <router-link :to="{name:'article', params:{id: articles._id}}">{{articles.nombre}}</router-link> </h2>
      <span class="date">{{articles.date | moment('from', 'now')}}

       
      </span>

      <h4>{{articles.precio}}€</h4>
   <router-link :to="{name:'article', params:{id: articles._id}}">Leer más</router-link>
 <td>

<button   type="button" class="btn btn-info" v-on:click="agregarlineaventa(articles)">+</button>
                    </td>
 
        <td>
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


        <div class="clearfix"></div>
      </section>

    
    
      <Sidebar></Sidebar>

    <div class="clearfix"></div>
      <div>
         <button type="button"  @click="descargarPDF" class="btn btn-dark">Download PDF</button>

       </div>
  </div>

</template>

<script src="js/jquery.min.js"></script>
<script src="jspdf.min.js"></script>
<script src="jspdf.plugin.autotable.min.js"></script>
<!-- jsPDF library -->
<script src="js/jsPDF/dist/jspdf.min.js"></script>
<script >
import axios from "axios";
import { global } from "../global";
import Cliente from "../models/Cliente";
import Articulo from "../models/Articulo";
import form from "../models/form";
import jsPDF from 'jspdf';
import swal from "sweetalert";
import JsPDFAutotable from 'jspdf-autotable';
//import VModal from 'vue-js-modal'

export default {
  name: "Factura",
  
  mounted() {
    this.getClientes(), 
    this.getArticulos(); 
  },
  components: { JsPDFAutotable },
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
      buscarString: null,
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
      form: new form("", "", "", "")
    };
  },
  methods: {
     eliminalinea(item){
       var a = this.lineafactura.findIndex(e=> e.nombre===item.nombre);
       this.lineafactura.splice(a, 1);
       this.subtotal=this.subtotal-item.precio_uni;
       var aux=this.subtotal/this.iva;
       this.total=  aux+this.subtotal;
       this.total=Math.trunc(this.total);  
    },
 descargarPDF(){
var yea=document.getElementById("tablacliente").rows.length;
  if(yea==2){
var hoy=new Date();
    var fecha= hoy.getDate()+' '+(hoy.getMonth()+1)+' '+hoy.getFullYear();
    var hora=hoy.getHours()+' '+hoy.getMinutes()+' '+hoy.getSeconds();
    var fechahora=fecha+' '+hora;
var doc = new jsPDF();
      var logo = new Image();
var columns = ["NOMBRE ART", "PRECIO UNI", "CANT","PRECIO TOTAL"];
var rows = [];
 this.lineafactura.forEach(element =>{
      var temp = [element.nombre,element.precio_uni,element.cant,element.precio_tota];
      rows.push(temp);
    }); 
    var temp01 = [" "," "," ","Subtotal: "+this.subtotal];
        rows.push(temp01);
          var temp02 = [" "," "," ","IVA : "+this.iva];
        rows.push(temp02);
          var temp03 = [" "," "," ","Total : "+this.total];
        rows.push(temp03);
var doc = new jsPDF('p', 'pt');
doc.autoTable(columns, rows);
doc.text(20, 20, 'CLIENTE');
 
var columns2 = ["DNI", "Nombre", "Apellido","Direccion","telefono","email"];
var rows2 = [];       
var dni=document.getElementById("cdni").innerHTML;
var cnombre=document.getElementById("cname").innerHTML;
var capellido=document.getElementById("capellido").innerHTML;
var cdireccion=document.getElementById("cdireccion").innerHTML;
var ctelefono=document.getElementById("ctelefono").innerHTML;
var cemail=document.getElementById("cemail").innerHTML;
      var temp2 = [dni,cnombre,capellido,cdireccion,ctelefono,cemail];
      
      rows2.push(temp2);
   

var doc = new jsPDF('p', 'pt');
doc.autoTable(columns, rows);
doc.addImage(img.src, 'JPEG', 1, 2);
doc.text(20, 20, 'FACTURA LOCALHOST');
doc.autoTable(columns2, rows2);
doc.save(cnombre+'_factura.pdf');
  
  }else{
  swal(
            "Error",
            "Debe de escoger un cliente para crear la factura",
            "error"
          );
  }
    
  
},

    calculoslineaventa(item){
      
       item.precio_tota=item.precio_uni*item.cant;
       for(const i  in this.lineafactura ) {
         if(this.lineafactura[i].nombre==item.nombre){
           this.lineafactura[i].precio_tota=item.precio_tota;
           console.log( this.lineafactura[i].precio_tota+"entra");
          
         }
    }
    this.calculosubtotal();
    this.calculoiva();
    },

calculoiva(){
var ivaaplicado=(this.iva/100)*this.subtotal
this.total=this.subtotal+ivaaplicado
return this.total;
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
this.cant=document.getElementById(articles._id).value;

  this.lineafactura.push({nombre:articles.nombre,precio_uni: articles.precio , cant:this.cant,precio_tota:articles.precio*this.cant  });
 this.calculosubtotal();
 },

calculosubtotal(){
  console.log("subtotal")
  var sum=0;
 this.subtotal=0;
for(const i  in this.lineafactura ) {
  console.log(this.lineafactura[i].precio_tota);
 sum= sum+ parseInt(this.subtotal+this.lineafactura[i].precio_tota);  
}


this.subtotal=sum;
console.log(this.subtotal)
},
    getClienteBySearch(buscarString) {
      axios
        .get(this.url + "cliente-search/" + buscarString)
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
    getArticleBySearch(buscarString) {
      axios.get(this.url + "buscar/" + buscarString).then(res => {
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

