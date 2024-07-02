import { url } from '../utils'

export const getEventos = async (eventos, fecha = '') => {
  try {
    const response = await fetch(`${url}/eventos/fecha/${fecha}`);
    if (!response.ok) {
      throw new Error('Error al obtener los eventos');
    }
    eventos.value = await response.json();
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

export const getEvento = async (evento, route) => {
  try {
    const response = await fetch(`${url}/eventos/evento/${route.params.id}`)
    const result = await response.json();
    evento.value = result[0];
  } catch (err) {
    console.log(err.message)

  }
};



export const crearEvento = async (evento) => {
  try {
    const response = await fetch(`${url}/eventos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(evento),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al enviar la solicitud:', error);
    throw error;
  }
};

export const actualizarEvento = async (id, evento) => {
  try {
    const response = await fetch(`${url}/eventos/evento/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(evento),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al enviar la solicitud:', error);
    throw error;
  }
};

export const eliminarEvento = async (eventoId) => {
  try {
    const response = await fetch(`${url}/eventos/evento/${eventoId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Error al eliminar el evento');
    }
    return await response.json();
  } catch (error) {
    console.error('Error al eliminar el evento:', error);
    throw error;
  }
};


export const subirArchivo = async (id, file, tipo) => {
  const formData = new FormData();
  formData.append(tipo, file);
  try {
    const response = await fetch(`${url}/eventos/upload/${tipo}/${id}`, {
      method: 'PUT',
      body: formData,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error al subir el archivo (${tipo}):`, error);
    throw error;
  }
};