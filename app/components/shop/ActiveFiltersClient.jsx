'use client'

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { X } from 'lucide-react'

const ActiveFiltersClient = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Build active filters from search params
    const activeFilters = [];
    
    const category = searchParams?.get('category');
    if (category && category !== 'All') {
        activeFilters.push({ label: category, key: 'category' });
    }

    const brands = searchParams?.get('brands');
    if (brands) {
        brands.split(',').forEach(b => {
            activeFilters.push({ label: b, key: 'brand', value: b });
        });
    }

    const rating = searchParams?.get('rating');
    if (rating && parseInt(rating) > 0) {
        activeFilters.push({ label: `${rating}★ & Up`, key: 'rating' });
    }

    const minPrice = parseInt(searchParams?.get('minPrice')) || 0;
    const maxPrice = parseInt(searchParams?.get('maxPrice')) || 5000;
    if (minPrice > 0 || maxPrice < 5000) {
        activeFilters.push({ label: `$${minPrice} – $${maxPrice}`, key: 'price' });
    }

    const inStock = searchParams?.get('inStock') === 'true';
    if (inStock) {
        activeFilters.push({ label: 'In Stock', key: 'inStockOnly' });
    }

    const removeFilter = (f) => {
        const params = new URLSearchParams(searchParams);

        if (f.key === 'category') {
            params.delete('category');
        } else if (f.key === 'brand') {
            const brands = params.get('brands')?.split(',') || [];
            const newBrands = brands.filter(b => b !== f.value);
            if (newBrands.length > 0) {
                params.set('brands', newBrands.join(','));
            } else {
                params.delete('brands');
            }
        } else if (f.key === 'rating') {
            params.delete('rating');
        } else if (f.key === 'inStockOnly') {
            params.delete('inStock');
        } else if (f.key === 'price') {
            params.delete('minPrice');
            params.delete('maxPrice');
        }

        params.delete('page'); // Reset to page 1
        router.push(`?${params.toString()}`, { scroll: false });
    };

    const handleReset = () => {
        router.push('/shop', { scroll: false });
    };

    if (activeFilters.length === 0) return null;

    return (
        <div className="flex flex-wrap gap-2 mb-6">
            {activeFilters.map((f, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent/10 text-accent rounded-full text-xs font-medium">
                    {f.label}
                    <button 
                        onClick={() => removeFilter(f)} 
                        className="hover:text-accent/70 transition-colors"
                    >
                        <X size={12} />
                    </button>
                </span>
            ))}
            <button 
                onClick={handleReset} 
                className="text-xs text-text-secondary hover:text-error transition-colors px-2"
            >
                Clear all
            </button>
        </div>
    );
};

export default ActiveFiltersClient;
