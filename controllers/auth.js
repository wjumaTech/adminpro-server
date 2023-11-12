const { GenerarToken } = require('../helpers/GenerarToken');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');

/**
 * @desc Iniciar sesion
 * @route /api/v1/auth/login
 * @access public
 */
exports.login = async (req, res, next) => {
  try {

    //- Verificar si el usuario existe 
    const usuarioDB = await Usuario.findOne({ email: req.body.email });
    if(!usuarioDB) {
      return next(new Error('El usuario no existe'));
    }

    //- Validar la contrasenia
    const isPasswordValid = bcrypt.compareSync(req.body.password, usuarioDB.password);
    if(!isPasswordValid) {
      return next(new Error('La contrasenia es invalida'));
    }

    //- Crear token
    const token = await GenerarToken( usuarioDB._id );
 
    res.json({
      ok: true,
      message: 'Usuario logueado',
      token
    })

  } catch (error) {
    next(new Error(error));
  }
}