import React, { useState } from 'react';
import { ChevronDown, ChevronUp, X, SlidersHorizontal } from 'lucide-react';

const FilterSection = ({ title, children, defaultOpen = true }) => {
    const [open, setOpen] = useState(defaultOpen);
    return (
        <div className="border-b border-border py-5">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between font-semibold text-text-primary text-sm mb-1"
            >
                {title}
                {open ? <ChevronUp size={16} className="text-text-secondary" /> : <ChevronDown size={16} className="text-text-secondary" />}
            </button>
            {open && <div className="mt-3">{children}</div>}
        </div>
    );
};

const ShopFilterPanel = ({ filters, setFilters, onReset }) => {

    const categories = ['All', 'Smartphones', 'Laptops', 'Tablets', 'Audio', 'Wearables', 'Gaming'];
    const brands = ['Apple', 'Samsung', 'Sony', 'Dell', 'Asus', 'Bose', 'Logitech'];
    const ratings = [4, 3, 2, 1];

    const handleCategoryChange = (cat) => {
        setFilters(f => ({ ...f, category: cat }));
    };

    const handleBrandToggle = (brand) => {
        setFilters(f => {
            const brands = f.brands.includes(brand) ? f.brands.filter(b => b !== brand) : [...f.brands, brand];
            return { ...f, brands };
        });
    };

    const handlePriceChange = (e, key) => {
        setFilters(f => ({ ...f, priceRange: { ...f.priceRange, [key]: Number(e.target.value) } }));
    };

    const handleRatingChange = (rating) => {
        setFilters(f => ({ ...f, rating: f.rating === rating ? 0 : rating }));
    };

    const handleAvailability = (val) => {
        setFilters(f => ({ ...f, inStockOnly: val }));
    };

    return (
        <aside className="w-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-1 pb-4 border-b border-border">
                <div className="flex items-center gap-2 font-bold text-text-primary text-base">
                    <SlidersHorizontal size={18} className="text-accent" />
                    Filters
                </div>
                <button
                    onClick={onReset}
                    className="flex items-center gap-1 text-xs text-text-secondary hover:text-accent transition-colors font-medium"
                >
                    <X size={13} /> Reset All
                </button>
            </div>

            {/* Category */}
            <FilterSection title="Category">
                <div className="flex flex-col gap-2">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => handleCategoryChange(cat)}
                            className={`text-left text-sm px-3 py-2 rounded-lg transition-all font-medium ${filters.category === cat
                                    ? 'bg-accent text-white'
                                    : 'text-text-secondary hover:bg-muted hover:text-text-primary'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </FilterSection>

            {/* Price Range */}
            <FilterSection title="Price Range">
                <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm font-semibold text-text-primary">
                        <span>${filters.priceRange.min}</span>
                        <span>${filters.priceRange.max}</span>
                    </div>
                    <div className="relative h-1.5 bg-muted rounded-full">
                        <div
                            className="absolute h-full bg-accent rounded-full"
                            style={{
                                left: `${(filters.priceRange.min / 5000) * 100}%`,
                                right: `${100 - (filters.priceRange.max / 5000) * 100}%`
                            }}
                        />
                    </div>
                    <div className="relative">
                        <input
                            type="range" min={0} max={5000} step={50}
                            value={filters.priceRange.min}
                            onChange={e => handlePriceChange(e, 'min')}
                            className="absolute w-full h-1.5 opacity-0 cursor-pointer z-10"
                        />
                        <input
                            type="range" min={0} max={5000} step={50}
                            value={filters.priceRange.max}
                            onChange={e => handlePriceChange(e, 'max')}
                            className="absolute w-full h-1.5 opacity-0 cursor-pointer z-20"
                        />
                        <div className="h-1.5 bg-transparent" />
                    </div>
                    <div className="flex gap-2 mt-4">
                        <div className="flex-1">
                            <label className="text-xs text-text-muted mb-1 block">Min</label>
                            <input
                                type="number" min={0} max={filters.priceRange.max} step={50}
                                value={filters.priceRange.min}
                                onChange={e => handlePriceChange(e, 'min')}
                                className="w-full border border-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent bg-bg"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="text-xs text-text-muted mb-1 block">Max</label>
                            <input
                                type="number" min={filters.priceRange.min} max={5000} step={50}
                                value={filters.priceRange.max}
                                onChange={e => handlePriceChange(e, 'max')}
                                className="w-full border border-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent bg-bg"
                            />
                        </div>
                    </div>
                </div>
            </FilterSection>

            {/* Brands */}
            <FilterSection title="Brand" defaultOpen={true}>
                <div className="flex flex-col gap-2">
                    {brands.map(brand => (
                        <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                            <div
                                onClick={() => handleBrandToggle(brand)}
                                className={`w-4.5 h-4.5 rounded flex items-center justify-center border-2 transition-all cursor-pointer shrink-0 ${filters.brands.includes(brand)
                                        ? 'bg-accent border-accent'
                                        : 'border-border group-hover:border-accent/60'
                                    }`}
                            >
                                {filters.brands.includes(brand) && (
                                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                        <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                )}
                            </div>
                            <span
                                onClick={() => handleBrandToggle(brand)}
                                className="text-sm text-text-secondary group-hover:text-text-primary transition-colors"
                            >
                                {brand}
                            </span>
                        </label>
                    ))}
                </div>
            </FilterSection>

            {/* Rating */}
            <FilterSection title="Min. Rating">
                <div className="flex flex-col gap-2">
                    {ratings.map(r => (
                        <button
                            key={r}
                            onClick={() => handleRatingChange(r)}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${filters.rating === r
                                    ? 'bg-accent/10 text-accent font-semibold'
                                    : 'text-text-secondary hover:bg-muted hover:text-text-primary'
                                }`}
                        >
                            <span className="flex">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <span key={i} className={i < r ? 'text-yellow-400' : 'text-border'}>★</span>
                                ))}
                            </span>
                            <span>& Up</span>
                        </button>
                    ))}
                </div>
            </FilterSection>

            {/* Availability */}
            <FilterSection title="Availability" defaultOpen={true}>
                <div className="flex flex-col gap-2">
                    {[{ label: 'All Products', val: false }, { label: 'In Stock Only', val: true }].map(opt => (
                        <button
                            key={opt.label}
                            onClick={() => handleAvailability(opt.val)}
                            className={`text-left text-sm px-3 py-2 rounded-lg transition-all font-medium ${filters.inStockOnly === opt.val
                                    ? 'bg-accent text-white'
                                    : 'text-text-secondary hover:bg-muted hover:text-text-primary'
                                }`}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            </FilterSection>
        </aside>
    );
};

export default ShopFilterPanel;
