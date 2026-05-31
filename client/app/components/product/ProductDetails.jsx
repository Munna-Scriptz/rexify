"use client"
import React, { useState } from 'react'
import { Star, Minus, Plus, ShoppingCart, Zap, Truck, ShieldCheck } from 'lucide-react'
import { toast, ToastContainer } from 'react-toastify'
import { apiClient } from '@/app/lib/apiClient'
import { refreshCart } from '@/app/lib/RefreshCart'
import AuthCard from '../cards/AuthCard'
import { useRouter } from 'next/navigation'

const ProductDetails = ({ product, selectedVariantIndex, setSelectedVariantIndex, currentUser }) => {
    const router = useRouter();

    const [quantity, setQuantity] = useState(1);
    const [isAuthCardOpen, setIsAuthCardOpen] = useState(false);
    const selectedVariant = product?.variants?.[selectedVariantIndex] || product?.variants?.[0];
    const isOutOfStock = !selectedVariant || selectedVariant.stock === 0;

    // ---------- Handle cart -------------- 
    const handleCart = async () => {
        if (!currentUser) return setIsAuthCardOpen(true)
        await toast.promise(
            apiClient.post("/cart/create", {
                product: product._id,
                sku: selectedVariant?.sku,
                quantity,
            }),
            {
                pending: "Adding to cart...",
                success: "Added to cart successfully!",
                error: (err) => err?.response?.data?.message || "Something went wrong",
            }
        );

        await refreshCart();
    };

    // ---------- Handle buy -------------- 
    const handleBuy = async () => {
        router.push(`/checkout/${product.slug}`)
    };

    return (
        <>
            <AuthCard isOpen={isAuthCardOpen} onClose={() => setIsAuthCardOpen(false)} message='You need to be signed in to add to cart' />
            <ToastContainer />

            <div className="w-full">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                    {product?.badge && (
                        <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-bold uppercase rounded-full tracking-wider">
                            {product.badge}
                        </span>
                    )}
                    <span className={`text-sm font-bold flex items-center gap-1 ${isOutOfStock ? 'text-rose-500' : 'text-emerald-500'}`}>
                        <ShieldCheck size={14} /> {isOutOfStock ? 'Out of Stock' : 'In Stock'}
                    </span>
                </div>

                <h1 className="text-3xl lg:text-5xl font-bold font-space mb-4 text-brand">{product?.title}</h1>

                <div className="flex flex-wrap items-center md:gap-4 gap-2 md:mb-6 mb-4">
                    <div className="flex items-center gap-1 text-yellow-400">
                        <Star className='w-4.5 h-4.5' fill="currentColor" />
                        <Star className='w-4.5 h-4.5' fill="currentColor" />
                        <Star className='w-4.5 h-4.5' fill="currentColor" />
                        <Star className='w-4.5 h-4.5' fill="currentColor" />
                        <Star className='w-4.5 h-4.5' fill="currentColor" />
                    </div>
                    <span className="text-xs md:text-sm text-text-secondary">({product?.totalReview || 0} Reviews)</span>
                    <span className="text-text-border">|</span>
                    <span className="text-xs md:text-sm text-text-secondary font-mono">SKU: {selectedVariant?.sku || 'N/A'}</span>
                </div>

                <div className="flex items-baseline gap-3 md:mb-8 mb-6">
                    {selectedVariant?.price ? (
                        <>
                            {selectedVariant.discountPercentage > 0 ? (
                                <>
                                    <span className="text-3xl font-bold font-space text-brand">
                                        ${(selectedVariant.price * (1 - selectedVariant.discountPercentage / 100)).toLocaleString()}
                                    </span>
                                    <span className="text-lg text-text-secondary line-through">
                                        ${selectedVariant.price.toLocaleString()}
                                    </span>
                                    <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-bold rounded">
                                        {selectedVariant.discountPercentage}% OFF
                                    </span>
                                </>
                            ) : (
                                <span className="text-3xl font-bold font-space text-brand">
                                    ${selectedVariant.price.toLocaleString()}
                                </span>
                            )}
                        </>
                    ) : (
                        <span className="text-lg font-bold text-rose-500">Contact for pricing</span>
                    )}
                </div>

                {/* Selectors */}
                <div className="space-y-6 mb-8">
                    {/* Color Selector */}
                    <div>
                        <h3 className="font-bold mb-3 text-slate-800 font-space">
                            Color: <span className="text-text-secondary font-normal font-sans">{selectedVariant?.color?.name || 'Standard'}</span>
                        </h3>
                        <div className="flex flex-wrap md:gap-3 gap-2">
                            {product?.variants?.map((item, i) => {
                                const isSelected = selectedVariantIndex === i;
                                return (
                                    <button
                                        key={i}
                                        type="button"
                                        onClick={() => {
                                            setSelectedVariantIndex(i);
                                            setQuantity(1);
                                        }}
                                        className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer rounded-xl border font-semibold transition-all ${isSelected
                                            ? 'border-accent bg-accent/5 text-accent shadow-sm'
                                            : 'border-border text-text-secondary hover:border-gray-400'
                                            }`}
                                    >
                                        <div
                                            className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all ${isSelected ? 'border-accent' : 'border-transparent'
                                                }`}
                                        >
                                            <div
                                                className="w-4 h-4 rounded-full border border-black/10"
                                                style={{ backgroundColor: item.color?.code || '#ccc' }}
                                            />
                                        </div>
                                        <p className="text-sm">{item.color?.name || 'Default'}</p>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Storage Selector */}
                    <div>
                        <h3 className="font-bold mb-3 text-slate-800 font-space">RAM & Storage</h3>
                        <div className="flex flex-wrap gap-3">
                            {product?.variants?.map((item, i) => {
                                const isSelected = selectedVariantIndex === i;
                                return (
                                    <button
                                        key={i}
                                        type="button"
                                        onClick={() => {
                                            setSelectedVariantIndex(i);
                                            setQuantity(1);
                                        }}
                                        className={`px-4 py-2.5 text-sm cursor-pointer rounded-xl border font-semibold transition-all ${isSelected
                                            ? 'border-accent bg-accent/5 text-accent shadow-sm'
                                            : 'border-border text-text-secondary hover:border-gray-400'
                                            }`}
                                    >
                                        {item.ram}GB/{item.storage}GB
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 mb-8">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 bg-white border border-border rounded-xl px-2">
                        <button
                            type="button"
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            disabled={isOutOfStock}
                            className="md:w-10 w-6 h-full flex items-center justify-center text-text-secondary hover:text-accent disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <Minus size={18} />
                        </button>
                        <span className="font-bold w-4 text-center text-slate-800">{isOutOfStock ? 0 : quantity}</span>
                        <button
                            type="button"
                            onClick={() => setQuantity(quantity + 1)}
                            disabled={isOutOfStock || (selectedVariant && quantity >= selectedVariant.stock)}
                            className="md:w-10 w-6 h-full flex items-center justify-center text-text-secondary hover:text-accent disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <Plus size={18} />
                        </button>
                    </div>

                    <button
                        type="button"
                        onClick={handleBuy}
                        disabled={isOutOfStock}
                        className="flex-1 bg-accent text-white font-bold md:py-4 py-3 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-accent/20 flex items-center justify-center gap-2 cursor-pointer disabled:bg-slate-350 disabled:shadow-none disabled:cursor-not-allowed"
                    >
                        Buy Now <Zap size={20} />
                    </button>

                    <button
                        type="button"
                        onClick={handleCart}
                        disabled={isOutOfStock}
                        className="md:p-4 p-3 border border-border rounded-xl hover:bg-muted text-text-secondary hover:text-text-primary transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        <ShoppingCart size={24} />
                    </button>
                </div>

                {/* Delivery Info */}
                <div className="flex gap-6 text-sm text-text-primary font-medium border-t border-border/40 pt-6">
                    <div className="flex md:text-base text-xs items-center gap-2 text-slate-700">
                        <Truck size={18} className="text-accent" />
                        <span>Free Delivery (2-3 days)</span>
                    </div>
                    <div className="flex md:text-base text-xs items-center gap-2 text-slate-700">
                        <ShieldCheck size={18} className="text-accent" />
                        <span>{product?.warranty || '1 Year Warranty'}</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductDetails;