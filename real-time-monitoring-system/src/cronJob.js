const cron = require('node-cron');
const dataService = require('./services/dataservice');
const log = require('./middleware/logger');

cron.schedule('0 0,12 * * *', async () => {
    log('Cron job started', 'info');
    try {
        const data = await dataService.readFile();
        const newEntries = await dataService.getNewEntries(data);
        if (newEntries.length > 0) {
            await dataService.uploadData(newEntries);
            log('New entries uploaded successfully', 'success');
        } else {
            log('No new entries found', 'info');
        }
    } catch (error) {
        log(`Error: ${error.message}`, 'error');
    }
    log('Cron job finished', 'info');
});
