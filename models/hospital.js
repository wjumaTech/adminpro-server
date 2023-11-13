const { Schema, model } = require('mongoose');

const HospitalSchema = Schema({
  nombre: { type: String, required: true },
  img: String,
  usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: [true, 'El usuario es requerido'] }
}, {
  collection: 'hospitales'
});

HospitalSchema.method('toJSON', function() {
  const { __v, ...object } = this.toObject();
  return object;
})

module.exports = model('Hospital', HospitalSchema);