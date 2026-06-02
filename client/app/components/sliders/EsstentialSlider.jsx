"use client"
import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import EssentialCard from "../cards/EssentialCard";

const EssentialSlider = ({ products }) => {
    const [emblaRef] = useEmblaCarousel({
        dragFree: true,
        align: "start",
        containScroll: "trimSnaps"
    });

    return (
        <div className="relative overflow-hidden">
            <div ref={emblaRef}>
                <div className="flex gap-4">
                    {products?.map((item, i) => (
                        <div key={i} className="shrink-0 basis-22 md:basis-35.5">
                            <EssentialCard
                                img={item.variants[0].thumbnail}
                                badge={item.badge}
                                name={item.title}
                                variant={item.brand}
                                price={item.price}
                                rating={item.avgReview || 0}
                                reviews={item.totalReview || 0}
                            />
                        </div>
                    ))}

                </div>
            </div>

        </div>
    );
};

export default EssentialSlider;