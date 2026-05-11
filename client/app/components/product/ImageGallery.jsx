"use client"

import React, { useCallback, useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { Share2, Heart, ChevronLeft, ChevronRight } from "lucide-react"

const ImageGallery = ({ thumbnail, images = [] }) => {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [zoomStyle, setZoomStyle] = useState({})
    const [isZoomed, setIsZoomed] = useState(false)

    useEffect(()=>{
        images.unshift(thumbnail)
    }, [])
    // Main slider
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: false,
    })

    // Thumbnail slider
    const [thumbRef, thumbApi] = useEmblaCarousel({
        containScroll: "keepSnaps",
        dragFree: true,
    })

    const scrollPrev = () => emblaApi && emblaApi.scrollPrev()
    const scrollNext = () => emblaApi && emblaApi.scrollNext()

    const onSelect = useCallback(() => {
        if (!emblaApi) return

        const index = emblaApi.selectedScrollSnap()
        setSelectedIndex(index)

        if (thumbApi) {
            thumbApi.scrollTo(index)
        }
    }, [emblaApi, thumbApi])

    useEffect(() => {
        if (!emblaApi) return

        onSelect()
        emblaApi.on("select", onSelect)
    }, [emblaApi, onSelect])

    const handleThumbClick = (index) => {
        if (!emblaApi) return
        emblaApi.scrollTo(index)
    }

    // Zoom effect
    const handleMouseMove = (e) => {
        const { left, top, width, height } =
            e.currentTarget.getBoundingClientRect()

        const x = ((e.clientX - left) / width) * 100
        const y = ((e.clientY - top) / height) * 100

        setZoomStyle({
            transformOrigin: `${x}% ${y}%`,
            transform: "scale(2)",
        })
    }

    return (
        <div className="space-y-4">
            {/* Main Slider */}
            <div className="relative group">
                <div
                    className="overflow-hidden rounded-3xl border border-border bg-surface"
                    ref={emblaRef}
                >
                    <div className="flex">
                        {images.map((img, index) => (
                            <div
                                key={index}
                                className="min-w-0 flex-[0_0_100%]"
                            >
                                <div
                                    className="relative aspect-square overflow-hidden"
                                    onMouseMove={handleMouseMove}
                                    onMouseEnter={() => setIsZoomed(true)}
                                    onMouseLeave={() => {
                                        setIsZoomed(false)
                                        setZoomStyle({})
                                    }}
                                >
                                    <img
                                        src={img}
                                        alt={`product-${index}`}
                                        className="h-full w-full object-cover transition-transform duration-200 cursor-zoom-in"
                                        style={isZoomed ? zoomStyle : {}}
                                    />

                                    {/* Action Buttons */}
                                    <div className="absolute top-4 right-4 flex flex-col gap-2 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-2 bg-white rounded-full shadow-sm hover:text-accent transition-colors cursor-pointer">
                                            <Heart size={20} />
                                        </button>

                                        <button className="p-2 bg-white rounded-full shadow-sm hover:text-accent transition-colors cursor-pointer">
                                            <Share2 size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Arrows */}
                <button
                    onClick={scrollPrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                >
                    <ChevronLeft size={20} />
                </button>

                <button
                    onClick={scrollNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                >
                    <ChevronRight size={20} />
                </button>
            </div>

            {/* Thumbnail Slider */}
            <div className="overflow-hidden" ref={thumbRef}>
                <div className="flex gap-3">
                    {images.map((img, index) => (
                        <button
                            key={index}
                            onClick={() => handleThumbClick(index)}
                            className={`relative flex-[0_0_100px] overflow-hidden rounded-2xl border-2 transition-all aspect-square ${
                                selectedIndex === index
                                    ? "border-accent"
                                    : "border-transparent hover:border-gray-300"
                            }`}
                        >
                            <img
                                src={img}
                                alt={`thumb-${index}`}
                                className="h-full w-full object-cover"
                            />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ImageGallery