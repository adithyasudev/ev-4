const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');
const winston = require('winston');
const schedule = require('node-schedule');

// MongoDB configuration
const mongoUrl = "mongodb+srv://adithyasudev28:Omsairamadi5369@cluster0.ej3xem5.mongodb.net/entrylogs";
const dbName = 'myDatabase';
const collectionName = 'records';

// Logger configuration
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: path.join(__dirname, '../logs/app.log') }),
    ],
});

async function uploadData() {
    const client = new MongoClient(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const dataFile = path.join(__dirname, '../data/data.json');

        fs.readFile(dataFile, 'utf8', async (err, rawData) => {
            if (err) {
                logger.error('Error reading data file', err);
                await client.close();
                return;
            }

            let data;
            try {
                data = JSON.parse(rawData);
            } catch (err) {
                logger.error('Error parsing JSON data', err);
                await client.close();
                return;
            }

            for (const record of data) {
                try {
                    const existingRecord = await collection.findOne({ id: record.id });
                    if (!existingRecord) {
                        await collection.insertOne(record);
                        logger.info(`Successfully inserted record with id: ${record.id}`);
                    }
                } catch (err) {
                    logger.error(`Error inserting record with id: ${record.id}`, err);
                }
            }

            await client.close();
            logger.info('Data upload complete');
        });
    } catch (err) {
        logger.error('Error connecting to MongoDB', err);
    }
}

// Schedule the task to run twice a day at midnight and noon
schedule.scheduleJob('0 0,12 * * *', uploadData);

module.exports = uploadData;
