import React from 'react'
import useEmblaCarousel from "embla-carousel-react";
import LatestCard from '../cards/LatestCard'

const LatestProductSlider = ({ products }) => {
    const [emblaRef] = useEmblaCarousel({
        dragFree: true,
        align: "start",
        containScroll: "trimSnaps"
    });
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