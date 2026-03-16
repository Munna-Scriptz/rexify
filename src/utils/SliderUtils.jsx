import React from 'react'
import { ChevronRight, ChevronLeft } from 'lucide-react'

export const RightArrow = ({ onClick, disabled, className }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20
                 h-8 w-8 md:h-10 md:w-10 rounded-full 
                 bg-white/90 backdrop-blur-md border border-gray-200
                 text-text-primary flex items-center justify-center
                 transition-all duration-300 ease-out group
                 active:scale-90
                 ${disabled ? 'opacity-0 pointer-events-none' : 'opacity-100 shadow-lg hover:shadow-xl hover:bg-accent hover:text-white hover:border-accent cursor-pointer'} 
                 ${className || ''}`}
        >
            <ChevronRight size={20} className="transition-transform group-hover:translate-x-0.5" strokeWidth={2.5} />
        </button>
    )
}

export const LeftArrow = ({ onClick, disabled, className }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20
                 h-8 w-8 md:h-10 md:w-10 rounded-full 
                 bg-white/90 backdrop-blur-md border border-gray-200
                 text-text-primary flex items-center justify-center
                 transition-all duration-300 ease-out group
                 active:scale-90 
                 ${disabled ? 'opacity-0 pointer-events-none' : 'opacity-100 shadow-lg hover:shadow-xl hover:bg-accent hover:text-white hover:border-accent cursor-pointer'}
                 ${className || ''}`}
        >
            <ChevronLeft size={20} className="transition-transform group-hover:-translate-x-0.5" strokeWidth={2.5} />
        </button>
    )
}
