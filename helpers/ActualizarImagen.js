const fs = require('fs');
const Usuario = require('../models/usuario');
const Hospital = require('../models/hospital');
const Medico = require('../models/medico');

exports.actualizarImagen = async (id, fileName, tipo) => {

  /**
   * Identificamos la coleccion sobre la cual queremos realizar el cambio
   * o la actualizacion de la imagen.
   */
  switch(tipo) {

    case 'usuarios':

      /**
       * Verificar si el usuario al que vamos a modificar la imagen
       * existe en la base de datos.
       */
      const usuario = await Usuario.findById(id);
      if(!usuario) {
        console.log('EL usuario no existe')
        throw new Error('EL usuario no existe');
      }

      /**
       * Comprobar si el usuario encontrado ya tiene una imagen almacenada
       * si la tiene, eliminarla y/o reemplazarla por la nueva
       */
      const rutaVieja = `./uploads/${tipo}/${usuario.img}`;
      if(fs.existsSync(rutaVieja)) {
        console.log('Reemplazando image al ' + `${tipo}`.green + ', actual: ' + `${usuario.img}`.green + ' por: ' + `${fileName}`.green )
        fs.unlinkSync(rutaVieja);
      }

      // Guardar nueva imagen
      usuario.img = fileName;
      await usuario.save()
      return true;

      break;

    case 'medicos':
      break;

    case 'hospitales':
      break;
  }
  


}

