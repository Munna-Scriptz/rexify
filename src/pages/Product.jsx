import React, { useState } from 'react'
import { Cpu, Camera, Battery, Smartphone, Maximize, HardDrive } from 'lucide-react'
import ImageGallery from '../components/product/ImageGallery'
import ProductDetails from '../components/product/ProductDetails'
import Specifications from '../components/product/Specifications'
import RelatedProduct from '../components/common/RelatedProduct'

const Product = () => {
  const product = {
    id: "IP17ProMax",
    name: "iPhone 17 Pro Max",
    price: 1199,
    sku: "APPLE-IP17PM-256",
    stock: 142,
    rating: 4.9,
    reviews: 512,
    shortDescription: "The ultimate iPhone. Featuring the game-changing A19 Pro chip, a stunning 6.9-inch Super Retina XDR display.",
    longDescription: `Experience the pinnacle of smartphone technology with the iPhone 17 Pro Max. Crafted with a stunning aerospace-grade titanium design, it's lighter yet stronger than ever before. The new contoured edges and the thinnest borders ever on an iPhone make it even more comfortable to hold.

    Powering this beast is the revolutionary A19 Pro chip, delivering industry-leading performance and efficiency. Whether you're gaming with console-level graphics or editing 4K video on the go, the 17 Pro Max handles it all with ease. The pro-class camera system pushes the boundaries of what's possible, capturing incredible detail and color in any lighting condition.

    And with the biggest battery life ever on an iPhone, you can do more of what you love for longer. Step into the future with iOS 26 and experience interaction like never before.`,
    images: [
      "https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=600&auto=format&fit=crop", // Natural Titanium ish
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=600&auto=format&fit=crop", // Blue Titanium ish
      "https://images.unsplash.com/photo-1696446700542-c2877a5ea96c?q=80&w=600&auto=format&fit=crop", // Black Titanium ish
      "https://images.unsplash.com/photo-1678652197831-2d180705cd2c?q=80&w=600&auto=format&fit=crop"  // Detail shot
    ],
    colors: [
      { name: "Natural Titanium", code: "#beb7b0" },
      { name: "Blue Titanium", code: "#2f3848" },
      { name: "White Titanium", code: "#f0f0f2" },
      { name: "Black Titanium", code: "#1a1a1b" }
    ],
    storage: ["256GB", "512GB", "1TB", "2TB"],
    ram: ["12GB"],
    // Simplified Specs for "Key Highlights"
    keySpecs: [
      { label: "Chipset", value: "Apple A19 Pro", icon: <Cpu size={20} /> },
      { label: "Display", value: "6.9 Super Retina XDR", icon: <Maximize size={20} /> },
      { label: "Camera", value: "48MP Pro System", icon: <Camera size={20} /> },
      { label: "Battery", value: "4832 mAh", icon: <Battery size={20} /> },
      { label: "OS", value: "iOS 26", icon: <Smartphone size={20} /> },
      { label: "Storage", value: "Up to 2TB", icon: <HardDrive size={20} /> },
    ]
  }

  return (
    <div className="text-text-primary pb-20">
      <div className="container pt-12">
        {/* ================= Product Top Section ================= */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-20">

          {/* --- Left: Image Gallery --- */}
          <ImageGallery images={product.images} />

          {/* --- Right: Product Details --- */}
          <ProductDetails product={product} />
        </div>

        {/* ================= Specs & Description ================= */}
        <Specifications product={product} />

        {/* ================= Related Products ================= */}
        <RelatedProduct product={product} />
      </div>
    </div>
  )
}

export default Product