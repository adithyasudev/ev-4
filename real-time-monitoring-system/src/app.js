// src/app.js or src/index.js
require('dotenv').config();
const express = require('express');
const path = require('path');
const connectDB = require('./db/mongooseConnection');
const uploadData = require('./scripts/uploadData');
const logRoutes = require('./routes/logRoutes');
const logger = require('./logger');

const app = express();
const port = 3000;

// Connect to MongoDB
connectDB();

// Serve the dashboard files
app.use(express.static(path.join(__dirname, 'dashboard')));

// Include the routes defined in logRoutes.js
app.use('/logs', logRoutes);

// Start the server
app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`);
  uploadData(); // Initial run
});
