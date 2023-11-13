const Medico = require('../models/medico');

/**
 * @desc Devuelve una coleccion de medicos
 * @route /api/v1/medico 
 * @access private 
 */
exports.getMedico = async (req, res, next) => {
  try {
    const medicos = await Medico.find()
                    .populate('usuario', 'nombre id')
                    .populate('hospital', 'nombre id');
    res.json({
      ok: true,
      medicos
    });
  } catch (error) {
    next(new Error(error));
  }
}

/**
 * @desc Crea un medico
 * @route /api/v1/medico 
 * @access private 
 */
exports.crearMedico = async (req, res, next) => {
  try {
    const medico = new Medico(req.body);
    medico.usuario = req.uid;
    medico.hospital = req.query.hospital;
    await medico.save();
    res.json({
      ok: true,
      medico
    })
  } catch (error) {
    next(new Error(error));
  }
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