import React from 'react'
import SingleEssentialCard from '../common/SingleEssentialCard';
import { Link } from 'react-router';
import Button from '../../ui/Button';
import EssentialSlider from '../sliders/EsstentialSlider';

const Essentials = () => {
    const demoProducts = [
        {
            id: 1,
            title: "Xiaomi Redmi Watch 4",
            variant: "Rein Milanese",
            price: 99,
            rating: 4.23,
            reviews: 749,
            badge: "New",
            image: "https://www.startech.com.bd/image/cache/catalog/smart-watch/xiaomi/watch-s3/xiaomi-watch-s3-228x228.webp",
        },
        {
            id: 2,
            title: "Apple Watch Series 9",
            variant: "Sport Band",
            price: 429,
            rating: 4.78,
            reviews: 1284,
            badge: "Popular",
            image: "https://www.startech.com.bd/image/cache/catalog/watch/apple/watch-series-9/watch-series-9-midnight-01-228x228.webp",
        },
        {
            id: 3,
            title: "Samsung Galaxy Watch 6",
            variant: "Bluetooth 44mm",
            price: 299,
            rating: 4.51,
            reviews: 962,
            badge: "Trending",
            image: "https://www.startech.com.bd/image/cache/catalog/smart-watch/samsung/galaxy-watch-7-40mm/galaxy-watch-7-40mm-228x228.webp",
        },
        {
            id: 4,
            title: "Nothing Ear (2)",
            variant: "Wireless Earbuds",
            price: 149,
            rating: 4.36,
            reviews: 684,
            badge: "New",
            image: "https://www.startech.com.bd/image/cache/catalog/earbuds/hifuture/smartpods-2/smartpods-02-228x228.webp",
        },
        {
            id: 5,
            title: "Sony WH-1000XM5",
            variant: "Noise Cancelling",
            price: 399,
            rating: 4.82,
            reviews: 2147,
            badge: "Best Seller",
            image: "https://www.startech.com.bd/image/cache/catalog/headphone/sony/wh-1000xm5/wh-1000xm5-offical-228x228.webp",
        },
        {
            id: 6,
            title: "Logitech MX Master 3S",
            variant: "Wireless Mouse",
            price: 129,
            rating: 4.67,
            reviews: 1732,
            badge: "Top Rated",
            image: "https://www.startech.com.bd/image/cache/catalog/mouse/logitech/mx-master-3s/logitech-mx-master-3s-01-228x228.jpg",
        },
    ];
    return (
        <>
            <section id='Essentials' className='mt-20 md:mt-30'>
                <div className="container">
                    {/* -------------- Text Header --------------- */}
                    <div id="Header-Row" className="mb-8 md:mb-10 flex flex-row items-center md:items-end justify-between">
                        <h2 className="text-2xl md:text-4xl font-semibold text-text-primary">
                            Everyday Essentials.
                        </h2>

                        <button className="text-sm md:text-base font-medium text-text-secondary hover:text-neutral-900 flex items-center gap-1 transition cursor-pointer" >
                            View all
                            <span className="text-base">→</span>
                        </button>
                    </div>

                    {/* -------------- Cards --------------- */}
                    {/* Desktop Layout */}
                    <div
                        id="content-Row"
                        className="hidden md:flex flex-row justify-center gap-8"
                    >
                        {/* Left Column */}
                        <div className="flex flex-col gap-8 translate-y-6 select-none">
                            {demoProducts
                                .filter((_, i) => i % 3 === 0)
                                .map((item, i) => (
                                    <SingleEssentialCard
                                        key={i}
                                        img={item.image}
                                        badge={item.badge}
                                        name={item.title}
                                        variant={item.variant}
                                        price={item.price}
                                        rating={item.rating}
                                        reviews={item.reviews}
                                    />
                                ))}
                        </div>

                        {/* Middle Column (Raised) */}
                        <div className="flex flex-col gap-8 -translate-y-6">
                            {demoProducts
                                .filter((_, i) => i % 3 === 1)
                                .map((item, i) => (
                                    <SingleEssentialCard
                                        key={i}
                                        img={item.image}
                                        badge={item.badge}
                                        name={item.title}
                                        variant={item.variant}
                                        price={item.price}
                                        rating={item.rating}
                                        reviews={item.reviews}
                                    />
                                ))}
                        </div>

                        {/* Right Column */}
                        <div className="flex flex-col gap-8 translate-y-6">
                            {demoProducts
                                .filter((_, i) => i % 3 === 2)
                                .map((item, i) => (
                                    <SingleEssentialCard
                                        key={i}
                                        img={item.image}
                                        badge={item.badge}
                                        name={item.title}
                                        variant={item.variant}
                                        price={item.price}
                                        rating={item.rating}
                                        reviews={item.reviews}
                                    />
                                ))}
                        </div>
                    </div>

                    {/* mobile slider --------------- */}
                    <div className='md:hidden block'>
                        <EssentialSlider products={demoProducts} />
                    </div>

                    {/* -------------- Explore more ------------- */}
                    <Link to={'/'} className='flex items-center justify-center mt-10 md:mt-14'>
                        <Button variant='explore' className="w-full md:w-auto">Explore More →</Button>
                    </Link>
                </div>
            </section>
        </>
    )
}

export default Essentials