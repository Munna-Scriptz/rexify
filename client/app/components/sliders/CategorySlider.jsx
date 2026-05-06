"use client"
import useEmblaCarousel from "embla-carousel-react";
import CategoryCard from '../cards/CategoryCard';

const CategorySlider = ({ category }) => {
    const [emblaRef] = useEmblaCarousel({
        dragFree: true,
        align: "start",
        containScroll: "trimSnaps"
    });

    return (
        <div className="relative">
            <div ref={emblaRef}>
                <div className="flex md:gap-10 gap-6 pb-4">
                    {category.map((item, index) => (
                        <div key={index} className="shrink-0 basis-[90%] md:basis-[20%] select-none">
                            <CategoryCard item={item} compact={true} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CategorySlider