<template>
  <div id="container">

    <img src="https://64.media.tumblr.com/44e89309ea155b3be1213e64cc872f2a/tumblr_n0wqfhEW9K1sghdp8o1_400.gif" v-if="cargando">

    <h1>Libreria</h1>
    <form @submit.prevent="estatusEditar ? updateLibro() : addLibro()">
      <p>
        <label for="titulo">Titulo </label>
        <input class="input" id="titulo" type="text" v-model="titulo">
      </p>
      <p>
        <label for="autor">Autor </label>
        <input class="input" id="autor" type="text" v-model="autor">
      </p>
      <p>
        <button id="button" type="submit">{{ estatusEditar ? "Editar": "Agregar" }}</button>
        <button v-if="estatusEditar" @click="estatusEditar= false, titulo='', autor='' ">Cancelar</button>
      </p>
    </form>
          
    <h2>Lista de libros</h2>

      <ul>
        <li v-for="libro in libros" :key="libro.id">
          {{libro.titulo}} de {{libro.autor}}
          <button @click="deleteLibro(libro)">Eliminar</button>
          <button @click="selectLibro(libro)">Editar</button>
        </li>
      </ul>

    </div>
</template>

<script>

import {db} from './firebase'

export default {
  name: 'App',
  data() {
    return {
      libros: [],
      id: "",
      titulo: "",
      autor: "",
      cargando: false,
      estatusEditar: false
    }
  },
  created() {
    this.listarLibros();
  },
  methods: {
    async listarLibros(){

          this.cargando = true;
          const data = await db.collection("libros").get();
          this.libros = data.docs.map(doc => ({
            id: doc.id, ...doc.data()
          }))
          this.cargando = false;
          console.log(this.libros);

    },
    async addLibro() {
        await db.collection('libros').add(
          {
            titulo:  this.titulo,
            autor: this.autor
          }
        )
        this.titulo = "";
        this.autor=""
        this.listarLibros();
    },
    async deleteLibro(libro){

      if(confirm(`Estas seguro que desaeas eliminar ${libro.titulo} de ${libro.autor}`)){
        await db.collection('libros').doc(libro.id).delete();
        this.listarLibros();
      }

    },
    selectLibro(libro){
      this.estatusEditar = true;
      this.id = libro.id;
      this.titulo = libro.titulo;
      this.autor = libro.autor;
    },
    async updateLibro(){
      await db.collection('libros').doc(this.id).set(
        {
          titulo: this.titulo,
          autor: this.autor
        }
      )

      this.estatusEditar = false;
      this.id = "";
      this.titulo = "";
      this.autor = "";
      this.listarLibros();
      
    }
  },  
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Mate+SC&display=swap');
body{
  min-height: 100vh;
  margin: 0%;
  background: linear-gradient( rgb(145, 219, 253),rgb(222, 184, 253), rgb(255, 196, 196));
}
#app {
  text-align: center;
  margin-top: 60px;
  color: white;
  font-family: 'Mate SC', serif;
  font-size: 20px;
}
h1{
  font-size: 50px;
}
h2{
  font-size: 30px;
}
.input{
  font-family: 'Mate SC', serif;
  font-size: 20px;
}
#button{
  font-family: 'Mate SC', serif;
  font-size: 20px;
  background-color:ghostwhite ;
}
</style>
