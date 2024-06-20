const multer = require('multer');
const fs = require('node:fs');
const path = require('path');

const getRuta = () => {
    const ruta = path.join(__dirname, '/uploads');
    if (!fs.existsSync(ruta)) {
        fs.mkdirSync(ruta, { recursive: true });
    }
    return ruta;
};

const uploadImg = multer({ dest: getRuta() }).single('img');
const uploadPdf = multer({ dest: getRuta() }).single('pdf');

module.exports = { uploadImg, uploadPdf };
