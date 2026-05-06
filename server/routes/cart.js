const express = require("express")
const authMiddleware = require("../middleware/authMiddleware")
const { createCart, updateCart, deleteCart, getCart } = require("../controllers/cartController")
const router = express.Router()

router.post("/create", authMiddleware, createCart)
router.patch("/update", authMiddleware, updateCart)
router.delete("/delete", authMiddleware, deleteCart)
router.get("/", authMiddleware, getCart)

module.exports = router