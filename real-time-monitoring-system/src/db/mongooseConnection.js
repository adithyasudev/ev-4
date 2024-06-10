// src/db/mongooseConnection.js
const mongoose = require('mongoose');
const logger = require('../logger');

const uri = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    logger.info('MongoDB connected');
  } catch (err) {
    logger.error('Error connecting to MongoDB', {
      message: err.message,
      stack: err.stack,
    });
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
