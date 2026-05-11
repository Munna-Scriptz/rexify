const express = require('express')
const multer = require('multer')
const upload = multer()
const { createCategory, deleteCategory, getCategories } = require('../controllers/categoryController')
const authMiddleware = require('../middleware/authMiddleware')
const roleCheckMiddleware = require('../middleware/roleCheckMiddleware')
const router = express.Router()

router.post("/create", upload.single('thumbnail'), authMiddleware, roleCheckMiddleware('admin'), createCategory)
router.delete("/delete", authMiddleware, roleCheckMiddleware('admin'), deleteCategory)
router.get("/all", getCategories)

module.exports = router