const Hospital = require('../models/hospital');
const Usuario = require('../models/usuario');

/**
 * @desc Devuelve una coleccion de hospitales
 * @route /api/v1/hospitales 
 * @access private 
 */
exports.getHospitales = (req, res, next) => {

  res.json({
    ok: true,
    message: 'Obteniendo listado de hospitales'
  })
}

/**
 * @desc Crea un hospital
 * @route /api/v1/hospitales 
 * @access private 
 */
exports.crearHospitales = (req, res, next) => {

  res.json({
    ok: true,
    message: 'Creando hospital'
  })
}

/**
 * @desc Actualiza un hospital
 * @route /api/v1/hospitales 
 * @access private 
 */
exports.actualizarHospital = (req, res, next) => {

  res.json({
    ok: true,
    message: 'Actualizando hospital'
  })
}

/**
 * @desc Elimina un hospital
 * @route /api/v1/hospitales 
 * @access private 
 */
exports.eliminarHospitales = (req, res, next) => {

  res.json({
    ok: true,
    message: 'Eliminando hospital'
  })
}