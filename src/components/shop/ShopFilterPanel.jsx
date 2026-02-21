import React from 'react';
import { X, SlidersHorizontal } from 'lucide-react';
import FilterSection from './FilterSection';
import RatingStars from './RatingStars';
import RangeSlider from './RangeSlider';

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

    const MIN_PRICE = 0;
    const MAX_PRICE = 5000;

    const handlePriceChange = (e, key) => {
        const value = Number(e.target.value);
        setFilters(f => {
            if (key === 'min') {
                return { ...f, priceRange: { ...f.priceRange, min: Math.min(value, f.priceRange.max - 50) } };
            } else {
                return { ...f, priceRange: { ...f.priceRange, max: Math.max(value, f.priceRange.min + 50) } };
            }
        });
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
                            className={`text-left text-sm px-3 py-2 rounded-lg transition-all cursor-pointer font-medium ${filters.category === cat
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
                <RangeSlider filters={(filters)} MIN_PRICE={MIN_PRICE} MAX_PRICE={MAX_PRICE} handlePriceChange={handlePriceChange}/>
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
                            <RatingStars count={r} />
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
