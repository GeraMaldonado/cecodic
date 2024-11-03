<template>
  <button class="boton" @click="confirmarEventoUsuario">
    <i class="fa-solid fa-floppy-disk fa-2xl" style="color: red;"></i>
    <span>Guardar</span>
  </button>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { enviarEventoUsuario, subirArchivo } from '../queries/queries';

const props = defineProps(['idEvento', 'titulo', 'institucion', 'fecha', 'hora', 'lugar', 'resumen', 'detalles', 'img', 'pdf', 'fechaFin', 'estatus', 'tipoEvento', 'correo', 'codigo']);
const router = useRouter();

const confirmarEventoUsuario = async () => {
  const evento = {
    titulo: props.titulo,
    institucion: props.institucion,
    fecha: props.fecha,
    hora: props.hora,
    lugar: props.lugar,
    detalles: props.detalles,
    fechaFin: props.fechaFin,
    tipoEvento: props.tipoEvento,
    estatus: props.estatus,
    correo: props.correo,
    codigo: props.codigo
  };

  if (!evento.titulo || !evento.institucion || !evento.fecha || !evento.hora || !evento.lugar) {
    alert('Por favor, complete todos los campos requeridos: Titulo, Institución, Fecha, Hora y Lugar.');
    return;
  }

  try {
    let data;
    data = await enviarEventoUsuario(evento);
    if(!data.error){
      if (props.img) await subirArchivo(data.id, props.img, 'img');
      if (props.pdf) await subirArchivo(data.id, props.pdf, 'pdf');
      alert(`Respuesta del servidor: ${data.message}`);
      const cleanUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);

        router.push({ name: 'home' }).then(() => {
        window.location.reload();
      });
    }else{
      alert(`Respuesta del servidor: ${data.message}`);
    }

  } catch (error) {
    console.error('Error al enviar la solicitud:', error);
  }
};
</script>

<style scoped>
.boton {
  border: none;
  transition: transform 0.3s ease;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
  color: #63E6BE;
}

.boton:hover {
  transform: scale(1.1);
}

.boton i {
  margin-bottom: 25px;
}
</style>
