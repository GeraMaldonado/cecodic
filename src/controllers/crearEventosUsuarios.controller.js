const NodeCache = require("node-cache");
const { getConnection } = require('../database/database.js');
const sendEmail = require('../email/email.server.js');

const cache = new NodeCache({ stdTTL: 300 });
const generadorCodigos = () => Math.random().toString(36).substring(2, 8).toUpperCase();

const getCodigoVerificacion = async (req, res) => {
    try {
        const { nombre, correo, telefono } = req.body;
        const codigoVerificacion = generadorCodigos();
        cache.set(correo, { nombre, telefono, codigoVerificacion });

        await sendEmail(
            correo,
            'CECODIC: Código de Verificación',
            `Código de verificación para creación de evento: ${codigoVerificacion}`
        );
        res.json({ message: "Código de verificación enviado al correo" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Error al generar y enviar el código de verificación" });
    }
};

const addEvento = async (req, res) => {
    try {
        const { codigo, correo, titulo, institucion, fecha, hora, lugar, resumen, detalles, fechaFin, tipoEvento } = req.body;
        const dataGuardada = cache.get(correo);

        if (!dataGuardada || dataGuardada.codigoVerificacion !== codigo) {
            return res.status(400).json({ message: 'El código ha expirado o es inválido', error: "El código ha expirado o es inválido" });
        }

        if (!titulo || !institucion || !fecha || !lugar) {
            return res.status(400).json({ message: 'Bad request' });
        }

        const estatus = "pendiente";
        const evento = { titulo, institucion, fecha, hora, lugar, resumen, detalles, fechaFin, tipoEvento, estatus };
        const connection = getConnection();
        const [result] = await connection.query('INSERT INTO eventos SET ?', evento);

        const mensajeAdmin = `Un nuevo evento ha sido creado:\nTítulo: ${titulo}\nInstitución: ${institucion}\nFecha: ${fecha}\nLugar: ${lugar}\n\nContacto\n\tCreado por: ${dataGuardada.nombre}\n\tTeléfono: ${dataGuardada.telefono}\n\tCorreo: ${correo}`;
        await sendEmail(
            process.env.EMAIL_ADMIN, 
            `CECODIC: Nuevo Evento Creado ${titulo}`, 
            mensajeAdmin
        );

        cache.del(correo);

        const insertedId = result.insertId;
        res.json({ message: 'Evento añadido', id: insertedId });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    getCodigoVerificacion,
    addEvento
};
