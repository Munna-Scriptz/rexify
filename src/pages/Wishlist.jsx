import React, { useState } from 'react'
import { Link } from 'react-router'
import { Heart, ArrowRight } from 'lucide-react'
import SingleWishlistCard from '../components/common/SingleWishlistCard'
import { WishlistHeader } from '../components/common/PageHeader'

const Wishlist = () => {
    const [wishlistItems, setWishlistItems] = useState([
        {
            id: 1,
            name: "Louis Vuitton Star Trail",
            brand: "Louis Vuitton",
            price: 1350,
            originalPrice: 1650,
            image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=300&auto=format&fit=crop",
            inStock: true,
            rating: 4.8,
            reviews: 124
        },
        {
            id: 2,
            name: "Prada Re-Edition 2005",
            brand: "Prada",
            price: 1990,
            image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=300&auto=format&fit=crop",
            inStock: true,
            rating: 4.9,
            reviews: 86
        },
        {
            id: 3,
            name: "Valentino Roman Stud",
            brand: "Valentino",
            price: 3150,
            image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=300&auto=format&fit=crop",
            inStock: true,
            rating: 4.7,
            reviews: 52
        },
        {
            id: 4,
            name: "Balmain B-Bold Sneakers",
            brand: "Balmain",
            price: 1100,
            image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=300&auto=format&fit=crop",
            inStock: true,
            rating: 4.6,
            reviews: 210
        }
    ]);


    if (wishlistItems.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 font-primary">
                <div className="w-20 h-20 bg-muted/20 rounded-full flex items-center justify-center text-text-secondary mb-6 animate-pulse">
                    <Heart size={40} strokeWidth={1.5} />
                </div>
                <h2 className="text-3xl font-bold font-space mb-3">Your wishlist is empty</h2>
                <p className="text-text-secondary max-w-md mb-8">
                    Looks like haven't added anything to your wishlist yet.
                </p>
                <Link to="/category" className="px-8 py-3 bg-accent text-white font-medium rounded-full hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-accent/20">
                    Start Shopping <ArrowRight size={18} />
                </Link>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-bg font-primary py-12">
            <div className="container mx-auto px-4 md:px-8">

                {/* Header */}
                <WishlistHeader />
                

                {/* Grid Content */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {wishlistItems.map((item) => (
                        <SingleWishlistCard
                            key={item.id}
                            img={item.image}
                            name={item.name}
                            variant={item.brand}
                            price={item.price}
                            rating={item.rating}
                            reviews={item.reviews}
                            badge={item.inStock ? "In Stock" : "Out of Stock"}
                        />
                    ))}
                </div>

            </div>
        </div>
    )
}

export default Wishlist