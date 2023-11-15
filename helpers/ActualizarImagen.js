const fs = require('fs');
const Usuario = require('../models/usuario');
const Hospital = require('../models/hospital');
const Medico = require('../models/medico');

exports.actualizarImagen = async (id, fileName, tipo) => {

  let rutaVieja;

  switch (tipo) {
    case 'usuarios':
      const usuario = await Usuario.findById(id);
      if (!usuario) {
        console.log('EL usuario no existe')
        throw new Error('EL usuario no existe');
      }
      rutaVieja = `./uploads/${tipo}/${usuario.img}`;
      eliminarImagenExistente(rutaVieja);
      usuario.img = fileName;
      await usuario.save()
      return true;
      break;
    case 'medicos':
      const medico = await Medico.findById(id);
      if (!medico) {
        console.log('EL medico no existe')
        throw new Error('EL medico no existe');
      }
      rutaVieja = `./uploads/${tipo}/${medico.img}`;
      eliminarImagenExistente(rutaVieja);
      medico.img = fileName;
      await medico.save()
      return true;
      break;
    case 'hospitales':
      const hospital = await Hospital.findById(id);
      if (!hospital) {
        console.log('EL hospital no existe')
        throw new Error('EL hospital no existe');
      }
      rutaVieja = `./uploads/${tipo}/${hospital.img}`;
      eliminarImagenExistente(rutaVieja);
      hospital.img = fileName;
      await hospital.save()
      return true;
      break;
  }
}

/**
 * @desc Comprueba si el usuario ya tiene una imagen en el store,
 * si la tiene, la elimina.
 */
function eliminarImagenExistente(path = '') {
  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  }
}

