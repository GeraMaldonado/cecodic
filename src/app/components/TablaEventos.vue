<template>
  <div>
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


      <div class="contenedorFiltroFecha">
        <div class="filtroFecha">
          <p>Ver por:</p>
          <select v-model="periodo" @change="filtrarPorPeriodo">
            <option value="semana">Semana</option>
            <option value="mes">Mes</option>
          </select>
        </div>
      </div>

      <div class="navegacionFecha">
        <button @click="retrocederSemana" v-if="periodo === 'semana'">Semana Anterior</button>
        <button @click="avanzarSemana" v-if="periodo === 'semana'">Semana Siguiente</button>
        <button @click="retrocederMes" v-if="periodo === 'mes'">Mes Anterior</button>
        <button @click="avanzarMes" v-if="periodo === 'mes'">Mes Siguiente</button>
      </div>
    </div>

    <table class="tablaEventos" v-if="eventosPaginados.length > 0">
      <thead>
        <tr>
          <th>Título</th>
          <th>Institución</th>
          <th>Resumen</th>
          <th>Fecha y Hora</th>
          <th>Lugar</th>
          <th v-if="admin">Acciones</th>
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
          <td class="columnaResumen">{{ acortadorString(evento.detalles, 150) }}</td>
          <td class="columnaFecha">{{ fechaCortaMes(evento) }}<br>{{ evento.hora.substring(0, 5) }} hrs</td>
          <td class="columnaLugar">{{ evento.lugar }}</td>
          <td v-if="admin">
          <td>
            <BotonEditar :idEvento="evento.ideventos" />
          </td>
          <td>
            <BotonEliminar :eventoId="evento.ideventos" />
          </td>
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
import { fechaCortaMes, fechaConsulta, acortadorString } from './utils';
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

const institucionesUnicas = computed(() => {
  const instituciones = new Set(eventos.value.map(evento => evento.institucion));
  return Array.from(instituciones);
});

onMounted(async () => {
  await obtenerPeriodoSeleccionado();
  filtrarPorInstitucion();
});

watch([periodo, fechaActual], () => {
  obtenerPeriodoSeleccionado();
});

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
  if (institucionSeleccionada.value === 'todas') {
    eventosFiltrados.value = eventos.value;
  } else {
    eventosFiltrados.value = eventos.value.filter(
      evento => evento.institucion === institucionSeleccionada.value
    );
  }
};

const retrocederSemana = async () => {
  fechaActual.value = new Date(fechaActual.value.setDate(fechaActual.value.getDate() - 7));
  await obtenerPeriodoSeleccionado();
};

const avanzarSemana = async () => {
  fechaActual.value = new Date(fechaActual.value.setDate(fechaActual.value.getDate() + 7));
  await obtenerPeriodoSeleccionado();
};

const retrocederMes = async () => {
  fechaActual.value = new Date(fechaActual.value.setMonth(fechaActual.value.getMonth() - 1));
  await obtenerPeriodoSeleccionado();
};

const avanzarMes = async () => {
  fechaActual.value = new Date(fechaActual.value.setMonth(fechaActual.value.getMonth() + 1));
  await obtenerPeriodoSeleccionado();
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
.tablaEventos {
  margin: 5% 10%;
}

.tablaEventos th {
  color: white;
  background-color: rgb(120, 16, 5);
  text-align: left;
}

.tablaEventos tr:nth-child(odd) {
  background-color: rgb(250, 211, 210);
}

.tablaEventos tr:nth-child(even) {
  background-color: rgb(247, 185, 183);
}

.tablaEventos td {
  padding-top: 10px;
  padding-bottom: 10px;
  margin-left: 15px;
}

.columnaTitulo {
  width: 20%;
  padding-left: 1%;
  padding-right: 1%;
}

.columnaTitulo a {
  text-decoration: none;
  color: black;
  font-size: 16px;
  font-weight: 700;
}

.columnaTitulo a:hover {
  text-decoration: underline;
}

.columnaInstitucion {
  width: 10%;
  color: black;
  font-size: 20px;
  font-weight: 700;
  text-align: center;
}

.columnaResumen {
  max-width: 40%;
  width: 40%;
}

.columnaFecha,
.columnaLugar {
  width: 15%;
  font-size: 18px;
  text-align: center;
}

.filtros {
  display: flex;
  justify-content: center;
  margin-left: 10%;
  margin-bottom: -50px;
}

.filtros p {
  font-size: 20px;
  font-weight: 500;
}

.filtros .filtroInstitucion,
.filtros .filtroFecha {
  display: flex;
  align-items: center;
  margin-left: 100px;

  select {
    background-color: rgb(246, 246, 246);
  }
}

.filtroInstitucion select {
  width: 100px;
}

.navegacionFecha {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.navegacionFecha button {
  margin: 0 10px;
  padding: 0px 5px;
  font-size: 14px;
  background-color: rgb(248, 223, 222);
  border: 1px solid rgb(245, 198, 196);
  border-radius: 10px;
}

.navegacionFecha button:hover {
  background-color: rgb(255, 197, 195);
}
</style>
