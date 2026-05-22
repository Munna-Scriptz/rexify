const productSchema = require('../models/productSchema')
const reviewSchema = require('../models/reviewSchema')

const updateProductReviewStats = async function (productId) {
    try {
        if (!productId) return
        const stats = await reviewSchema.aggregate([
            { $match: { product: productId } },
            { $group: { _id: "$product", totalReviews: { $sum: 1 }, avgRating: { $avg: "$rating" } } }
        ])

        const totalReview = stats[0]?.totalReviews || 0
        const avgReview = stats[0]?.avgRating ? Number(stats[0].avgRating.toFixed(2)) : 0

        await productSchema.findByIdAndUpdate(productId, { totalReview, avgReview })
    } catch (err) {
        console.error('Failed to update product review stats', err)
    }
}

module.exports = updateProductReviewStats