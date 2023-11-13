const bcrypt = require('bcryptjs');
const { GenerarToken } = require('../helpers/GenerarToken');

const Usuario = require('../models/usuario');

/**
 * @desc Devuelve una coleccion de usuarios 
 * @route /api/v1/usuarios 
 * @access public 
 */
exports.getUsuarios = async (req, res, next) => {
  try {
    const usuarios = await Usuario.find();
    res.json({
      ok: true,
      message: 'Obteniendo usuarios',
      usuarios
    })
  } catch (error) {
    next(new Error(error));
  }
}

/**
 * @desc Crea un usuario 
 * @route /api/v1/usuarios 
 * @access public 
 */
exports.crearUsuario = async (req, res, next) => {

  const { nombre, email, password } = req.body;

  try {

    const salt = bcrypt.genSaltSync(12);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const existeUsuario = await Usuario.findOne({ email });
    console.log(existeUsuario)
    if(existeUsuario) {
      return next(new Error('EL correo ya esta registrado'));
    }

    const usuario = new Usuario({ nombre, password: hashedPassword, email });
    await usuario.save();
    
    //- Generar token
    const token = await GenerarToken(usuario._id)

    res.json({
      ok: true,
      message: 'Usuario creado exitosamente',
      usuario,
      token
    });

  } catch (error) {
    const err = new Error(error);
    err.message = 'El correo debe de ser unico';
    err.statusCode = 500;
    next(new Error(err));
  }

} 

/**
 * @desc Actualiza un usuario tomando como referencia su id
 * @route /api/v1/usuarios/:uid
 * @access private 
 */
exports.actualizarUsuario = async (req, res, next) => {

  const { uid } = req.params;

  try {
    
    const usuarioDB = await Usuario.findById(uid);
    if(!usuarioDB) {
      return next(new Error('EL usuario no esta registrado'));
    }

    //- Actualizaciones
    const campos = req.body;
    //- Validar si existe el nuevo email
    if( usuarioDB.email === req.body.email ) {
      delete campos.email;
    } else {
      const existeUsuario = await Usuario.findOne({ email: req.body.email });
      if( existeUsuario ) {
        return next(new Error('EL email ya existe'));
      }
    }
    delete campos.password;
    delete campos.google;

    const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });

    res.json({
      ok: true,
      usuario: usuarioActualizado
    })

  } catch (error) {
    next(new Error(error));
  }
  
}

/**
 * @desc Elimina un usuario tomando como referencia su id
 * @route /api/v1/usuarios/:uid
 * @access private 
 */
exports.borrarUsuario = async (req, res, next) => {
  const { uid } = req.params;
  try { 

    const usuarioDB = await Usuario.findById({ _id: uid });
    if(!usuarioDB) {
      return next(new Error('EL usuario no esta registrado'));
    }

    await Usuario.findByIdAndDelete(uid);
    res.json({
      ok: true,
      message: 'Usuario eliminado'
    })
  } catch(error) {
    next(new Error(error));
  }
}