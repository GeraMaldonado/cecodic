<template>
  <div class="boton-container" v-if="admin">
    <button class="boton botonTabla" @click="editarEvento(idEvento)" title="Editar evento">
      <div class="boton-content">
        <i class="fas fa-pencil-alt fa-2xl" style="color: var(--icon-color3);"></i>
        <p v-if="mostrarTexto">Editar</p>
      </div>
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const admin = ref(localStorage.getItem('credencial') !== null);
const props = defineProps({
  idEvento: Number,
  mostrarTexto: {
    type: Boolean,
    default: false
  }
});

const router = useRouter();

const editarEvento = (id) => {
  router.push({ name: 'editar-evento', params: { id: id } });
};
</script>

<style scoped>

p{
  color: var(--icon-color3);
}
</style>
