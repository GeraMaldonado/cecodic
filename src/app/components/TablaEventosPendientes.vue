<template>
  <div>
    <table class="tablaEventos">
      <thead>
        <tr>
          <th>Nombre del evento</th>
          <th>Institución</th>
          <th>Resumen</th>
          <th>Fecha y Hora</th>
          <th>Lugar</th>
          <th>Estatus</th>
          <th v-if="admin">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="eventoPendiente in eventosPendientes" :key="eventoPendiente.ideventos">
          <td class="columnaTitulo">
            <router-link :to="{ name: 'evento-individual', params: { id: eventoPendiente.ideventos } }">
              {{ acortadorString(eventoPendiente.titulo, 60) }}
            </router-link>
          </td>
          <td class="columnaInstitucion">{{ acortadorString(eventoPendiente.institucion, 30) }}</td>
          <td class="columnaResumen">{{ acortadorString(eventoPendiente.detalles, 100) }}</td>
          <td class="columnaFecha">{{ eventoPendiente.fechaFin ? `Del ${fechaCortaMes(eventoPendiente)} al ${fechaCortaMes({ fecha: eventoPendiente.fechaFin })}` : fechaCortaMes(eventoPendiente) }}<br>{{ eventoPendiente.hora.substring(0, 5) }} hrs</td>
          <td class="columnaLugar">{{ eventoPendiente.lugar }}</td>
          <td class="columnaLugar">{{ eventoPendiente.estatus }}</td>
          <td v-if="admin">
          <td>
            <BotonEditar :idEvento="eventoPendiente.ideventos" />
          </td>
          <td>
            <BotonEliminar :eventoId="eventoPendiente.ideventos" />
          </td>
          <td>
            <BotonAceptarEvento :idEvento="eventoPendiente.ideventos" :estatus="eventoPendiente.estatus" />
          </td>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import BotonEditar from './buttons/BotonEditar.vue';
import BotonEliminar from './buttons/BotonEliminar.vue';
import BotonAceptarEvento from './buttons/BotonAceptarEvento.vue';
import { fechaCortaMes, fechaConsulta, acortadorString } from './utils';
import { getEventosPendientes } from '@/components/queries/queries';
import { fechaRangoMes, fechaRangoSemana } from './eventosUtils';

const eventosPendientes = ref([]);
const admin = localStorage.getItem('credencial');
const eventosFiltrados = ref([]);

onMounted(async () => {
  getEventosPendientes(eventosPendientes);
});

</script>

<style scoped>
.tablaEventos {
  margin: 5% 10%;
}

.tablaEventos th {
  color: white;
  background-color: rgb(120, 16, 5);
  text-align: center;
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
  font-size: 14px;
  font-weight: 700;
  text-align: center;
}

.columnaResumen {
  width: 25%;
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
  margin-bottom: -50px;
  .filtrofechas{
    display: flex;
  }
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

@media (max-width: 850px){
  .filtros{
    display: block;
    margin-bottom: 25px;
    .filtrofechas{
    display: flex;
    }

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
