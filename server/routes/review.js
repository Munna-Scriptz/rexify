const express = require("express")
const { createReview, editReview, deleteReview, getByUser } = require("../controllers/reviewController")
const authMiddleware = require("../middleware/authMiddleware")
const router = express.Router()

router.post("/create", authMiddleware, createReview)
router.patch("/edit", authMiddleware, editReview)
router.delete("/delete", authMiddleware, deleteReview)
router.get("/user", authMiddleware, getByUser)

module.exports = router