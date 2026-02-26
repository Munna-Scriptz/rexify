import React from 'react'
import { ChevronRight, ChevronLeft } from 'lucide-react'

export const RightArrow = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="absolute right-0 md:-right-5 top-1/2 -translate-y-1/2 z-20
                 h-10 w-10 md:h-14 md:w-14 rounded-full 
                 bg-white/80 backdrop-blur-md border border-gray-200
                 text-text-primary shadow-xl hover:shadow-2xl
                 flex items-center justify-center
                 hover:bg-accent hover:text-white hover:border-accent
                 transition-all duration-300 ease-out group
                 active:scale-90 cursor-pointer"
        >
            <ChevronRight size={28} className="transition-transform group-hover:translate-x-0.5" strokeWidth={2.5} />
        </button>
    )
}

export const LeftArrow = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="absolute left-0 md:-left-5 top-1/2 -translate-y-1/2 z-20
                 h-10 w-10 md:h-14 md:w-14 rounded-full 
                 bg-white/80 backdrop-blur-md border border-gray-200
                 text-text-primary shadow-xl hover:shadow-2xl
                 flex items-center justify-center
                 hover:bg-accent hover:text-white hover:border-accent
                 transition-all duration-300 ease-out group
                 active:scale-90 cursor-pointer"
        >
            <ChevronLeft size={28} className="transition-transform group-hover:-translate-x-0.5" strokeWidth={2.5} />
        </button>
    )
}
