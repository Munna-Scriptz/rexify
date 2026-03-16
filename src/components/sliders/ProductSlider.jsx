import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import SingleSellerCard from "../common/SingleSellerCard";
import { LeftArrow, RightArrow } from "../../utils/SliderUtils";

const ProductSlider = ({ products }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    dragFree: true,
    align: "start",
    containScroll: "trimSnaps"
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative">

      {/* arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-0 top-1/2 z-10 -translate-y-1/2"
      >
        <LeftArrow />
      </button>

      <button
        onClick={scrollNext}
        className="absolute right-0 top-1/2 z-10 -translate-y-1/2"
      >
        <RightArrow />
      </button>

      {/* embla */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">

          {products.map((item, i) => (
            <div
              key={i}
              className="
                flex-[0_0_100%]
                sm:flex-[0_0_50%]
                md:flex-[0_0_33.33%]
                lg:flex-[0_0_25%]
              "
            >
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