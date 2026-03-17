import React from 'react';
import useEmblaCarousel from "embla-carousel-react";

const CategorySlider = ({ products }) => {
    const [emblaRef] = useEmblaCarousel({
        dragFree: true,
        align: "start",
        containScroll: "trimSnaps"
    });

    return (
        <div className="relative group">
            <div ref={emblaRef}>
                <div className="flex gap-10 pb-4">
                    {products.map((item, index) => (
                        <div
                            key={index}
                            className="shrink-0 basis-22 md:basis-35.5 flex flex-col items-center gap-3 md:gap-4 justify-center pt-2 select-none cursor-pointer"
                        >
                            <div className="duration-300 hover:-translate-y-2">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full object-contain"
                                />
                            </div>

                            <p className="text-sm md:text-base font-medium text-[#1D1D1F] hover:underline underline-offset-2">
                                {item.name}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CategorySlider