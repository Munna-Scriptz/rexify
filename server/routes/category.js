const express = require('express')
const multer = require('multer')
const upload = multer()
const authMiddleware = require('../middleware/authMiddleware')
const roleCheckMiddleware = require('../middleware/roleCheckMiddleware')
const router = express.Router()
const { createCategory, deleteCategory, updateCategory, getCategories } = require('../controllers/categoryController')

router.post("/create", upload.single('thumbnail'), authMiddleware, roleCheckMiddleware('admin'), createCategory)
router.delete("/delete", authMiddleware, roleCheckMiddleware('admin'), deleteCategory)
router.patch("/update", upload.single('thumbnail'), authMiddleware, roleCheckMiddleware('admin'), updateCategory)
router.get("/all", getCategories)

module.exports = router