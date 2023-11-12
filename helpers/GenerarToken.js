const jwt = require('jsonwebtoken');


exports.GenerarToken = ( uid='' ) => {

  return new Promise((resolve, reject) => {

    const payload = {
      uid
    }

    jwt.sign(payload, process.env.JWT_CLIENT_ID, {
      expiresIn: '1h'
    }, (err, token) => {
  
      if(err) {
        reject(err);
      } else {
        resolve(token);
      }
    });

  });
}