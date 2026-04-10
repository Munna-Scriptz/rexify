import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import SellerCard from "../cards/SellerCard";

const ProductSlider = ({ products }) => {
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
                        <div key={i} className="shrink-0 basis-22 md:basis-35.5">
                            <SellerCard
                                img={item.image}
                                badge={item.badge}
                                name={item.title}
                                variant={item.variant}
                                price={item.price}
                                rating={item.rating}
                                reviews={item.reviews}
                            />
                        </div>
                    ))}

                </div>
            </div>

        </div>
    );
};

export default ProductSlider;