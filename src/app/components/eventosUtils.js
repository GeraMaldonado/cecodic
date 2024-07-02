export const fechaRangoSemana = (fecha) => {
    const semana = new Date(fecha);
    const dom = new Date(semana.getFullYear(), semana.getMonth(), semana.getDate() - semana.getDay());
    const sab = new Date(semana.getFullYear(), semana.getMonth(), semana.getDate() - semana.getDay() + 6);
    return `${dom.toISOString().substr(0, 10)}/${sab.toISOString().substr(0, 10)}`;
}

export const fechaRangoMes = (fecha) => {
    const mes = new Date(fecha)
    const inicio = new Date(mes.getFullYear(), mes.getMonth(), 1)
    const fin = new Date(mes.getFullYear(), mes.getMonth() + 1, 0)
    return `${inicio.getFullYear()}-${String(inicio.getMonth() + 1).padStart(2, '0')}-${String(inicio.getDate()).padStart(2, '0')}/${fin.getFullYear()}-${String(fin.getMonth() + 1).padStart(2, '0')}-${String(fin.getDate()).padStart(2, '0')}`
}

