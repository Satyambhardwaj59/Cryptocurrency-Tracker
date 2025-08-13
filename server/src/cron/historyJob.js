const cron = require('node-cron');
const HistoryDataModel = require('../models/historyDataModel');
const { fetchCoinData } = require('../fetchData/coinGeckoData');

// Run every hour
cron.schedule('0 * * * *', async () => {
    console.log("⏳ Fetching coin data hourly...");
    try {
        const coins = await fetchCoinData();

        if (!coins || coins.length === 0) {
            console.error("⚠ No coin data fetched");
            return;
        }

        await HistoryDataModel.insertMany(coins);
        console.log(`✅ History data saved for ${coins.length} coins`);
    } catch (error) {
        console.error("❌ History job failed:", error);
    }
});
