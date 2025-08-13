const express = require('express');
const router = express.Router();
const HistoryDataModel = require('../models/historyDataModel');
const { fetchCoinData } = require('../fetchData/coinGeckoData');

// POST /api/history → manually store snapshot
router.post('/', async (req, res) => {
    try {
        const coins = await fetchCoinData();

        const historyDocs = coins.map(coin => ({
            coin_id: coin.coin_id,
            name: coin.name,
            symbol: coin.symbol,
            price_usd: coin.price_usd,
            market_cap: coin.market_cap,
            change_24h: coin.change_24h
        }));

        await HistoryDataModel.insertMany(historyDocs);

        res.json({ message: 'History data saved successfully', count: historyDocs.length });
    } catch (error) {
        res.status(500).json({
            error: 'Failed to save history data',
            details: error.message
        });
    }
});

// GET /api/history/:coinId
router.get('/:coinId', async (req, res) => {
    try {
        const { coinId } = req.params;

        const history = await HistoryDataModel
            .find({ coin_id: coinId })
            .sort({ timestamps: -1 });

        if (!history.length) {
            return res.status(404).json({ error: `No history found for ${coinId}` });
        }

        res.json(history);
    } catch (error) {
        res.status(500).json({
            error: 'Failed to fetch history data',
            details: error.message
        });
    }
});

module.exports = router;
