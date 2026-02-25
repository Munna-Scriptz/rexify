import React, { useState } from 'react';
import Slider from 'react-slick';
import { LeftArrow, RightArrow } from '../../utils/SliderUtils';

const CategorySlider = ({ products }) => {

    // ------------- Slider 
    const [currentSlide, setCurrentSlide] = useState(0);

    const settings = {
        arrows: true,
        infinite: false,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 2,
        beforeChange: (_, next) => setCurrentSlide(next),
        nextArrow: currentSlide < products.length - 7 ? <RightArrow /> : null,
        prevArrow: currentSlide > 0 ? <LeftArrow /> : null,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 5,
                    nextArrow: currentSlide < products.length - 5 ? <RightArrow /> : null,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    nextArrow: currentSlide < products.length - 4 ? <RightArrow /> : null,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    nextArrow: currentSlide < products.length - 3 ? <RightArrow /> : null,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 3,
                    nextArrow: currentSlide < products.length - 3 ? <RightArrow /> : null,
                }
            }
        ]
    };

    return (
        <div>
            <Slider {...settings}>
                {products.map((item, index) => (
                    <div key={index}>
                        <div className="cursor-pointer flex flex-col items-center gap-3 justify-center pt-2">
                            {/* Image Container */}
                            <div className="duration-300 hover:-translate-y-2">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="md:w-30 w-25 object-contain"
                                />
                            </div>

                            {/* Product Name */}
                            <p className="text-sm font-medium text-[#1D1D1F] hover:underline decoration-[#1D1D1F] underline-offset-2">
                                {item.name}
                            </p>
                        </div>

                    </div>
                ))}
            </Slider>
        </div>
    )
}

export default CategorySlider