"use client"
import React, { useEffect, useState } from 'react'
import { ChevronRight, ArrowRight, Smartphone } from 'lucide-react'
import Link from 'next/link'

const ProductMenu = ({ setProductMenuOpen, categories }) => {
    const [activeCategory, setActiveCategory] = useState(categories?.[0].name)
    const [navTop, setNavTop] = useState(56);

    useEffect(() => {
        const updateTop = () => {
            const el = document.getElementById("navbar");
            setNavTop(el?.offsetHeight || 56);
        };

        updateTop();
        window.addEventListener("resize", updateTop);

        return () => window.removeEventListener("resize", updateTop);
    }, []);

    const products = {
        'samsung': [
            { name: "MacBook Air M3", price: "$1,099", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca4?q=80&w=200&auto=format&fit=crop" },
            { name: "Dell XPS 15", price: "$1,499", image: "https://images.unsplash.com/photo-1593642632823-8f78536788c6?q=80&w=200&auto=format&fit=crop" },
            { name: "Asus ROG Zephyrus", price: "$1,899", image: "https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?q=80&w=200&auto=format&fit=crop" },
            { name: "Surface Laptop 5", price: "$999", image: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?q=80&w=200&auto=format&fit=crop" },
        ],
        'iphone': [
            { name: "iPhone 17 Pro Max", price: "$1,199", image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=200&auto=format&fit=crop" },
            { name: "Samsung S25 Ultra", price: "$1,299", image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=200&auto=format&fit=crop" },
            { name: "Google Pixel 9 Pro", price: "$999", image: "https://images.unsplash.com/photo-1598327105666-5b89351aff23?q=80&w=200&auto=format&fit=crop" },
            { name: "OnePlus 12", price: "$799", image: "https://images.unsplash.com/photo-1678911820864-e2c567c655d2?q=80&w=200&auto=format&fit=crop" },
        ],
        'Tablets': [
            { name: "iPad Pro M4", price: "$999", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=200&auto=format&fit=crop" },
            { name: "Galaxy Tab S9", price: "$899", image: "https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?q=80&w=200&auto=format&fit=crop" },
        ]
    }

    return (
        <>

            <div
                onMouseLeave={() => setProductMenuOpen(false)}
                className={`fixed left-0 right-0 z-40 transition-all duration-300 animate-animate-in`}
                style={{ top: navTop }}
            >
                <div className='absolute top-0 left-0 bg-black/70 w-full h-screen' onMouseEnter={() => setProductMenuOpen(false)} onClick={() => setProductMenuOpen(false)}></div>
                <div className="w-full bg-white backdrop-blur-md shadow animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="container">
                        <div className="flex flex-col lg:flex-row">

                            {/* Sidebar Categories */}
                            <div className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-gray-100 py-4 lg:py-10 lg:pr-6 px-4 lg:px-0">
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 lg:mb-4 font-space">Categories</h3>
                                <div className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible gap-2 lg:space-y-1 pb-4 lg:pb-0 scrollbar-hide">
                                    {categories.map((cat) => (
                                        <Link
                                            href={`/shop?category=${cat.slug}`}
                                            key={cat.name}
                                            onMouseEnter={() => setActiveCategory(cat.name)}
                                            className={`flex items-center justify-between px-4 py-2 lg:py-3 rounded-xl cursor-pointer transition-all duration-200 group whitespace-nowrap lg:whitespace-normal ${activeCategory === cat.name ? 'bg-accent/5 text-accent font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                                        >
                                            <div className="flex items-center gap-2 lg:gap-3">
                                                <Smartphone size={18} />
                                                <span className="text-sm lg:text-base">{cat.name}</span>
                                            </div>
                                            <ChevronRight size={14} className={`hidden lg:block opacity-0 group-hover:opacity-100 transition-opacity ${activeCategory === cat.name ? 'opacity-100' : ''}`} />
                                        </Link>
                                    ))}
                                </div>
                                <div className="hidden lg:block mt-6 px-4">
                                    <Link href="/category" className="flex items-center gap-2 text-sm font-bold text-gray-900 hover:text-accent transition-colors">
                                        View All Categories <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </div>

                            {/* Product Grid */}
                            <div className="flex-1 p-4 lg:p-8">
                                <div className="flex items-center justify-between mb-4 lg:mb-6">
                                    <h3 className="text-lg lg:text-xl font-bold font-space text-gray-900">{activeCategory}</h3>
                                    <Link href="/category" className="text-xs lg:text-sm font-medium text-accent hover:underline">See all {activeCategory}</Link>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
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

                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default ProductMenu