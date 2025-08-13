require('dotenv').config();
const express = require('express');
const connectionDB = require('./config/database');
const app = express();
const cors = require('cors');
const currentCoinRoutes = require('./routes/currentCoinRoutes');
const historyCoinRoutes = require('./routes/historyCoinRoutes');

app.use(express.json());

// ✅ Proper CORS configuration
const allowedOrigins = [
  "http://localhost:5173",
  "https://cryptocurrency-tracker-fe35.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
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