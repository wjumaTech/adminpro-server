const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampo } = require('../middlewares/ValidarCampo');

const { getMedico, crearMedico, actualizarMedico, eliminarMedico } = require('../controllers/medicos');

const { ValidarToken } = require('../middlewares/ValidarToken');

const router = Router();

router.get('/', ValidarToken, getMedico);

router.post('/', [
  ValidarToken,
  check('nombre', 'El nombre es requerido').not().isEmpty(),
  validarCampo
], crearMedico);

router.put('/:id', [
  ValidarToken,
  check('nombre', 'El nombre es requerido').not().isEmpty(),
  validarCampo
], actualizarMedico);

router.delete('/:id', ValidarToken, eliminarMedico);

module.exports = router;