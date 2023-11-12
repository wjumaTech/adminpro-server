const jwt = require('jsonwebtoken');
const { CapturarToken } = require("../helpers/CapturarToken");

exports.ValidarToken = (req, res, next) => {

  const token = CapturarToken(req);

  if(!token) {
    return next(new Error('No se encontro token en la solicitud'));
  }
  
  try {
    const { uid } = jwt.verify(token, process.env.JWT_CLIENT_ID)
    req.uid = uid;
    next();
  } catch (error) {
    next(new Error('Token invalido o expirado'));
  }

}