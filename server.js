const express = require('express');
const mongoose = require('mongoose');
const Crypto = require('./cryptoModel');
const saveCryptoData = require('./saveData');
const cronJob = require('./job');

const app = express();

// mongoose.connect('mongodb://localhost:27017/cryptoDB')
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('MongoDB connection error:', err));

  mongoose.connect('mongodb+srv://karthikmalasani21:PjBeaKCgz3f1J13E@cluster0.g6yj8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));


//Task-2

app.get('/stats', async (req, res) => {
    const coin = req.query.coin;
    if (!coin) {
      return res.status(400).json({ error: 'Please provide a coin parameter' });
    }
  
    try {
      const latestData = await Crypto.findOne({ name: new RegExp(`^${coin}$`, 'i') }).sort({ timestamp: -1 });
  
      if (!latestData) {
        return res.status(404).json({ error: `No data found for ${coin}` });
      }
        res.json({
        price: latestData.price,
        marketCap: latestData.marketCap,
        '24hChange': latestData.change24h
      });
    } catch (err) {
      res.status(500).json({ error: 'Error fetching data from the database' });
    }
  });


//Task-3

function calculateStandardDeviation(prices) {
    const mean = prices.reduce((a, b) => a + b, 0) / prices.length;
    const squaredDifferences = prices.map(price => Math.pow(price - mean, 2));
    const variance = squaredDifferences.reduce((a, b) => a + b, 0) / prices.length;
    return Math.sqrt(variance);
  }
  

  app.get('/deviation', async (req, res) => {
    const coin = req.query.coin;
    if (!coin) {
      return res.status(400).json({ error: 'Please provide a coin parameter' });
    }
  
    try {
      const records = await Crypto.find({ name: new RegExp(`^${coin}$`, 'i') }).sort({ timestamp: -1 }).limit(100);
      
      if (records.length === 0) {
        return res.status(404).json({ error: `No data found for ${coin}` });
      }
  
      const prices = records.map(record => record.price);

      const deviation = calculateStandardDeviation(prices);

      res.json({ deviation: deviation.toFixed(2) });
    } catch (err) {
      res.status(500).json({ error: 'Error fetching data from the database' });
    }
  });
  


  const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});


saveCryptoData();

