import React from 'react';
import { ArrowRight, Smartphone, Laptop, Tablet, Headphones, Watch, Gamepad2 } from 'lucide-react';

const Category = () => {
    const categories = [
        {
            id: 1,
            title: "Smartphones",
            count: "240+ Products",
            image: "https://images.unsplash.com/photo-1598327105666-5b89351aff70?q=80&w=800&auto=format&fit=crop",
            icon: <Smartphone size={24} />
        },
        {
            id: 2,
            title: "Laptops",
            count: "120+ Products",
            image: "https://images.unsplash.com/photo-1531297461136-82lwDe83b91d?q=80&w=800&auto=format&fit=crop",
            icon: <Laptop size={24} />
        },
        {
            id: 3,
            title: "Tablets",
            count: "85+ Products",
            image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=800&auto=format&fit=crop",
            icon: <Tablet size={24} />
        },
        {
            id: 4,
            title: "Audio",
            count: "180+ Products",
            image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=800&auto=format&fit=crop",
            icon: <Headphones size={24} />
        },
        {
            id: 5,
            title: "Wearables",
            count: "60+ Products",
            image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=800&auto=format&fit=crop",
            icon: <Watch size={24} />
        },
        {
            id: 6,
            title: "Gaming",
            count: "90+ Products",
            image: "https://images.unsplash.com/photo-1592840496011-a5030a246d9f?q=80&w=800&auto=format&fit=crop",
            icon: <Gamepad2 size={24} />
        }
    ];

    return (
        <div className="min-h-screen bg-bg text-text-primary font-primary">

            {/* Header */}
            <section className="py-20 bg-surface border-b border-border">
                <div className="container text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6 animate-fade-in">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                        </span>
                        Explore the Future
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold font-space mb-4">
                        Browse by Category
                    </h1>
                    <p className="text-text-secondary max-w-xl mx-auto text-lg">
                        Dive into our extensive collection of premium electronics.
                        Find exactly what you need, organized for your convenience.
                    </p>
                </div>
            </section>

            {/* Category Grid */}
            <section className="py-20">
                <div className="container">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {categories.map((category) => (
                            <div
                                key={category.id}
                                className="group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500"
                            >
                                {/* Background Image */}
                                <div className="absolute inset-0">
                                    <img
                                        src={category.image}
                                        alt={category.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                                </div>

                                {/* Content */}
                                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        <div className="flex items-center gap-3 mb-2 text-white/80">
                                            <div className="p-2 bg-white/10 backdrop-blur-md rounded-lg">
                                                {category.icon}
                                            </div>
                                            <span className="text-sm font-medium uppercase tracking-wider">{category.count}</span>
                                        </div>

                                        <h3 className="text-3xl font-bold text-white mb-4 font-space">{category.title}</h3>

                                        <div className="flex items-center gap-2 text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                            Shop Now <ArrowRight size={20} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trending / Featured Mini-Section */}
            <section className="py-20 bg-surface">
                <div className="container">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                        <div>
                            <h2 className="text-3xl font-bold font-space mb-4">Trending Now</h2>
                            <p className="text-text-secondary">Most popular categories this week.</p>
                        </div>
                        <button className="text-accent font-medium hover:text-blue-700 transition-colors flex items-center gap-2">
                            View All Trends <ArrowRight size={18} />
                        </button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {['VR Headsets', 'Smart Home', 'Cameras', 'Accessories'].map((item, i) => (
                            <div key={i} className="bg-bg p-6 rounded-2xl border border-border hover:border-accent hover:shadow-lg transition-all text-center cursor-pointer group">
                                <h4 className="font-bold text-lg group-hover:text-accent transition-colors">{item}</h4>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Category;