const mongoose = require("mongoose");

const cartItem = mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true,
    },
    sku: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
        min: 1,
    },
    discountPercentage: {
        type: Number,
    },
    price: {
        type: Number,
        required: true
    },
    subTotal: {
        type: Number,
        required: true,
    }
})

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
        unique: true,
    },
    items: [
        cartItem
    ],
    totalItems: {
        type: Number,
        default: 0,
    },

}, { timestamps: true });

cartSchema.pre("save", function () {
    this.totalItems = this.items?.reduce((acc, item) => acc + item.quantity, 0);
});

module.exports = mongoose.model("cart", cartSchema);

