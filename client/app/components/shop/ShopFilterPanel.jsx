'use client'

import { X, SlidersHorizontal, LayoutGrid, DollarSign, Tag, Star } from 'lucide-react';
import FilterSection from './FilterSection';
import RangeSlider from './RangeSlider';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const ShopFilterPanel = ({ isMobileDrawer, categories }) => {

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const brands = ['Apple', 'Samsung', 'Xiaomi', 'Vivo', 'Oppo', 'Realme', 'Google', 'Motorola', 'OnePlus', 'Techno'];

    // ========== Handle Query =========
    const selectedCategory = searchParams.get('category');
    const selectedBrand = searchParams.get('brand');
    const selectedRating = searchParams.get('rating');

    const handleQuery = (name, value) => {
        const params = new URLSearchParams(searchParams.toString());

        // 2. Set multiple parameters
        params.set(name, value);

        // 3. Push the new URL
        router.push(`${pathname}?${params.toString()}`);
    };

    // ========== Remove query =========
    const clearQuery = (name) => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete(name);
        const queryString = params.toString();
        const updatedUrl = queryString ? `${pathname}?${queryString}` : pathname;
        router.replace(updatedUrl);
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
                            onClick={() => clearQuery("filter")}
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
                    {categories?.map((item, i) => (
                        <button
                            key={i}
                            onClick={() => handleQuery("category", item?.slug)}
                            className={`text-left text-sm px-3 capitalize py-2 rounded-lg transition-all cursor-pointer font-medium ${selectedCategory === item.slug
                                ? 'bg-accent text-white'
                                : 'text-text-secondary hover:bg-muted hover:text-text-primary'
                                }`}
                        >
                            {item.name}
                        </button>
                    ))}
                </div>
            </FilterSection>

            {/* Price Range */}
            <FilterSection title="Price Range" icon={DollarSign}>
                <RangeSlider />
            </FilterSection>

            {/* Brands */}
            <FilterSection title="Brand" icon={Tag} defaultOpen={true}>
                <div className="flex flex-col gap-2">
                    {brands.map(brand => (
                        <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                            <div
                                onClick={() => handleQuery("brand", brand)}
                                className={`w-4.5 h-4.5 rounded flex items-center justify-center border-2 transition-all cursor-pointer shrink-0 ${selectedBrand === brand
                                    ? 'bg-accent border-accent'
                                    : 'border-border group-hover:border-accent/60'
                                    }`}
                            >
                                {selectedBrand === brand && (
                                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                        <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                )}
                            </div>
                            <span
                                onClick={() => handleQuery("brand", brand)}
                                className="text-sm text-text-secondary group-hover:text-text-primary transition-colors"
                            >
                                {brand}
                            </span>
                        </label>
                    ))}
                </div>
            </FilterSection>

            {/* Rating */}
            <FilterSection title="Min. Rating" icon={Star}>
                <div className="flex flex-col gap-2">
                    {[5, 4, 3, 2, 1].map((item) => (
                        <button
                            key={item}
                            onClick={() => handleQuery("rating", item)}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${selectedRating == item
                                ? 'bg-accent/10 text-accent font-semibold'
                                : 'text-text-secondary hover:bg-muted hover:text-text-primary'
                                }`}
                        >
                            <span className="flex">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star key={i} size={13} className={i < item ? 'text-yellow-400 fill-yellow-400' : 'text-border fill-border'} />
                                ))}
                            </span>
                            <span>& Up</span>
                        </button>
                    ))}
                </div>
            </FilterSection>
        </aside>
    );
};

export default ShopFilterPanel;
