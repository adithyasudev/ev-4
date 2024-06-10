const fs = require('fs');
const path = require('path');

exports.getLogs = (req, res) => {
    const level = req.query.level || 'all';
    const logType = req.query.type || 'app'; // Default to 'app' logs if not specified
    const logFile = path.join(__dirname, `../../logs/${logType}.log`);

    fs.readFile(logFile, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading log file');
            return;
        }

        const logs = data.split('\n').filter(log => {
            if (level === 'all') return true;
            return log.includes(`"${level}"`);
        });

        res.json(logs);
    });
};
