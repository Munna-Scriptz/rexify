import React, { useState } from 'react'
import { Link } from 'react-router' // Assuming react-router v6+ or react-router-dom
import { Trash2, ShoppingCart, Heart, ArrowRight, X } from 'lucide-react'

const Wishlist = () => {
    // Mock Data
    const [wishlistItems, setWishlistItems] = useState([
        {
            id: 1,
            name: "Louis Vuitton Star Trail",
            brand: "Louis Vuitton",
            price: 1350,
            originalPrice: 1650,
            image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=300&auto=format&fit=crop",
            inStock: true
        },
        {
            id: 2,
            name: "Prada Re-Edition 2005",
            brand: "Prada",
            price: 1990,
            image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=300&auto=format&fit=crop",
            inStock: true
        },
        {
            id: 3,
            name: "Valentino Roman Stud",
            brand: "Valentino",
            price: 3150,
            image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=300&auto=format&fit=crop",
            inStock: true
        },
        {
            id: 4,
            name: "Balmain B-Bold Sneakers",
            brand: "Balmain",
            price: 1100,
            image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=300&auto=format&fit=crop",
            inStock: true
        },
        {
            id: 5,
            name: "Gucci GG Supreme",
            brand: "Gucci",
            price: 2100,
            image: "https://images.unsplash.com/photo-1559563458-52c69522108a?q=80&w=300&auto=format&fit=crop",
            inStock: false
        }
    ]);

    const removeFromWishlist = (id) => {
        setWishlistItems(prev => prev.filter(item => item.id !== id));
    };

    const clearWishlist = () => {
        setWishlistItems([]);
    };

    const addAllToCart = () => {
        // In a real app, this would dispatch to a cart context/store
        alert("All items added to cart!");
    };


    if (wishlistItems.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 font-primary">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center text-text-secondary mb-6 animate-pulse">
                    <Heart size={40} strokeWidth={1.5} />
                </div>
                <h2 className="text-3xl font-bold font-space mb-3">Your wishlist is empty</h2>
                <p className="text-text-secondary max-w-md mb-8">
                    Looks like haven't added anything to your wishlist yet.
                </p>
                <Link to="/category" className="px-8 py-3 bg-accent text-white font-medium rounded-full hover:bg-blue-700 transition-all flex items-center gap-2">
                    Start Shopping <ArrowRight size={18} />
                </Link>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-bg font-primary py-12">
            <div className="container">
                <div className="flex flex-col items-center mb-12">
                    <Heart className="w-8 h-8 mb-4 text-accent" strokeWidth={1.5} />
                    <h1 className="text-4xl font-bold font-space text-center">My wishlist</h1>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-12">
                    {wishlistItems.map((item) => (
                        <div key={item.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow group relative flex flex-col">
                            {/* Remove Button */}
                            <button
                                onClick={() => removeFromWishlist(item.id)}
                                className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-white/80 hover:bg-white rounded-full text-text-secondary hover:text-red-500 transition-colors z-10"
                                title="Remove from wishlist"
                            >
                                <X size={16} />
                            </button>

                            {/* Image */}
                            <div className="aspect-[4/5] bg-gray-50 rounded-t-xl overflow-hidden relative">
                                <img src={item.image} alt={item.name} className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500" />
                                {item.originalPrice && (
                                    <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                                        {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% Off
                                    </span>
                                )}
                            </div>

                            {/* Details */}
                            <div className="p-4 flex-1 flex flex-col items-center text-center">
                                <p className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-1">{item.brand}</p>
                                <h3 className="font-medium text-text-primary mb-2 line-clamp-2 min-h-[3rem]">{item.name}</h3>
                                <div className="flex items-baseline gap-2 mb-4">
                                    <span className="font-bold text-lg font-space">${item.price.toLocaleString()}</span>
                                    {item.originalPrice && <span className="text-sm text-text-muted line-through">${item.originalPrice.toLocaleString()}</span>}
                                </div>

                                <button
                                    className="w-full mt-auto py-2.5 bg-black text-white text-sm font-medium rounded-lg hover:bg-accent transition-colors flex items-center justify-center gap-2"
                                    onClick={() => alert(`Added ${item.name} to cart`)}
                                >
                                    <ShoppingCart size={16} /> Add to Bag
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Actions */}
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 border-t border-border pt-8">
                    <button
                        onClick={addAllToCart}
                        className="px-8 py-3 bg-accent text-white font-bold rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-accent/20 w-full sm:w-auto"
                    >
                        Add All to Cart
                    </button>
                    <button
                        onClick={clearWishlist}
                        className="px-8 py-3 text-text-secondary hover:text-red-500 font-medium transition-colors w-full sm:w-auto"
                    >
                        Clear Wishlist
                    </button>
                </div>

            </div>
        </div>
    )
}

export default Wishlist