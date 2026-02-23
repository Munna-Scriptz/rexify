import React from 'react'
import { ShoppingBag, ArrowRight } from 'lucide-react'

const OrderSummary = ({ cartItems, buttonText = "Checkout" }) => {
    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08; 
    const shipping = subtotal > 1000 ? 0 : 25;
    const total = subtotal + tax + shipping;

    return (
        <div className="lg:col-span-1">
            <div className="p-8 rounded-2xl border border-border sticky top-24">
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
                    {buttonText} <ArrowRight size={20} />
                </button>

                <p className="text-center text-xs text-text-muted mt-4 flex items-center justify-center gap-1">
                    <ShoppingBag size={12} /> Secure Checkout
                </p>
            </div>
        </div>
    )
}

export default OrderSummary