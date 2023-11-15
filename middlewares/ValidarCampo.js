const { validationResult } = require('express-validator');

exports.validarCampo = (req, res, next) => {

  const results = validationResult(req);

  if (!results.isEmpty()) {

    const err = new Error();
    const message = results.mapped().id.msg;
    err.statusCode = 400;
    err.message = message

    return next(new Error(err));
  }

  next();

}