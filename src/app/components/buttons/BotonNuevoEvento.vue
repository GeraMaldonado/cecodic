<template>
  <button class='boton' v-if="admin" @click="nuevoEvento">
    <div class="boton-content">
      <i class="fa-solid fa-file fa-2xl" style="color: #74C0FC;"></i>
      <span>Nuevo Evento</span>
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

.boton-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.boton-content span {
  margin-top: 25px;
  font-size: 18px;
  font-weight: bold;
  color: #74C0FC;
}
</style>
