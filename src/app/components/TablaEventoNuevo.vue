<template>
  <div class="pantalla">
  <table class="contenedorTabla">
    <tbody class="contenedorFilas"> 
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
          <tr v-if="!admin">
            <td class="columnaEtiqueta"><label for="nombreUsuario">Nombre:</label></td>
            <td class="columnaContacto"><input type="text" id="nombreUsuario" name="nombreUsuario" v-model="nombreUsuario" required /></td>
          </tr>
          <tr v-if="!admin">
            <td class="columnaEtiqueta"><label for="correoUsuario">Correo:</label></td>
            <td class="columnaContacto"><input type="email" id="correoUsuario" name="correoUsuario" v-model="correoUsuario" required placeholder="nombre@ejemplo.com"/></td>
          </tr>
          <tr v-if="!admin">
            <td class="columnaEtiqueta"><label for="numeroUsuario">Teléfono:</label></td>
            <td class="columnaContacto"><input type="tel" id="numeroUsuario" name="numeroUsuario" v-model="numeroUsuario" required pattern="[0-9]*" inputmode="numeric" /></td>
          </tr>

          <tr v-if="!admin">
            <td colspan="2" class="columnaContacto">
              <button :disabled="!correoUsuario" @click="enviarCodigoVerificacion">Enviar Código de Verificación</button>
            </td>
          </tr>

          <tr v-if="codigoEnviado">
            <td class="columnaEtiqueta"><label for="codigoUsuario">Código de Verificación:</label></td>
            <td class="columnaContacto">
              <input type="text" id="codigoUsuario" name="codigoUsuario" v-model="codigoUsuario" required />
            </td>
          </tr>
      
    </tbody>
  </table>
  <div class="boton-container" v-if="admin">
    <BotonConfirmar :titulo="titulo" :institucion="institucion" :fecha="fecha" :hora="hora" :lugar="lugaresSeleccionados.join(', ')"
      :detalles="detalles" :img="img" :pdf="pdf" :fechaFin="mostrarFechaFin ? fechaFin : null" 
      :tipoEvento="tipoEvento" :estatus="estatus"/>
  </div>
    <div class="boton-container" v-else>
      <BotonEnviarEventoUsuario :titulo="titulo" :institucion="institucion" :fecha="fecha" :hora="hora" :lugar="lugaresSeleccionados.join(', ')" 
        :detalles="detalles" :img="img" :pdf="pdf" :fechaFin="mostrarFechaFin ? fechaFin : null" 
        :tipoEvento="tipoEvento" :correo="correoUsuario" :codigo="codigoUsuario" :disabled="!codigoUsuario" 
      />
    </div>
</div>
</template>

<script setup>
import { ref, watch } from 'vue';
import BotonConfirmar from './buttons/BotonConfirmar.vue';
import BotonEnviarEventoUsuario from './buttons/BotonEnviarEventoUsuario.vue';
import { comprobarCorreo } from './queries/queries';
import { useToast } from 'primevue/usetoast';

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

const nombreUsuario = ref('');
const correoUsuario = ref('');
const numeroUsuario = ref('');
const codigoUsuario = ref('');
const codigoEnviado = ref(false);
const toast = useToast();

watch([fecha, fechaFin], ([nuevaFecha, nuevaFechaFin]) => {
  if (nuevaFecha && nuevaFechaFin && new Date(nuevaFechaFin) < new Date(nuevaFecha)) {
    toast.add({ severity: 'warn', summary: '', detail: 'La fecha de finalización no puede ser anterior a la fecha de inicio.', life: 5000 });
    fechaFin.value = null;
  }
});

const enviarCodigoVerificacion = async () => {
  const contactoUsuario = {
    correo: correoUsuario.value,
    nombre: nombreUsuario.value,
    telefono: numeroUsuario.value,
  };

  try {
    await comprobarCorreo(contactoUsuario);
    toast.add({ severity: 'info', summary: '', detail: `Código de verificación enviado a ${correoUsuario.value}`, life: 5000 });
    codigoEnviado.value = true;
  } catch (error) {
    toast.add({ severity: 'error', summary: '', detail: 'Error al enviar el código de verificación. Por favor, revisa la conexión y vuelve a intentar.', life: 5000 });
  }
};

const onFileChange = (type, event) => {
  const file = event.target.files[0];
  if (type === 'img') img.value = file;
  if (type === 'pdf') pdf.value = file;
};

</script>


<style>
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
  width: 70%;
  min-width: 320px;
  tr:nth-child(odd){
    background-color: rgb(252, 221, 220);
  }
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

</style>