"use client"

import React, { useRef, useEffect } from 'react';
import {
    X,
    SlidersHorizontal,
    LayoutGrid,
    DollarSign,
    Tag,
    Star,
    PackageCheck
} from 'lucide-react';
import FilterSection from './FilterSection';
import RatingStars from './RatingStars';
import RangeSlider from './RangeSlider';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const ShopFilterPanel = ({ filters, setFilters, onReset, isMobileDrawer, onClose }) => {

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const categories = ['Smartphones', 'Laptops', 'Tablets', 'Audio', 'Wearables', 'Gaming'];
    const brands = ['Apple', 'Samsung', 'Sony', 'Dell', 'Asus', 'Bose', 'Logitech'];
    const ratings = [4, 3, 2, 1];

    // ========== Handle category =========
    const selectedCategory = searchParams.get('category');

    const handleQuery = (name, value) => {
        const params = new URLSearchParams(searchParams.toString());

        // 2. Set multiple parameters
        params.set(name, value);

        // 3. Push the new URL
        router.push(`${pathname}?${params.toString()}`);
    };

    // ========== Remove query =========
    const clearQuery = (name) => {
        // 1. Create a mutable version of the current params
        const params = new URLSearchParams(searchParams.toString());

        // 2. Delete the specific parameter
        params.delete(name);

        // 3. Construct the new URL and update the router
        const queryString = params.toString();
        const updatedUrl = queryString ? `${pathname}?${queryString}` : pathname;

        router.replace(updatedUrl);
    };


    const handleBrandToggle = (brand) => {
        setFilters(f => {
            const brands = f.brands.includes(brand) ? f.brands.filter(b => b !== brand) : [...f.brands, brand];
            return { ...f, brands };
        });
    };

    const handleRatingChange = (rating) => {
        setFilters(f => ({ ...f, rating: f.rating === rating ? 0 : rating }));
    };

    const handleAvailability = (val) => {
        setFilters(f => ({ ...f, inStockOnly: val }));
    };

    return (
        <aside className={`w-full ${!isMobileDrawer ? 'border-r border-border pr-6' : ''}`}>
            {/* Header */}
            <div className="flex items-center justify-between mb-1 pb-4 border-b border-border">
                <div className="flex items-center gap-2.5 font-bold text-text-primary text-base">
                    <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-accent/10">
                        <SlidersHorizontal size={15} className="text-accent" />
                    </span>
                    Filters
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => router.push(`/shop`)}
                        className="flex items-center gap-1 text-xs text-text-secondary hover:text-red-500 cursor-pointer transition-colors font-medium px-2 py-1 rounded-md hover:bg-red-50"
                    >
                        Reset
                    </button>
                    {isMobileDrawer && (
                        <button
                            onClick={onClose}
                            className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-text-primary hover:bg-accent hover:text-white transition-all"
                        >
                            <X size={16} />
                        </button>
                    )}
                </div>
            </div>

            {/* Category */}
            <FilterSection title="Category" icon={LayoutGrid}>
                <div className="flex flex-col gap-2">
                    <button
                        onClick={() => clearQuery("category")}
                        className={`text-left text-sm px-3 py-2 rounded-lg transition-all cursor-pointer font-medium ${!selectedCategory
                            ? 'bg-accent text-white'
                            : 'text-text-secondary hover:bg-muted hover:text-text-primary'
                            }`}
                    >
                        All
                    </button>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => handleQuery("category", cat)}
                            className={`text-left text-sm px-3 py-2 rounded-lg transition-all cursor-pointer font-medium ${selectedCategory === cat
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
            <FilterSection title="Price Range" icon={DollarSign}>
                <RangeSlider />
            </FilterSection>

            {/* Brands */}
            {/* <FilterSection title="Brand" icon={Tag} defaultOpen={true}>
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
            </FilterSection> */}

            {/* Rating */}
            {/* <FilterSection title="Min. Rating" icon={Star}>
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
            </FilterSection> */}

            {/* Availability */}
            {/* <FilterSection title="Availability" icon={PackageCheck} defaultOpen={true}>
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
            </FilterSection> */}
        </aside>
    );
};

export default ShopFilterPanel;
