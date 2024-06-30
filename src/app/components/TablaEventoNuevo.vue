<template>
  <table class="eventoInformacion">
    <div class="contenidoTabla">
      <tr>
        <td class="columnaTitulo"><label for="titulo">Titulo:</label></td>
        <td class="columnaContenido"><input type="text" id="titulo" name="titulo" v-model="titulo" /></td>
      </tr>
      <tr>
        <td class="columnaTitulo"><label for="institucion">Institución:</label></td>
        <td class="columnaContenido"><input type="text" id="institucion" name="institucion" v-model="institucion" />
        </td>
      </tr>
      <tr>
        <td class="columnaTitulo"><label for="fecha">Fecha:</label></td>
        <td class="columnaContenido"><input type="date" id="fecha" name="fecha" v-model="fecha" class="pequeno" /></td>
      </tr>
      <tr>
        <td class="columnaTitulo"><label for="hora">Hora:</label></td>
        <td class="columnaContenido"><input type="time" id="hora" name="hora" v-model="hora" class="pequeno" /></td>
      </tr>


      <tr>
        <td class="columnaTitulo"><label for="lugar">Lugar:</label></td>
        <td class="columnaContenido">
          <select id="lugar" name="lugar" v-model="lugar" class="pequeno">
            <option value="Auditorio">Auditorio</option>
            <option value="Aula Magna">Aula Magna</option>
            <option value="Aulas de usos múltiples">Aulas de usos múltiples</option>
          </select>
        </td>
      </tr>
      <tr>
        <td class="columnaTitulo"><label for="detalles">Detalles:</label></td>
        <div class="borde">
          <td class="columnaContenido"><textarea id="detalles" name="detalles" v-model="detalles"></textarea></td>
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
  </table>
  <div class="boton-container">
    <BotonConfirmar :titulo="titulo" :institucion="institucion" :fecha="fecha" :hora="hora" :lugar="lugar"
      :detalles="detalles" :img="img" :pdf="pdf" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import BotonConfirmar from './buttons/BotonConfirmar.vue';

const titulo = ref('');
const institucion = ref('');
const fecha = ref('');
const hora = ref('');
const lugar = ref('');

const detalles = ref('');
const img = ref(null);
const pdf = ref(null);

const onFileChange = (type, event) => {
  const file = event.target.files[0];
  if (type === 'img') img.value = file;
  if (type === 'pdf') pdf.value = file;
};
</script>

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