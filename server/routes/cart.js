const express = require("express")
const authMiddleware = require("../middleware/authMiddleware")
const { createCart, updateCart, deleteCart, getCart, getCartCount } = require("../controllers/cartController")
const optionalAuthMiddleware = require("../middleware/optionalAuthMiddleware")
const router = express.Router()

router.post("/create", authMiddleware, createCart)
router.patch("/update", authMiddleware, updateCart)
router.delete("/delete", authMiddleware, deleteCart)
router.get("/", authMiddleware, getCart)
router.get("/count", optionalAuthMiddleware, getCartCount)

module.exports = router