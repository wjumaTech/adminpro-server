const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const { v4: uuidv4 } = require('uuid');

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

  //- Generar el nombre del archivo debe de se aleatorio y path donde depositaremos la imagen
  const fileName = uuidv4() + '.' + extensionArchivo;
  const path = `./uploads/${tipo}/${fileName}`;


  image.mv(path, (err) => {
    if (err) {
      return next(new Error('Error al mover la imagen'));
    }

    //- Actualizar base de datos


    res.json({ ok: true, message: 'Archivo subido', fileName })
  });

}
