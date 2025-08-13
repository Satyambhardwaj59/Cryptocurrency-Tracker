const express = require('express');
const router = express.Router();
const CurrentDataModel = require('../models/currentDataModel');
const { fetchCoinData } = require('../fetchData/coinGeckoData');

// GET /api/coins
router.get('/', async (req, res) => {
    try {
        console.log("Fetching current coin data...");
        const coins = await fetchCoinData();

        // Upsert into CurrentData collection
        for (const coin of coins) {
            await CurrentDataModel.updateOne(
                { coin_id: coin.coin_id },
                { $set: coin },
                { upsert: true }
            );
        }

        res.json(coins);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch coin data', details: error.message });
    }
});

module.exports = router;
