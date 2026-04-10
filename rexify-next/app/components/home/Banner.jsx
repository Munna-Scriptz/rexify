import React, { useState, useRef } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { VideoSlide } from './VideoSlide';

import video1 from '../../assets/sliderVideo1.webm'
import video2 from '../../assets/sliderVideo2.webm'
import video3 from '../../assets/sliderVideo3.webm'
import video1Thumb from '../../assets/video1Thumbnail.png'
import video2Thumb from '../../assets/video2Thumbnail.png'
import video3Thumb from '../../assets/video3Thumbnail.png'

const Banner = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [progress, setProgress] = useState(0);
    const sliderRef = useRef(null);

    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        beforeChange: (oldIndex, newIndex) => {
            setCurrentSlide(newIndex);
            setProgress(0);
        }
    };

    const videoContent = [
        {
            header: 'NASync DH2300',
            text: 'Smart Storage Made Simple',
            source: video1,
            poster: video1Thumb,
        },
        {
            header: 'Next Gen Speed',
            text: 'Fast, Secure, Reliable',
            source: video2,
            poster: video2Thumb,
        },
        {
            header: 'Nexode Retractable Series',
            text: 'Your Hassle-Free Travel Power Kit',
            source: video3,
            poster: video3Thumb
        },
    ];

    // Video Update handler
    const handleVideoUpdate = (e) => {
        if (e.type === 'timeupdate') {
            const { currentTime, duration } = e.target;
            const percent = (currentTime / duration) * 100;
            setProgress(percent);
        }
        if (e.type === 'ended') {
            sliderRef.current.slickNext();
        }
    };

    return (
        <section id='Banner' className='h-screen'>
            <div id="Banner-Row" className='w-full h-screen absolute top-0 left-0'>
                <Slider ref={sliderRef} {...settings} >
                    {videoContent.map((item, i) => (
                        <VideoSlide
                            key={i}
                            item={item}
                            isActive={i === currentSlide}
                            onVideoEnd={handleVideoUpdate}
                        />
                    ))}
                </Slider>

                {/* Timeline Controls */}
                <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 w-full z-30 px-6">
                    <div className="flex w-full justify-center gap-1.5 md:gap-2 h-1 cursor-pointer">
                        {videoContent.map((_, i) => (
                            <div
                                key={i}
                                onClick={() => sliderRef.current.slickGoTo(i)}
                                className="flex-1 max-w-20 md:max-w-30 bg-white/30 rounded-full overflow-hidden relative group"
                            >
                                <div
                                    className="h-full bg-white transition-all duration-100 ease-linear absolute top-0 left-0"
                                    style={{
                                        width: i < currentSlide ? '100%' : i === currentSlide ? `${progress}%` : '0%'
                                    }}
                                ></div>
                                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;