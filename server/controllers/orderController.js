const cartSchema = require("../models/cartSchema");
const orderSchema = require("../models/orderSchema");
const resHandler = require("../utils/resHandler")
const { ObjectId } = require('mongodb');
const stripe = require('stripe')(process.env.STRIPE_SEC_KEY);
const endpointSecret = process.env.STRIPE_SIGNING_SEC;


// ================= Create checkout =====================
const checkout = async (req, res) => {
    try {
        const user = req.user._id
        const { paymentMethod, cartId, shippingAddress, division, } = req.body

        // ------- Validation
        if (!paymentMethod) return resHandler.error(res, 400, "Payment type is required")
        if (!cartId) return resHandler.error(res, 400, "Unauthorized request")
        if (!ObjectId.isValid(cartId)) return resHandler.error(res, 400, "Invalid order request")
        if (!shippingAddress) return resHandler.error(res, 400, "Shipping address is required")
        if (!division) return resHandler.error(res, 400, "Division is required")

        // ----- Find from db
        const existingCart = await cartSchema.findOne({ _id: cartId }).populate("items.product", "title description thumbnail")
        if (!existingCart) return resHandler.error(res, 404, "Product doesn't exist")
        if (!user) return resHandler.error(res, 404, "user not found")
        // ----- Price and charges
        const insideDhaka = division.toLowerCase() == "dhaka"
        const deliveryCharge = insideDhaka ? 80 : 120

        const totalPrice = existingCart.items.reduce((charge, current) => {
            return charge + current.subTotal
        }, deliveryCharge)

        const orderId = `ORDER-${Math.random().toString(36).substring(2, 10).toUpperCase()}`

        // ----- Save to db
        const order = orderSchema({
            user,
            items: existingCart.items,
            payment: {
                method: paymentMethod
            },
            totalPrice,
            shippingAddress,
            division,
            insideDhaka,
            deliveryCharge,
            orderId
        })

        order.save()

        // ---------- Cod Success 
        if (paymentMethod === "cod") return resHandler.success(res, 200, "Order placed successfully")

        // ---------- Handle stripe payment 
        if (paymentMethod === "stripe") {
            const session = await stripe.checkout.sessions.create({
                mode: 'payment',
                line_items: existingCart.items.map((item) => ({
                    price_data: {
                        currency: 'bdt',
                        product_data: {
                            name: item.product.title,
                            description: item.product.description,
                            images: [item.product.thumbnail],
                        },

                        unit_amount: item.price * 100,
                    },
                    quantity: item.quantity,
                })),
                customer_email: `${req.user.email}`,
                metadata: {
                    orderId: `${order._id}`
                },
                success_url: `https://rexifyshop.vercel.app/checkout/complete`,
                cancel_url: `https://rexifyshop.vercel.app/checkout/error`,
            });
            // res.redirect(303, session.url);
            // ------------- Success 
            resHandler.success(res, 200, "Please complete the checkout", session.url)
        }

    } catch (error) {
        console.log(error)
        resHandler.error(res, 500, "Internal server error")
    }
}

// ================= Checkout webhook =====================
const webhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];

    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }


    // -------- payment information
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object

        // ------- Save to DB
        await orderSchema.findByIdAndUpdate(session.metadata.orderId, {
            "payment.paymentId": session.id,
            "payment.status": "paid",
            "payment.currency": session.currency,
            "payment.fullname": session.customer_details.name,
            "payment.email": session.customer_details.email,
            "payment.paidAmount": session.amount,
            "payment.paidAt": Date.now()
        })
    }

    // ------------ Payment receipt
    if (event.type === 'charge.updated') {
        const session = event.data.object;

       // ------- Save to DB
        await orderSchema.findOneAndUpdate(
            session.metadata.orderId,
            {
                "payment.receipt": session.receipt_url
            }
        );
    }

    // ------------ Success
    res.send();
}


module.exports = { checkout, webhook }