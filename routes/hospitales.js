const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampo } = require('../middlewares/ValidarCampo');

const { ValidarToken } = require('../middlewares/ValidarToken');
const { getHospitales, crearHospitales, actualizarHospital, eliminarHospitales } = require('../controllers/hospitales');

const router = Router();

router.get('/', ValidarToken, getHospitales);

router.post('/', [
  ValidarToken,
  check('nombre', 'El nombre es requerido').not().isEmpty(),
  validarCampo
], crearHospitales);

router.put('/:id', [
  ValidarToken,
  check('nombre', 'El nombre es requerido').not().isEmpty(),
  validarCampo
], actualizarHospital);

router.delete('/:id', ValidarToken, eliminarHospitales);

module.exports = router;