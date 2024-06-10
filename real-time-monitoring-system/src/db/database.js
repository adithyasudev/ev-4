const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

const url = 'mongodb://localhost:27017';
const dbName = 'adithyasudev28';

// SSL/TLS options
const sslOptions = {
  ssl: true,
  sslValidate: true,
  sslCA: [fs.readFileSync(path.resolve(__dirname, 'ca.pem'))],
};

const connectDB = async () => {
    const client = new MongoClient(url, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        ssl: true, // Enable SSL
        sslValidate: true, // Validate SSL certificate
        sslCA: sslOptions.sslCA // Use provided SSL certificate
    });

    try {
        await client.connect();
        console.log('Connected to MongoDB');
        const db = client.db(dbName);
        return { db, client };
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        throw err; // Rethrow the error to handle it elsewhere if needed
    }
};

module.exports = connectDB;
