const { Schema, model } = require('mongoose');

const MedicoSchema = Schema({
  nombre: { type: String, required: true },
  img: String,
  usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: [true, 'El usuario es requerido'] },
  hospital: { type: Schema.Types.ObjectId, ref: 'Hospital', required: [true, 'EL hospital es requerido'] }
});

MedicoSchema.method('toJSON', function() {
  const { __v, ...object } = this.toObject();
  return object;
})

module.exports = model('Medico', MedicoSchema);