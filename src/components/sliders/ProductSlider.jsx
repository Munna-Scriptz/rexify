import React, { useState } from 'react'
import SingleSellerCard from '../common/SingleSellerCard'
import Slider from 'react-slick';
import { LeftArrow, RightArrow } from '../../utils/SliderUtils';

const ProductSlider = ({ products }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const settings = {
        arrows: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        beforeChange: (_, next) => setCurrentSlide(next),
        nextArrow: currentSlide < products.length - 4 ? <RightArrow /> : null,
        prevArrow: currentSlide > 0 ? <LeftArrow /> : null,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    nextArrow: currentSlide < products.length - 3 ? <RightArrow /> : null,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    nextArrow: currentSlide < products.length - 2 ? <RightArrow /> : null,
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    nextArrow: currentSlide < products.length - 1 ? <RightArrow /> : null,
                }
            }
        ]
    };

    return (
        <div id="Slider-Row">
            <Slider {...settings}>
                {
                    products.map((item, i) => (
                        <div key={i}>
                            <SingleSellerCard img={item.image} badge={item.badge} name={item.title} variant={item.variant} price={item.price} rating={item.rating} reviews={item.reviews} />
                        </div>
                    ))
                }
            </Slider>
        </div>
    )
}

export default ProductSlider