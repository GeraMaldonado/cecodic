<template>
  <button class="boton" @click="verEventosPendientes">
    <div class="boton-content">
      <i class="fa-solid fa-floppy-disk fa-2xl" style="color: red;"></i>
      <p>Pendientes: <span>{{ cantidadPendientes }}</span></p>
    </div>
  </button>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { url } from '../utils';

const cantidadPendientes = ref(0);
const router = useRouter();


const obtenerCantidadPendientes = async () => {
  try {
    const response = await fetch(`${url}/eventos/pendientes/total`);
    const [data] = await response.json();
    cantidadPendientes.value = data.total;
  } catch (error) {
    console.error('Error al obtener la cantidad de eventos pendientes:', error);
  }
};


onMounted(() => {
  obtenerCantidadPendientes();
});


const verEventosPendientes = () => {
  router.push({ name: 'evento-pendientes' });
};
</script>

<style scoped>

</style>
