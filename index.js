require('colors');
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');
const { errorHandler } = require('./utils/errorHandler');

const app = express();
const port = process.env.PORT || 4000;

app.use(express.static('public'))
app.use(cors());
app.use(express.json());

app.use('/api/v1/usuarios', require('./routes/usuario'));
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/hospitales', require('./routes/hospitales'));
app.use('/api/v1/medicos', require('./routes/medicos'));
app.use('/api/v1/fakers', require('./routes/fakers'));
app.use('/api/v1/buscar', require('./routes/searchs'));
app.use('/api/v1/uploads', require('./routes/uploads'));

//- Errors
app.use(errorHandler);

dbConnection()
  .then(() => {

    app.listen(
      port,
      console.log('Server: '.blue + `running on port ${port}`)
    )
  })
  .catch(error => {
    console.log(error);
  });
