"use client"
import React from 'react'
import useEmblaCarousel from "embla-carousel-react";
import LatestCard from '../cards/LatestCard'
import pro1 from '../../assets/latestPro1.jpg'
import pro2 from '../../assets/latestPro2.jpg'
import pro3 from '../../assets/latestPro3.jpg'
import pro4 from '../../assets/latestPro4.jpg'

const LatestProductSlider = () => {
    const [emblaRef] = useEmblaCarousel({
        dragFree: true,
        align: "start",
        containScroll: "trimSnaps"
    });

    const products = [
        { name: "iPhone 17 Pro", color: '#f8f9fa', text: 'All out Pro.', desc: 'From $1099 or $45.79/mo. for 24 mo.', image: pro1 },
        { name: "MacBook Pro 14", color: '#f8f9fa', text: 'Supercharged by M5.', desc: 'From $1599 or $133.25/mo. for 12 months.', image: pro3 },
        { name: "iPad Pro", color: '#f8f9fa', text: 'Mmmmm. Power.', desc: 'From $999 or $83.25/mo. for 12 months', image: pro2 },
        { name: "Apple Watch Series 11", color: '#121212', text: 'The ultimate way to watch your health.', desc: 'From $399 or $33.25/mo. for 12 mo.', image: pro4 },
        { name: "Apple Vision Pro", color: '#121212', text: 'New powerful M5 chip and comfortable Dual Knit Band.', desc: 'From $3499 or $291.58/mo. for 12 mo.', image: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/store-card-40-vision-pro-202510?wid=800&hei=1000&fmt=jpeg&qlt=90&.v=TVVQNGFmWnRIeGl6RHZFdkZqMmNxT2JuTWZNYUVWLzFTaTdNdUxxeWtQVG45S05qekNUdVUwMVFyK1pKaERUd2JGcXNRQnFCV0w3WVRjTExvdm1ic1JRRkR1OTVrTXczUEJ3YTNXM0U0S1QrNmVjbmk5c1V4VVk2VEt3TGcxekg' },
    ];
    return (
        <div className="relative group">
            <div ref={emblaRef}>
                <div className="flex gap-4 pb-4">
                    {products.map((item, i) => (
                        <div key={i} className='shrink-0 basis-[90%] md:basis-100'>
                            <LatestCard item={item} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default LatestProductSlider