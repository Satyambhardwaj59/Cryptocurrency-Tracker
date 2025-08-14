const cron = require('node-cron');
const { fetchCoinData } = require('../fetchData/coinGeckoData');
const CurrentDataModel = require('../models/currentDataModel');
const HistoryDataModel = require('../models/historyDataModel');

cron.schedule('0 * * * *', async () => { // every hour
    console.log("⏳ Fetching coin data hourly...");
    try {
        const coins = await fetchCoinData();

        // Update current snapshot
        for (const coin of coins) {
            await CurrentDataModel.updateOne(
                { coin_id: coin.coin_id },
                { $set: coin },
                { upsert: true }
            );
        }

        // Save to history
        await HistoryDataModel.insertMany(coins);

        console.log(`✅ Updated current & history for ${coins.length} coins`);
    } catch (error) {
        console.error("❌ Cron job failed:", error.message);
    }
});
