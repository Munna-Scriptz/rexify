require('dotenv').config({ quiet: true })
const express = require("express")
const cors = require("cors")
const dns = require("dns")
dns.setServers(['8.8.8.8', '8.8.4.4']);
const dbConfig = require("./dbConfig")
const router = require("./routes")
const cookieParser = require('cookie-parser')
const cloudConfig = require('./services/cloudConfig');
const { webhook } = require('./controllers/orderController');
const app = express()

// ------------------- Middlewares 
app.post('/webhook', express.raw({ type: 'application/json' }), webhook);
app.set('trust proxy', 1)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({
    origin: [
        'http://localhost:3000',
        'https://rexifyshop.vercel.app'
    ],
    credentials: true,
}))
// ------------------- Route 
app.use(router)
// ------------------- Database 
dbConfig()
cloudConfig()

// ------------------- Server Listener 
if (process.env.NODE_ENV !== "production") {
    app.listen(8000, () => {
        console.log('Server Is Running')
    })
}

module.exports = app