const { Router } = require('express');
const router = Router();

const { fileUpload, mostrarImagen } = require('../controllers/uploads');
const { param } = require('express-validator');

const expressFileUpload = require('express-fileupload');
const { validarCampo } = require('../middlewares/ValidarCampo');
const { ValidarToken } = require('../middlewares/ValidarToken');

router.use(expressFileUpload());

router.get('/:tipo/:foto', mostrarImagen);

router.put('/:tipo/:id', [
  ValidarToken,
  param('id', 'Mongo id invalido').isMongoId(),
  validarCampo
], fileUpload);


module.exports = router;