<template>
  <div class="pantalla">
    <table class="contenedorTabla">
      <tbody class="contenedorFilas">
        <tr>
          <td class="columnaEtiqueta">
            <h3>Evento: </h3>
          </td>
          <td class="columnaInformacion">
            <div class="tituloImagenWrapper">
              <img v-if="img" :src="rutaArchivo(img)" alt="Imagen del Evento" class="eventoImagen" />
              <p :class="['titulo', { 'with-img': img }]">{{ titulo }}</p>
            </div>
          </td>
        </tr>
        <tr>
          <td class="columnaEtiqueta">
            <h3>Institución: </h3>
          </td>
          <td class="columnaInformacion">
            <p class="institucion">{{ institucion }}</p>
          </td>
        </tr>
        <tr>
          <td class="columnaEtiqueta">
            <h3>Fecha: </h3>
          </td>
          <td class="columnaInformacion">
            <p class="fechaLugar">
              <span v-if="fechaFin">Del {{ fechaLarga(fecha) }}  al {{ fechaLarga(fechaFin) }} de {{fechaFin.substring(0,4)}}</span>
              <span v-else>{{ fechaLarga(fecha) }}</span>
            </p>
          </td>
        </tr>

        <tr>
          <td class="columnaEtiqueta">
            <h3>Hora: </h3>
          </td>
          <td class="columnaInformacion">
            <p class="fechaLugar">{{ hora.substring(0, 5) }} hrs</p>
          </td>
        </tr>
        <tr>
          <td class="columnaEtiqueta">
            <h3>Lugar: </h3>
          </td>
          <td class="columnaInformacion">
            <p class="fechaLugar">{{ lugar }}</p>
          </td>
        </tr>

        <tr v-if="tipoEvento">
          <td class="columnaEtiqueta">
            <h3>Tipo de evento: </h3>
          </td>
          <td class="columnaInformacion">
            <p class="fechaLugar">{{ tipoEvento === 'publico' ? 'Público' : 'Privado' }}</p>
          </td>
        </tr>

        <tr v-if="detalles">
          <td class="columnaEtiqueta">
            <h3>Detalles: </h3>
          </td>
          <td class="columnaInformacion">
            <p class="detalles">{{ detalles }}</p>
          </td>
        </tr>
        <tr class="pdf" v-if="pdf">
          <td  colspan="2">
            <a :href="rutaArchivo(pdf)" target="_blank">Descargar PDF</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>



<script setup>
import { fechaLarga, urlUpload } from './utils';

const props = defineProps({
  titulo: String,
  institucion: String,
  fecha: String,
  hora: String,
  lugar: String,
  detalles: String,
  img: String,
  pdf: String,
  fechaFin: String,
  tipoEvento: String
});

const rutaArchivo = (nombre) => `${urlUpload}/${nombre}`
</script>

<style scoped>
.detalles {
  font-size: 18px;
  line-height: 1.5;
  white-space: pre-line;
  background-color: var(--color-background);
  padding: 10px;
  border-radius: 20px;
}

.tituloImagenWrapper {
  position: relative;
  display: flex;
  align-items: center;

}


.titulo {
  z-index: 1;
  font-size: 21px;
  line-height: 1.2;
  font-weight: bold;
  text-align: left;
  margin: 0;
}

.titulo.with-img {
  margin-right: 100px;
  text-align: left;
}

.eventoImagen {
  width: 250px;
  height: 250px;
  object-fit: cover;
  border-radius: 50%;
  border: 7px solid var(--color-background);
  background-color: var(--color-background);
  position: absolute;
  top: -100px;
  right: -180px;
  z-index: 0;
  overflow: hidden;
}

.contenedorTabla {
  position: relative;
  overflow: visible;
}

.institucion, .fechaLugar, .pdf{
  font-size: 19px;
  line-height: 1.5;
}
.pdf{
  display: flex;
  justify-content: center;
}

@media (max-width: 900px) {
  .tituloImagenWrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-right: 0;
  }

  .eventoImagen {
    position: static;
    margin-bottom: 10px;
    width: 180px;
    height: 180px;
  }

  .titulo {
    margin-right: 0;
    text-align: center;
  }
  .titulo.with-img {
  margin-right: 0;
  text-align: left;
}
}

@media (max-width: 740px) {
  .contenedorFilas tr {
    display: flex;
    flex-direction: column;
    align-content: center
  }


  .columnaInformacion {
    display: flex;
    justify-content: center;
  }

  .columnaEtiqueta h3 {
    width: 100%;
    text-align: center;

  }
}
</style>