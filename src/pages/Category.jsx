
import React from 'react';
import Slider from 'react-slick';
import { ChevronRight } from 'lucide-react';

// Import slick carousel styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SingleCategoryCard from '../components/common/SingleCategoryCard';
import Benefits from '../components/category/Benefits';

const Category = () => {

    // --- Data: Categories ---
    const categories = [
        { name: "Windows Laptops", img: "https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?q=80&w=300&auto=format&fit=crop" },
        { name: "Apple Macbooks", img: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=300&auto=format&fit=crop" },
        { name: "Gaming laptop", img: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=300&auto=format&fit=crop" },
        { name: "Chromebooks", img: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/airpods-pro-3-hero-select-202509?wid=532&hei=582&fmt=png-alpha&.v=cmp4MmZ6OWxOeHNNTXh4SzlBNUpEb1RucE9zZTI5eEREaWZpY29lSld3eG5ybFVoUG5ONDlkK2JkbHErdVFSNVM0TjRWdzF2UjRGVEY0c3dBQVZ6VFk1ZmVZeDNxQ3ljaDhwR2JKTTZHaDg" },
        { name: "Laptop deals", img: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=300&auto=format&fit=crop" },
        { name: "All laptops", img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=300&auto=format&fit=crop" },
        { name: "Windows Laptops", img: "https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?q=80&w=300&auto=format&fit=crop" },
        { name: "Apple Macbooks", img: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=300&auto=format&fit=crop" },
        { name: "Gaming laptop", img: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=300&auto=format&fit=crop" },
        { name: "Chromebooks", img: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/airpods-pro-3-hero-select-202509?wid=532&hei=582&fmt=png-alpha&.v=cmp4MmZ6OWxOeHNNTXh4SzlBNUpEb1RucE9zZTI5eEREaWZpY29lSld3eG5ybFVoUG5ONDlkK2JkbHErdVFSNVM0TjRWdzF2UjRGVEY0c3dBQVZ6VFk1ZmVZeDNxQ3ljaDhwR2JKTTZHaDg" },
        { name: "Laptop deals", img: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=300&auto=format&fit=crop" },
        { name: "All laptops", img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=300&auto=format&fit=crop" },
    ];

    const brands = [
        { name: "SAMSUNG", color: "text-blue-700" },
        { name: "Apple", color: "text-black" }, // Using logo in real life
        { name: "Microsoft", color: "text-gray-600" },
        { name: "LG", color: "text-red-600" },
        { name: "SONY", color: "text-black" },
    ];

    // --- Data: Best Deals ---
    const bestDeals = [
        {
            name: "Asus Chromebook C14 1400 Flip",
            price: "509,-",
            oldPrice: "659,-",
            discount: "10%",
            rating: "4.7(123)",
            image: "https://images.unsplash.com/photo-1588702547923-7093a6c36d89?q=80&w=400&auto=format&fit=crop"
        },
        {
            name: "Lenovo IdeaPad 1 15IJL7 15.6\"",
            price: "479,-",
            oldPrice: "589,-",
            discount: "20%",
            rating: "4.8 (95)",
            image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=400&auto=format&fit=crop"
        },
        {
            name: "Apple MacBook Air 2023",
            price: "1,879",
            oldPrice: "2,099",
            discount: "10%",
            rating: "4.9 (210)",
            image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca4?q=80&w=400&auto=format&fit=crop"
        },
        {
            name: "Samsung Galaxy Book4",
            price: "1,679,-",
            oldPrice: "2,099,-",
            discount: "20%",
            rating: "4.5 (115)",
            image: "https://images.unsplash.com/photo-1531297461136-82lwDe83b91d?q=80&w=400&auto=format&fit=crop"
        }
    ];

    return (
        <section className="min-h-screen pb-20">
            <div className="container">
                {/* ----------------- Categories */}
                <div className="py-12">
                    <div>
                        <div className="mb-8">
                            <h1 className="text-4xl font-semibold text-coil mb-2">Find Your Category</h1>
                            <p className="text-text-muted text-sm">Find the perfect category for you. We ensure the best</p>
                        </div>

                        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
                            {
                                categories.map((item, i) => (
                                    <SingleCategoryCard key={i} item={item} />
                                ))
                            }
                        </div>
                    </div>
                </div>


                <div className="mt-28 space-y-16">
                    {/* Benefits Banner */}
                    <Benefits />
                </div>
            </div>
        </section>
    );
};

export default Category;