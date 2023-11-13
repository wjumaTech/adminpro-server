const Hospital = require('../models/hospital');
const Usuario = require('../models/usuario');

/**
 * @desc Devuelve una coleccion de hospitales
 * @route /api/v1/hospitales 
 * @access private 
 */
exports.getHospitales = async (req, res, next) => {
  try {
    const hospitales = await Hospital.find({}).populate('usuario', 'nombre email -_id').exec();
    res.json({
      ok: true,
      hospitales
    })
  } catch (error) {
    return next(new Error(error))
  }

}

/**
 * @desc Crea un hospital
 * @route /api/v1/hospitales 
 * @access private 
 */
exports.crearHospitales = async (req, res, next) => {

  const { nombre } = req.body;
  const { uid } = req; 

  try {
    const hospital = new Hospital({ nombre, usuario: uid });
    await hospital.save();
    res.json({
      ok: true,
      hospital
    });
  } catch (error) {
    return next(new Error(error))
  }

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