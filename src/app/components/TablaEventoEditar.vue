<template>
  <div v-if="evento" class="pantalla">
    <table class="contenedorTabla">
      <tbody class="contenedorFilas">
        
          <tr>
            <td class="columnaEtiqueta"><label for="titulo">Evento:</label></td>
            <td class="columnaInformacion"><input type="text" id="titulo" name="titulo" v-model="evento.titulo" /></td>
          </tr>
          <tr>
            <td class="columnaEtiqueta"evento.><label for="institucion">Institución:</label></td>
            <td class="columnaInformacion"><input type="text" id="institucion" name="institucion" v-model="evento.institucion" />
            </td>
          </tr>
          <tr>
            <td><div class="columnaEtiqueta"><label for="fecha">Fecha:</label></div></td>
            <td class="contenedorFechas columnaInformacion">
              <div class="contenedorFecha"><input type="date" id="fecha" name="fecha" v-model="evento.fecha" /></div>
              <div class="contenedorFecha">
                <div><label for="fechaFin">Fecha de finalización: </label></div>
                <div><input type="date" id="fechaFin" name="fechaFin" v-model="evento.fechaFin" :disabled="!usarFechaFin" /></div>
              </div>
            </td>        
          </tr>
          <tr>
            <td></td>
            <td>
              <input type="checkbox" id="toggleFechaFin" v-model="usarFechaFin" />
              <label for="toggleFechaFin">¿Agregar fecha de finalización?</label>
            </td>
          </tr>
          <tr>
            <td class="columnaEtiqueta"><label for="hora">Hora:</label></td>
            <td><input type="time" id="hora" name="hora" v-model="evento.hora" /></td>
          </tr>
          <tr>
            <td class="columnaEtiqueta"><label for="lugar">Lugar:</label></td>
            <td>
              <div class="contenedorLugar">
                <label><input type="checkbox" value="Auditorio" v-model="lugaresSeleccionados" /> Auditorio</label>
                <label><input type="checkbox" value="Aula Magna" v-model="lugaresSeleccionados" /> Aula Magna</label>
                <label><input type="checkbox" value="Aulas de usos múltiples" v-model="lugaresSeleccionados" /> Aulas de usos múltiples</label>
              </div>
            </td>
          </tr>
          <tr>
          <td class="columnaEtiqueta"><label>Tipo de evento:</label></td>
          <td class="contenedorEvento">
            <div>
              <input type="radio" id="privado" value="privado" v-model="evento.tipoEvento" />
              <label for="privado">Privado</label>
            </div>
            <div>
              <input type="radio" id="publico" value="publico" v-model="evento.tipoEvento" />
              <label for="publico">Público</label>
            </div>
          </td>
        </tr>
      <tr>
          <td class="columnaEtiqueta"><label for="detalles">Detalles:</label></td>
          <td class="columnaInformacion">
            <div class="contenedorDetalles">
              <label for="detalles" class="detalles-label">.</label>
              <textarea id="detalles" name="detalles" v-model="evento.detalles"></textarea>
            </div>
          </td>
        </tr>
        <tr>
          <td class="columnaEtiqueta"><label for="imagen">Imagen:</label></td>
          <td class="columnaContenido"><input type="file" id="imagen" @change="onFileChange('img', $event)" accept=".jpg, .jpeg, .png, .gif, .svg, .webp, .bmp" class="input-file" /></td>
        </tr>
        <tr>
          <td class="columnaEtiqueta"><label for="pdf">PDF:</label></td>
          <td class="columnaContenido"><input type="file" id="pdf" @change="onFileChange('pdf', $event)" accept=".pdf" class="input-file" /></td>
        </tr>
        <tr>
          <td class="columnaEtiqueta"><label for="estatus">Estatus:</label></td>
          <td>
            <select id="estatus" name="estatus" v-model="evento.estatus">
              <option value="pendiente">Pendiente</option>
              <option value="aceptado">Aceptado</option>
            </select>
          </td>
        </tr>
        
      </tbody>
    </table><br>
    <div class="boton-container">
      <BotonConfirmar :idEvento="evento.ideventos" :titulo="evento.titulo" :institucion="evento.institucion"
        :fecha="evento.fecha" :hora="evento.hora" :fechaFin="usarFechaFin ? evento.fechaFin : null" :lugar="lugaresSeleccionados.join(', ')"
        :detalles="evento.detalles" :img="img" :pdf="pdf" :estatus="evento.estatus" :tipoEvento="evento.tipoEvento" />
    </div>
  </div>
  <div v-else>
    <p>Cargando...</p>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import BotonConfirmar from './buttons/BotonConfirmar.vue';
import { getEvento } from './queries/queries';
import { formatearFecha } from './utils';

const route = useRoute();
const evento = ref({
  id: '',
  titulo: '',
  institucion: '',
  fecha: '',
  hora: '',
  lugar: '',
  detalles: '',
  fechaFin: '',
  tipoEvento: '',
  estatus: ''
});
const img = ref(null);
const pdf = ref(null);
const usarFechaFin = ref(!!evento.value.fechaFin);
const lugaresSeleccionados = ref([]);


watch([() => evento.value.fecha, () => evento.value.fechaFin], ([fecha, fechaFin]) => {
  if (fecha && fechaFin && new Date(fechaFin) < new Date(fecha)) {
    alert('La fecha de finalización no puede ser anterior a la fecha de inicio.');
    evento.value.fechaFin = '';
  }
});

const onFileChange = (type, event) => {
  const file = event.target.files[0];
  if (type === 'img') img.value = file;
  if (type === 'pdf') pdf.value = file;
};

onMounted(async () => {
  await getEvento(evento, route);
  evento.value.fecha = formatearFecha(evento.value.fecha);
  if (evento.value.fechaFin != null) {
    evento.value.fechaFin = formatearFecha(evento.value.fechaFin);
    usarFechaFin.value = true;
  }
  if (evento.value.lugar) {
    lugaresSeleccionados.value = evento.value.lugar.split(', ');
  }
});
</script>