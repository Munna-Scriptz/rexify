import React from 'react';
import { Smartphone, Laptop, Tablet, Headphones, Watch, Gamepad2 } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import CategoryCard from '../../components/cards/CategoryCard';

const page = () => {
    // -------- Dummy data
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
            <section id='Category'>
                <div className="container">
                    <div id="Category-Row">
                        {/* Header */}
                        <PageHeader topText={"Explore The Future"} headerText={"Browse by"} colorText={"Category"} bottomText={"Dive into our extensive collection of premium electronics. Find exactly what you need, organized for your convenience."} />

                        {/* Category Grid */}
                        <section className="py-20">
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 gap-6">
                                {categories.map((item, i) => (
                                    <CategoryCard item={item} key={i}/>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </section>
        </>
    );
};

export default page
