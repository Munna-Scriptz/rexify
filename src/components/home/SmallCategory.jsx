import React, { useState } from 'react';
import Slider from 'react-slick';
import { LeftArrow, RightArrow } from '../../utils/SliderUtils';

const SmallCategory = () => {
    const products = [
        { name: "Mac", image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/store-card-13-mac-nav-202510?wid=400&hei=260&fmt=png-alpha&.v=M1Q3OGxnb1lBaHhqNjZ2OVRXZmx4YkVwOVNLbHRldEZZYkpvZ0VDM1ZJYisrUlZaSVRoWVYzU0Qra0FoTmUwNng2bitObzZwQzk4cEorV1dZdzhIazlhTkRKemhDN0NEc1VzN1ZjMGR5dUk" },
        { name: "iPhone", image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/store-card-13-iphone-nav-202509?wid=1200&hei=780&fmt=png-alpha&.v=dW5XbHI1eDVpd01qWUU4bFRtWGZXM1doT212VzJoWjBSKzRpbmNETHN1QnRHU3BERzdnOWdiQkwvWTZGajY2b1M0TjRWdzF2UjRGVEY0c3dBQVZ6VFN0TmdKaCs3NTJMbFVuOGp2LzI5RGc" },
        { name: "iPad", image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/store-card-13-ipad-nav-202405?wid=400&hei=260&fmt=png-alpha&.v=dW5XbHI1eDVpd01qWUU4bFRtWGZXNGFLQTJVNnlNQmQrVmRBYnZYei9jckUzelNmMnRxajE0NHhmMWtLazl6eG53M0FRZHBXNTh1U1lFVEtSR2YzTm5qbE56RWRpRFNIRXZvbkd2S0l5dTg" },
        { name: "Apple Watch", image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/store-card-13-watch-nav-202509?wid=400&hei=260&fmt=png-alpha&.v=S0tSVzBtSkRkSFFhMm1zS1NmeWtkeUdJZTE2SHMxcG9uUER3YTRFOUZ6ckh5NTJ6cGtEemJOblBHR043ZjFkZzAzOVFHb3N0MkVmS01ZcFh0d1Y4R2k5NGJENldmZ3lMeGxpSDNmeE9hd2s" },
        { name: "Apple Vision Pro", image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/store-card-13-vision-pro-nav-202401?wid=400&hei=260&fmt=png-alpha&.v=VzVpanYvTldHb05iVXFhc0xveWRLM25jd0w4dXFwc1hFbWZkNm9IcUR2bytSMWt1ZUNyTGx4SjRKL1pSL0ZDeGpCeVFkSWhuN0RJazJDeHBqaFFac0hlZzcwajlwb1R2dHNlazl1dldSUGQ5RzBLTDk5c25YRG5wR2ZpUlI4RFM" },
        { name: "AirPods", image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/store-card-13-airpods-nav-202509?wid=400&hei=260&fmt=png-alpha&.v=Q0Z1bWFqMUpRRnp3T0Y0VWJpdk1yMDhFUStvWHB3SDlDa3VrdUZORWRqeld1aTN5QlRYNG5PRjJxc2d1RklXbVM0TjRWdzF2UjRGVEY0c3dBQVZ6VGZUMjJQZFhhT2thWmkxZjhra3FyZEk" },
        { name: "AirTag", image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/store-card-13-airtags-nav-202108?wid=400&hei=260&fmt=png-alpha&.v=Q0Z1bWFqMUpRRnp3T0Y0VWJpdk1ydzduWDk4YUM5R1JVL2gwcEZnWWNaRFd1aTN5QlRYNG5PRjJxc2d1RklXbVM0TjRWdzF2UjRGVEY0c3dBQVZ6VFltc1ByWXViNGVYdEdGdkhJbjJoMGs" },
        { name: "Apple TV 4K", image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/store-card-13-appletv-nav-202210?wid=400&hei=260&fmt=png-alpha&.v=T0wvM1N3YUcxQ09qK0VNRkl1RU1BZFM5WnN0RmVZRmVXQ0FCUWJjbnJDald1aTN5QlRYNG5PRjJxc2d1RklXbVM0TjRWdzF2UjRGVEY0c3dBQVZ6VFZ3YmJrVi9SakQxWUcrYWQwVXc5VTA" },
        { name: "HomePod", image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/store-card-13-homepod-nav-202301?wid=400&hei=260&fmt=png-alpha&.v=WVcvamRucHVMMWs5SXZ3bVJ3Q2hpZGR0czFXNWdCUW14eTN2U29pLzNMcld1aTN5QlRYNG5PRjJxc2d1RklXbVM0TjRWdzF2UjRGVEY0c3dBQVZ6VFJmbWU0TjJLamxsdTltNkZVZ1RhbDA" },
    ];

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
        <section className="md:mt-28 mt-20 overflow-x-hidden">
            <div className="container">
                <div id='Small-Category-Row'>

                    {/* 1. Header Section */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-18 gap-2 md:gap-8">

                        {/* Left: Big Title */}
                        <h1 className="text-5xl md:text-[80px] font-bold tracking-tight leading-none text-text-primary">
                            Store.
                        </h1>

                        {/* Right: Subtext */}
                        <h2 className="text-[17px] md:text-2xl font-semibold text-text-primary text-left md:text-right">
                            The best way to buy the <br />
                            products you love.
                        </h2>
                    </div>
                </div>
            </div>

            <div className="slider-container relative">
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
            </div>
        </section >
    );
};

export default SmallCategory;