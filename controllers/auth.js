const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');

const { GenerarToken } = require('../helpers/GenerarToken');
const { GoogleTokenVerify } = require('../helpers/GoogleTokenVerify');

/**
 * @desc Iniciar sesion
 * @route /api/v1/auth/login
 * @access public
 */
exports.login = async (req, res, next) => {
  try {

    //- Verificar si el usuario existe 
    const usuarioDB = await Usuario.findOne({ email: req.body.email });
    if (!usuarioDB) {
      return next(new Error('El usuario no existe'));
    }

    //- Validar la contrasenia
    const isPasswordValid = bcrypt.compareSync(req.body.password, usuarioDB.password);
    if (!isPasswordValid) {
      return next(new Error('La contrasenia es invalida'));
    }

    //- Crear token
    const token = await GenerarToken(usuarioDB._id);

    res.json({
      ok: true,
      message: 'Usuario logueado',
      token
    })

  } catch (error) {
    next(new Error(error));
  }
}

/**
 * @desc Google Signin
 * @route POST /api/v1/auth/login/google
 * @access public
 */
exports.loginGoogle = async (req, res, next) => {

  try {
    const { name, picture, email } = await GoogleTokenVerify(req.body.token);

    //- Registrar usuario
    let usuario;
    const usuarioDB = await Usuario.findOne({ email });

    if (!usuarioDB) {
      usuario = new Usuario({
        nombre: name,
        email,
        img: picture,
        password: '@@'
      });
    } else {
      usuario = usuarioDB;
      usuario.google = true;
    }

    //- Guardar el usuario
    await usuario.save();

    //- Crear token
    const token = await GenerarToken(usuario._id);

    res.json({
      success: true,
      name, picture, email, token
    });
  } catch (error) {
    return next(new Error(error));
  }

}