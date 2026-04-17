import { Heart, ArrowRight } from 'lucide-react'
import WishlistCard from '../../components/cards/WishlistCard'
import { WishlistHeader } from '../../components/common/PageHeader'
import { WishlistEmptyState } from '../../components/emptyState/WishlistEmptyState';

const page = () => {
    const wishlistItems = [
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
    ]

    // ------- Return 
    if (wishlistItems.length === 0) return <WishlistEmptyState />

    return (
        <section id='Wishlist'>
            <div className="container">
                <div id='Wishlist-Row' className="min-h-screen bg-bg font-primary py-12">
                    {/* Header */}
                    <WishlistHeader />

                    {/* Grid Content */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {wishlistItems.map((item) => (
                            <WishlistCard
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
        </section>
    )
}

export default page