import { ArrowLeft, ShoppingBag } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'

const EmptyCart = () => {
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

export default EmptyCart