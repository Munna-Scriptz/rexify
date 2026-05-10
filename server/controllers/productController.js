const categorySchema = require("../models/categorySchema")
const productSchema = require("../models/productSchema")
const reviewSchema = require("../models/reviewSchema")
const { cloudUpload, cloudDelete } = require("../services/cloudUpload")
const resHandler = require("../utils/resHandler")

// =============== Create Product ==================
const createProduct = async (req, res) => {
    try {
        const { title, slug, description, category, price, discountPercentage, brand, badge, warranty, shipping, isActive } = req.body
        const variants = JSON.parse(req.body.variants);
        const specifications = JSON.parse(req.body.specifications);
        const tags = JSON.parse(req.body.tags);
        const thumbnail = req.files?.thumbnail?.[0]
        const images = req.files?.images

        // ---------- Validation ----------
        if (!title) return resHandler.error(res, 400, 'Title is required')
        if (!price) return resHandler.error(res, 400, 'price is required')
        // Slug 
        if (!slug) return resHandler.error(res, 400, 'Slug is required')
        const existSlug = await productSchema.findOne({ slug: slug.toLowerCase() })
        if (existSlug) return resHandler.error(res, 400, 'Slug with this name already exists')
        if (!description) return resHandler.error(res, 400, 'Description is required')
        // category 
        if (!category) return resHandler.error(res, 400, 'Category is required')
        const existCategory = await categorySchema.findById(category)
        if (!existCategory) return resHandler.error(res, 400, "Invalid category or doesn't exist")

        // Variants 
        if (!Array.isArray(variants) || variants.length == 0) return resHandler.error(res, 400, 'Variants is required')
        for (const variant of variants) {
            if (!variant.sku) return resHandler.error(res, 400, 'Product SKU is required')
            if (!variant.color) return resHandler.error(res, 400, 'Product color is required')
            if (!variant.ram) return resHandler.error(res, 400, 'Product RAM is required')
            if (!variant.storage) return resHandler.error(res, 400, 'Product Storage is required')
            if (!variant.price) return resHandler.error(res, 400, 'Product price is required')
            if (!variant.stock || variant.stock < 1) return resHandler.error(res, 400, 'Stock is required and must be at least 1')
        }
        const AllSku = variants.map(item => item.sku)
        if (new Set(AllSku).size !== AllSku.length) return resHandler.error(res, 400, 'SKU with this name already exists')

        // Specifications
        if (!specifications) return resHandler.error(res, 400, 'Specification is required')
        if (!specifications.display.size) return resHandler.error(res, 400, 'Specification display size required')
        if (!specifications.display.type) return resHandler.error(res, 400, 'Specification display type required')
        if (!specifications.display.resolution) return resHandler.error(res, 400, 'Specification display resolution required')
        if (!specifications.display.refreshRate) return resHandler.error(res, 400, 'Specification display refreshRate required')

        if (!specifications.camera.rear) return resHandler.error(res, 400, 'Specification camera rear required')

        if (!specifications.battery) return resHandler.error(res, 400, 'Specification battery required')
        if (!specifications.processor) return resHandler.error(res, 400, 'Specification processor required')
        if (!specifications.network) return resHandler.error(res, 400, 'Specification network required')
        if (!specifications.weight) return resHandler.error(res, 400, 'Specification weight required')
        if (!specifications.os) return resHandler.error(res, 400, 'Specification os required')


        // ---------- Upload images ----------
        if (!thumbnail) return resHandler.error(res, 400, 'Product thumbnail is required')
        const thumbRes = await cloudUpload({ file: thumbnail, folderPath: "rexify/products", folder: "product" })

        const imageUrls = []
        if (images) {
            for (const img of images) {
                const uploadRes = await cloudUpload({ file: img, folderPath: "rexify/products", folder: "product" })
                imageUrls.push(uploadRes.secure_url)
            }
        }


        // ---------- Save to DB ----------
        const product = productSchema({
            title,
            slug,
            description,
            category,
            price,
            discountPercentage,
            variants,
            specifications,
            images: imageUrls,
            thumbnail: thumbRes.secure_url,
            brand,
            badge,
            warranty,
            shipping,
            tags,
            isActive
        })
        product.save()

        // ------------ Success 
        resHandler.success(res, 201, "Product created successfully")
    } catch (error) {
        console.log(error)
        resHandler.error(res, 500, 'Internal Server Error')
    }
}

// =============== Get all Product ==================
const getAll = async (req, res) => {
    try {
        // --------- query
        const categorySlug = req.query.category
        const search = req.query.search || ""
        const limit = parseInt(req.query.limit) || 10
        const page = parseInt(req.query.page) || 1
        const skip = (page - 1) * limit

        // --------- Count & Page
        const productsCount = await productSchema.countDocuments()
        const totalPages = Math.ceil(productsCount / limit)

        // --------- Search and Pipeline
        const pipline = [
            {
                $lookup: {
                    from: "categories",
                    localField: "category",
                    foreignField: "_id",
                    as: "category"
                }
            },
            { $match: { "isActive": true, ...(categorySlug && { "category.slug": categorySlug }) } },
            { $match: { title: { $regex: search, $options: "i" } } },
            { $unwind: "$category" },
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: limit },
            { $project: { __v: 0, isActive: 0, updatedAt: 0, "category.__v": 0, "category.isActive": 0, "category._id": 0, "variants._id": 0 } }
        ]
        // ---------- Find product 
        const products = await productSchema.aggregate(pipline)

        // ---------- Success 
        resHandler.success(res, 201, "", {
            products,
            pagination: {
                total: productsCount,
                showing: products?.length || 0,
                page,
                limit,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            }
        })
    } catch (error) {
        resHandler.error(res, 500, 'Internal Server Error')
    }
}

// =============== Get Single Product ==================
const getSingle = async (req, res) => {
    try {
        const { slug } = req.params

        // ------- Find from DB
        const product = await productSchema.findOne({ slug }).select("-__v -isActive -updatedAt ")
        if (!product) return resHandler.error(res, 404, "Couldn't found any product")

        // ------- Reviews from db
        const reviews = await reviewSchema
            .find({ product: product._id })
            .populate("user", "fullname avatar")
            .select("-__v -product -updatedAt ")
        // --------- Success 
        resHandler.success(res, 200, "", { product, reviews })
    } catch (error) {
        resHandler.error(res, 500, 'Internal Server Error')
    }
}

// =============== Update Product ==================
const updateProduct = async (req, res) => {
    try {
        const productSlug = req.params.slug
        const thumbnail = req.files?.thumbnail?.[0]
        const images = req.files?.images
        const { title, slug, description, category, discountPercentage, variants, specifications, brand, badge, warranty, shipping, tags, isActive, destroyImg = [] } = req.body

        // ---------- Validation ----------
        if (slug) {
            const existSlug = await productSchema.findOne({ slug: slug?.toLowerCase() })
            if (existSlug) return resHandler.error(res, 400, 'Slug with this name already exists')
        }
        if (variants) {
            for (const variant of variants) {
                if (variant.stock && variant.stock < 1) return resHandler.error(res, 400, 'Stock must be at least 1')
            }
            const AllSku = variants.map(item => item.sku)
            if (new Set(AllSku).size !== AllSku.length) return resHandler.error(res, 400, 'SKU with this name already exists')
        }
        if (category) {
            const existCategory = await categorySchema.findById(category)
            if (!existCategory) return resHandler.error(res, 400, "Invalid category or doesn't exist")
        }
        if (tags && tags?.length > 0 && !Array.isArray(tags)) return resHandler.error(res, 400, "Tags must be in array or syntax error")

        // ------- Find from DB
        const existingProduct = await productSchema.findOne({ slug: productSlug })
        if (!existingProduct) return resHandler.error(res, 404, "Coudn't found any product")

        // ------- Changes
        if (title) existingProduct.title = title
        if (slug) existingProduct.slug = slug.toLowerCase()
        if (description) existingProduct.description = description
        if (category) existingProduct.category = category
        if (discountPercentage) existingProduct.discountPercentage = discountPercentage
        if (variants) existingProduct.variants = variants
        if (specifications) existingProduct.specifications = specifications
        if (brand) existingProduct.brand = brand
        if (badge) existingProduct.badge = badge
        if (warranty) existingProduct.warranty = warranty
        if (shipping) existingProduct.shipping = shipping
        if (tags) existingProduct.tags = tags


        // ------------ Thumbnail -------------
        if (thumbnail) {
            cloudDelete({ folder: "thumbnail", file: existingProduct.thumbnail }) // --- Delete previous thumbnail
            const cloudRes = await cloudUpload({ file: thumbnail, folderPath: "rexify/products", folder: "product" })
            existingProduct.thumbnail = cloudRes.secure_url
        }

        // ------------ Images -------------
        let updatedImageUrls = []

        let totalImages = existingProduct.images.length
        if (destroyImg.length > 0) totalImages -= destroyImg.length
        if (Array.isArray(images) && images?.length > 0) totalImages += images.length
        if (totalImages > 4) return resHandler.error(res, 400, "You can upload maximum of 4 images")
        if (totalImages < 0) return resHandler.error(res, 400, "Please upload at least 1 image")


        if (Array.isArray(destroyImg) && destroyImg.length > 0) {
            for (const imgs of destroyImg) {
                cloudDelete({ folder: "product", file: imgs }) // --- Delete previous images
            }
        }

        if (images && images.length > 0) {
            for (const img of images) {
                const uploadRes = await cloudUpload({ file: img, folderPath: "rexify/products", folder: "product" })
                updatedImageUrls.push(uploadRes.secure_url)
            }

        }

        const filteredImg = existingProduct.images.filter((item) => {
            return !destroyImg.includes(item)
        })

        updatedImageUrls = updatedImageUrls.concat(filteredImg)
        existingProduct.images = updatedImageUrls

        // ---- Save
        existingProduct.save()

        // --------- Success 
        resHandler.success(res, 200, "Product updated successfully")
    } catch (error) {
        console.log(error)
        resHandler.error(res, 500, 'Internal Server Error')
    }
}



module.exports = { createProduct, getAll, getSingle, updateProduct }