const express = require('express')
const router = express.Router()
const { checkout, getOrders } = require("../controllers/orderController")
const authMiddleware = require('../middleware/authMiddleware')

router.post("/", authMiddleware, checkout)
router.get("/get", getOrders)

module.exports = router