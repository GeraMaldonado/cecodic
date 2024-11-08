<template>
  <div class="card">
    <table>
      <tbody>
        <tr class="tituloCard">
          <td colspan="2">
            <div class="tituloWrapper">
              <img v-if="img" :src="img" alt="Imagen del evento" class="card-img" />
              <div :class="['contenedorTitulo', { 'with-img': img }]">
                <h2>{{ titulo }}</h2>
              </div>
            </div>
          </td>
        </tr>
        <tr class="resumenCard">
          <td colspan="2" class="contenedorResumenCard">
            <p>{{ resumen }}</p>
          </td>
        </tr>
        <tr class="ubicacionCard">
          <td colspan="2">
            <p>{{ ubicacion }}</p>
          </td>
        </tr>
        <tr class="horaCard">
          <td colspan="2">
            <p>{{ hora }} hrs</p>
          </td>
        </tr>
      </tbody>
    </table>
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
  height: clamp(390px, 32vmax ,440px);
  width: clamp(260px, 19.5vmax, 310px);
  background-color: var(--color-base);
  display: flex;
  flex-direction: column;
  padding: 5px 10px;
  border-radius: 50px;
  position: relative;
  table, tbody{
    height: 100%;
  }
}
p, h2{
  text-align: center;
  color: var(--color-black);
}
.tituloCard{
  height: 30%;
  font-size: 80%;
  line-height: 1.3;
  div{
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: margin-left 0.3s ease;  
  }
}
.contenedorTitulo.with-img h2 {
  margin-left: 100px;
  text-align: left;
  font-size: 120%;
  height: 100%;
  display: flex;
  align-items: center;
}

.resumenCard{
  height: 40%;
  .contenedorResumenCard{
    background-color: var(--color-background);
    height: clamp(153px, 100%, 168px);
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    font-size: 100%;
    line-height: 1.4;
    overflow: hidden;
  }
}
.ubicacionCard, .horaCard{
  height: 15%;
  font-size: .9em;
  font-weight: 600;
  white-space: pre-line;
}

.card-img{
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 50%;
  border: 7px solid var(--color-background);
  background-color: var(--color-background);
  position: absolute;
  top: -30px;
  left: -20px;
  overflow: hidden;
}

.tituloCard.con-imagen h2 {
  margin-right: 220px;
}
</style>
