import React, { useState } from 'react'
import { Share2, Heart } from 'lucide-react'

const ImageGallery = (product) => {
    const [selectedImage, setSelectedImage] = useState(0)
    return (
        <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-surface rounded-3xl overflow-hidden border border-border relative group">
                <img
                    src={product.images[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-contain p-8 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 bg-white rounded-full shadow-sm hover:text-accent transition-colors"><Heart size={20} /></button>
                    <button className="p-2 bg-white rounded-full shadow-sm hover:text-accent transition-colors"><Share2 size={20} /></button>
                </div>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
                {product.images.map((img, index) => (
                    <div
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`aspect-square bg-surface rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${selectedImage === index ? 'border-accent' : 'border-transparent hover:border-gray-300'}`}
                    >
                        <img src={img} alt="img" className="w-full h-full object-cover" />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ImageGallery