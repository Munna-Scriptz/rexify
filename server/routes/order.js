const express = require('express')
const router = express.Router()
const { checkout, getOrders, getUserOrders, checkoutSingle } = require("../controllers/orderController")
const authMiddleware = require('../middleware/authMiddleware')
const optionalAuthMiddleware = require('../middleware/optionalAuthMiddleware')

router.post("/", authMiddleware, checkout)
router.post("/single", optionalAuthMiddleware, checkoutSingle)
router.get("/get", getOrders)
router.get("/user", authMiddleware, getUserOrders)

module.exports = router