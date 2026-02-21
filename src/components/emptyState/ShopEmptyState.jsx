import React from 'react'

const ShopEmptyState = ({ handleReset }) => {
    return (
        <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-text-primary mb-2">No products found</h3>
            <p className="text-text-secondary text-sm mb-6">Try adjusting or clearing your filters.</p>
            <button onClick={handleReset} className="px-6 py-2.5 bg-accent text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all">
                Reset Filters
            </button>
        </div>
    )
}

export default ShopEmptyState