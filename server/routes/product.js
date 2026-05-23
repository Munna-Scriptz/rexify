const express = require('express')
const router = express.Router()
const { createProduct, getAll, getSingle, updateProduct, getRelatedProducts } = require("../controllers/productController")
const authMiddleware = require('../middleware/authMiddleware')
const roleCheckMiddleware = require('../middleware/roleCheckMiddleware')
const multer = require('multer')
const upload = multer()


router.post('/create', authMiddleware, roleCheckMiddleware("admin", "editor"), upload.any(), createProduct)
router.put('/update/:slug', authMiddleware, roleCheckMiddleware("admin", "editor"), upload.any(), updateProduct)

router.get("/", getAll)
router.get("/related", getRelatedProducts)
router.get("/:slug", getSingle)


module.exports = router