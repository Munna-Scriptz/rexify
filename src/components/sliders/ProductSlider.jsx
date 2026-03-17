import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import SingleSellerCard from "../common/SingleSellerCard";

const ProductSlider = ({ products }) => {
    const [emblaRef] = useEmblaCarousel({
        dragFree: true,
        align: "start",
        containScroll: "trimSnaps"
    });

    return (
        <div className="relative group">
            <div className="overflow-hidden -mx-4 px-4" ref={emblaRef}>
                <div className="flex gap-4 pb-4">

                    {products.map((item, i) => (
                        <div key={i} className="flex-[0_0_42vw] sm:flex-[0_0_35%] md:flex-[0_0_30%] lg:flex-[0_0_22%]">
                            <SingleSellerCard
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