const log4js = require('log4js');

log4js.configure({
    appenders: { 
        out: { type: 'stdout' }, 
        app: { type: 'file', filename: 'application.log' } 
    },
    categories: { 
        default: { appenders: ['out', 'app'], level: 'info' } 
    }
});

const logger = log4js.getLogger();

// Function to log messages
function log(message, level = 'info') {
    switch (level) {
        case 'info':
            logger.info(message);
            break;
        case 'warn':
            logger.warn(message);
            break;
        case 'error':
            logger.error(message);
            break;
        default:
            logger.info(message);
    }
}

module.exports = log;
