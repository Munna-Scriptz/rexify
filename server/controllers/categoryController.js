const categorySchema = require("../models/categorySchema")
const { cloudUpload, cloudDelete } = require("../services/cloudUpload")
const resHandler = require("../utils/resHandler")
const { ObjectId } = require('mongodb');

// ================= Create Category =====================
const createCategory = async (req, res) => {
    try {
        const { slug, name, description } = req.body
        const thumbnail = req.file

        // ---------- Validations 
        const existingSlug = await categorySchema.findOne({ slug })
        if (existingSlug) return resHandler.error(res, 400, "Slug with this name already exists")
        if (!slug) return resHandler.error(res, 400, "Category slug is required")
        if (!name) return resHandler.error(res, 400, "Category name is required")
        if (!thumbnail) return resHandler.error(res, 400, "Category thumbnail is required")

        // ---------- Upload image to cloudinary
        const cloudinaryRes = await cloudUpload({ file: thumbnail, folderPath: "rexify/categories", folder: "category" })

        // ----------- Send to DB 
        const category = await categorySchema({
            slug,
            name,
            description,
            thumbnail: cloudinaryRes.secure_url
        })

        category.save()

        // --------------- Success
        resHandler.success(res, 201, "Category created successfully")
    } catch (error) {
        resHandler.error(res, 500, "Internal server error")
    }
}

// ================= Delete Category =====================
const deleteCategory = async (req, res) => {
    try {
        const { categoryId } = req.body 

        // ---------- Validation ----------
        if (!categoryId) return resHandler.error(res, 400, 'Category ID is required')
        if (!ObjectId.isValid(categoryId)) return resHandler.error(res, 400, 'invalid object id')


        // ------- Find from DB
        const existingCategory = await categorySchema.findById(categoryId)
        if (!existingCategory) return resHandler.error(res, 404, "Coudn't found any Category")


        // ------------ Thumbnail -------------
        cloudDelete({ folder: "category", file: existingCategory.thumbnail }) // --- Delete thumbnail

        await categorySchema.findByIdAndDelete(categoryId)

        // --------- Success 
        resHandler.success(res, 200, "Category deleted successfully")
    } catch (error) {
        console.log(error)
        resHandler.error(res, 500, 'Internal Server Error')
    }
}
// ================= Get All Category =====================
const getCategories = async (req, res) => {
    try {
        const categories = await categorySchema.aggregate([{
            $lookup: {
                from: "products",
                localField: "_id",
                foreignField: "category",
                as: "products"
            }
        },
        { $set: { totalProducts: { $size: "$products" } } },
        { $project: { products: 0, __v: 0 } }
        ]);

        if (!categories.length) return resHandler.error(res, 404, "Categories not found");

        resHandler.success(res, 200, "", categories);
    } catch (error) {
        resHandler.error(res, 500, "Internal server error");
    }
};

module.exports = { createCategory, deleteCategory, getCategories }