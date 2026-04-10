import React, { useRef, useEffect } from 'react';
import Button from '../../components/ui/Buttons';


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
                <button className={`uppercase shadow-lg py-2.5 px-6 md:py-3 md:px-8 text-sm md:text-base relative overflow-hidden font-semibold text-surface border border-surface rounded-[34px] transition-all duration-300 [transition-timing-function:cubic-bezier(0.23,1,0.32,1) before:content-[''] before:absolute before:inset-0 before:m-auto before:w-12.5 before:h-12.5 before:rounded-[inherit] before:scale-0 before:-z-10 before:bg-accent before:transition-all before:duration-600 before:[transition-timing-function:cubic-bezier(0.23,1,0.32,1) hover:before:scale-[3] hover:text-surface hover:scale-110 hover:shadow-[0_0_20px_rgba(193,163,98,0.4)] active:scale-100`}>
                    Learn More
                </button>
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