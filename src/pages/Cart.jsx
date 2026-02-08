import React, { useState } from 'react'
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router' // Assuming react-router v6+ or react-router-dom

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
            image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca4?q=80&w=200&auto=format&fit=crop"
        }
    ]);

    // Update Quantity Handler
    const updateQuantity = (id, change) => {
        setCartItems(prevItems => prevItems.map(item => {
            if (item.id === id) {
                const newQuantity = Math.max(1, item.quantity + change);
                return { ...item, quantity: newQuantity };
            }
            return item;
        }));
    };

    // Remove Item Handler
    const removeItem = (id) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    // Calculate Totals
    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08; // Assuming 8% tax
    const shipping = subtotal > 1000 ? 0 : 25; // Free shipping over $1000
    const total = subtotal + tax + shipping;


    // Empty State Component
    if (cartItems.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 font-primary">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center text-text-secondary mb-6 animate-fade-in">
                    <ShoppingBag size={48} strokeWidth={1.5} />
                </div>
                <h2 className="text-3xl font-bold font-space mb-3">Your Cart is Empty</h2>
                <p className="text-text-secondary max-w-md mb-8">
                    Looks like you haven't added anything to your cart yet.
                    Explore our products and find something you love.
                </p>
                <Link to="/category" className="px-8 py-3 bg-accent text-white font-medium rounded-full hover:bg-blue-700 transition-all flex items-center gap-2">
                    <ArrowLeft size={18} /> Continue Shopping
                </Link>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-bg font-primary py-12">
            <div className="container">
                <h1 className="text-3xl font-bold font-space mb-8">Shopping Cart <span className="text-text-secondary text-xl font-normal">({cartItems.length} items)</span></h1>

                <div className="grid lg:grid-cols-3 gap-8 md:gap-12">

                    {/* Cart Items List */}
                    <div className="lg:col-span-2 space-y-6">
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex flex-col sm:flex-row gap-6 p-6 bg-surface rounded-2xl border border-border group hover:border-accent/30 transition-all">

                                {/* Image */}
                                <div className="w-full sm:w-32 h-32 bg-white rounded-xl shrink-0 overflow-hidden p-2">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                </div>

                                {/* Details */}
                                <div className="flex-1 flex flex-col justify-between">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-bold text-lg text-text-primary mb-1">{item.name}</h3>
                                            <p className="text-sm text-text-secondary mb-1">{item.color} {item.storage && `• ${item.storage}`}</p>
                                        </div>
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="text-text-muted hover:text-red-500 transition-colors p-1"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>

                                    <div className="flex justify-between items-end mt-4">
                                        {/* Quantity Control */}
                                        <div className="flex items-center gap-3 bg-white border border-border rounded-lg p-1">
                                            <button
                                                onClick={() => updateQuantity(item.id, -1)}
                                                className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-muted text-text-secondary transition-colors"
                                                disabled={item.quantity <= 1}
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="text-sm font-semibold w-6 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, 1)}
                                                className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-muted text-text-secondary transition-colors"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>

                                        <p className="font-bold text-xl font-space">${(item.price * item.quantity).toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-surface p-8 rounded-2xl border border-border sticky top-24">
                            <h2 className="text-xl font-bold font-space mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-text-secondary">
                                    <span>Subtotal</span>
                                    <span className="text-text-primary font-medium">${subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-text-secondary">
                                    <span>Tax estimate (8%)</span>
                                    <span className="text-text-primary font-medium">${tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-text-secondary">
                                    <span>Shipping</span>
                                    <span className={`font-medium ${shipping === 0 ? 'text-green-600' : 'text-text-primary'}`}>
                                        {shipping === 0 ? 'Free' : `$${shipping}`}
                                    </span>
                                </div>

                                <div className="h-px bg-border my-4"></div>

                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-lg">Total</span>
                                    <span className="font-bold text-2xl font-space">${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                </div>
                            </div>

                            <button className="w-full py-4 bg-accent text-white font-bold rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-accent/20">
                                Checkout <ArrowRight size={20} />
                            </button>

                            <p className="text-center text-xs text-text-muted mt-4 flex items-center justify-center gap-1">
                                <ShoppingBag size={12} /> Secure Checkout
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Cart