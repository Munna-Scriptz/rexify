'use client'
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { SlidersHorizontal, X } from 'lucide-react'
import ShopFilterPanel from './ShopFilterPanel'

const DEFAULT_FILTERS = {
    category: 'All',
    brands: [],
    priceRange: { min: 0, max: 5000 },
    rating: 0,
    inStockOnly: false,
};

const ShopFiltersClient = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [filters, setFilters] = useState({ ...DEFAULT_FILTERS });
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    // Parse URL search params into filters
    useEffect(() => {
        const category = searchParams.get('category') || 'All';
        const brands = searchParams.get('brands') ? searchParams.get('brands').split(',') : [];
        const minPrice = parseInt(searchParams.get('minPrice')) || 0;
        const maxPrice = parseInt(searchParams.get('maxPrice')) || 5000;
        const rating = parseInt(searchParams.get('rating')) || 0;
        const inStockOnly = searchParams.get('inStock') === 'true';

        setFilters({
            category,
            brands,
            priceRange: { min: minPrice, max: maxPrice },
            rating,
            inStockOnly,
        });
    }, [searchParams]);

    // Lock body scroll when mobile drawer is open
    useEffect(() => {
        if (mobileFiltersOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [mobileFiltersOpen]);

    // Update URL params when filters change
    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        updateUrlParams(newFilters);
    };

    const updateUrlParams = (newFilters) => {
        const params = new URLSearchParams();

        if (newFilters.category !== 'All') {
            params.set('category', newFilters.category);
        }
        if (newFilters.brands.length > 0) {
            params.set('brands', newFilters.brands.join(','));
        }
        if (newFilters.priceRange.min > 0) {
            params.set('minPrice', newFilters.priceRange.min);
        }
        if (newFilters.priceRange.max < 5000) {
            params.set('maxPrice', newFilters.priceRange.max);
        }
        if (newFilters.rating > 0) {
            params.set('rating', newFilters.rating);
        }
        if (newFilters.inStockOnly) {
            params.set('inStock', 'true');
        }

        const queryString = params.toString();
        router.push(queryString ? `/shop?${queryString}` : '/shop', { scroll: false });
    };

    const handleReset = () => {
        setFilters({ ...DEFAULT_FILTERS });
        router.push('/shop', { scroll: false });
    };

    return (
        <>
            {/* Desktop Sidebar Filter */}
            <div className="hidden lg:block w-64 shrink-0">
                <div className="sticky top-24">
                    <ShopFilterPanel 
                        filters={filters} 
                        setFilters={handleFilterChange} 
                        onReset={handleReset} 
                    />
                </div>
            </div>

            {/* Mobile Filter Toggle */}
            <button
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl border border-border hover:border-accent hover:text-accent transition-all"
            >
                <SlidersHorizontal size={15} /> Filters
            </button>

            {/* Mobile Filters Drawer */}
            <div
                className={`fixed inset-0 bg-black/60 z-100 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${mobileFiltersOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setMobileFiltersOpen(false)}
            />

            {/* Drawer */}
            <div
                className={`fixed bottom-0 left-0 right-0 z-101 bg-surface rounded-t-4xl border-t border-border p-4 pb-4 transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) lg:hidden h-[70vh] flex flex-col shadow-2xl ${mobileFiltersOpen ? 'translate-y-0' : 'translate-y-full'}`}
            >
                {/* Drawer Handle */}
                <div
                    className="w-12 h-1.5 bg-border rounded-full mx-auto mb-6 shrink-0 cursor-pointer hover:bg-accent/40 transition-colors"
                    onClick={() => setMobileFiltersOpen(false)}
                />

                <div className="overflow-y-auto flex-1 pr-1 custom-scrollbar">
                    <ShopFilterPanel
                        filters={filters}
                        setFilters={handleFilterChange}
                        onReset={handleReset}
                        isMobileDrawer={true}
                        onClose={() => setMobileFiltersOpen(false)}
                    />
                </div>

                {/* Apply button */}
                <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="mt-4 w-full py-3 bg-accent text-white font-bold rounded-2xl shadow-lg shadow-accent/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                    Apply Filters
                </button>
            </div>
        </>
    );
};

export default ShopFiltersClient;
