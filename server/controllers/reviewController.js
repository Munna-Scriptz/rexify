const reviewSchema = require("../models/reviewSchema")
const productSchema = require("../models/productSchema")
const resHandler = require("../utils/resHandler")
const { ObjectId } = require('mongodb');
const updateProductReviewStats = require('../services/updateProductReviewStats');

// ============ create review 
const createReview = async (req, res) => {
    try {
        const { productId, rating, comment } = req.body
        const user = req?.user?._id

        if (!user) return resHandler.error(res, 404, 'review user not found')
        if (!productId) return resHandler.error(res, 400, 'product id is required')
        if (!ObjectId.isValid(productId)) return resHandler.error(res, 400, 'invalid object id')
        if (!rating || rating < 1 || rating > 5) return resHandler.error(res, 400, 'rating is required and must be at between 1-5')
        if (!comment) return resHandler.error(res, 400, 'comment cannot be empty')

        const existingReview = await reviewSchema.findOne({ user, product: productId })
        if (existingReview) return resHandler.error(res, 400, 'review already created')

        // ------------- Save to DB 
        const newReview = await reviewSchema({
            product: productId,
            user,
            rating,
            comment
        })
        await newReview.save()

        // update product review stats
        await updateProductReviewStats(productId)

        // ----------- Success 
        resHandler.success(res, 201, "Product review added")
    } catch (error) {
        resHandler.error(res, 500, "Internal server error")
    }
}

// ============ edit review 
const editReview = async (req, res) => {
    try {
        const { reviewId, rating, comment } = req.body

        if (!reviewId) return resHandler.error(res, 400, 'review id is required')
        if (!ObjectId.isValid(reviewId)) return resHandler.error(res, 400, 'invalid object id')
        if (!rating || rating < 1 || rating > 5) return resHandler.error(res, 400, 'rating is required and must be at between 1-5')
        if (!comment) return resHandler.error(res, 400, 'comment cannot be empty')

        // ensure review exists and get product id
        const existing = await reviewSchema.findById(reviewId)
        if (!existing) return resHandler.error(res, 404, 'review not found')

        // ------------- Save to DB 
        await reviewSchema.findByIdAndUpdate(reviewId, {
            rating,
            comment
        }, { new: true })

        // update product review stats
        await updateProductReviewStats(existing.product)

        // ----------- Success 
        resHandler.success(res, 200, "Review edited successfully")
    } catch (error) {
        console.log(error)
        resHandler.error(res, 500, "Internal server error")
    }
}

// ============ delete review 
const deleteReview = async (req, res) => {
    try {
        const { reviewId } = req.body

        if (!reviewId) return resHandler.error(res, 400, 'review id is required')
        if (!ObjectId.isValid(reviewId)) return resHandler.error(res, 400, 'invalid object id')

        // get review to obtain product id
        const existing = await reviewSchema.findById(reviewId)
        if (!existing) return resHandler.error(res, 404, 'review not found')

        // ------------- Delete from DB 
        await reviewSchema.findByIdAndDelete(reviewId)

        // update product review stats
        await updateProductReviewStats(existing.product)

        // ----------- Success 
        resHandler.success(res, 200, "Review deleted successfully")
    } catch (error) {
        console.log(error)
        resHandler.error(res, 500, "Internal server error")
    }
}

// ============ delete review 
const getByUser = async (req, res) => {
    try {
        const reviews = await reviewSchema.find({
            user: req.user._id
        })
            .select("-user -updatedAt -__v")
            .populate("product", "title slug variants.thumbnail brand")

        if (!reviews) return resHandler.error(res, 404, "Couldn't found any reviews")

        // ----------- Success 
        resHandler.success(res, 200, "your reviews", reviews)
    } catch (error) {
        console.log(error)
        resHandler.error(res, 500, "Internal server error")
    }
}

module.exports = { createReview, editReview, deleteReview, getByUser }