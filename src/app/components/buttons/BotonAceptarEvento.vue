<template>
  <button class="boton" @click="aceptarEventos">
    <i class="fa-solid fa-floppy-disk fa-2xl" style="color: red;"></i>
    <span>Aceptar</span>
  </button>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { actualizarEstatusEvento } from '../queries/queries';

const props = defineProps(['idEvento']);
const router = useRouter();

const aceptarEventos = async () => {
  const evento = {
    idEvento: props.idEvento,
    estatus: "aceptado"
  };
  
  try {
    const data = await actualizarEstatusEvento(evento.idEvento, evento.estatus);
    alert(`Respuesta del servidor: ${data.message}`);

    window.location.reload();
  } catch (error) {
    console.error('Error al enviar la solicitud:', error);
  }
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
