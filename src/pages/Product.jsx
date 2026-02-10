import React, { useState } from 'react'
import { Star, Minus, Plus, ShoppingCart, Zap, Truck, ShieldCheck, Share2, Heart, Cpu, Camera, Battery, Smartphone, Maximize, HardDrive } from 'lucide-react'

const Product = () => {
  // --- Mock Data: Product Details ---
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
      { label: "Display", value: "6.9\" Super Retina XDR", icon: <Maximize size={20} /> },
      { label: "Camera", value: "48MP Pro System", icon: <Camera size={20} /> },
      { label: "Battery", value: "4832 mAh", icon: <Battery size={20} /> },
      { label: "OS", value: "iOS 26", icon: <Smartphone size={20} /> },
      { label: "Storage", value: "Up to 2TB", icon: <HardDrive size={20} /> },
    ]
  }

  // --- State ---
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedStorage, setSelectedStorage] = useState(product.storage[0])
  const [selectedRam, setSelectedRam] = useState(product.ram[0])
  const [quantity, setQuantity] = useState(1)

  return (
    <div className="text-text-primary pb-20">
      <div className="container pt-12">

        {/* ================= Product Top Section ================= */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-20">

          {/* --- Left: Image Gallery --- */}
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
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* --- Right: Product Details --- */}
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-bold uppercase rounded-full tracking-wider">New Arrival</span>
              <span className="text-sm text-green-600 font-medium flex items-center gap-1"><ShieldCheck size={14} /> In Stock</span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold font-space mb-4">{product.name}</h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1 text-yellow-400">
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
              </div>
              <span className="text-sm text-text-secondary">({product.reviews} Reviews)</span>
              <span className="text-text-border">|</span>
              <span className="text-sm text-text-secondary">SKU: {product.sku}</span>
            </div>

            <div className="text-3xl font-bold font-space mb-8">${product.price.toLocaleString()}</div>

            <p className="text-text-secondary leading-relaxed mb-8 text-lg">
              {product.shortDescription}
            </p>

            <div className="h-px bg-border my-8"></div>

            {/* Selectors */}
            <div className="space-y-6 mb-8">

              {/* Color */}
              <div>
                <h3 className="font-bold mb-3">Color: <span className="text-text-secondary font-normal">{selectedColor.name}</span></h3>
                <div className="flex gap-3">
                  {product.colors.map(color => (
                    <div
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full cursor-pointer flex items-center justify-center border-2 transition-all ${selectedColor.name === color.name ? 'border-accent' : 'border-transparent'}`}
                    >
                      <div className="w-8 h-8 rounded-full border border-black/10" style={{ backgroundColor: color.code }}></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Storage */}
              <div>
                <h3 className="font-bold mb-3">Storage</h3>
                <div className="flex flex-wrap gap-3">
                  {product.storage.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedStorage(size)}
                      className={`px-4 py-2 rounded-lg border font-medium transition-all ${selectedStorage === size ? 'border-accent bg-accent/5 text-accent' : 'border-border text-text-secondary hover:border-gray-400'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* RAM */}
              <div>
                <h3 className="font-bold mb-3">Memory (RAM)</h3>
                <div className="flex flex-wrap gap-3">
                  {product.ram.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedRam(size)}
                      className={`px-4 py-2 rounded-lg border font-medium transition-all ${selectedRam === size ? 'border-accent bg-accent/5 text-accent' : 'border-border text-text-secondary hover:border-gray-400'}`}
                    >
                      {size}
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
                  className="w-10 h-full flex items-center justify-center text-text-secondary hover:text-accent"
                >
                  <Minus size={18} />
                </button>
                <span className="font-bold w-4 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-full flex items-center justify-center text-text-secondary hover:text-accent"
                >
                  <Plus size={18} />
                </button>
              </div>

              <button className="flex-1 bg-accent text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-accent/20 flex items-center justify-center gap-2">
                Buy Now <Zap size={20} />
              </button>
              <button className="p-4 border border-border rounded-xl hover:bg-muted text-text-secondary hover:text-text-primary transition-all">
                <ShoppingCart size={24} />
              </button>
            </div>

            {/* Delivery Info */}
            <div className="flex gap-6 text-sm text-text-primary font-medium">
              <div className="flex items-center gap-2">
                <Truck size={18} className="text-accent" />
                <span>Free Delivery (2-3 days)</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-accent" />
                <span>1 Year Warranty</span>
              </div>
            </div>

          </div>
        </div>


        {/* ================= Specs & Description ================= */}
        <section className="mt-20 grid lg:grid-cols-3 gap-12">

          {/* Key Specs (Compact) */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold font-space mb-6">Key Specifications</h2>
            <div className="bg-surface rounded-2xl border border-border overflow-hidden">
              {product.keySpecs.map((spec, index) => (
                <div key={index} className="flex items-center gap-4 p-4 border-b border-border last:border-0 hover:bg-white/50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-accent/10 text-accent flex items-center justify-center shrink-0">
                    {spec.icon}
                  </div>
                  <div>
                    <p className="text-xs text-text-secondary uppercase tracking-wider font-semibold">{spec.label}</p>
                    <p className="font-medium text-text-primary">{spec.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Description (Rich Text) */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold font-space mb-6">Product Description</h2>
            <div className="prose prose-lg text-text-secondary max-w-none">
              {product.longDescription.split('\n\n').map((paragraph, i) => (
                <p key={i} className="mb-6 leading-relaxed">
                  {paragraph.trim()}
                </p>
              ))}
            </div>
          </div>

        </section>

      </div>
    </div>
  )
}

export default Product