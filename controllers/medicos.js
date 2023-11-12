const Medico = require('../models/medico');
const Hospital = require('../models/hospital');
const Usuario = require('../models/usuario');

/**
 * @desc Devuelve una coleccion de medicos
 * @route /api/v1/medico 
 * @access private 
 */
exports.getMedico = (req, res, next) => {

  res.json({
    ok: true,
    message: 'Obteniendo listado de Medico'
  })
}

/**
 * @desc Crea un medico
 * @route /api/v1/medico 
 * @access private 
 */
exports.crearMedico = (req, res, next) => {

  res.json({
    ok: true,
    message: 'Creando medico'
  })
}

/**
 * @desc Actualiza un medico
 * @route /api/v1/medico 
 * @access private 
 */
exports.actualizarMedico = (req, res, next) => {

  res.json({
    ok: true,
    message: 'Actualizando medico'
  })
}

/**
 * @desc Elimina un medico
 * @route /api/v1/medico 
 * @access private 
 */
exports.eliminarMedico = (req, res, next) => {

  res.json({
    ok: true,
    message: 'Eliminando medico'
  })
}