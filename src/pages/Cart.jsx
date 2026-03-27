import React, { useState } from 'react'
import OrderSummary from '../components/cart/OrderSummary';
import CartItem from '../components/cart/CartItem';
import EmptyCart from '../components/cart/EmptyCart';

const Cart = () => {
    // Mock Data for Cart Items
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: "iPhone 15 Pro Max",
            color: "Natural Titanium",
            storage: "256GB",
            price: 1199,
            quantity: 1,
            image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=200&auto=format&fit=crop"
        },
        {
            id: 2,
            name: "Sony WH-1000XM5",
            color: "Black",
            price: 399,
            quantity: 2,
            image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=200&auto=format&fit=crop"
        },
        {
            id: 3,
            name: "MacBook Air M3",
            color: "Midnight",
            storage: "512GB",
            price: 1299,
            quantity: 1,
            image: "https://www.applegadgetsbd.com/_next/image?url=https%3A%2F%2Fadminapi.applegadgetsbd.com%2Fstorage%2Fmedia%2Fmedium%2FMacBook-Air-M3-13-Inch-Midnight-7621.jpg&w=640&q=100"
        }
    ]);

    // Empty State Component
    if (cartItems.length === 0) {
        return (
            <EmptyCart />
        )
    }

    return (
        <div className="min-h-screen bg-bg font-primary py-12">
            <div className="container">
                <h1 className="text-3xl font-bold font-space mb-8">Shopping Cart <span className="text-text-secondary text-xl font-normal">({cartItems.length} items)</span></h1>

                <div className="grid lg:grid-cols-3 gap-8 md:gap-12">

                    {/* Cart Items List */}
                    <CartItem cartItems={cartItems} setCartItems={setCartItems} />

                    {/* Order Summary */}
                    <OrderSummary cartItems={cartItems} to={"/auth/confirm"}/>

                </div>
            </div>
        </div>
    )
}

export default Cart