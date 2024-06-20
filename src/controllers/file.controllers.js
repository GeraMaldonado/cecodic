const { getConnection } = require('../database/database');
const fs = require('node:fs');

const addImg = async (req, res) => {
    try {
        const { ideventos } = req.params;
        const connection = getConnection();
        await connection.query('UPDATE eventos SET img = ? WHERE ideventos = ?', [rename(req.file), ideventos]);
        res.json('Imagen subida');
    } catch (error) {
        res.status(500).send(error)
    }
};

const addPdf = async (req, res) => {
    try {
        const { ideventos } = req.params
        const connection = getConnection();
        await connection.query('UPDATE eventos SET pdf = ? WHERE ideventos = ?', [rename(req.file), ideventos]);
        res.json('pdf subido');
    } catch (error) {
        res.status(500).send(error)
    };
};


const rename = (file) => {
    const cleanFilename = file.originalname.replace(/[^\w\s\-.]/g, '');
    const newPath = file.path.split('/').slice(0, -1).join('/') + '/' + Date.now() + cleanFilename.split(' ').join('-');
    fs.renameSync(file.path, newPath);
    return `${newPath.split('/').pop()}`;
};


module.exports = {
    methods: {
        addImg,
        addPdf
    }
}


