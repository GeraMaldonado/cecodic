<template>
  <div class="paginacion">
    <button @click="paginaAnterior" :disabled="paginaActual === 1">Anterior</button>
    <button v-for="pagina in totalPaginas" :key="pagina" @click="cambiarPagina(pagina)"
      :class="{ activo: paginaActual === pagina }">
      {{ pagina }}
    </button>
    <button @click="paginaSiguiente" :disabled="paginaActual === totalPaginas">Siguiente</button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  totalElementos: {
    type: Number,
    required: true
  },
  elementosPorPagina: {
    type: Number,
    default: 9
  }
});

const emit = defineEmits(['update:paginaActual']);

const paginaActual = ref(1);

const totalPaginas = computed(() => {
  return Math.ceil(props.totalElementos / props.elementosPorPagina);
});

const cambiarPagina = (pagina) => {
  paginaActual.value = pagina;
  emit('update:paginaActual', pagina);
};

const paginaAnterior = () => {
  if (paginaActual.value > 1) {
    cambiarPagina(paginaActual.value - 1);
  }
};

const paginaSiguiente = () => {
  if (paginaActual.value < totalPaginas.value) {
    cambiarPagina(paginaActual.value + 1);
  }
};
</script>

<style scoped>
.paginacion {
  display: flex;
  justify-content: center;
  gap: 5px;
}

button {
  padding: 5px 10px;
  background-color: rgb(248, 223, 222);
  border: 1px solid rgb(245, 198, 196);
  border-radius: 10%;
}

button:hover {
  background-color: rgb(255, 197, 195);
}

button.activo {
  font-weight: bold;
}
</style>