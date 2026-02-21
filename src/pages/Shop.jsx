import React, { useState, useMemo } from 'react';
import { FiHeart, FiShoppingBag } from 'react-icons/fi';
import { ChevronDown, ChevronUp, X, SlidersHorizontal, LayoutGrid, List, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';

/* ------------------------------------------------------------------ */
/*  Mock product data                                                    */
/* ------------------------------------------------------------------ */
const ALL_PRODUCTS = [
    { id: 1, name: 'iPhone 16 Pro', brand: 'Apple', category: 'Smartphones', price: 1099, rating: 4.9, reviews: 1824, inStock: true, badge: 'New Arrival', img: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-16-pro-model-unselect-gallery-2-202409?wid=5120&hei=2880&fmt=webp&.v=1725908615' },
    { id: 2, name: 'MacBook Pro 14"', brand: 'Apple', category: 'Laptops', price: 1999, rating: 4.8, reviews: 952, inStock: true, badge: 'Best Seller', img: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/mbp14-m4pro-spaceblack-select-202410?wid=904&hei=840&fmt=webp&.v=1728916322' },
    { id: 3, name: 'Galaxy S25 Ultra', brand: 'Samsung', category: 'Smartphones', price: 1299, rating: 4.7, reviews: 678, inStock: true, badge: 'Trending', img: 'https://images.samsung.com/is/image/samsung/p6pim/uk/2501/gallery/uk-galaxy-s25-ultra-s938-sm-s938bzadeub-542598156?$650_519_PNG$' },
    { id: 4, name: 'Sony WH-1000XM5', brand: 'Sony', category: 'Audio', price: 349, rating: 4.9, reviews: 3201, inStock: true, badge: 'Top Rated', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop' },
    { id: 5, name: 'iPad Pro 13"', brand: 'Apple', category: 'Tablets', price: 1299, rating: 4.8, reviews: 445, inStock: false, badge: 'New Arrival', img: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/ipad-pro-model-unselect-gallery-2-202405?wid=5120&hei=2880&fmt=webp&.v=1714171857' },
    { id: 6, name: 'Apple Watch Ultra 2', brand: 'Apple', category: 'Wearables', price: 799, rating: 4.7, reviews: 889, inStock: true, badge: 'Popular', img: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MQDY3ref_VW_34FR+watch-49-titanium-ultra2_VW_34FR_WF_CO+watch-face-49-alpine-ultra2_VW_34FR_WF_CO?wid=752&hei=780&fmt=webp&.v=1693671993' },
    { id: 7, name: 'Dell XPS 15', brand: 'Dell', category: 'Laptops', price: 1749, rating: 4.6, reviews: 723, inStock: true, badge: 'Editor Pick', img: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?q=80&w=800&auto=format&fit=crop' },
    { id: 8, name: 'ROG Ally X', brand: 'Asus', category: 'Gaming', price: 899, rating: 4.5, reviews: 512, inStock: true, badge: 'Hot', img: 'https://images.unsplash.com/photo-1627856013091-fed6dc4b8d60?q=80&w=800&auto=format&fit=crop' },
    { id: 9, name: 'Bose QuietComfort 45', brand: 'Bose', category: 'Audio', price: 279, rating: 4.6, reviews: 2100, inStock: true, badge: 'Best Seller', img: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=800&auto=format&fit=crop' },
    { id: 10, name: 'Galaxy Tab S9 Ultra', brand: 'Samsung', category: 'Tablets', price: 1099, rating: 4.6, reviews: 388, inStock: true, badge: 'Trending', img: 'https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?q=80&w=800&auto=format&fit=crop' },
    { id: 11, name: 'Pixel 9 Pro', brand: 'Samsung', category: 'Smartphones', price: 999, rating: 4.5, reviews: 541, inStock: false, badge: 'New', img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop' },
    { id: 12, name: 'MacBook Air M3', brand: 'Apple', category: 'Laptops', price: 1299, rating: 4.9, reviews: 1480, inStock: true, badge: 'Best Seller', img: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/mba13-midnight-select-202402?wid=904&hei=840&fmt=webp&.v=1707858343' },
    { id: 13, name: 'Sony PlayStation 5', brand: 'Sony', category: 'Gaming', price: 499, rating: 4.8, reviews: 4321, inStock: true, badge: 'Hot', img: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=800&auto=format&fit=crop' },
    { id: 14, name: 'Logitech MX Master 3', brand: 'Logitech', category: 'Gaming', price: 99, rating: 4.7, reviews: 3890, inStock: true, badge: 'Top Rated', img: 'https://images.unsplash.com/photo-1527814050087-3793815479db?q=80&w=800&auto=format&fit=crop' },
    { id: 15, name: 'AirPods Pro (2nd Gen)', brand: 'Apple', category: 'Audio', price: 249, rating: 4.8, reviews: 5621, inStock: true, badge: 'Best Seller', img: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MQD83?wid=1144&hei=1144&fmt=webp&.v=1660803972' },
    { id: 16, name: 'Galaxy Watch 6', brand: 'Samsung', category: 'Wearables', price: 299, rating: 4.4, reviews: 712, inStock: true, badge: 'Sale', img: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=800&auto=format&fit=crop' },
];

const PRODUCTS_PER_PAGE = 9;

const DEFAULT_FILTERS = {
    category: 'All',
    brands: [],
    priceRange: { min: 0, max: 5000 },
    rating: 0,
    inStockOnly: false,
};

/* ------------------------------------------------------------------ */
/*  Sub-components                                                       */
/* ------------------------------------------------------------------ */
const FilterSection = ({ title, children, defaultOpen = true }) => {
    const [open, setOpen] = useState(defaultOpen);
    return (
        <div className="border-b border-border py-5">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between font-semibold text-text-primary text-sm"
            >
                {title}
                {open ? <ChevronUp size={16} className="text-text-secondary" /> : <ChevronDown size={16} className="text-text-secondary" />}
            </button>
            {open && <div className="mt-3">{children}</div>}
        </div>
    );
};

const RatingStars = ({ count, filled }) => (
    <span className="flex">
        {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={13} className={i < count ? 'text-yellow-400 fill-yellow-400' : 'text-border fill-border'} />
        ))}
    </span>
);

/* ------------------------------------------------------------------ */
/*  Filter Panel                                                         */
/* ------------------------------------------------------------------ */
const ShopFilterPanel = ({ filters, setFilters, onReset }) => {
    const categories = ['All', 'Smartphones', 'Laptops', 'Tablets', 'Audio', 'Wearables', 'Gaming'];
    const brands = ['Apple', 'Samsung', 'Sony', 'Dell', 'Asus', 'Bose', 'Logitech'];
    const ratings = [4, 3, 2, 1];

    const handleBrandToggle = (brand) => {
        setFilters(f => {
            const list = f.brands.includes(brand) ? f.brands.filter(b => b !== brand) : [...f.brands, brand];
            return { ...f, brands: list };
        });
    };

    const handlePriceInput = (e, key) => {
        const val = Number(e.target.value);
        setFilters(f => ({ ...f, priceRange: { ...f.priceRange, [key]: val } }));
    };

    const pct = (v) => (v / 5000) * 100;

    return (
        <aside className="w-full">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-border mb-1">
                <div className="flex items-center gap-2 font-bold text-text-primary text-sm">
                    <SlidersHorizontal size={16} className="text-accent" />
                    Filters
                </div>
                <button onClick={onReset} className="flex items-center gap-1 text-xs text-text-secondary hover:text-accent transition-colors font-medium">
                    <X size={13} /> Reset All
                </button>
            </div>

            {/* Category */}
            <FilterSection title="Category">
                <div className="flex flex-col gap-1">
                    {categories.map(cat => (
                        <button key={cat} onClick={() => setFilters(f => ({ ...f, category: cat }))}
                            className={`text-left text-sm px-3 py-2 rounded-lg transition-all font-medium ${filters.category === cat ? 'bg-accent text-white' : 'text-text-secondary hover:bg-muted hover:text-text-primary'}`}>
                            {cat}
                        </button>
                    ))}
                </div>
            </FilterSection>

            {/* Price Range */}
            <FilterSection title="Price Range">
                <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm font-semibold text-text-primary">
                        <span>${filters.priceRange.min.toLocaleString()}</span>
                        <span>${filters.priceRange.max.toLocaleString()}</span>
                    </div>
                    {/* Track */}
                    <div className="relative h-1.5 bg-muted rounded-full mx-1">
                        <div className="absolute h-full bg-accent rounded-full transition-all"
                            style={{ left: `${pct(filters.priceRange.min)}%`, right: `${100 - pct(filters.priceRange.max)}%` }} />
                        {/* Thumb min */}
                        <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 w-4 h-4 bg-white border-2 border-accent rounded-full shadow cursor-pointer transition-all"
                            style={{ left: `${pct(filters.priceRange.min)}%` }} />
                        {/* Thumb max */}
                        <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 w-4 h-4 bg-white border-2 border-accent rounded-full shadow cursor-pointer transition-all"
                            style={{ left: `${pct(filters.priceRange.max)}%` }} />
                    </div>
                    <div className="flex gap-2 mt-2">
                        <div className="flex-1">
                            <label className="text-xs text-text-muted mb-1 block">Min ($)</label>
                            <input type="number" min={0} max={filters.priceRange.max - 50} step={50} value={filters.priceRange.min}
                                onChange={e => handlePriceInput(e, 'min')}
                                className="w-full border border-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent bg-bg transition-colors" />
                        </div>
                        <div className="flex-1">
                            <label className="text-xs text-text-muted mb-1 block">Max ($)</label>
                            <input type="number" min={filters.priceRange.min + 50} max={5000} step={50} value={filters.priceRange.max}
                                onChange={e => handlePriceInput(e, 'max')}
                                className="w-full border border-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent bg-bg transition-colors" />
                        </div>
                    </div>
                </div>
            </FilterSection>

            {/* Brand */}
            <FilterSection title="Brand">
                <div className="flex flex-col gap-2.5">
                    {brands.map(brand => (
                        <label key={brand} className="flex items-center gap-3 cursor-pointer group" onClick={() => handleBrandToggle(brand)}>
                            <div className={`w-4.5 h-4.5 rounded-md flex items-center justify-center border-2 transition-all shrink-0 ${filters.brands.includes(brand) ? 'bg-accent border-accent' : 'border-border group-hover:border-accent/60'}`}>
                                {filters.brands.includes(brand) && (
                                    <svg width="10" height="8" fill="none" viewBox="0 0 10 8"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                )}
                            </div>
                            <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors select-none">{brand}</span>
                        </label>
                    ))}
                </div>
            </FilterSection>

            {/* Rating */}
            <FilterSection title="Min. Rating">
                <div className="flex flex-col gap-1">
                    {ratings.map(r => (
                        <button key={r} onClick={() => setFilters(f => ({ ...f, rating: f.rating === r ? 0 : r }))}
                            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-all ${filters.rating === r ? 'bg-accent/10 text-accent font-semibold' : 'text-text-secondary hover:bg-muted hover:text-text-primary'}`}>
                            <RatingStars count={r} />
                            <span className="text-xs">& Up</span>
                        </button>
                    ))}
                </div>
            </FilterSection>

            {/* Availability */}
            <FilterSection title="Availability">
                <div className="flex flex-col gap-1">
                    {[{ label: 'All Products', val: false }, { label: 'In Stock Only', val: true }].map(opt => (
                        <button key={opt.label} onClick={() => setFilters(f => ({ ...f, inStockOnly: opt.val }))}
                            className={`text-left text-sm px-3 py-2 rounded-lg transition-all font-medium ${filters.inStockOnly === opt.val ? 'bg-accent text-white' : 'text-text-secondary hover:bg-muted hover:text-text-primary'}`}>
                            {opt.label}
                        </button>
                    ))}
                </div>
            </FilterSection>
        </aside>
    );
};

/* ------------------------------------------------------------------ */
/*  Product Card                                                         */
/* ------------------------------------------------------------------ */
const ProductCard = ({ product }) => (
    <div className="rounded-2xl border border-border overflow-hidden group relative bg-bg hover:shadow-xl transition-all duration-300">
        <div className="relative h-60 flex items-center justify-center bg-surface overflow-hidden">
            <img src={product.img} alt={product.name} className="h-44 object-contain transition-transform duration-500 group-hover:scale-107" />
            <span className="absolute top-3 left-3 text-[11px] tracking-wide uppercase px-3 py-1 rounded-full border border-neutral-200 text-text-secondary bg-white">
                {product.badge}
            </span>
            {!product.inStock && (
                <div className="absolute inset-0 bg-bg/60 backdrop-blur-[2px] flex items-center justify-center">
                    <span className="bg-white text-text-secondary font-semibold text-xs px-4 py-1.5 rounded-full border border-border">Out of Stock</span>
                </div>
            )}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <button className="h-9 w-9 rounded-full border border-neutral-200 bg-white flex items-center justify-center text-text-primary hover:border-accent hover:text-accent transition-all" aria-label="Add to cart">
                    <FiShoppingBag size={16} />
                </button>
                <button className="h-9 w-9 rounded-full border border-neutral-200 bg-white flex items-center justify-center text-text-primary hover:border-accent hover:text-accent transition-all" aria-label="Wishlist">
                    <FiHeart size={16} />
                </button>
            </div>
        </div>
        <div className="px-4 py-4">
            <p className="text-xs text-text-muted font-medium mb-1 uppercase tracking-wide">{product.brand}</p>
            <h3 className="text-[15px] font-semibold text-text-primary leading-snug line-clamp-1">{product.name}</h3>
            <div className="mt-3 flex items-center justify-between">
                <span className="text-[17px] font-bold text-text-primary">${product.price.toLocaleString()}</span>
                <div className="flex items-center gap-1 text-xs text-text-secondary">
                    <Star size={12} className="text-yellow-400 fill-yellow-400" />
                    <span className="font-medium text-text-primary">{product.rating}</span>
                    <span>({product.reviews.toLocaleString()})</span>
                </div>
            </div>
        </div>
        <div className="h-0.5 w-full bg-linear-to-r from-transparent via-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
);

/* ------------------------------------------------------------------ */
/*  Pagination                                                           */
/* ------------------------------------------------------------------ */
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) pages.push(i);
    const visiblePages = pages.filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1);

    return (
        <div className="flex items-center justify-center gap-2 mt-10">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-border text-text-secondary hover:border-accent hover:text-accent transition-all disabled:opacity-30 disabled:pointer-events-none"
            >
                <ChevronLeft size={16} />
            </button>

            {visiblePages.map((page, idx) => {
                const prev = visiblePages[idx - 1];
                const showEllipsis = prev && page - prev > 1;
                return (
                    <React.Fragment key={page}>
                        {showEllipsis && <span className="px-1 text-text-muted text-sm">…</span>}
                        <button
                            onClick={() => onPageChange(page)}
                            className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${currentPage === page ? 'bg-accent text-white shadow-md shadow-accent/25' : 'border border-border text-text-secondary hover:border-accent hover:text-accent'}`}
                        >
                            {page}
                        </button>
                    </React.Fragment>
                );
            })}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-border text-text-secondary hover:border-accent hover:text-accent transition-all disabled:opacity-30 disabled:pointer-events-none"
            >
                <ChevronRight size={16} />
            </button>
        </div>
    );
};

/* ------------------------------------------------------------------ */
/*  Main Shop Page                                                       */
/* ------------------------------------------------------------------ */
const Shop = () => {
    const [filters, setFilters] = useState({ ...DEFAULT_FILTERS });
    const [sortBy, setSortBy] = useState('featured');
    const [currentPage, setCurrentPage] = useState(1);
    const [viewMode, setViewMode] = useState('grid');
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    const filteredProducts = useMemo(() => {
        let products = [...ALL_PRODUCTS];

        if (filters.category !== 'All') {
            products = products.filter(p => p.category === filters.category);
        }
        if (filters.brands.length > 0) {
            products = products.filter(p => filters.brands.includes(p.brand));
        }
        products = products.filter(p => p.price >= filters.priceRange.min && p.price <= filters.priceRange.max);
        if (filters.rating > 0) {
            products = products.filter(p => p.rating >= filters.rating);
        }
        if (filters.inStockOnly) {
            products = products.filter(p => p.inStock);
        }

        // Sort
        switch (sortBy) {
            case 'price-asc': products.sort((a, b) => a.price - b.price); break;
            case 'price-desc': products.sort((a, b) => b.price - a.price); break;
            case 'rating': products.sort((a, b) => b.rating - a.rating); break;
            case 'reviews': products.sort((a, b) => b.reviews - a.reviews); break;
            default: break; // featured order
        }

        return products;
    }, [filters, sortBy]);

    const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE));
    const safePage = Math.min(currentPage, totalPages);
    const paginatedProducts = filteredProducts.slice((safePage - 1) * PRODUCTS_PER_PAGE, safePage * PRODUCTS_PER_PAGE);

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        setCurrentPage(1);
    };

    const handleReset = () => {
        setFilters({ ...DEFAULT_FILTERS });
        setSortBy('featured');
        setCurrentPage(1);
    };

    // Active filter chips
    const activeFilters = [];
    if (filters.category !== 'All') activeFilters.push({ label: filters.category, key: 'category' });
    filters.brands.forEach(b => activeFilters.push({ label: b, key: 'brand', value: b }));
    if (filters.rating > 0) activeFilters.push({ label: `${filters.rating}★ & Up`, key: 'rating' });
    if (filters.inStockOnly) activeFilters.push({ label: 'In Stock', key: 'inStockOnly' });
    if (filters.priceRange.min > 0 || filters.priceRange.max < 5000) {
        activeFilters.push({ label: `$${filters.priceRange.min} – $${filters.priceRange.max}`, key: 'price' });
    }

    const removeFilter = (f) => {
        if (f.key === 'category') setFilters(prev => ({ ...prev, category: 'All' }));
        else if (f.key === 'brand') setFilters(prev => ({ ...prev, brands: prev.brands.filter(b => b !== f.value) }));
        else if (f.key === 'rating') setFilters(prev => ({ ...prev, rating: 0 }));
        else if (f.key === 'inStockOnly') setFilters(prev => ({ ...prev, inStockOnly: false }));
        else if (f.key === 'price') setFilters(prev => ({ ...prev, priceRange: { min: 0, max: 5000 } }));
        setCurrentPage(1);
    };

    return (
        <>
            <section className="py-10">
                <div className="container">
                    <div className="flex gap-8">

                        {/* ── Sidebar Filter ── */}
                        <div className="hidden lg:block w-64 shrink-0">
                            <div className="sticky top-4">
                                <ShopFilterPanel filters={filters} setFilters={handleFilterChange} onReset={handleReset} />
                            </div>
                        </div>

                        {/* ── Main Content ── */}
                        <div className="flex-1 min-w-0">

                            {/* Toolbar */}
                            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-border">
                                {/* Left: count + mobile filter toggle */}
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                                        className="lg:hidden flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl border border-border hover:border-accent hover:text-accent transition-all"
                                    >
                                        <SlidersHorizontal size={15} /> Filters
                                    </button>
                                    <p className="text-sm text-text-secondary">
                                        <span className="font-bold text-text-primary">{filteredProducts.length}</span> products found
                                    </p>
                                </div>

                                {/* Right: sort + view toggles */}
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
                                        <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-accent text-white' : 'text-text-secondary hover:text-text-primary'}`}>
                                            <LayoutGrid size={15} />
                                        </button>
                                        <button onClick={() => setViewMode('list')} className={`p-1.5 rounded-lg transition-all ${viewMode === 'list' ? 'bg-accent text-white' : 'text-text-secondary hover:text-text-primary'}`}>
                                            <List size={15} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Mobile Filters Drawer */}
                            {mobileFiltersOpen && (
                                <div className="lg:hidden mb-6 p-4 bg-surface rounded-2xl border border-border">
                                    <ShopFilterPanel filters={filters} setFilters={handleFilterChange} onReset={handleReset} />
                                </div>
                            )}

                            {/* Active filter chips */}
                            {activeFilters.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {activeFilters.map((f, i) => (
                                        <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent/10 text-accent rounded-full text-xs font-medium">
                                            {f.label}
                                            <button onClick={() => removeFilter(f)} className="hover:text-blue-700 transition-colors">
                                                <X size={12} />
                                            </button>
                                        </span>
                                    ))}
                                    <button onClick={handleReset} className="text-xs text-text-secondary hover:text-error transition-colors px-2">
                                        Clear all
                                    </button>
                                </div>
                            )}

                            {/* Product Grid / List */}
                            {paginatedProducts.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-32 text-center">
                                    <div className="text-6xl mb-4">🔍</div>
                                    <h3 className="text-xl font-bold text-text-primary mb-2">No products found</h3>
                                    <p className="text-text-secondary text-sm mb-6">Try adjusting or clearing your filters.</p>
                                    <button onClick={handleReset} className="px-6 py-2.5 bg-accent text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all">
                                        Reset Filters
                                    </button>
                                </div>
                            ) : viewMode === 'grid' ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                                    {paginatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
                                </div>
                            ) : (
                                /* List view */
                                <div className="flex flex-col gap-4">
                                    {paginatedProducts.map(p => (
                                        <div key={p.id} className="flex gap-5 rounded-2xl border border-border overflow-hidden group bg-bg hover:shadow-lg transition-all duration-300 p-4">
                                            <div className="w-36 h-32 shrink-0 bg-surface rounded-xl flex items-center justify-center overflow-hidden">
                                                <img src={p.img} alt={p.name} className="h-24 object-contain group-hover:scale-105 transition-transform duration-300" />
                                            </div>
                                            <div className="flex-1 flex flex-col justify-between py-1">
                                                <div>
                                                    <p className="text-xs text-text-muted uppercase tracking-wider mb-1">{p.brand} · {p.category}</p>
                                                    <h3 className="font-semibold text-text-primary">{p.name}</h3>
                                                    <div className="flex items-center gap-1.5 mt-1.5">
                                                        <Star size={13} className="text-yellow-400 fill-yellow-400" />
                                                        <span className="text-xs font-semibold text-text-primary">{p.rating}</span>
                                                        <span className="text-xs text-text-muted">({p.reviews.toLocaleString()} reviews)</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3 mt-3">
                                                    {!p.inStock && <span className="text-xs text-error font-medium">Out of Stock</span>}
                                                    {p.inStock && <span className="text-xs text-success font-medium">In Stock</span>}
                                                    <span className="text-[11px] px-2.5 py-1 rounded-full border border-border text-text-muted">{p.badge}</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end justify-between shrink-0">
                                                <span className="text-xl font-bold text-text-primary">${p.price.toLocaleString()}</span>
                                                <div className="flex gap-2">
                                                    <button className="h-9 w-9 rounded-xl border border-border flex items-center justify-center text-text-secondary hover:border-accent hover:text-accent transition-all" aria-label="Wishlist">
                                                        <FiHeart size={16} />
                                                    </button>
                                                    <button className="h-9 px-4 rounded-xl bg-accent text-white text-sm font-semibold hover:bg-blue-700 transition-all disabled:opacity-40" disabled={!p.inStock}>
                                                        Add to Cart
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Pagination */}
                            {filteredProducts.length > PRODUCTS_PER_PAGE && (
                                <Pagination currentPage={safePage} totalPages={totalPages} onPageChange={setCurrentPage} />
                            )}

                            {/* Showing range */}
                            {filteredProducts.length > 0 && (
                                <p className="text-center text-xs text-text-muted mt-4">
                                    Showing {(safePage - 1) * PRODUCTS_PER_PAGE + 1}–{Math.min(safePage * PRODUCTS_PER_PAGE, filteredProducts.length)} of {filteredProducts.length} products
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Shop;