import React, { useState } from 'react'
import { Link } from 'react-router'
import { ChevronRight, ArrowRight, Laptop, Smartphone, Tablet, Headphones, Watch, Monitor } from 'lucide-react'

const ProductMenu = () => {
    const [activeCategory, setActiveCategory] = useState('Laptops')

    // Mock Data
    const categories = [
        { name: 'Laptops', icon: <Laptop size={18} /> },
        { name: 'Smartphones', icon: <Smartphone size={18} /> },
        { name: 'Tablets', icon: <Tablet size={18} /> },
        { name: 'Audio', icon: <Headphones size={18} /> },
        { name: 'Wearables', icon: <Watch size={18} /> },
        { name: 'Accessories', icon: <Monitor size={18} /> },
    ]

    const products = {
        'Laptops': [
            { name: "MacBook Air M3", price: "$1,099", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca4?q=80&w=200&auto=format&fit=crop" },
            { name: "Dell XPS 15", price: "$1,499", image: "https://images.unsplash.com/photo-1593642632823-8f78536788c6?q=80&w=200&auto=format&fit=crop" },
            { name: "Asus ROG Zephyrus", price: "$1,899", image: "https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?q=80&w=200&auto=format&fit=crop" },
            { name: "Surface Laptop 5", price: "$999", image: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?q=80&w=200&auto=format&fit=crop" },
        ],
        'Smartphones': [
            { name: "iPhone 17 Pro Max", price: "$1,199", image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=200&auto=format&fit=crop" },
            { name: "Samsung S25 Ultra", price: "$1,299", image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=200&auto=format&fit=crop" },
            { name: "Google Pixel 9 Pro", price: "$999", image: "https://images.unsplash.com/photo-1598327105666-5b89351aff23?q=80&w=200&auto=format&fit=crop" },
            { name: "OnePlus 12", price: "$799", image: "https://images.unsplash.com/photo-1678911820864-e2c567c655d2?q=80&w=200&auto=format&fit=crop" },
        ],
        'Tablets': [
            { name: "iPad Pro M4", price: "$999", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=200&auto=format&fit=crop" },
            { name: "Galaxy Tab S9", price: "$899", image: "https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?q=80&w=200&auto=format&fit=crop" },
        ],
        'Audio': [
            { name: "AirPods Max 2", price: "$549", image: "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?q=80&w=200&auto=format&fit=crop" },
            { name: "Sony WH-1000XM5", price: "$399", image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=200&auto=format&fit=crop" },
        ],
        'Wearables': [
            { name: "Apple Watch Ultra 3", price: "$799", image: "https://images.unsplash.com/photo-1664478383807-671c61906d12?q=80&w=200&auto=format&fit=crop" },
            { name: "Galaxy Watch 7", price: "$299", image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=200&auto=format&fit=crop" },
        ],
        'Accessories': [
            { name: "MagSafe Charger", price: "$39", image: "https://images.unsplash.com/photo-1606787620819-8bdf0c44c293?q=80&w=200&auto=format&fit=crop" },
            { name: "UGREEN Nexode", price: "$89", image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?q=80&w=200&auto=format&fit=crop" },
        ]
    }

    return (
        <div className="w-full bg-white backdrop-blur-md shadow animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="container">
                <div className="flex">

                    {/* Sidebar Categories */}
                    <div className="w-64 border-r border-gray-100 py-6 pr-6">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-4 font-space">Categories</h3>
                        <div className="space-y-1">
                            {categories.map((cat) => (
                                <div
                                    key={cat.name}
                                    onMouseEnter={() => setActiveCategory(cat.name)}
                                    className={`flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 group ${activeCategory === cat.name ? 'bg-accent/5 text-accent font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                                >
                                    <div className="flex items-center gap-3">
                                        {cat.icon}
                                        <span>{cat.name}</span>
                                    </div>
                                    <ChevronRight size={14} className={`opacity-0 group-hover:opacity-100 transition-opacity ${activeCategory === cat.name ? 'opacity-100' : ''}`} />
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 px-4">
                            <Link to="/category" className="flex items-center gap-2 text-sm font-bold text-gray-900 hover:text-accent transition-colors">
                                View All Categories <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="flex-1 p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold font-space text-gray-900">{activeCategory}</h3>
                            <Link to="/category" className="text-sm font-medium text-accent hover:underline">See all {activeCategory}</Link>
                        </div>

                        <div className="grid grid-cols-4 gap-6">
                            {products[activeCategory]?.map((product, index) => (
                                <div key={index} className="group cursor-pointer">
                                    <div className="aspect-4/3 bg-gray-50 rounded-xl overflow-hidden mb-3 border border-gray-100 group-hover:border-accent/30 transition-all shadow-sm group-hover:shadow-md">
                                        <img src={product.image} alt={product.name} className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <h4 className="font-bold text-gray-900 truncate group-hover:text-accent transition-colors">{product.name}</h4>
                                    <p className="text-sm text-gray-500">{product.price}</p>
                                </div>
                            ))}
                            {!products[activeCategory] && (
                                <div className="col-span-4 py-12 text-center text-gray-400">
                                    No products found in this category.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Promo / Banner Area (Optional - keeping it clean for now, but adding space for it) */}
                    <div className="w-64 p-6 border-l border-gray-100 bg-gray-50/50 hidden xl:block">
                        <div className="h-full rounded-2xl bg-linear-to-br from-gray-900 to-black p-6 flex flex-col justify-end text-white relative overflow-hidden group">
                            {/* Abstract shine */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>

                            <div className="relative z-10">
                                <span className="inline-block px-2 py-1 bg-white/20 text-xs font-bold rounded mb-3 backdrop-blur-sm">New</span>
                                <h4 className="text-xl font-bold font-space mb-2">iPhone 17 Pro</h4>
                                <p className="text-sm text-gray-300 mb-4">Titanium. So strong. So light. So Pro.</p>
                                <Link to="/product" className="inline-flex items-center gap-2 text-sm font-bold hover:text-accent transition-colors">
                                    Shop Now <ArrowRight size={16} />
                                </Link>
                            </div>
                            <img src="https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=200&auto=format&fit=crop" alt="" className="absolute top-4 -right-4 w-32 object-contain opacity-50 group-hover:scale-110 transition-transform duration-700 hover:opacity-100" />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ProductMenu