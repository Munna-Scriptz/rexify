const mongoose = require('mongoose');

const variantItem = mongoose.Schema({
    sku: {
        type: String,
        required: true,
        unique: true,
    },

    color: {
        name: String,
        code: String,
    },

    ram: Number,
    storage: Number,

    price: {
        type: Number,
        required: true,
        min: 1
    },

    discountPercentage: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    },

    thumbnail: String,

    images: [String],

    isDefault: {
        type: Boolean,
        default: false,
    },

})


const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'category',
        required: true,
    },
    variants: [variantItem],

    specifications: {
        display: {
            size: { type: String, required: true },
            type: { type: String, required: true },
            resolution: { type: String, required: true },
            refreshRate: { type: String, required: true }
        },
        camera: {
            rear: { type: String, required: true },
            front: { type: String, required: true }
        },
        battery: { type: String, required: true },
        processor: { type: String, required: true },
        network: { type: String, required: true },
        weight: { type: String, required: true },
        os: { type: String, required: true },
    },

    brand: {
        type: String,
        required: true
    },
    badge: {
        type: String
    },
    warranty: {
        type: String,
        default: "No warranty"
    },
    shipping: {
        type: String,
        default: "Ships in 3-5 business days"
    },
    soldCount: {
        type: Number,
        default: 0
    },
    tags: [
        {
            type: String,
        },
    ],
    isActive: {
        type: Boolean,
        default: true,
    },

}, { timestamps: true });

module.exports = mongoose.model('product', productSchema)