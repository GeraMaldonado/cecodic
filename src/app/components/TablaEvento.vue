<template>
  <table class="eventoInformacion">
    <div class="contenidoTabla">
      <tr>
        <td class="columnaTitulo">
          <h3>Titulo: </h3>
        </td>
        <td class="columnaContenido">
          <div class="tituloImagenWrapper">
            <p class="titulo">{{ titulo }}</p>
            <img v-if="img" :src="rutaArchivo(img)" alt="Imagen del Evento" class="eventoImagen" />
          </div>
        </td>
      </tr>
      <tr>
        <td class="columnaTitulo">
          <h3>Institución: </h3>
        </td>
        <td class="columnaContenido">
          <p class="institucion">{{ institucion }}</p>
        </td>
      </tr>
      <tr>
        <td class="columnaTitulo">
          <h3>Fecha: </h3>
        </td>
        <td class="columnaContenido">
          <p class="fechaLugar">{{ fechaLarga(fecha) }}</p>
        </td>
      </tr>
      <tr>
        <td class="columnaTitulo">
          <h3>Hora: </h3>
        </td>
        <td class="columnaContenido">
          <p class="fechaLugar">{{ hora.substring(0, 5) }} hrs</p>
        </td>
      </tr>
      <tr>
        <td class="columnaTitulo">
          <h3>Lugar: </h3>
        </td>
        <td class="columnaContenido">
          <p class="fechaLugar">{{ lugar }}</p>
        </td>
      </tr>
      <tr>
        <td class="columnaTitulo">
          <h3>Detalles: </h3>
        </td>
        <div class="borde">
          <td class="columnaContenido">
            <p class="detalles">{{ detalles }}</p>
          </td>
        </div>
      </tr>
      <tr v-if="pdf">
        <td class="centrar" colspan="2">
          <a :href="rutaArchivo(pdf)" target="_blank">Descargar PDF</a>
        </td>
      </tr>
    </div>
  </table>
</template>



<script setup>
import { fechaLarga, urlUpload } from './utils';
import BotonEditar from './buttons/BotonEditar.vue';
import BotonEliminar from './buttons/BotonEliminar.vue';

const props = defineProps({
  titulo: String,
  institucion: String,
  fecha: String,
  hora: String,
  lugar: String,
  detalles: String,
  img: String,
  pdf: String
});

const rutaArchivo = (nombre) => `${urlUpload}/${nombre}`
</script>


<style scoped>
.eventoInformacion {
  width: 100%;
  height: 800px;
  padding: 2% 50px 5% 15%;
  background-color: rgb(250, 211, 210);
  border-radius: 7%;
}

.eventoInformacion tr td {
  padding-top: 0px;
  padding-bottom: 0px;
}

.columnaTitulo {
  text-align: right;
  font-size: 18px;
  vertical-align: top;
}

.columnaContenido {
  padding-left: 5%;
  text-align: left;
  width: 100%;
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
  min-height: 300px;
  overflow: auto;
  padding: 0 5px;
}

.detalles {
  font-size: 18px;
  line-height: 2;
  text-align: justify;
  height: 500px;
  white-space: pre-line;
}

.tituloImagenWrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.eventoImagen {
  width: 250px;
  height: 250px;
  border-radius: 50%;
  border: 7px solid rgb(246, 246, 246);
  position: absolute;
  top: 50px;
  right: 50px;
  transform: translate(50%, -50%);
}

.titulo {
  margin-right: 270px;
  z-index: 1;
  position: relative;
}

.centrar {
  text-align: center;
  vertical-align: middle;
}
</style>