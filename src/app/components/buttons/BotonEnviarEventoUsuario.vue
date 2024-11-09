<template>
  <button class="boton" @click="confirmarEventoUsuario">
    <div class="boton-content">
      <i class="fa-solid fa-floppy-disk fa-2xl" style="color: var(--icon-color5);"></i>
      <p>Enviar</p>
    </div>
  </button>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { enviarEventoUsuario, subirArchivo } from '../queries/queries';
import { useToast } from 'primevue/usetoast';

const props = defineProps(['idEvento', 'titulo', 'institucion', 'fecha', 'hora', 'lugar', 'resumen', 'detalles', 'img', 'pdf', 'fechaFin', 'estatus', 'tipoEvento', 'correo', 'codigo']);
const router = useRouter();
const toast = useToast();

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
    toast.add({ severity: 'info', summary: '', detail: 'Por favor, complete todos los campos requeridos: Titulo, Institución, Fecha, Hora y Lugar.', life: 3500 });
    return;
  }

  try {
    let data;
    data = await enviarEventoUsuario(evento);
    if(!data.error){
      if (props.img) await subirArchivo(data.id, props.img, 'img');
      if (props.pdf) await subirArchivo(data.id, props.pdf, 'pdf');
      toast.add({ severity: 'info', summary: '', detail: data.message, life: 3500 });
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
p {
  color: var(--icon-color5);
}
</style>
