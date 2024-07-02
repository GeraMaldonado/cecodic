<template>
  <button v-if="admin" @click="cerrarSesion">Cerrar Sesion</button>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const admin = ref(localStorage.getItem('credencial') !== null);
const router = useRouter();

const cerrarSesion = () => {
  localStorage.removeItem('credencial');
  router.push({ name: 'home' }).then(() => {
    window.location.reload();
  });
}
</script>