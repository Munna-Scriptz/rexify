import React, { useState } from 'react'
import pro1 from '../../assets/latestPro1.jpg'
import pro2 from '../../assets/latestPro2.jpg'
import pro3 from '../../assets/latestPro3.jpg'
import pro4 from '../../assets/latestPro4.jpg'
import SingleLatestCard from '../common/SingleLatestCard'
import Slider from 'react-slick'

const LatestProducts = () => {
    const products = [
        { name: "iPhone 17 Pro", color: 'surface', text: 'All out Pro.', desc: 'From $1099 or $45.79/mo. for 24 mo.', image: pro1 },
        { name: "MacBook Pro 14", color: 'surface', text: 'Supercharged by M5.', desc: 'From $1599 or $133.25/mo. for 12 months.', image: pro3 },
        { name: "iPad Pro", color: 'surface', text: 'Mmmmm. Power.', desc: 'From $999 or $83.25/mo. for 12 months', image: pro2 },
        { name: "Apple Watch Series 11", color: 'text-primary', text: 'The ultimate way to watch your health.', desc: 'From $399 or $33.25/mo. for 12 mo.', image: pro4 },
        { name: "Apple Vision Pro", color: 'text-primary', text: 'New powerful M5 chip and comfortable Dual Knit Band.', desc: 'From $3499 or $291.58/mo. for 12 mo.', image: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/store-card-40-vision-pro-202510?wid=800&hei=1000&fmt=jpeg&qlt=90&.v=TVVQNGFmWnRIeGl6RHZFdkZqMmNxT2JuTWZNYUVWLzFTaTdNdUxxeWtQVG45S05qekNUdVUwMVFyK1pKaERUd2JGcXNRQnFCV0w3WVRjTExvdm1ic1JRRkR1OTVrTXczUEJ3YTNXM0U0S1QrNmVjbmk5c1V4VVk2VEt3TGcxekg' },
    ];

    // ------------- Slider 
    const [currentSlide, setCurrentSlide] = useState(0);

    const settings = {
        arrows: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        beforeChange: (_, next) => setCurrentSlide(next),
        nextArrow: currentSlide < products.length - 3 ? <ChevronRight /> : null,
        prevArrow: currentSlide > 0 ? <ChevronLeft /> : null,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    nextArrow: currentSlide < products.length - 2 ? <ChevronRight /> : null,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    nextArrow: currentSlide < products.length - 1 ? <ChevronRight /> : null,
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
                className="absolute left-0 md:-left-7 top-1/2 -translate-y-1/2 z-10
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
            <section id='LatestProduct' className='mt-28 overflow-x-hidden'>
                <div className="container">
                    {/* ------------ Text  */}
                    <div id="Header-Row" className='mb-6 md:mb-10 px-4 md:px-0'>
                        <h2 className='text-2xl md:text-3xl font-semibold text-text-primary'>The latest. <span className='text-text-secondary block md:inline'>Take a look at what’s new, right now.</span></h2>
                    </div>
                </div>

                {/* ------------ Cards  */}
                <div id="Cards-Row" className='pl-4 md:pl-10'>
                    <div>
                        <Slider {...settings}>
                            {products.map((item, i) => (
                                <SingleLatestCard key={i} item={item} />
                            ))}
                        </Slider>
                    </div>
                </div>
            </section>
        </>
    )
}

export default LatestProducts