<template>
  <div class="boton-container" v-if="admin">
    <button class="boton" @click="editarEvento(idEvento)">
      <i class="fas fa-pencil-alt fa-2xl" style="color: #00C413;"></i>
      <span v-if="mostrarTexto">Editar</span>
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
.boton-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.boton {
  border: none;
  transition: transform 0.3s ease;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.boton:hover {
  transform: scale(1.1);
}

span {
  margin-top: 25px;
  font-size: 18px;
  font-weight: bold;
  color: #00C413;
}
</style>
