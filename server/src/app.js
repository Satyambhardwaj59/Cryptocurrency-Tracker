require('dotenv').config();
const express = require('express');
const connectionDB = require('./config/database');
const app = express();
const cors = require('cors');
const currentCoinRoutes = require('./routes/currentCoinRoutes');
const historyCoinRoutes = require('./routes/historyCoinRoutes');

app.use(express.json());

// ✅ Proper CORS configuration
app.use(cors({
    origin: "http://localhost:5173",
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
}));

// Cron job for fetching historical data
require('./cron/historyJob');

// Routes
app.use('/api/coins', currentCoinRoutes);
app.use('/api/history', historyCoinRoutes);

connectionDB().then(() => {
    console.log("DB connected");
    app.listen(7777, () => {
        console.log("Server is running on port 7777");
    });
}).catch(err => {
    console.log("DB connection failed", err);
});