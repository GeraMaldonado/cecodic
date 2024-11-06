<template>
  <button class="boton" @click="aceptarEventos">
    <div class="boton-content">
      <i class="fa-solid fa-floppy-disk fa-2xl" style="color: red;"></i>
      <p>Aceptar</p>
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


/*
.contenedorBoton{
  border: none;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  transition: transform 0.3s ease;  
}
.contenedorBoton:hover {
  transform: scale(1.1);
}

.contenedorBoton i {
  margin-bottom: 10px;
}
.boton {
  font-size: 18px;
  font-weight: bold;
  color: #63E6BE;
}



*/
</style>
