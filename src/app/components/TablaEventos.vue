<template>
  <div class="pantalla">
    <div class="filtros">
      <div class="filtroInstitucion">
        <p>Institución: </p>
        <select v-model="institucionSeleccionada" @change="filtrarPorInstitucion">
          <option value="todas">Todas</option>
          <option v-for="institucion in institucionesUnicas" :key="institucion" :value="institucion">
            {{ institucion }}
          </option>
        </select>
      </div>
      <div class="filtrofechas">
        <div class="contenedorFiltroFecha">
          <div class="filtroFecha">
            <p>Ver por:</p>
            <select v-model="periodo" @change="filtrarPorPeriodo">
              <option value="semana">Semana</option>
              <option value="mes">Mes</option>
            </select>
          </div>
        </div>
        <div class="calendario">
          <VueDatePicker v-model="monthPickerValue" month-picker v-if="periodo === 'mes'"
            @update:modelValue="onDatePickerChange" />
            <div v-if="periodo === 'semana'"> {{ `${fechaCortaMes({fecha: (fechaRangoSemana(fechaActual)).substring(0,11)})} - ${fechaCortaMes({fecha: (fechaRangoSemana(fechaActual)).substring(10,21)})}`}} </div>  
        </div>
        <div class="navegacionFecha">
          <button @click="retrocederSemana" v-if="periodo === 'semana'">Semana Anterior</button>
          <button @click="avanzarSemana" v-if="periodo === 'semana'">Semana Siguiente</button>
          <button @click="retrocederMes" v-if="periodo === 'mes'">Mes Anterior</button>
          <button @click="avanzarMes" v-if="periodo === 'mes'">Mes Siguiente</button>
        </div>
      </div>
    </div>

    <table class="tablaEventos" v-if="eventosPaginados.length > 0">
      <thead>
        <tr>
          <th>Nombre del evento</th>
          <th>Institución</th>
          <th>Evento</th>
          <th class="resumen">Resumen</th>
          <th>Fecha y Hora</th>
          <th>Lugar</th>
          <th v-if="admin" class="columnaAcciones">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="evento in eventosPaginados" :key="evento.ideventos">
          <td class="columnaTitulo">
            <router-link :to="{ name: 'evento-individual', params: { id: evento.ideventos } }">
              {{ acortadorString(evento.titulo, 60) }}
            </router-link>
          </td>
          <td class="columnaInstitucion">{{ acortadorString(evento.institucion, 30) }}</td>
          <td class="columnaTipoEvento">{{ evento.tipoEvento === 'publico' ? 'Público' : 'Privado' }}</td>
          <td class="columnaResumen">{{ acortadorString(evento.detalles, 100) }}</td>
          <td class="columnaFecha">{{ evento.fechaFin ? `${fechaCortaMes(evento)} -\n${fechaCortaMes({fecha: evento.fechaFin})}` : fechaCortaMes(evento) }}<br>{{ evento.hora.substring(0, 5) }} hrs</td>
          <td class="columnaLugar">{{ evento.lugar }}</td>
          <td v-if="admin" class="columnaAcciones">
            <div class=botonAccion>
              <BotonEditar :idEvento="evento.ideventos" />
              <BotonEliminar :eventoId="evento.ideventos" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <Paginacion v-if="eventosFiltrados.length > 9" :totalElementos="eventosFiltrados.length"
      :elementosPorPagina="elementosPorPagina" v-model:paginaActual="paginaActual" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import BotonEditar from './buttons/BotonEditar.vue';
import BotonEliminar from './buttons/BotonEliminar.vue';
import Paginacion from './Paginacion.vue';
import { fechaCortaMes, formatearFecha, acortadorString } from './utils';
import { getEventos } from '@/components/queries/queries';
import { fechaRangoMes, fechaRangoSemana } from './eventosUtils';

const institucionSeleccionada = ref('todas');
const periodo = ref('semana');
const eventos = ref([]);
const admin = localStorage.getItem('credencial');
const eventosFiltrados = ref([]);
const paginaActual = ref(1);
const elementosPorPagina = 9;
const fechaActual = ref(new Date());
const monthPickerValue = ref({
  month: fechaActual.value.getMonth(),
  year: fechaActual.value.getFullYear()
});

const institucionesUnicas = computed(() => {
  const instituciones = new Set(eventos.value.map(evento => evento.institucion));
  return Array.from(instituciones);
});

onMounted(async () => {
  await obtenerPeriodoSeleccionado();
  filtrarPorInstitucion();
});

watch(fechaActual, (newDate) => {
  monthPickerValue.value = {
    month: newDate.getMonth(),
    year: newDate.getFullYear()
  };
});

const onDatePickerChange = (value) => {
  fechaActual.value = new Date(value.year, value.month);
  obtenerPeriodoSeleccionado();
}

const eventosPaginados = computed(() => {
  const inicio = (paginaActual.value - 1) * elementosPorPagina;
  const fin = inicio + elementosPorPagina;
  return eventosFiltrados.value.slice(inicio, fin);
});

const filtrarPorPeriodo = async () => {
  await obtenerPeriodoSeleccionado();
  filtrarPorInstitucion();
};

const filtrarPorInstitucion = () => {
  paginaActual.value = 1;

  if (institucionSeleccionada.value === 'todas') {
    eventosFiltrados.value = eventos.value;
  } else {
    eventosFiltrados.value = eventos.value.filter(
      evento => evento.institucion === institucionSeleccionada.value
    );
  }
};

const retrocederSemana = async () => {
  fechaActual.value.setDate(fechaActual.value.getDate() - 7);
  await obtenerPeriodoSeleccionado();
};

const avanzarSemana = async () => {
  fechaActual.value.setDate(fechaActual.value.getDate() + 7);
  await obtenerPeriodoSeleccionado();
};

const retrocederMes = async () => {
  fechaActual.value = new Date(fechaActual.value.setMonth(fechaActual.value.getMonth() - 1));
  obtenerPeriodoSeleccionado();
};

const avanzarMes = async () => {
  fechaActual.value = new Date(fechaActual.value.setMonth(fechaActual.value.getMonth() + 1));
  obtenerPeriodoSeleccionado();
};

const obtenerPeriodoSeleccionado = async () => {
  switch (periodo.value) {
    case 'semana':
      await getEventos(eventos, fechaRangoSemana(fechaActual.value));
      break;
    case 'mes':
      await getEventos(eventos, fechaRangoMes(fechaActual.value));
      break;
    default:
      return;
  }
  filtrarPorInstitucion();
};
</script>

<style scoped>
.BotonEditar{
  font-size: 11px;
}
</style>