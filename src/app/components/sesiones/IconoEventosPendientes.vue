<template>
  <button class="boton" @click="verEventosPendientes">
    <i class="fa-solid fa-floppy-disk fa-2xl" style="color: red;"></i>
    <span>{{ cantidadPendientes }}</span>
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
.boton {
  border: none;
  transition: transform 0.3s ease;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
  color: #63E6BE;
}

.boton:hover {
  transform: scale(1.1);
}

.boton i {
  margin-bottom: 25px;
}
</style>
