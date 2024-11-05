<template>
  <div class="about-container">
    <h1 style="text-align: left;">Centro de Comunicación y Divulgación de la Ciencia “Galileo Galilei”</h1>
    <p style="text-align: justify;">
      El Centro de Comunicación y Divulgación de la Ciencia (CECODIC) forma parte del Consejo Zacatecano de Ciencia,
      Tecnología e Innovación del Gobierno del Estado de Zacatecas; se encuentra ubicado a cinco minutos del centro de
      la ciudad, es un espacio único en el Estado creado para llevar a cabo eventos académicos como Congresos,
      Conferencias, Convenciones, Seminarios, Simposios, Debates, Asambleas, etc. relacionados con la Ciencia y la
      Tecnología esencialmente, donde estudiantes, académicos, investigadores y público en general participan y son
      incluidos en el universo de la ciencia y la tecnología con el fin de coadyuvar en el progreso de Zacatecas.
    </p>

    <div class="tabs">
      <div v-for="(tab, index) in tabs" :key="index" @click="activeTab = index"
        :class="{ 'active-tab': activeTab === index }" class="tab">
        {{ tab.name }}
      </div>
    </div>

    <div class="tab-content">
      <div v-if="activeTab === 0">
        <h2 style="text-align: left;">Espacios multidisciplinarios</h2>
        <p style="text-align: justify;"><strong>Auditorio</strong><br><br>
          Cuenta con 190 cómodas butacas reclinables, con paleta integrada, 3 espacios para sillas de ruedas en la
          primera fila, equipo de Proyección compuesto por pantalla automática de 4.75 x 3.75 metros, 3 proyectores de
          6,000 lúmenes, ciclorama, equipo de audio profesional, pódium de madera, pódium inteligente, aire
          acondicionado, internet inalámbrico, cabina de proyección, sanitarios detrás del escenario, opciones de
          montaje según las necesidades del evento.</p><br>

        <p style="text-align: justify;"><strong>Aula Magna</strong><br><br>
          232.80 mts2, capacidad de hasta 180 personas en auditorio cómodamente sentadas en sillas acojinadas en color
          negro, equipada con pantalla automática de 4.75 X 3.75 , proyector de 4,000 lúmenes, equipo de audio
          profesional, aire acondicionado. Cuenta con muros móviles que transforman el espacio hasta en cuatro aulas
          individuales según las necesidades del evento.</p><br>

        <p style="text-align: justify;"><strong>Aulas de usos múltiples</strong><br><br></p>
        <div style="text-align: justify;">
          <ul>
            <li>58 mts2, capacidad hasta 30 personas en auditorio, equipadas con pantalla, proyector, mesas
              trapezoidales y sillas acojinadas en color negro.</li>
          </ul>
        </div>

      </div>
      <div v-else-if="activeTab === 1">
        <h2>Equipo</h2>
        <ul>
          <li>Mobiliario: módulos de madera para presídium, sillas acojinadas, pódium, sillones, mesas trapezoidales,
            tablones, mamparas.</li>
          <li>Internet inalámbrico y cableado</li>
          <li>Audio Profesional</li>
          <li>Proyectores</li>
          <li>Laptop</li>
          <li>Pantallas gigantes en el Auditorio y Aula Magna</li>
          <li>Pantallas LCD de 50 pulgadas en el Vestíbulo disponibles para información del evento</li>
          <li>Servicio de Corriente eléctrica de 110 v</li>
          <li>Aire Acondicionado en aulas y auditorio</li>
        </ul>
      </div>
      <div v-else-if="activeTab === 2">
        <h2>Servicios</h2>
        <ul>
          <li>Música ambiental</li>
          <li>Soporte técnico con proyección, audio y conexión a Internet</li>
          <li>Logística</li>
          <li>45 espacios para estacionamiento</li>
          <li>Accesos y espacios para personas con discapacidad</li>
          <li>Sanitarios</li>
          <li>Equipo contra Incendio</li>
          <li>Señalamiento Institucional</li>
          <li>Edificio libre de humo</li>
          <li>Asesoría especializada en protocolo y eventos académicos</li>
        </ul>
      </div>
      <div v-else-if="activeTab === 3">
        <h2>Nosotros</h2>
        <ul>
          <li>Atendemos eventos relacionados con la ciencia, la tecnología e innovación como Talleres, congresos,
            cursos, conferencias, campamento, reuniones, concursos, Seminarios, Simposios, Debates, Asambleas, etc.
            relacionados con la Ciencia y la Tecnología principalmente</li>
          <li>Las personas con discapacidad y/o personas adultas mayores son bienvenidas, contamos con espacios
            reservados en el estacionamiento y rampas de acceso.</li>
          <li>En el 2023 atendimos 205 eventos y un total de 28,835 usuarios</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const tabs = ref([
  { name: "Espacios multidisciplinarios" },
  { name: "Equipo" },
  { name: "Servicios" },
  { name: "Nosotros" }
]);

const activeTab = ref(0);
</script>

<style scoped>
.about-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 70%;
  margin: 0 auto;
}

.tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-bottom: 20px;
}

.tab {
  padding: 10px 20px;
  margin-right: 10px;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.active-tab {
  background-color: rgb(120, 16, 5);
  color: white;
  border: 1px solid rgb(120, 16, 5);
}

.tab-content {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  width: 100%;
}

h2 {
  margin-bottom: 10px;
}

p,
li {
  line-height: 1.5;
}
</style>