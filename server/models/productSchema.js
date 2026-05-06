const mongoose = require('mongoose');

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
    discountPercentage: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
    },
    price: {
        type: Number,
        min: 0,
        required: true
    },
    variants: [
        {
            sku: {
                type: String,
                required: true,
            },
            color: {
                type: String,
                required: true
            },
            storage: {
                type: Number,
            },
            ram: {
                type: Number,
            },
            price: {
                type: Number,
                required: true,
                min: 1
            },
            stock: {
                type: Number,
                required: true,
                min: 0
            },
            _id: false
        }
    ],
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
    thumbnail: {
        type: String,
        // required: true,
    },
    images: [
        {
            type: String,
        },
    ],
    isActive: {
        type: Boolean,
        default: true,
    }

}, { timestamps: true });

module.exports = mongoose.model('product', productSchema)