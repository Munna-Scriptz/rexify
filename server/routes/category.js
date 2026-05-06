const express = require('express')
const multer = require('multer')
const upload = multer()
const { createCategory, getCategories } = require('../controllers/categoryController')
const authMiddleware = require('../middleware/authMiddleware')
const roleCheckMiddleware = require('../middleware/roleCheckMiddleware')
const router = express.Router()

router.post("/create", upload.single('thumbnail'), authMiddleware, roleCheckMiddleware('admin'), createCategory)
router.get("/all", getCategories)

module.exports = router