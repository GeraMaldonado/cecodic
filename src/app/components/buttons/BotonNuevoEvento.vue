<template>
  <button class='boton' v-if="admin" @click="nuevoEvento">
    <div class="boton-content">
      <i class="fa-solid fa-file fa-2xl" style="color: var(--icon-color6);"></i>
      <p>Nuevo Evento</p>
    </div>
  </button>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const admin = ref(localStorage.getItem('credencial') !== null);

const router = useRouter();

const nuevoEvento = () => {
  router.push({ name: 'crear-evento' });
};
</script>

<style scoped>
.boton-content p {
  color: var(--icon-color6);
}
</style>
