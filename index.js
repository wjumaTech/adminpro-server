require('colors');
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());

app.get('/api/v1/users', (req, res, next) => {
  res.json({
    ok: true,
    message: 'Main page works!'
  })
})

dbConnection()
  .then(() => {

    app.listen(
      port,
      console.log('Server: '.blue+`running on port ${port}`)
    )
  })
  .catch(error => {
    console.log(error);
  });
