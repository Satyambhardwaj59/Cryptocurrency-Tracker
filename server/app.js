require('dotenv').config();
const express = require('express');
const connectionDB = require('./config/database');
const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET,POST,PUT,DELETE"],
}))

connectionDB().then(() => {
    console.log("DB connected");
    app.listen(7777, () => {
        console.log("Server is running on port 7777");
    });
    
}).catch(err => {
    console.log("DB connection failed", err);
})