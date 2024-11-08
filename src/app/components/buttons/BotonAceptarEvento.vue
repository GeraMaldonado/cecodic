<template>
  <button class="boton" @click="aceptarEventos">
    <div class="boton-content botonTabla" title="Aceptar evento">
      <i class="fa-solid fa-check fa-2xl" style="color: var(--icon-color3);"></i>
      <!--<p>Aceptar</p>-->
    </div>
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
p{
  color: var(--icon-color3);
}
</style>
