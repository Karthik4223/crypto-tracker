const axios = require('axios');

async function fetchCryptoData() {
  const url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,matic-network&vs_currencies=usd&include_market_cap=true&include_24hr_change=true';
  try {
    const response = await axios.get(url);
    const data = response.data;

    return [
      { name: 'Bitcoin', price: data.bitcoin.usd, marketCap: data.bitcoin.usd_market_cap, change24h: data.bitcoin.usd_24h_change },
      { name: 'Ethereum', price: data.ethereum.usd, marketCap: data.ethereum.usd_market_cap, change24h: data.ethereum.usd_24h_change },
      { name: 'Matic', price: data['matic-network'].usd, marketCap: data['matic-network'].usd_market_cap, change24h: data['matic-network'].usd_24h_change }
    ];
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

module.exports = fetchCryptoData;
