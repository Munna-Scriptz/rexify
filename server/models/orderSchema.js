const mongoose = require("mongoose")

const orderItem = mongoose.Schema({
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

const paymentSchema = mongoose.Schema({
    method: {
        type: String,
        enum: ["bkash", "nagad", "stripe", "SSLCommerz", "cod"]
    },
    currency: {
        type: String,
        default: "bdt"
    },
    paymentId: {
        type: String,
    },
    fullname: {
        type: String
    },
    email: {
        type: String
    },
    status: {
        type: String,
        enum: ["pending", "paid", "cancelled"],
        default: "pending"
    },
    receipt: {
        type: String
    },
    paidAmount: {
        type: Number
    },
    paidAt: {
        type: Date
    },
}, { _id: false })


const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    items: [
        orderItem
    ],
    payment: paymentSchema,
    totalPrice: {
        type: Number,
        required: true
    },
    shippingAddress: {
        address: String,
        city: String,
        postalCode: String,
        phone: String,
    },
    division: {
        type: String,
        required: true
    },
    insideDhaka: {
        type: Boolean,
        required: true,
        default: false,
    },
    deliveryCharge: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"],
        default: "pending"
    },
    orderId: {
        type: String,
        unique: true
    }
}, { timestamps: true })


module.exports = mongoose.model("order", orderSchema)