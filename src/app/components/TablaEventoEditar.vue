<template>
  <div v-if="evento">
    <table class="eventoInformacion">
      <div class="contenidoTabla">
        <tr>
          <td class="columnaTitulo"><label for="titulo">Titulo:</label></td>
          <td class="columnaContenido"><input type="text" id="titulo" name="titulo" v-model="evento.titulo" /></td>
        </tr>
        <tr>
          <td class="columnaTitulo"><label for="institucion">Institución:</label></td>
          <td class="columnaContenido"><input type="text" id="institucion" name="institucion"
              v-model="evento.institucion" /></td>
        </tr>
        <tr>
          <td class="columnaTitulo"><label for="fecha">Fecha:</label></td>
          <td class="columnaContenido"><input type="date" id="fecha" name="fecha" v-model="evento.fecha"
              class="pequeno" /></td>
        </tr>


        <tr>
          <td class="columnaTitulo"><label for="fechaFin">Fecha Fin:</label></td>
          <td class="columnaContenido">
            <input type="checkbox" id="toggleFechaFin" v-model="usarFechaFin" />
            <input type="date" id="fechaFin" name="fechaFin" v-model="evento.fechaFin" class="pequeno" :disabled="!usarFechaFin" />
          </td>
        </tr>




        <tr>
          <td class="columnaTitulo"><label for="hora">Hora:</label></td>
          <td class="columnaContenido"><input type="time" id="hora" name="hora" v-model="evento.hora" class="pequeno" />
          </td>
        </tr>

        <tr>
          <td class="columnaTitulo"><label for="lugar">Lugar:</label></td>
          <td class="columnaContenido">
            <select id="lugar" name="lugar" v-model="evento.lugar" class="pequeno">
              <option value="Auditorio">Auditorio</option>
              <option value="Aula Magna">Aula Magna</option>
              <option value="Aulas de usos múltiples">Aulas de usos múltiples</option>
            </select>
          </td>
        </tr>

        <tr>
          <td class="columnaTitulo"><label for="estatus">Estatus:</label></td>
          <td class="columnaContenido">
            <select id="estatus" name="estatus" v-model="evento.estatus">
              <option value="pendiente">Pendiente</option>
              <option value="aceptado">Aceptado</option>
            </select>
          </td>
        </tr>
        <tr>
          <td class="columnaTitulo"><label for="tipoEvento">Tipo de Evento:</label></td>
          <td class="columnaContenido">
            <label><input type="radio" value="privado" v-model="evento.tipoEvento" /> Privado</label>
            <label><input type="radio" value="publico" v-model="evento.tipoEvento" /> Público</label>
          </td>
        </tr>

        <tr>
          <td class="columnaTitulo"><label for="detalles">Detalles:</label></td>
          <div class="borde">
            <td class="columnaContenido"><textarea id="detalles" name="detalles" v-model="evento.detalles"></textarea>
            </td>
          </div>
        </tr>
        <tr>
          <td class="columnaTitulo"><label for="imagen">Imagen:</label></td>
          <td class="columnaContenido"><input type="file" id="imagen" @change="onFileChange('img', $event)" /></td>
        </tr>
        <tr>
          <td class="columnaTitulo"><label for="pdf">PDF:</label></td>
          <td class="columnaContenido"><input type="file" id="pdf" @change="onFileChange('pdf', $event)" /></td>
        </tr>
      </div>
    </table><br>
    <div class="boton-container">
      <BotonConfirmar :idEvento="evento.ideventos" :titulo="evento.titulo" :institucion="evento.institucion"
        :fecha="evento.fecha" :hora="evento.hora" :fechaFin="evento.fechaFin" :lugar="evento.lugar"
        :detalles="evento.detalles" :img="img" :pdf="pdf" :estatus="evento.estatus" :tipoEvento="evento.tipoEvento" />
    </div>
  </div>
  <div v-else>
    <p>Cargando...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
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

});
</script>c

<style scoped>
.eventoInformacion {
  min-width: 600px;
  width: 100%;
  height: 800px;
  padding: 2% 50px 5% 15%;
  background-color: rgb(250, 211, 210);
  border-radius: 7%;
}

.eventoInformacion tr {
  height: 50px;
}

.columnaTitulo {
  text-align: right;
  font-size: 18px;
  vertical-align: top;
}

.columnaTitulo label {
  font-size: 18px;
  font-weight: 600;
}

.columnaContenido {
  padding-left: 5%;
  text-align: left;
  width: 100%;
}

.columnaContenido input {
  font-size: 18px;
  font-weight: 400;
  width: 100%;
  height: 30px;
  border: none;
  background-color: rgb(246, 246, 246);
}

.columnaContenido input.pequeno {
  width: auto;
  max-width: 200px;
}

.titulo {
  font-size: 25px;
  font-weight: 600;
}

.institucion {
  font-size: 25px;
  font-weight: 600;
}

.fechaLugar {
  font-size: 19px;
  font-weight: 500;
}

.borde {
  background-color: rgb(246, 246, 246);
  border-radius: 7%;
  max-height: 600px;
  min-height: 400px;
  overflow: auto;
  padding: 0 5px;
}

.detalles {
  font-size: 18px;
  line-height: 2;
  text-align: justify;
  height: 500px;
}

textarea {
  width: 440%;
  height: 400px;
  margin: 10px 0;
  resize: none;
  background-color: rgb(246, 246, 246);
  border-radius: 2%;
}

.boton-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
