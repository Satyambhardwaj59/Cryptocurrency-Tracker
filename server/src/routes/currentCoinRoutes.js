const express = require('express');
const router = express.Router();
const CurrentDataModel = require('../models/currentDataModel');

// GET /api/coins — returns data from DB only
router.get('/', async (req, res) => {
    try {
        const coins = await CurrentDataModel.find();
        if (!coins.length) {
            return res.status(404).json({ error: "No data found. Wait for cron job." });
        }
        res.json({
            lastUpdated: coins[0]?.updatedAt || null,
            data: coins
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch coin data from DB', details: error.message });
    }
});

module.exports = router;
