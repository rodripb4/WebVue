<template>
  <div class="general" style="margin-top: 50px">
    <div class="center">
      <section id="content">
        <br />
        <h2 class="subheader">Clientes</h2>
        <br />
        <br />
        <br />
         <router-link to="/crearcliente" class="btn btn-success">Crear Cliente</router-link>
        <div class="article-item">
          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">DNI</th>
                <th scope="col">Nombre</th>
                <th scope="col">Apellido</th>
                <th scope="col">Direccion</th>
                <th scope="col">Teléfono</th>
                <th scope="col">Email</th>
                <th scope="col">Editar</th>
                <th scope="col">Eliminar</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="clientes in cliente" :key="clientes._id">
                <td>{{clientes.dni}}</td>
                <td>{{clientes.nombre}}</td>
                <td>{{clientes.apellido}}</td>
                <td>{{clientes.direccion}}</td>
                <td>{{clientes.telefono}}</td>
                <td>{{clientes.email}}</td>
                <td>
                  <router-link :to="{name:'cliente', params:{id: cliente._id}}"><button type="button" class="btn btn-outline-primary">Editar</button></router-link>
                </td>
                <td>
                   <router-link :to="{name:'cliente', params:{id: cliente._id}}"><button type="button" class="btn btn-outline-danger">Eliminar</button></router-link> 
                  </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <b-table striped hover :clientesList="clientesList" :cliente="cliente"></b-table>
        </div>
      </section>
    </div>
    <div class="clearfix"></div>
  </div>
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators";
import axios from "axios";
import { global } from "../global";
import swal from "sweetalert";
import Cliente from "../models/Cliente.js";
 
export default {
  name: "Cliente",


  validations: {
    cliente: {
      nombre: {
        required,
        minLength: minLength(2)
      },
      apellidos: {
        required,
        minLength: minLength(2)
      },
      telefono: {
        minLength: minLength(9)
      },
      email: {
        required
      }
    }
  },
  data() {
    return {
    myHeaders: new Headers(),
     
      url: global.url,
      submite: false,
      cliente: new Cliente("", "", "", "", "", "", ""),
       clientes: new Cliente("", "", "", "", "", "", ""),
      clientesList: []
    };
  },
  mounted() {
     this.myHeaders.append('authorization', `Bearer ${localStorage.token}`),
    this.obtenerClientes();
  },
  methods: {
    mostrarusuario() {
      console.log(this.cliente);
      this.submite = true;
      this.$v.$touch();

      if (this.$v.$invalid) {
        return false;
      }

      alert("Validacion Pasada");
    },

    save() {
      console.log(this.url);
        console.log(this.clientes);
      axios
        .post(this.url + "cliente/guardar", this.clientes)
        .then(res => {
        
          if (res.data.status == "success") {
            swal(
              "Cliente Creado",
              "el Cliente se ha creado correctamente :)",
              "success"
            );
            this.clientes = res.data.cliente;
            this.$router.push("/Blog");
          } else {
            swal(
              "Creación fallida",
              "El articulo no se ha creado bien :(",
              "error"
            );
          }
        })
        .catch(err => {
          console.log(err);
          console.log(this.cliente);
        });
    },

      obtenerClientes() {
      axios.get(this.url+"clientes/").then(res => {
        if (res.data.status == "success") {
          this.cliente = res.data.clientes;
          console.log(this.cliente);
        }
      });
    },

    deleteCliente(clienteId) {
      axios.delete(this.url + "clientes-delete/" + clienteId).then(res => {
        console.log(res);
        swal(
          "Cliente Eliminado",
          "El Cliente se ha borrado correctamente",
          "success"
        );
        this.$router.push("/Cliente");
      });
    }
  }
};
</script>