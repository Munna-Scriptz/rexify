import React from 'react'
import { FiBox } from 'react-icons/fi'

const EmptyProduct = ({resetFilters}) => {
    return (
        <div className="flex flex-col items-center justify-center py-24 bg-surface/20 rounded-3xl border border-dashed border-border/50 animate-in zoom-in duration-500 mt-12">
            <div className="bg-white p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-border mb-6">
                <FiBox className="text-7xl text-accent/20" />
            </div>
            <h3 className="text-coil text-2xl font-bold font-space">No Products Found</h3>
            <p className="text-text-secondary mt-3 max-w-sm text-center text-sm leading-relaxed">
                We couldn't find any products matching your current search or filters. Try adjusting your criteria or reset all filters.
            </p>
            <button
                onClick={resetFilters}
                className="mt-10 bg-accent text-accent-soft px-8 py-3 rounded-2xl font-bold text-sm transition-all hover:opacity-90 cursor-pointer shadow-xl shadow-accent/10 active:scale-95"
            >
                Clear All Filters
            </button>
        </div>
    )
}

export default EmptyProduct