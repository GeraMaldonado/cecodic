export const fechaLarga = (fechaEntrada) => {
  const fecha = fechaEntrada ? new Date(fechaEntrada) : new Date();
  const mes = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  const dia = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  return `${dia[fecha.getDay()]} ${fecha.getDate()} de ${mes[fecha.getMonth()]}`;
};


export const fechaConsulta = () => {
  const fecha = new Date()
  return `${fecha.getFullYear()}-${fecha.getMonth() + 1}-${fecha.getDate()}`
}

export const fechaCortaMes = (evento) => {
  const mes = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  const nuevaFecha = new Date(evento.fecha)
  return `${String(nuevaFecha.getDate()).padStart(2, '0')} ${mes[nuevaFecha.getMonth()]}`
}

export const fechaCortaDia = (evento) => {
  const dia = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const nuevaFecha = new Date(evento.fecha)
  return `${dia[nuevaFecha.getDay()]} ${nuevaFecha.getDate()}`
}

export const formatearFecha = (fecha) => {
  const date = new Date(fecha);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const acortadorString = (str, maxLength) => {
  if (!str) return '';
  if (str.length <= maxLength) return str;
  return str.substring(0, maxLength) + '...';
};

import {urlBackend} from '../urlBackend';

export const url = `${urlBackend}/api`;
export const urlUpload = `${urlBackend}/uploads`;
