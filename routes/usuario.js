const { Router } = require('express');
const { check } = require('express-validator');

const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');
const { validarCampo } = require('../middlewares/ValidarCampo');
const { ValidarToken } = require('../middlewares/ValidarToken');
const router = Router();

router.get('/', ValidarToken, getUsuarios);

router.post('/', [
  ValidarToken,
  check('nombre', 'EL nombre es requerido').not().isEmpty(),
  check('password', 'La contrasenia es requerida').not().isEmpty(),
  check('email', 'EL correo es requerido').not().isEmpty().isEmail(),
  validarCampo
], crearUsuario);

router.put('/:uid', [
  ValidarToken,
  check('nombre', 'EL nombre es requerido').not().isEmpty(),
  check('password', 'La contrasenia es requerida').not().isEmpty(),
  check('role', 'EL role es requerido').not().isEmpty(),
  validarCampo
], actualizarUsuario);

router.delete('/:uid', ValidarToken, borrarUsuario);

module.exports = router;