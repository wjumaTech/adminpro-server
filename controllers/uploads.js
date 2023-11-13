const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');


/**
 * @desc Carga de archivos
 * @route /api/v1/upload/:tipo/:id
 * @access private 
 */
exports.fileUpload = async (req, res, next) => {

  const tipo = req.params.tipo;
  const id = req.params.id;
  const tiposValidos = ['usuarios', 'medicos', 'hospitales'];

  if (!tiposValidos.includes(tipo)) {
    return next(new Error('Tipo no valido, debes escoger un tipo valido entre usuarios, medicos u hospitales'));
  }

  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new Error('No se encontro archivo'));
  }

  // Procesar la imagen
  const image = req.files.image;
  const nombreCortado = image.name.split('.');
  const extensionArchivo = nombreCortado[nombreCortado.length - 1];

  //- Validar extension del archivo 
  const extensionesValidas = ['jpg', 'jpeg', 'png', 'gif'];
  if (!extensionesValidas.includes(extensionArchivo)) {
    return next(new Error('Tipo de archivo no permitido, por favor carga una imagen valida'));
  }



  res.json({ ok: true })
}
