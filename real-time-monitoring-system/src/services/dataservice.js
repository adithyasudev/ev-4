const fs = require('fs');
const path = require('path');
const connectDB = require('../db/database');
const log = require('../middleware/logger');

const dataPath = path.join(__dirname, '../data/data.json');

exports.readFile = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                log(`Error reading file: ${err.message}`, 'error');
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }
        });
    });
};

exports.getNewEntries = async (data) => {
    const { db, client } = await connectDB();
    try {
        const collection = db.collection('entries');
        const existingIds = await collection.distinct('id');
        return data.filter(entry => !existingIds.includes(entry.id));
    } finally {
        client.close();
    }
};

exports.uploadData = async (newEntries) => {
    const { db, client } = await connectDB();
    try {
        const collection = db.collection('entries');
        await collection.insertMany(newEntries);
        log('Data uploaded successfully', 'success');
    } finally {
        client.close();
    }
};
