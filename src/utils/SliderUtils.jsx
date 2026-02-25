import React from 'react'

export const RightArrow = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="absolute right-0 md:right-5 top-1/2 -translate-y-1/2 z-10
                 h-10 w-10 md:h-12 md:w-12 text-xl rounded-full bg-[#5087ff]/80 hover:bg-accent active:bg-sky-400 text-surface cursor-pointer shadow-lg
                 flex items-center justify-center
                 hover:scale-105 transition"
        >
            ❯
        </button>
    )
}

export const LeftArrow = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="absolute left-0 md:left-5 top-1/2 -translate-y-1/2 z-10
                 h-10 w-10 md:h-12 md:w-12 text-xl rounded-full bg-[#5087ff]/80 hover:bg-accent active:bg-sky-400 text-surface cursor-pointer shadow-lg
                 flex items-center justify-center
                 hover:scale-105 transition"
        >
            ❮
        </button>
    )
}
