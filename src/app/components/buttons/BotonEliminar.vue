<template>
  <div class="boton-container" v-if="admin">
    <button class="boton botonTabla" @click="confirmarEliminar" title="Eliminar evento">
      <div class="boton-content">
        <i class="fa-solid fa-eraser fa-2xl" style="color: var(--icon-color4);"></i>
        <p v-if="mostrarTexto">Eliminar</p>
      </div>
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { eliminarEvento } from '../queries/queries';

const admin = ref(localStorage.getItem('credencial') !== null);

const props = defineProps({
  eventoId: {},
  mostrarTexto: {
    type: Boolean,
    default: false
  }
});

const router = useRouter();

const confirmarEliminar = async () => {
  if (confirm('¿Estás seguro de que quieres eliminar este evento?')) {
    await eliminarEventoHandler();
  }
};

const eliminarEventoHandler = async () => {
  if (props.eventoId) {
    try {
      await eliminarEvento(props.eventoId);
      console.log('Evento eliminado correctamente');
      if (router.currentRoute.value.name === 'evento-individual') {
        router.push({ name: 'home' });
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.error('Error al eliminar el evento:', error);
    }
  } else {
    console.warn('No se proporcionó un ID de evento');
  }
};
</script>

<style scoped>
p{
  color: var(--icon-color4);
}
</style>
