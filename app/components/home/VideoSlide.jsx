"use client"
import React, { useRef, useEffect } from 'react';

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
        <div className='relative w-full h-screen overflow-hidden'>
            {/* Dark Gradient Overlay for better text readability */}
            <div className="absolute inset-0 bg-linear-to-b from-black/50 via-transparent to-black/60 z-10 pointer-events-none"></div>

            {/* Animated Text Content */}
            <div className={`absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center transition-all duration-1000 ease-out
                ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-110 pointer-events-none'}`}>

                <h2 className={`text-sm md:text-base font-bold text-white uppercase tracking-[0.3em] mb-4 transition-all duration-700 delay-300
                    ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    Featured Collection
                </h2>

                <h1 className={`text-4xl md:text-7xl lg:text-8xl text-white font-extrabold mb-6 tracking-tight transition-all duration-1000 delay-500
                    ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    {item.header}
                </h1>

                <p className={`text-base md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto font-medium transition-all duration-700 delay-700
                    ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    {item.text}
                </p>

                <div className={`transition-all duration-700 delay-1000 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <button className="group/btn relative px-8 py-4 bg-white group font-semibold rounded-full overflow-hidden cursor-pointer transition-all duration-300 hover:pr-12 active:scale-95 shadow-2xl">
                        <span className="relative z-10 text-text-primary group-hover:text-white">EXPLORE NOW</span>
                        <div className="absolute inset-0 bg-accent translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                        <span className="absolute text-text-primary group-hover:text-white right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover/btn:opacity-100 group-hover/btn:right-4 transition-all duration-300 z-10">
                            →
                        </span>
                    </button>
                </div>
            </div>

            {/* Video Background */}
            <video
                ref={videoRef}
                className={`w-full h-full object-cover transition-transform duration-10000 ease-linear ${isActive ? 'scale-110' : 'scale-100'}`}
                src={item.source}
                poster={item.poster?.src || item.poster}
                muted
                autoPlay
                playsInline
                preload="metadata"
                onTimeUpdate={isActive ? onVideoEnd : undefined}
                onEnded={onVideoEnd}
            />

            {/* Scroll Indicator */}
            <div className={`absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 transition-opacity duration-1000 delay-1500
                ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                <div className="w-px h-12 bg-white/30 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-[scroll-indicator_2s_infinite]"></div>
                </div>
            </div>

            <style jsx>{`
                @keyframes scroll-indicator {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(200%); }
                }
            `}</style>
        </div>
    );
};