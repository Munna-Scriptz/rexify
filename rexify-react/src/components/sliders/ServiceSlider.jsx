import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import ServiceCard from "../cards/ServiceCard";

const ServiceSlider = ({ products }) => {
    const [emblaRef] = useEmblaCarousel({
        dragFree: true,
        align: "start",
        containScroll: "trimSnaps"
    });

    return (
        <div className="relative overflow-hidden">
            <div ref={emblaRef}>
                <div className="flex gap-4">
                    {products.map((item, i) => (
                        <div key={i} className="shrink-0 basis-75 select-none">
                            <ServiceCard item={item} />
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default ServiceSlider;