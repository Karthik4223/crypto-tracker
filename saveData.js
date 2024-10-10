const Crypto = require('./cryptoModel');
const fetchCryptoData = require('./fetchData');

async function saveCryptoData() {
  const cryptoData = await fetchCryptoData();
  if (cryptoData) {
    cryptoData.forEach(async (crypto) => {
      const newCrypto = new Crypto(crypto);
      await newCrypto.save();
      console.log(`${crypto.name} data saved to database`);
    });
  }
}

module.exports = saveCryptoData;
