const { validationResult } = require('express-validator');

exports.validarCampo = (req, res, next) => {

  const results = validationResult(req);

  if(!results.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: results.mapped()
    })
  } 

  next();

}