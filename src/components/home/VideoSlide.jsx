import React, { useRef, useEffect } from 'react';
import Button from '../../ui/Button';


export const VideoSlide = ({ item, isActive, onVideoEnd }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        if (isActive) {
            video.muted = true;
            video.currentTime = 0;

            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Autoplay prevented by browser:", error);
                });
            }
        } else {
            video.pause();
        }
    }, [isActive]);

    return (
        <div className='relative w-full h-screen'>
            {/* Text Overlay */}
            <div className='absolute top-[40%] md:top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center w-full max-w-4xl px-6 md:px-4'>
                <h1 className='text-3xl md:text-5xl text-white font-semibold text-center mb-3 drop-shadow-lg'>
                    {item.header}
                </h1>
                <p className='text-center text-sm md:text-lg text-gray-100 mb-8 md:mb-6 drop-shadow-md max-w-2xl'>
                    {item.text}
                </p>
                <Button variant="primary" className='uppercase shadow-lg py-2.5 px-6 md:py-3 md:px-8 text-sm md:text-base'>
                    Learn More
                </Button>
            </div>

            {/* Video Element */}
            <video
                ref={videoRef}
                className="w-full h-full object-cover"
                src={item.source}
                poster={item.poster}
                muted // React prop
                playsInline
                preload="metadata"
                onTimeUpdate={isActive ? onVideoEnd : undefined}
                onEnded={onVideoEnd}
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/30 z-10 pointer-events-none"></div>
        </div>
    );
};