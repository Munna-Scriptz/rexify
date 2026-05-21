"use client"
import React, { useState } from 'react'
import ImageGallery from './ImageGallery'
import ProductDetails from './ProductDetails'

const ProductContainer = ({ product, currentUser }) => {
    // Find default variant or default to first
    const defaultIndex = product?.variants?.findIndex(v => v.isDefault) !== -1 
        ? product?.variants?.findIndex(v => v.isDefault) 
        : 0;

    const [selectedVariantIndex, setSelectedVariantIndex] = useState(defaultIndex);
    const selectedVariant = product?.variants?.[selectedVariantIndex] || product?.variants?.[0];

    return (
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-20 w-full">
            {/* Left: Image Gallery */}
            <div className="w-full">
                <ImageGallery selectedVariant={selectedVariant} />
            </div>
            
            {/* Right: Product Details */}
            <div className="w-full">
                <ProductDetails 
                    product={product} 
                    selectedVariantIndex={selectedVariantIndex}
                    setSelectedVariantIndex={setSelectedVariantIndex}
                    currentUser={currentUser}
                />
            </div>
        </div>
    )
}

export default ProductContainer
