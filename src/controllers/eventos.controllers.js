const { getConnection } = require('./../database/database');

const getEventos = async (req, res) => {
    try {
        const connection = getConnection();
        const [result] = await connection.query('SELECT * FROM eventos ORDER BY CONCAT(fecha, " ", hora)');

        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const getEventosXFechas = async (req, res) => {
    try {
        const { fecha1, fecha2 } = req.params;
        const connection = getConnection();
        const [result] = await connection.query(
            `SELECT ideventos, titulo, institucion, fecha, fechaFin, hora, lugar, detalles, img, tipoEvento FROM eventos WHERE ((fechaFin IS NULL AND fecha BETWEEN ? AND ?)) OR ((fecha <= ? AND fechaFin IS NOT NULL AND fechaFin >= ?) OR (fecha BETWEEN ? AND ?) OR (fechaFin BETWEEN ? AND ?)) ORDER BY CONCAT(fecha, " ", hora);`, [fecha1, fecha2, fecha1, fecha2, fecha1, fecha2, fecha1, fecha2]);          
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

  const getEventosXFecha = async (req, res) => {
    try {
        const { fechaEntrada } = req.params;
        const connection = getConnection();
        const [result] = await connection.query('SELECT ideventos, titulo, institucion, fecha, hora, lugar, detalles, img, fechaFin, tipoEvento, estatus FROM eventos WHERE (fechaFin IS NULL AND fecha = ?) OR (? BETWEEN fecha AND fechaFin) ORDER BY CONCAT(fecha, " ", hora);', [fechaEntrada, fechaEntrada]);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
}



const getEventosXInstitucion = async (req, res) => {
    try {
        const { institucion } = req.params;
        const connection = getConnection();
        const [result] = await connection.query('SELECT ideventos, titulo, institucion, fecha, hora, lugar, resumen, img FROM eventos WHERE institucion = ? ORDER BY CONCAT(fecha, " ", hora)', institucion);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const getInstituciones = async (req, res) => {
    try {

        const connection = getConnection();
        const [result] = await connection.query('SELECT institucion FROM eventos ORDER BY institucion');
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const getEvento = async (req, res) => {
    try {
        const { ideventos } = await req.params;
        const connection = await getConnection();
        const [result] = await connection.query('SELECT * FROM eventos WHERE ideventos = ?', ideventos);
        res.json(result);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

const getUltimoEvento = async (req, res) => {
    try {
        const connection = await getConnection();
        const [result] = await connection.query('SELECT * FROM eventos ORDER BY ideventos DESC LIMIT 1');
        res.json(result[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const addEvento = async (req, res) => {
    try {
        const { titulo, institucion, fecha, hora, lugar, resumen, detalles, fechaFin, tipoEvento, estatus } = req.body;
        if (titulo === undefined || institucion === undefined || fecha === undefined || lugar === undefined) {
            res.status(400).send('Bad request');
        }
        const evento = { titulo, institucion, fecha, hora, lugar, resumen, detalles, fechaFin, tipoEvento, estatus };
        const connection = getConnection();
        const [result] = await connection.query('INSERT INTO eventos SET ?', evento);
        const insertedId = result.insertId;
        res.json({ message: 'Evento añadido', id: insertedId });
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const updateEvento = async (req, res) => {
    try {
        const connection = getConnection();
        const { ideventos } = req.params;
        const { titulo, institucion, fecha, hora, lugar, resumen, detalles, fechaFin, tipoEvento, estatus } = req.body;
        if (titulo === undefined || institucion === undefined || fecha === undefined || lugar === undefined) {
            res.status(400).send('Bad request')
        }
        const evento = { titulo, institucion, fecha, hora, lugar, resumen, detalles,fechaFin, tipoEvento, estatus };
        await connection.query('UPDATE eventos SET ? WHERE ideventos = ?', [evento, ideventos]);
        res.json({ message: `Evento actualizado` });
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const deleteEvento = async (req, res) => {
    try {
        const connection = getConnection();
        const { ideventos } = req.params;
        await connection.query('DELETE FROM eventos WHERE ideventos = ?', ideventos);
        res.json({ message: `Evento eliminado` });
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const getEventosPendientes = async(req, res) =>{
    try {
        const connection = getConnection();
        const[ result ] = await connection.query('SELECT * FROM eventos WHERE estatus = "pendiente" ORDER BY CONCAT(fecha, " ", hora)');
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const updateEventosEstatus = async (req, res) => {
    try {
        const connection = getConnection();
        const { estatus, ideventos } = req.body;
        console.log(estatus, ideventos)
        const result = await connection.query('UPDATE eventos SET estatus = ? WHERE ideventos = ?', [estatus, ideventos]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }
        res.json({ message: 'Evento actualizado' });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const getTotalEventosPendientes = async (req, res) => {
    try {
        const connection = getConnection();
        const [result] = await connection.query('SELECT COUNT(*) AS total FROM eventos WHERE estatus = "pendiente" ORDER BY CONCAT(fecha, " ", hora)');
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
}


module.exports = {
    methods: {
        getEventos,
        getEventosXFechas,
        getEventosXFecha,
        getEventosXInstitucion,
        getInstituciones,
        getEvento,
        getUltimoEvento,
        addEvento,
        updateEvento,
        deleteEvento,
        getEventosPendientes,
        updateEventosEstatus,
        getTotalEventosPendientes
    }
};
