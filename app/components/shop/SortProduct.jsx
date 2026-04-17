import { ChevronDown, LayoutGrid, List } from 'lucide-react';
import React from 'react'

const SortProduct = ({ sortBy, setSortBy, setCurrentPage, setViewMode, viewMode }) => {
    return (
        <div className="flex items-center gap-3">
            <div className="relative">
                <select
                    value={sortBy}
                    onChange={e => { setSortBy(e.target.value); setCurrentPage(1); }}
                    className="appearance-none pl-3 pr-8 py-2 rounded-xl border border-border text-sm text-text-primary bg-bg focus:outline-none focus:border-accent cursor-pointer font-medium transition-colors"
                >
                    <option value="featured">Featured</option>
                    <option value="price-asc">Price: Low → High</option>
                    <option value="price-desc">Price: High → Low</option>
                    <option value="rating">Top Rated</option>
                    <option value="reviews">Most Reviewed</option>
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
            </div>
            {/* View toggles */}
            <div className="flex items-center gap-1 border border-border rounded-xl p-1">
                <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-lg cursor-pointer transition-all ${viewMode === 'grid' ? 'bg-accent text-white' : 'text-text-secondary hover:text-text-primary'}`}>
                    <LayoutGrid size={15} />
                </button>
                <button onClick={() => setViewMode('list')} className={`p-1.5 rounded-lg cursor-pointer transition-all ${viewMode === 'list' ? 'bg-accent text-white' : 'text-text-secondary hover:text-text-primary'}`}>
                    <List size={15} />
                </button>
            </div>
        </div>
    )
}

export default SortProduct