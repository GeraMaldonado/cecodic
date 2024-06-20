<template>
  <div v-if="evento" class="contenedor">
    <TablaEvento :titulo="evento.titulo" :institucion="evento.institucion" :fecha="evento.fecha" :hora="evento.hora"
      :lugar="evento.lugar" :detalles="evento.detalles" :img="evento.img" :pdf="evento.pdf" />
    <div class="botones">
      <BotonEditar :idEvento="evento.ideventos" mostrarTexto />
      <BotonEliminar :eventoId="evento.ideventos" mostrarTexto />
    </div>
  </div>
  <div v-else>
    <p>Cargando...</p>
  </div>
</template>

<script setup>
import BotonEliminar from '@/components/buttons/BotonEliminar.vue';
import BotonEditar from '@/components/buttons/BotonEditar.vue';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import TablaEvento from '../components/TablaEvento.vue';
import { getEvento } from '../components/queries/queries';

const route = useRoute();
const evento = ref(null);

onMounted(async () => {
  await getEvento(evento, route);
});
</script>

<style scoped>
.contenedor {
  padding: 5% 10%;
}

.botones {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.botones>* {
  margin: 0 20px;
  text-align: center;
}

.botones>*>div {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.botones span {
  display: block;
  margin-top: 10px;
  font-size: 14px;
  font-weight: bold;
}

.botones .btn {
  padding: 10px 20px;
}
</style>
