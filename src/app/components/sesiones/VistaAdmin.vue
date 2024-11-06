<template>
  <div class="contenedorAdministrador" v-if="admin">
    <div class="header">
      <div class="contenedorBotones">
        <h1 class="textoAdministrador">Administrador</h1>
        <BotonNuevoEvento class="botonNuevoEvento" />
        <IconoEventosPendientes></IconoEventosPendientes>
     </div>
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
.contenedorAdministrador {
  padding: 20px;
  min-width: 320px;
}
.header, .contenedorBotones{
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
}
.header{
  align-items: start;
}
.contenedorBotones{
  width: 80%;
  flex-wrap: wrap;
}

.botonCerrarSesion {
  margin-left: auto;
}
</style>