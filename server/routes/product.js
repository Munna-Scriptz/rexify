const express = require('express')
const router = express.Router()
const { createProduct, getAll, getSingle, updateProduct } = require("../controllers/productController")
const authMiddleware = require('../middleware/authMiddleware')
const roleCheckMiddleware = require('../middleware/roleCheckMiddleware')
const multer = require('multer')
const upload = multer()


router.post('/create', authMiddleware, roleCheckMiddleware("admin", "editor"), upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'images', maxCount: 4 }]), createProduct)
router.put('/update/:slug', authMiddleware, roleCheckMiddleware("admin", "editor"), upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'images', maxCount: 4 }]), updateProduct)

router.get("/", getAll)
router.get("/:slug", getSingle)


module.exports = router