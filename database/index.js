const mongoose = require('mongoose');
require('dotenv').config(); // Load .env file

const dbURI = process.env.DB_URI; // Get the MongoDB URI from .env

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Atlas connected'))
  .catch(err => console.log(`MongoDB Atlas connection error: ${err}`));

const db = mongoose.connection;

module.exports = db;