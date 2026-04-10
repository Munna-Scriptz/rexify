import React from 'react'
import { Star } from 'lucide-react';
import { FiHeart, FiShoppingBag } from 'react-icons/fi';

const ShopCard = ({ product }) => (
    <div className="rounded-2xl border border-border overflow-hidden group relative bg-bg hover:shadow-xl transition-all duration-300">
        <div className="relative h-60 flex items-center justify-center bg-surface overflow-hidden">
            <img src={product.img} alt={product.name} className="h-44 object-contain transition-transform duration-500 group-hover:scale-107" />
            <span className="absolute top-3 left-3 text-[11px] tracking-wide uppercase px-3 py-1 rounded-full border border-neutral-200 text-text-secondary bg-white">
                {product.badge}
            </span>
            {!product.inStock && (
                <div className="absolute inset-0 bg-bg/60 backdrop-blur-[2px] flex items-center justify-center">
                    <span className="bg-white text-text-secondary font-semibold text-xs px-4 py-1.5 rounded-full border border-border">Out of Stock</span>
                </div>
            )}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <button className="h-9 w-9 rounded-full border border-neutral-200 bg-white flex items-center justify-center text-text-primary hover:border-accent hover:text-accent transition-all" aria-label="Add to cart">
                    <FiShoppingBag size={16} />
                </button>
                <button className="h-9 w-9 rounded-full border border-neutral-200 bg-white flex items-center justify-center text-text-primary hover:border-accent hover:text-accent transition-all" aria-label="Wishlist">
                    <FiHeart size={16} />
                </button>
            </div>
        </div>
        <div className="px-4 py-4">
            <p className="text-xs text-text-muted font-medium mb-1 uppercase tracking-wide">{product.brand}</p>
            <h3 className="text-[15px] font-semibold text-text-primary leading-snug line-clamp-1">{product.name}</h3>
            <div className="mt-3 flex items-center justify-between">
                <span className="text-[17px] font-bold text-text-primary">${product.price.toLocaleString()}</span>
                <div className="flex items-center gap-1 text-xs text-text-secondary">
                    <Star size={12} className="text-yellow-400 fill-yellow-400" />
                    <span className="font-medium text-text-primary">{product.rating}</span>
                    <span>({product.reviews.toLocaleString()})</span>
                </div>
            </div>
        </div>
        <div className="h-0.5 w-full bg-linear-to-r from-transparent via-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
);

export default ShopCard