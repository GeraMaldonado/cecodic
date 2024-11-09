<template>
  <button class="boton" @click="confirmarEvento">
    <div class="boton-content">
      <i class="fa-solid fa-floppy-disk fa-2xl" style="color: var(--icon-color2);"></i>
      <p>Guardar</p>
    </div>
  </button>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { crearEvento, actualizarEvento, subirArchivo } from '../queries/queries';
import { useToast } from 'primevue/usetoast';

const props = defineProps(['idEvento', 'titulo', 'institucion', 'fecha', 'hora', 'lugar', 'resumen', 'detalles', 'img', 'pdf', 'fechaFin', 'estatus', 'tipoEvento']);
const router = useRouter();
const toast = useToast();

const confirmarEvento = async () => {
  const evento = {
    titulo: props.titulo,
    institucion: props.institucion,
    fecha: props.fecha,
    hora: props.hora,
    lugar: props.lugar,
    detalles: props.detalles,
    fechaFin: props.fechaFin,
    tipoEvento: props.tipoEvento,
    estatus: props.estatus
  };

  if (!evento.titulo || !evento.institucion || !evento.fecha || !evento.hora || !evento.lugar) {
    toast.add({ severity: 'info', summary: '', detail: 'Por favor, complete todos los campos requeridos: Titulo, Institución, Fecha, Hora y Lugar.', life: 5000 });
    return;
  }

  try {
    let data;
    if (props.idEvento) {
      data = await actualizarEvento(props.idEvento, evento);
      const idEvento = props.idEvento;
      if (props.img) await subirArchivo(idEvento, props.img, 'img');
      if (props.pdf) await subirArchivo(idEvento, props.pdf, 'pdf');
    } else {
      data = await crearEvento(evento);
      if (props.img) await subirArchivo(data.id, props.img, 'img');
      if (props.pdf) await subirArchivo(data.id, props.pdf, 'pdf');
    }
    toast.add({ severity: 'success', summary: '', detail: data.message, life: 5000 });

    const cleanUrl = window.location.origin + window.location.pathname;
    window.history.replaceState({}, document.title, cleanUrl);

    router.push({ name: 'home' }).then(() => {
      window.location.reload();
    });

  } catch (error) {
    console.error('Error al enviar la solicitud:', error);
  }
};
</script>

<style scoped>
p{
  color: var(--icon-color2);
}
</style>
