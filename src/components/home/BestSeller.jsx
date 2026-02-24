import React, { useState } from 'react'
import SingleSellerCard from '../common/SingleSellerCard'
import Slider from 'react-slick';

const BestSeller = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

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

    const settings = {
        arrows: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        beforeChange: (_, next) => setCurrentSlide(next),
        nextArrow: currentSlide < demoProducts.length - 4 ? <ChevronRight /> : null,
        prevArrow: currentSlide > 0 ? <ChevronLeft /> : null,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    nextArrow: currentSlide < demoProducts.length - 3 ? <ChevronRight /> : null,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    nextArrow: currentSlide < demoProducts.length - 2 ? <ChevronRight /> : null,
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    nextArrow: currentSlide < demoProducts.length - 1 ? <ChevronRight /> : null,
                }
            }
        ]
    };


    function ChevronRight({ onClick }) {
        return (
            <button
                onClick={onClick}
                className="absolute right-0 md:right-0 top-1/2 -translate-y-1/2 z-10
                 h-10 w-10 md:h-12 md:w-12 text-xl rounded-full bg-[#5087ff]/80 hover:bg-accent active:bg-sky-400 text-surface cursor-pointer shadow-lg
                 flex items-center justify-center
                 hover:scale-105 transition"
            >
                ❯
            </button>
        );
    }

    function ChevronLeft({ onClick }) {
        return (
            <button
                onClick={onClick}
                className="absolute left-0 md:left-0 top-1/2 -translate-y-1/2 z-10
                 h-10 w-10 md:h-12 md:w-12 text-xl rounded-full bg-[#5087ff]/80 hover:bg-accent active:bg-sky-400 text-surface cursor-pointer shadow-lg
                 flex items-center justify-center
                 hover:scale-105 transition"
            >
                ❮
            </button>
        );
    }




    return (
        <>
            <section id='Best-Seller' className='mt-28'>
                <div className="container">
                    <div id="Header-Row" className="mb-6 md:mb-10 flex items-center md:items-end justify-between px-4 md:px-0">
                        <h2 className="text-2xl md:text-4xl font-semibold text-text-primary">
                            Best Seller.
                        </h2>

                        <button className="text-sm md:text-base font-medium text-text-secondary hover:text-neutral-900 flex items-center gap-1 transition cursor-pointer " >
                            View all
                            <span className="text-base">→</span>
                        </button>
                    </div>


                    {/* ----------- Cards ----------- */}
                    <div id="content-Row">

                        <Slider {...settings}>
                            {
                                demoProducts.map((item, i) => (
                                    <div key={i}>
                                        <SingleSellerCard img={item.image} badge={item.badge} name={item.title} variant={item.variant} price={item.price} rating={item.rating} reviews={item.reviews} />
                                    </div>
                                ))
                            }
                        </Slider>

                    </div>
                </div>
            </section>
        </>
    )
}

export default BestSeller