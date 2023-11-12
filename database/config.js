const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect(`mongodb://${process.env.DB_URI}/${process.env.DB_NAME}`);
    console.log('DATABASE: '+' online'.green);
  } catch (error) {
    throw new Error(error);
  }
}

exports.dbConnection = dbConnection;