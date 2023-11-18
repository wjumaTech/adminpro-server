const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampo } = require('../middlewares/ValidarCampo');

const { login, loginGoogle, renew } = require('../controllers/auth');
const { ValidarToken } = require('../middlewares/ValidarToken');

const router = Router();

router.post('/login', [
  check('email', 'El correo es requerido').not().isEmpty().isEmail(),
  check('password', 'La contrasenia es requerida').not().isEmpty(),
  validarCampo
], login);

router.post('/login/google', [
  check('token', 'El token de Google es obligatorio').not().isEmpty(),
  validarCampo
], loginGoogle);

router.post('/login/renew', ValidarToken, renew);


module.exports = router;