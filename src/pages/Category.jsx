import React from 'react';
import { ArrowRight, Smartphone, Laptop, Tablet, Headphones, Watch, Gamepad2 } from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';

const Category = () => {
    const categories = [
        {
            id: 1,
            title: "Smartphones",
            count: "240+ Products",
            image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/store-card-13-iphone-nav-202509?wid=1200&hei=780&fmt=png-alpha&.v=dW5XbHI1eDVpd01qWUU4bFRtWGZXM1doT212VzJoWjBSKzRpbmNETHN1QnRHU3BERzdnOWdiQkwvWTZGajY2b1M0TjRWdzF2UjRGVEY0c3dBQVZ6VFN0TmdKaCs3NTJMbFVuOGp2LzI5RGc",
            icon: <Smartphone size={24} />
        },
        {
            id: 2,
            title: "Laptops",
            count: "120+ Products",
            image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/store-card-13-mac-nav-202510?wid=400&hei=260&fmt=png-alpha&.v=M1Q3OGxnb1lBaHhqNjZ2OVRXZmx4YkVwOVNLbHRldEZZYkpvZ0VDM1ZJYisrUlZaSVRoWVYzU0Qra0FoTmUwNng2bitObzZwQzk4cEorV1dZdzhIazlhTkRKemhDN0NEc1VzN1ZjMGR5dUk",
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
            image: "https://www.myhome.co.nz/wp-content/uploads/2023/08/GAMSNY5504__1.jpg",
            icon: <Gamepad2 size={24} />
        }
    ];

    return (
        <>
            <section id='content'>
                <div className="container">
                    <div id="content-Row" className="text-text-primary">

                        {/* Header */}
                        <PageHeader topText={"Explore The Future"} headerText={"Browse by"} colorText={"Category"} bottomText={"Dive into our extensive collection of premium electronics. Find exactly what you need, organized for your convenience."} />

                        {/* Category Grid */}
                        <section className="py-20">
                            <div className="container">
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {categories.map((category) => (
                                        <div
                                            key={category.id}
                                            className="group relative h-100 rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500"
                                        >
                                            {/* Background Image */}
                                            <div className="absolute inset-0">
                                                <img
                                                    src={category.image}
                                                    alt={category.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                                {/* Overlay */}
                                                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
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
                </div>
            </section>
        </>
    );
};

export default Category;