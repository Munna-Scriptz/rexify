"use client"
import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { VideoSlide } from './VideoSlide';
import video1Thumb from '../../assets/video1Thumbnail.png';
import video2Thumb from '../../assets/video2Thumbnail.png';
import video3Thumb from '../../assets/video3Thumbnail.png';

const Banner = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        duration: 40,
        watchDrag: true,
    });

    // Initial appearance animation
    useEffect(() => {
        setIsLoaded(true);
    }, []);

    // Sync Embla slide changes → state
    useEffect(() => {
        if (!emblaApi) return;

        const onSelect = () => {
            setCurrentSlide(emblaApi.selectedScrollSnap());
            setProgress(0);
        };

        emblaApi.on('select', onSelect);
        return () => emblaApi.off('select', onSelect);
    }, [emblaApi]);

    const goTo = useCallback((index) => {
        if (!emblaApi) return;
        emblaApi.scrollTo(index);
    }, [emblaApi]);

    const goNext = useCallback(() => {
        if (!emblaApi) return;
        emblaApi.scrollNext();
    }, [emblaApi]);

    // Video update handler — same signature as original
    const handleVideoUpdate = useCallback((e) => {
        if (e.type === 'timeupdate') {
            const { currentTime, duration } = e.target;
            if (duration) {
                setProgress((currentTime / duration) * 100);
            }
        }
        if (e.type === 'ended') {
            goNext();
        }
    }, [goNext]);

    const videoContent = [
        {
            header: 'NASync DH2300',
            text: 'Personal cloud storage redefined with enterprise-grade security.',
            source: '/video/sliderVideo1.webm',
            poster: video1Thumb,
        },
        {
            header: 'Next Gen Speed',
            text: 'Experience the future of connectivity with ultra-fast technology.',
            source: '/video/sliderVideo2.webm',
            poster: video2Thumb,
        },
        {
            header: 'Nexode Series',
            text: 'Premium travel power solutions for the modern explorer.',
            source: '/video/sliderVideo3.webm',
            poster: video3Thumb,
        },
    ];

    return (
        <section className="h-screen">
            <div
                id="Banner-Row"
                className={`absolute top-0 left-0 w-full h-screen bg-black transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
            >
                {/* ── Embla viewport ── */}
                <div ref={emblaRef} className="h-full overflow-hidden">
                    <div className="flex h-full">
                        {videoContent.map((item, i) => (
                            <div
                                key={i}
                                className="relative shrink-0 w-full h-full"
                                style={{
                                    /* Fade between slides — mirrors react-slick fade mode */
                                    opacity: i === currentSlide ? 1 : 0,
                                    transition: 'opacity 800ms cubic-bezier(0.7, 0, 0.3, 1)',
                                }}
                            >
                                <VideoSlide
                                    item={item}
                                    isActive={i === currentSlide}
                                    onVideoEnd={handleVideoUpdate}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Refined Timeline Controls (unchanged) ── */}
                <div className="absolute bottom-12 left-0 right-0 z-30 px-6 max-w-7xl mx-auto">
                    <div className="flex flex-col gap-4">

                        {/* Slide Numbers & Labels */}
                        <div className="flex items-end gap-12 text-white font-medium">
                            {videoContent.map((item, i) => (
                                <button
                                    key={i}
                                    onClick={() => goTo(i)}
                                    className={`hidden md:flex flex-col gap-2 transition-all cursor-pointer duration-500 text-left group
                                        ${i === currentSlide ? 'opacity-100' : 'opacity-40 hover:opacity-100'}`}
                                >
                                    <span className="text-xs font-bold tracking-tighter italic">
                                        0{i + 1}
                                    </span>
                                    <span
                                        className={`text-sm uppercase tracking-widest transition-transform duration-500
                                            ${i === currentSlide ? 'translate-x-0' : '-translate-x-2 group-hover:translate-x-0'}`}
                                    >
                                        {item.header.split(' ')[0]}
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* Progress Bars */}
                        <div className="flex w-full gap-3 h-0.5 cursor-pointer">
                            {videoContent.map((_, i) => (
                                <div
                                    key={i}
                                    onClick={() => goTo(i)}
                                    className="flex-1 bg-white/10 rounded-full overflow-hidden relative group h-full"
                                >
                                    <div
                                        className="h-full bg-accent transition-all duration-100 ease-linear absolute top-0 left-0"
                                        style={{
                                            width:
                                                i < currentSlide
                                                    ? '100%'
                                                    : i === currentSlide
                                                        ? `${progress}%`
                                                        : '0%',
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;