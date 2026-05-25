const express = require('express')
const router = express.Router()
const { checkout, getOrders, getUserOrders } = require("../controllers/orderController")
const authMiddleware = require('../middleware/authMiddleware')

router.post("/", authMiddleware, checkout)
router.get("/get", getOrders)
router.get("/user", authMiddleware, getUserOrders)

module.exports = router