import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import SingleSellerCard from "../common/SingleSellerCard";
import { LeftArrow, RightArrow } from "../../utils/SliderUtils";

const ProductSlider = ({ products }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        dragFree: true,
        align: "start",
        containScroll: "trimSnaps"
    });

    const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
    const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const onSelect = useCallback((emblaApi) => {
        setPrevBtnDisabled(!emblaApi.canScrollPrev());
        setNextBtnDisabled(!emblaApi.canScrollNext());
    }, []);

    useEffect(() => {
        if (!emblaApi) return;

        onSelect(emblaApi);
        emblaApi.on("reInit", onSelect).on("select", onSelect);
    }, [emblaApi, onSelect]);

    return (
        <div className="relative group">

            {/* arrows */}
            <LeftArrow disabled={prevBtnDisabled} onClick={scrollPrev} className="hidden md:flex" />
            <RightArrow disabled={nextBtnDisabled} onClick={scrollNext} className="hidden md:flex" />

            {/* embla */}
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