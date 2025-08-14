require('dotenv').config();
const express = require('express');
const connectionDB = require('./config/database');
const cors = require('cors');

const currentCoinRoutes = require('./routes/currentCoinRoutes');
const historyCoinRoutes = require('./routes/historyCoinRoutes');

// Start cron job
require('./cron/historyJob');

const app = express();
app.use(express.json());

// ✅ CORS for production for all origins
app.use(cors());

// Routes
app.use('/api/coins', currentCoinRoutes);
app.use('/api/history', historyCoinRoutes);

connectionDB().then(() => {
    app.listen(process.env.PORT || 7777, () => {
        console.log(`🚀 Server running on port ${process.env.PORT || 7777}`);
    });
}).catch(err => {
    console.error("❌ DB connection failed:", err);
});
