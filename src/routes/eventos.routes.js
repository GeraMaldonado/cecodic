const { Router } = require('express');
const { methods: controllerEventos } = require('../controllers/eventos.controllers');
const { methods: controllerFile } = require('../controllers/file.controllers')
const { uploadImg, uploadPdf } = require('../multerConfig');
const { login } = require('../controllers/users.controller')
const { getCodigoVerificacion, addEvento } = require('../controllers/crearEventosUsuarios.controller.js');

const router = Router();

router.get('/', controllerEventos.getEventos);
router.get('/fecha/:fechaEntrada', controllerEventos.getEventosXFecha);
router.get('/fecha/:fecha1/:fecha2', controllerEventos.getEventosXFechas);
router.get('/institucion/:institucion', controllerEventos.getEventosXInstitucion);
router.get('/instituciones', controllerEventos.getInstituciones);
router.get('/evento/:ideventos', controllerEventos.getEvento);
router.get('/ultimo', controllerEventos.getUltimoEvento);
router.post('/', controllerEventos.addEvento);
router.post('/evento/verificacion', getCodigoVerificacion);
router.post('/evento', addEvento);
router.put('/upload/img/:ideventos', uploadImg, controllerFile.addImg);
router.put('/upload/pdf/:ideventos', uploadPdf, controllerFile.addPdf);
router.put('/evento/:ideventos', controllerEventos.updateEvento)
router.delete('/evento/:ideventos', controllerEventos.deleteEvento);
router.post('/users', login)
module.exports = router;
