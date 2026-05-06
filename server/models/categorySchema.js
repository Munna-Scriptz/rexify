const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
    },
    thumbnail: {
        type: String,
    },
    totalProducts: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    }
})


module.exports = mongoose.model("category", categorySchema);