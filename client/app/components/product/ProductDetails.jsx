"use client"
import React, { useState } from 'react'
import { Star, Minus, Plus, ShoppingCart, Zap, Truck, ShieldCheck } from 'lucide-react'

const ProductDetails = ({ product }) => {
    const [selectedColor, setSelectedColor] = useState(product?.variants[0]?.color)
    const [selectedStorage, setSelectedStorage] = useState(product?.variants[0]?.ram)
    const [selectedRam, setSelectedRam] = useState(product?.variants[0]?.ram)
    const [quantity, setQuantity] = useState(1)

    return (
        <div>
            <div className="mb-2 flex items-center gap-2">
                <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-bold uppercase rounded-full tracking-wider">New Arrival</span>
                <span className="text-sm text-green-600 font-medium flex items-center gap-1"><ShieldCheck size={14} /> In Stock</span>
            </div>

            <h1 className="text-3xl lg:text-5xl font-bold font-space mb-4">{product?.title}</h1>

            <div className="flex items-center md:gap-4 gap-2 md:mb-6 mb-4">
                <div className="flex items-center gap-1 text-yellow-400">
                    <Star className='w-3 md:w-4.5' fill="currentColor" />
                    <Star className='w-3 md:w-4.5' fill="currentColor" />
                    <Star className='w-3 md:w-4.5' fill="currentColor" />
                    <Star className='w-3 md:w-4.5' fill="currentColor" />
                    <Star className='w-3 md:w-4.5' fill="currentColor" />
                </div>
                <span className="md:text-sm text-xs text-text-secondary">({product?.reviews} Reviews)</span>
                <span className="text-text-border">|</span>
                <span className="md:text-sm text-xs text-text-secondary">SKU: {product?.sku}</span>
            </div>

            <div className="text-3xl font-bold font-space md:mb-8 mb-6">${product?.price.toLocaleString()}</div>

            <p className="text-text-secondary leading-relaxed md:mb-8 mb-6 md:text-lg text-base line-clamp-2">
                {product?.description}
            </p>

            <div className="h-px bg-border my-8"></div>

            {/* Selectors */}
            <div className="space-y-6 mb-8">

                {/* Color */}
                <div>
                    <h3 className="font-bold mb-3">Color: <span className="text-text-secondary font-normal">{selectedColor}</span></h3>
                    <div className="flex md:gap-3 gap-2">
                        {product?.variants?.map((item, i) => (
                            <button
                                key={i}
                                onClick={() => setSelectedColor(item.color)}
                                className={`flex items-center gap-3 px-4 md:text-base text-sm py-2 cursor-pointer rounded-lg border font-medium transition-all ${selectedColor === item.color ? 'border-accent bg-accent/5 text-accent' : 'border-border text-text-secondary hover:border-gray-400'}`}
                            >
                                <div
                                    className={`md:w-6 w-6 h-6 md:h-6 rounded-full cursor-pointer flex items-center justify-center border-2 transition-all ${selectedColor === item.color ? 'border-accent' : 'border-transparent'}`}
                                >
                                    <div className="md:w-6 md:h-6 w-6 h-6 rounded-full border border-black/10" style={{ backgroundColor: item.colorCode }}></div>
                                </div>

                                <p>{item.color}</p>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Storage */}
                <div>
                    <h3 className="font-bold mb-3">RAM/Storage</h3>
                    <div className="flex flex-wrap gap-3">
                        {product?.variants?.map((item, i) => (
                            <button
                                key={i}
                                onClick={() => { setSelectedStorage(item.storage), setSelectedRam(item.ram) }}
                                className={`px-4 md:text-base text-sm py-2 cursor-pointer rounded-lg border font-medium transition-all ${selectedStorage === item.storage ? 'border-accent bg-accent/5 text-accent' : 'border-border text-text-secondary hover:border-gray-400'}`}
                            >
                                {item.ram}/{item.storage}
                            </button>
                        ))}
                    </div>
                </div>

            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-8">
                {/* Quantity */}
                <div className="flex items-center gap-3 bg-white border border-border rounded-xl px-2">
                    <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="md:w-10 w-6 h-full flex items-center justify-center text-text-secondary hover:text-accent"
                    >
                        <Minus size={18} />
                    </button>
                    <span className="font-bold w-4 text-center">{quantity}</span>
                    <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="md:w-10 w-6 h-full flex items-center justify-center text-text-secondary hover:text-accent"
                    >
                        <Plus size={18} />
                    </button>
                </div>

                <button className="flex-1 bg-accent text-white font-bold md:py-4 py-3 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-accent/20 flex items-center justify-center gap-2">
                    Buy Now <Zap size={20} />
                </button>
                <button className="md:p-4 p-3 border border-border rounded-xl hover:bg-muted text-text-secondary hover:text-text-primary transition-all">
                    <ShoppingCart size={24} />
                </button>
            </div>

            {/* Delivery Info */}
            <div className="flex gap-6 text-sm text-text-primary font-medium">
                <div className="flex md:text-base text-xs items-center gap-2">
                    <Truck size={18} className="text-accent" />
                    <span>Free Delivery (2-3 days)</span>
                </div>
                <div className="flex md:text-base text-xs items-center gap-2">
                    <ShieldCheck size={18} className="text-accent" />
                    <span>1 Year Warranty</span>
                </div>
            </div>

        </div>
    )
}

export default ProductDetails