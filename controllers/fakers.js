const { faker } = require('@faker-js/faker');
const Usuario = require('../models/usuario');

exports.createFaker = async (req, res, next) => {

  const cantidad = req.query.cantidad || 1;

  for(let i = 0; i <= cantidad; i++) {
    if(i === 0) {
      continue;
    }
    
    const usuario = new Usuario({
      nombre: faker.internet.userName()+'-'+i,
      email: faker.internet.email(),
      password: "123456",
      img: faker.image.avatar()
    });

    await usuario.save();
  }

  res.json({ ok: true, message: `${cantidad} usuarios creados con exito`});
}