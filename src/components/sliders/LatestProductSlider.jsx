import React, { useState } from 'react'
import SingleLatestCard from '../common/SingleLatestCard'
import Slider from 'react-slick'
import { LeftArrow, RightArrow } from '../../utils/SliderUtils'

const LatestProductSlider = ({ products }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const settings = {
        arrows: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        beforeChange: (_, next) => setCurrentSlide(next),
        nextArrow: currentSlide < products.length - 3 ? <RightArrow /> : null,
        prevArrow: currentSlide > 0 ? <LeftArrow /> : null,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    nextArrow: currentSlide < products.length - 2 ? <RightArrow /> : null,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    nextArrow: currentSlide < products.length - 1 ? <RightArrow /> : null,
                }
            }
        ]
    };

    return (
        <div id="Cards-Row" className='pl-4 md:pl-10'>
            <div className='md:mr-7'>
                <Slider {...settings}>
                    {products.map((item, i) => (
                        <SingleLatestCard key={i} item={item} />
                    ))}
                </Slider>
            </div>
        </div>
    )
}

export default LatestProductSlider