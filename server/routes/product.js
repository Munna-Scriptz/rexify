const express = require('express')
const router = express.Router()
const { createProduct, getAll, getSingle, updateProduct, getRelatedProducts, getHomePro } = require("../controllers/productController")
const authMiddleware = require('../middleware/authMiddleware')
const roleCheckMiddleware = require('../middleware/roleCheckMiddleware')
const multer = require('multer')
const upload = multer()


router.post('/create', authMiddleware, roleCheckMiddleware("admin", "editor"), upload.any(), createProduct)
router.patch('/update/:slug', authMiddleware, roleCheckMiddleware("admin", "editor"), upload.any(), updateProduct)

router.get("/", getAll)
router.get("/related", getRelatedProducts)
router.get("/home", getHomePro)
router.get("/:slug", getSingle)


module.exports = router