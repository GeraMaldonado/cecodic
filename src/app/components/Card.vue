<template>
  <div class="card">
    <div class="card-header">
      <img v-if="img" :src="img" alt="Imagen del evento" class="card-img" />
      <div :class="['contenedorTitulo', { 'with-img': img }]">
        <h2 class="tituloCard">{{ titulo }}</h2>
      </div>
    </div>
    <p class="resumenCard">{{ resumen }}</p>
    <p class="ubicacionCard">{{ ubicacion }}</p>
    <p class="horaCard">{{ hora }} hrs</p>
  </div>
</template>

<script setup>
const props = defineProps({
  titulo: String,
  resumen: String,
  ubicacion: String,
  hora: String,
  img: String,
});
</script>

<style scoped>
.card{
  background-color: rgb(246, 210, 208);
  height: 440px;
  width: 310px;
  border-radius: 50px;
  padding: 5px 15px 5px 15px;
  text-align: center;
  align-items: center;
  position: relative;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.card-img {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 50%;
  border: 7px solid rgb(246, 246, 246);
  background-color: rgb(246, 246, 246);
  position: absolute;
  top: -30px;
  left: -40px;
  overflow: hidden;
}
.contenedorTitulo {
  height: 130px;
  font-size: 14px;
  line-height: 1.3;
  color: black;
  display: flex;
  align-items: center;
  justify-content: left;
  transition: margin-left 0.3s ease;
}

.contenedorTitulo.with-img {
  margin-left: 80px;
}
.ubicacionCard, .horaCard {
  margin-top: -15px;
  color: black;
  font-size: 15px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
}

.horaCard {
  white-space: pre-line;
}

.resumenCard {
  margin-top: 20px;
  height: 169px;
  width: 280px;
  line-height: 1.4;
  border-radius: 25px;
  padding: 5px 15px;
  color: black;
  font-size: 17px;
  background-color: rgb(246, 246, 246);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
</style>
