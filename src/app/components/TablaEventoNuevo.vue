<template>
  <div class="pantalla">
  <table class="contenedorTabla">
    <div class="contenedorFilas">
      <div style="width: 90%;">
        <tr>
          <td class="columnaEtiqueta"><label for="titulo">Evento:</label></td>
          <td class="columnaInformacion"><input type="text" id="titulo" name="titulo" v-model="titulo" /></td>
        </tr>
        <tr>
          <td class="columnaEtiqueta"><label for="institucion">Institución:</label></td>
          <td class="columnaInformacion"><input type="text" id="institucion" name="institucion" v-model="institucion" />
          </td>
        </tr>
        <tr>
          <td><div class="columnaEtiqueta"><label for="fecha">Fecha:</label></div></td>
          <td class="contenedorFechas columnaInformacion">
            <div class="contenedorFecha"><input type="date" id="fecha" name="fecha" v-model="fecha" /></div>
            <div class="contenedorFecha">
              <div><label for="fechaFin">Fecha de<br>finalización:</label></div>
              <div><input type="date" id="fechaFin" name="fechaFin" v-model="fechaFin" :disabled="!mostrarFechaFin" /></div>
            </div>
          </td>        
        </tr>
        <tr>
          <td></td>
          <td>
            <input type="checkbox" id="toggleFechaFin" v-model="mostrarFechaFin" />
            <label for="toggleFechaFin">¿Agregar fecha de finalización?</label>
          </td>
        </tr>
        <tr>
          <td class="columnaEtiqueta"><label for="hora">Hora:</label></td>
          <td><input type="time" id="hora" name="hora" v-model="hora" /></td>
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
              <input type="radio" id="privado" value="privado" v-model="tipoEvento" />
              <label for="privado">Privado</label>
            </div>
            <div>
              <input type="radio" id="publico" value="publico" v-model="tipoEvento" />
              <label for="publico">Público</label>
            </div>
          </td>
        </tr>
        
      <tr>
          <td class="columnaEtiqueta"><label for="detalles">Detalles:</label></td>
          <td class="columnaInformacion">
            <div class="contenedorDetalles">
              <label for="detalles" class="detalles-label">.</label>
              <textarea id="detalles" name="detalles" v-model="detalles"></textarea>
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

        <tr v-if="admin">
          <td class="columnaEtiqueta"><label for="estatus">Estatus:</label></td>
          <td>
            <select id="estatus" name="estatus" v-model="estatus">
              <option value="pendiente">Pendiente</option>
              <option value="aceptado">Aceptado</option>
            </select>
          </td>
        </tr>
      </div>
    </div>
  </table>
  <div class="boton-container">
    <BotonConfirmar :titulo="titulo" :institucion="institucion" :fecha="fecha" :hora="hora" :lugar="lugaresSeleccionados.join(', ')"
      :detalles="detalles" :img="img" :pdf="pdf" :fechaFin="mostrarFechaFin ? fechaFin : null" 
      :tipoEvento="tipoEvento" :estatus="estatus" />
  </div>
</div>
</template>

<script setup>
import { ref } from 'vue';
import BotonConfirmar from './buttons/BotonConfirmar.vue';

const titulo = ref('');
const institucion = ref('');
const fecha = ref('');
const hora = ref('');
const lugaresSeleccionados = ref([]);

const detalles = ref('');
const img = ref(null);
const pdf = ref(null);
const fechaFin = ref(null);
const mostrarFechaFin = ref(false);
const estatus = ref('pendiente');
const tipoEvento = ref('publico');
const admin = localStorage.getItem('credencial');


const onFileChange = (type, event) => {
  const file = event.target.files[0];
  if (type === 'img') img.value = file;
  if (type === 'pdf') pdf.value = file;
};
</script>


<style scoped>
.pantalla{
  display: flex;
  gap: 30px;
  flex-direction: column;
  align-items: center;
}
.contenedorTabla{
  min-width: 358px;
  width: 70vw;
  border-spacing: 0 15px;
  background-color: rgb(250, 211, 210);
  display: flex;
  justify-content: center;
  border-radius: 40px;
}
.contenedorFilas{
  margin: 20px;
  width: 80%;
  min-width: 320px;
  overflow: hidden;
  display: flex;
  justify-content: center;
}
.contenedorFechas{
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  .contenedorFecha{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center
  }
}
.contenedorLugar{
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 190px;
}

.contenedorEvento{
  label{
    margin-left: 5px;
  }
}

.columnaEtiqueta{
  text-align: right;
  font-size: 18px;
  font-weight: 600;
  display: flex;
  justify-content: end;
  margin-right: 20px;
}

textarea{
  background-color: rgb(246, 246, 246);
  min-width: 190px;
  width: 100%;
  min-height: 110px;
  max-height: 500px;
  resize: vertical;
  padding: 10px;
  border-radius: 15px;
}

.columnaInformacion {

  width: 100%;
  min-width: 190px;
  input{
    width: 100%;
    min-width: 190px;
    height: 30px;
    border-radius: 2px;
    border: none;
    background-color: rgb(246, 246, 246);
    font-size: 17px;
    font-weight: 400;
  }
}

.input-file {
  min-width: 190px;
  width: 100%;
  height: 30px;
}

.detalles-label{
  visibility:hidden;
}

div tr:nth-child(odd){
  background-color: rgb(252, 221, 220);
}

</style>