<template>
  <div class="contenedorEncabezado">
    <img class="fondo" src="@/assets/Picture1.png"
      alt="Fotografía de las instalaciones del Centro de Comunicación y Divulgación de la Ciencia “Galileo Galilei”, de frente ">
    <img class="logo" src="@/assets/Picture2.png"
      alt="Logo del Centro de Comunicación y Divulgación de la Ciencia “Galileo Galilei”">
    <div class="wrapper">
      <h1 class="monograma">CECODIC</h1>
      <nav class="nav-menu">
        <RouterLink :to="{ name: 'home' }" exact class="link">Inicio</RouterLink>
        <RouterLink :to="{ name: 'eventos' }" exact class="link">Eventos</RouterLink>
        <RouterLink :to="{ name: 'equipo' }" exact class="link">Sobre<br>CECODIC</RouterLink>
      </nav>
    </div>
  </div>
</template>

<script>import { RouterLink } from 'vue-router'</script>

<style scoped>
.contenedorEncabezado {
  position: relative;
  width: 100%;
}

.fondo {
  width: 100%;
}

.logo {
  position: absolute;
  top: 5%;
  right: 2%;
  width: 12.6%;
}

.wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 23%;
  bottom: 1%;
  background-color: rgba(120, 16, 5, 0.80);
}

.monograma {
  color: white;
  font-size: 2.5vw;
  font-weight: 500;
  margin-left: 2vh;
}

.nav-menu {
  display: flex;
  align-items: center;
  margin-right: 2vh;
}

.link {
  color: white;
  cursor: pointer;
  text-decoration: none;
  font-size: 2vw;
  margin: 0 2vw;
  text-align: center;
}

.link:hover {
  text-decoration: underline;
}

.link:nth-child(3) {
  font-size: 1.8vw;
  line-height: 1.2;
}
</style>
