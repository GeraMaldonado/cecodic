<template>
  <div>
    <p class="fecha">Fecha: {{ fechaLarga() }}</p>
    <div class="filtros">
      <div class="filtroFecha">
        <p>Ver por:</p>
        <select v-model="periodo" @change="filtrarPorPeriodo">
          <option value="dia">Día</option>
          <option value="semana">Semana</option>
        </select>
      </div>
    </div>
    <h2 class="eventosHoy">{{ tituloEvento }}</h2>
    <div class="contenedorCards">
      <template v-for="evento in eventosPaginados" :key="evento.ideventos">
        <div class="tarjetaWrapper">
          <router-link :to="{ name: 'evento-individual', params: { id: evento.ideventos } }" class="linkEventoUnico">
            <Card :titulo="acortadorString(evento.titulo, 62)" :resumen="acortadorString(evento.detalles, 140)" :ubicacion="evento.lugar"
              :hora="periodo === 'dia' ? evento.hora.substring(0, 5) : `${fechaCortaDia(evento)}\n ${evento.hora.substring(0, 5)}`"
              :img="evento.img ? `${urlUpload}/${evento.img}` : null" />
          </router-link>
        </div>
      </template>
    </div>
    <template v-if="eventos.length === 0">
      <p class="sinEventos">No hay eventos disponibles</p>
    </template>
    <Paginacion v-if="eventosFiltrados.length > elementosPorPagina" :totalElementos="eventosFiltrados.length"
      :elementosPorPagina="elementosPorPagina" v-model:paginaActual="paginaActual" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import Card from '@/components/Card.vue';
import Paginacion from '@/components/Paginacion.vue';
import { fechaLarga, fechaConsulta, fechaCortaDia, acortadorString, urlUpload } from '@/components/utils';
import { getEventos } from '@/components/queries/queries';
import { fechaRangoSemana } from '@/components/eventosUtils';

const periodo = ref('dia');
const eventos = ref([]);
const eventosFiltrados = ref([]);
const paginaActual = ref(1);
const elementosPorPagina = 9;
const tituloEvento = ref('EVENTOS HOY');

onMounted(async () => {
  await cargarEventosInicial();
});

watch(periodo, async () => {
  await filtrarPorPeriodo();
});

const eventosPaginados = computed(() => {
  const inicio = (paginaActual.value - 1) * elementosPorPagina;
  const fin = inicio + elementosPorPagina;
  return eventosFiltrados.value.slice(inicio, fin);
});

const cargarEventosInicial = async () => {
  await getEventos(eventos, fechaConsulta());
  if (eventos.value.length === 0) {
    periodo.value = 'semana';
    await filtrarPorPeriodo();
  } else {
    filtrarEventos();
  }
};

const filtrarPorPeriodo = async () => {
  switch (periodo.value) {
    case 'dia':
      tituloEvento.value = 'EVENTOS HOY';
      await getEventos(eventos, fechaConsulta());
      break;
    case 'semana':
      tituloEvento.value = 'EVENTOS SEMANA';
      const [fechaInicio, fechaFin] = fechaRangoSemana(fechaConsulta()).split('/');
      await getEventos(eventos, `${fechaInicio}/${fechaFin}`);
      break;
    default:
      return;
  }
  filtrarEventos();
};

const filtrarEventos = () => {
  eventosFiltrados.value = eventos.value;
};
</script>

<style scoped>
.fecha {
  margin-top: 1px;
  text-align: right;
  font-size: 2.9vh;
  margin-right: 5%;
  font-weight: 700;
}

.eventosHoy,
.sinEventos {
  text-align: center;
  font-size: 6vh;
  margin-top: -15px;
  margin-bottom: 55px;
}

.contenedorCards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-left: 6.7%;
  padding-right: 6.7%;
}

.tarjetaWrapper {
  width: 340px;
  margin-bottom: 80px;
}

.linkEventoUnico {
  text-decoration: none;
}

.filtros {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.filtros p {
  font-size: 20px;
  font-weight: 500;
}

.filtroFecha {
  display: flex;
  align-items: center;
  margin-left: 10px;
}
</style>
