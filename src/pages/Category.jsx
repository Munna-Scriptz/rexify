import React, { useState } from 'react';
import {
    Filter, ChevronDown, Search, Star, Heart, ShoppingCart,
    Smartphone, Laptop, Tablet, Watch, Headphones, Grid, List
} from 'lucide-react';

const Category = () => {
    const [viewMode, setViewMode] = useState('grid');
    const [sortBy, setSortBy] = useState('newest');

    // --- Mock Data: Products ---
    const products = [
        {
            id: 1,
            name: "iPhone 15 Pro Max",
            category: "Phones",
            price: 1199,
            rating: 4.9,
            reviews: 342,
            image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=400&auto=format&fit=crop",
            isNew: true
        },
        {
            id: 2,
            name: "MacBook Air M3",
            category: "Laptops",
            price: 1099,
            rating: 4.8,
            reviews: 156,
            image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca4?q=80&w=400&auto=format&fit=crop",
            discount: "10%"
        },
        {
            id: 3,
            name: "iPad Pro 13\"",
            category: "Tablets",
            price: 999,
            rating: 4.7,
            reviews: 89,
            image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=400&auto=format&fit=crop"
        },
        {
            id: 4,
            name: "Sony WH-1000XM5",
            category: "Audio",
            price: 399,
            rating: 4.8,
            reviews: 420,
            image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=400&auto=format&fit=crop"
        },
        {
            id: 5,
            name: "Samsung Galaxy S24 Ultra",
            category: "Phones",
            price: 1299,
            rating: 4.6,
            reviews: 215,
            image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=400&auto=format&fit=crop",
            isNew: true
        },
        {
            id: 6,
            name: "Dell XPS 15",
            category: "Laptops",
            price: 1499,
            rating: 4.5,
            reviews: 76,
            image: "https://images.unsplash.com/photo-1593642632823-8f78536788c6?q=80&w=400&auto=format&fit=crop"
        },
        {
            id: 7,
            name: "Google Pixel Tablet",
            category: "Tablets",
            price: 499,
            rating: 4.3,
            reviews: 45,
            image: "https://images.unsplash.com/photo-1542751110-97427bbecf20?q=80&w=400&auto=format&fit=crop"
        },
        {
            id: 8,
            name: "Apple Watch Ultra 2",
            category: "Wearables",
            price: 799,
            rating: 4.9,
            reviews: 112,
            image: "https://images.unsplash.com/photo-1549482517-27f185efcc75?q=80&w=400&auto=format&fit=crop"
        },
        {
            id: 9,
            name: "Asus ROG Zephyrus",
            category: "Laptops",
            price: 1899,
            rating: 4.7,
            reviews: 64,
            image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=400&auto=format&fit=crop",
            discount: "15%"
        }
    ];

    const categories = [
        { name: "All Electronics", count: 1420 },
        { name: "Phones", count: 320 },
        { name: "Laptops", count: 215 },
        { name: "Tablets", count: 180 },
        { name: "Audio", count: 450 },
        { name: "Wearables", count: 95 }
    ];

    const brands = ["Apple", "Samsung", "Sony", "Dell", "Asus", "Google"];

    return (
        <div className="bg-bg min-h-screen text-text-primary font-primary">
            {/* ----------------- Header / Breadcrumb ----------------- */}
            <div className="bg-surface border-b border-border py-8">
                <div className="container">
                    <h1 className="text-3xl font-bold font-space mb-2">Electronics</h1>
                    <p className="text-text-secondary">Premium gadgets for your digital lifestyle.</p>
                </div>
            </div>

            <div className="container py-12 flex gap-8">

                {/* ----------------- Sidebar Filters ----------------- */}
                <aside className="w-64 hidden lg:block space-y-8 shrink-0">

                    {/* Categories */}
                    <div>
                        <h3 className="font-bold text-lg mb-4 flex items-center justify-between">
                            Categories <ChevronDown size={16} />
                        </h3>
                        <ul className="space-y-3">
                            {categories.map((cat, i) => (
                                <li key={i} className="flex justify-between items-center group cursor-pointer">
                                    <span className={`text-sm ${i === 0 ? 'font-semibold text-accent' : 'text-text-secondary group-hover:text-text-primary'}`}>
                                        {cat.name}
                                    </span>
                                    <span className="text-xs text-text-muted bg-muted px-2 py-0.5 rounded-full">{cat.count}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="h-px bg-border"></div>

                    {/* Price Range */}
                    <div>
                        <h3 className="font-bold text-lg mb-4 flex items-center justify-between">
                            Price Range <ChevronDown size={16} />
                        </h3>
                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <div className="bg-white border border-border rounded-lg px-3 py-2 text-sm w-full">
                                    <span className="text-text-muted mr-1">$</span> 0
                                </div>
                                <div className="bg-white border border-border rounded-lg px-3 py-2 text-sm w-full">
                                    <span className="text-text-muted mr-1">$</span> 5000
                                </div>
                            </div>
                            <input type="range" className="w-full accent-accent" />
                        </div>
                    </div>

                    <div className="h-px bg-border"></div>

                    {/* Brands */}
                    <div>
                        <h3 className="font-bold text-lg mb-4 flex items-center justify-between">
                            Brands <ChevronDown size={16} />
                        </h3>
                        <ul className="space-y-3">
                            {brands.map((brand, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <div className="w-4 h-4 border border-border rounded flex items-center justify-center cursor-pointer hover:border-accent">
                                        {/* Checkbox simulation */}
                                    </div>
                                    <span className="text-sm text-text-secondary cursor-pointer hover:text-text-primary">{brand}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                </aside>

                {/* ----------------- Main Content ----------------- */}
                <main className="flex-1">

                    {/* Top Bar: Sort & View */}
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                        <p className="text-text-secondary text-sm">
                            Showing <span className="font-bold text-text-primary">1-9</span> of <span className="font-bold text-text-primary">124</span> results
                        </p>

                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-sm font-medium">
                                <span className="text-text-secondary">Sort by:</span>
                                <select className="bg-transparent outline-none cursor-pointer" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                                    <option value="newest">Newest Arrivals</option>
                                    <option value="price_low">Price: Low to High</option>
                                    <option value="price_high">Price: High to Low</option>
                                    <option value="popular">Most Popular</option>
                                </select>
                            </div>

                            <div className="bg-surface p-1 rounded-lg border border-border flex gap-1">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-accent' : 'text-text-secondary hover:text-text-primary'}`}
                                >
                                    <Grid size={18} />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-accent' : 'text-text-secondary hover:text-text-primary'}`}
                                >
                                    <List size={18} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} viewMode={viewMode} />
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="mt-12 flex justify-center gap-2">
                        {[1, 2, 3, '...', 12].map((page, i) => (
                            <button
                                key={i}
                                className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-all
                    ${page === 1
                                        ? 'bg-accent text-white'
                                        : 'bg-surface border border-border text-text-secondary hover:bg-muted hover:text-text-primary'
                                    }`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>

                </main>
            </div>
        </div>
    );
};

// Sub-component: Product Card
const ProductCard = ({ product, viewMode }) => {
    return (
        <div className={`group bg-white border border-border rounded-xl overflow-hidden hover:shadow-xl hover:border-accent/30 transition-all duration-300 relative ${viewMode === 'list' ? 'flex flex-row items-center p-4 gap-6' : ''}`}>

            {/* Badges */}
            <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                {product.isNew && (
                    <span className="px-2 py-1 bg-accent text-white text-[10px] font-bold uppercase tracking-wider rounded-md">New</span>
                )}
                {product.discount && (
                    <span className="px-2 py-1 bg-red-500 text-white text-[10px] font-bold uppercase tracking-wider rounded-md">{product.discount} OFF</span>
                )}
            </div>

            {/* Wishlist Button */}
            <button className="absolute top-3 right-3 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full text-text-secondary hover:text-red-500 hover:bg-white transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
                <Heart size={18} />
            </button>

            {/* Image */}
            <div className={`bg-surface overflow-hidden ${viewMode === 'list' ? 'w-48 h-48 rounded-lg shrink-0' : 'aspect-square'}`}>
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                />
            </div>

            {/* Content */}
            <div className={`p-5 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                <div className="text-xs text-text-muted mb-1">{product.category}</div>
                <h3 className="font-bold text-lg mb-2 text-text-primary group-hover:text-accent transition-colors">{product.name}</h3>

                <div className="flex items-center gap-1 mb-4">
                    <Star size={14} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-medium">{product.rating}</span>
                    <span className="text-xs text-text-muted">({product.reviews})</span>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold font-space">${product.price}</span>
                        {product.discount && (
                            <span className="text-sm text-text-muted line-through">${(product.price * 1.1).toFixed(0)}</span>
                        )}
                    </div>

                    <button className="w-10 h-10 rounded-full bg-surface text-text-primary flex items-center justify-center hover:bg-accent hover:text-white transition-all">
                        <ShoppingCart size={18} />
                    </button>
                </div>

                {viewMode === 'list' && (
                    <p className="mt-4 text-sm text-text-secondary line-clamp-2">
                        Powerful performance meets elegant design. Experience the next level of computing with the latest processor and stunning display technology.
                    </p>
                )}
            </div>
        </div>
    );
};

export default Category;