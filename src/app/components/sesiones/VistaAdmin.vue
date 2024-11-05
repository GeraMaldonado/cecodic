<template>
  <div class="contenedorAdministrador" v-if="admin">
    <div class="header">
      <h1 class="textoAdministrador">Administrador</h1>
      <BotonNuevoEvento class="botonNuevoEvento" />
      <IconoEventosPendientes></IconoEventosPendientes>
      <CerrarSesion class="botonCerrarSesion" />
    </div>
  </div>
</template>

<script setup>
import CerrarSesion from './CerrarSesion.vue';
import BotonNuevoEvento from '../buttons/BotonNuevoEvento.vue';
import IconoEventosPendientes from './IconoEventosPendientes.vue'
const admin = (localStorage.getItem('credencial'));
</script>

<style scoped>
/*
.contenedorAdministrador {
  padding: 20px;
}

.header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.textoAdministrador {
  margin: 0;
}

.botonNuevoEvento {
  margin-left: 20px;
}

.botonCerrarSesion {
  margin-left: auto;
}*/
</style>