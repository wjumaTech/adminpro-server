const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');


/**
 * @desc Busqueda por una collecion en especifico
 * @route /api/v1/buscar/usuario?q="" 
 * @access private 
 */
exports.getDocumentosColeccion = async (req, res, next) => {

  const { tabla } = req.params;
  const busqueda = req.query.q;

  let data = [];

  try {
    switch (tabla) {
      case 'usuarios':
        data = await Usuario.find({ nombre: { $regex: busqueda, $options: 'i' } });
        break;
      case 'medicos':
        data = await Medico.find({ nombre: { $regex: busqueda, $options: 'i' } });
        break;
      case 'hospitales':
        data = await Hospital.find({ nombre: { $regex: busqueda, $options: 'i' } });
        break;
      default:
        return next(new Error('Debes de enviar una coleccion de medicos, hospitales o usuarios'))
    }
    res.json({ ok: true, resultado: data })
  } catch (error) {
    next(new Error(error));
  }

}

/**
 * @desc Busqueda de todo
 * @route /api/v1/buscar?q="" 
 * @access private 
 */
exports.getBuscar = async (req, res, next) => {

  const busqueda = req.query.q;

  //- Como referencia tambien podemos construir la expresion regular y enviarla como parametro de la busqueda
  // const regexp = new RegExp(busqueda, 'i');
  // console.log(regexp)

  //- Este codigo funciona pero no es optimo.
  // const usuarios = await Usuario.find({ nombre: { $regex: busqueda, $options: 'i' } });
  // const medicos = await Medico.find({ nombre: { $regex: busqueda, $options: 'i' } });
  // const hospitales = await Hospital.find({ nombre: { $regex: busqueda, $options: 'i' } });

  const [usuarios, medicos, hospitales] = await Promise.all([
    Usuario.find({ nombre: { $regex: busqueda, $options: 'i' } }),
    Medico.find({ nombre: { $regex: busqueda, $options: 'i' } }),
    Hospital.find({ nombre: { $regex: busqueda, $options: 'i' } })
  ]);

  res.json({ ok: true, usuarios, medicos, hospitales })
}