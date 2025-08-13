# 🚀 Cryptocurrency Tracker

A full-stack **MERN** application to track live cryptocurrency prices using the **CoinGecko API**, styled with **Tailwind CSS**.  
The app displays real-time crypto data, allows searching/filtering, and has both **frontend** (React) and **backend** (Node.js + Express) parts.

---

## Live Link
```bash

```

## 📌 Tech Stack

### Frontend (Client):
- React.js (Vite)
- Tailwind CSS

### Backend (Server):
- Node.js
- Express.js
- Axios / Fetch (to get CoinGecko data)
- CORS enabled

### Database:
- MongoDB (via Mongoose)

### Deployment:
- Frontend → Vercel / Netlify
- Backend → Render

---

## 🗂 Folder Structure
```txt
cryptocurrency-tracker/
│
├── client/ # React + Tailwind frontend
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── App.jsx
│ │ └── main.jsx
│ ├── package.json
│ └── tailwind.config.js
│
└── server/ # Node.js + Express backend
├── src/
│ ├── app.js 
│ │
│ ├── config/ # Configuration
│ │ └── db.js # MongoDB connection
│ │
│ ├── models/ # Mongoose models
│ │
│ ├── routes/ # Express routes
│ │
│ ├── fetchData/ # External API fetching (coinGecko Fetch crypto data)
│ │
│ ├── cron/ # Scheduled jobs
│
├── package.json
└── .env
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/<your-username>/cryptocurrency-tracker.git
cd cryptocurrency-tracker
```
## Backend (Server) Setup
```bash
cd server
npm install
```
### .env
```bash
 DB_CONNECTION_URL=
```
### Run backend in development:
```bash
npm run dev
```

## Frontend (Client) Setup

```bash
cd client
npm install
```
### .env 
```bash
VITE_CoinGecko_API_Key=
VITE_Backend_URL
```
### Run frontend in development:
```bash
npm run dev
```

## DB Image
![DB Image](./assets/db1.png)
![DB Image](./assets/db2.png)

## Cron Image
![CRON Image](./assets/cron.png)



