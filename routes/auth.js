const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampo } = require('../middlewares/ValidarCampo');

const { login } = require('../controllers/auth');

const router = Router();

router.post('/', [
  check('email', 'El correo es requerido').not().isEmpty().isEmail(),
  check('password', 'La contrasenia es requerida').not().isEmpty(),
  validarCampo
], login);


module.exports = router;