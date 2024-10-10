const cron = require('node-cron');
const saveCryptoData = require('./saveData');

cron.schedule('0 */2 * * *', () => {
  console.log('Fetching and saving cryptocurrency data...');
  saveCryptoData();
});
