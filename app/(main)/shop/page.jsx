"use client"
import React, { useState, useMemo, useEffect } from 'react';
import { X, SlidersHorizontal } from 'lucide-react';
import ShopFilterPanel from '../../components/shop/ShopFilterPanel';
import Pagination from '../../components/shop/Pagination';
import ShopCard from '../../components/shop/ShopCard';
import ProductListView from '../../components/shop/ShopListCard';
import ShopEmptyState from '../../components/emptyState/ShopEmptyState';
import SortProduct from '../../components/shop/SortProduct';

//  --------------  Mock product data 
const ALL_PRODUCTS = [
    { id: 1, name: 'iPhone 16 Pro', brand: 'Apple', category: 'Smartphones', price: 1099, rating: 4.9, reviews: 1824, inStock: true, badge: 'New Arrival', img: 'https://www.applegadgetsbd.com/_next/image?url=https%3A%2F%2Fadminapi.applegadgetsbd.com%2Fstorage%2Fmedia%2Flarge%2FiPhone-16-Pro-Max---16-Pro-Black-Titanium-2734.jpg&w=1920&q=100' },
    { id: 2, name: 'MacBook Pro 14"', brand: 'Apple', category: 'Laptops', price: 1999, rating: 4.8, reviews: 952, inStock: true, badge: 'Best Seller', img: 'https://www.applegadgetsbd.com/_next/image?url=https%3A%2F%2Fadminapi.applegadgetsbd.com%2Fstorage%2Fmedia%2Flarge%2FMacBook-Pro-M5-Pro-14-Inch-241TB-18-Core-CPU-20-Core-GPUa-1124.png&w=1920&q=100' },
    { id: 3, name: 'Galaxy S25 Ultra', brand: 'Samsung', category: 'Smartphones', price: 1299, rating: 4.7, reviews: 678, inStock: true, badge: 'Trending', img: 'https://www.applegadgetsbd.com/_next/image?url=https%3A%2F%2Fadminapi.applegadgetsbd.com%2Fstorage%2Fmedia%2Flarge%2FGalaxy-S25-Ultra-5G-Titanium-Pink-Gold-7617.jpg&w=1920&q=100' },
    { id: 4, name: 'Sony WH-1000XM5', brand: 'Sony', category: 'Audio', price: 349, rating: 4.9, reviews: 3201, inStock: true, badge: 'Top Rated', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop' },
    { id: 5, name: 'iPad Pro 13', brand: 'Apple', category: 'Tablets', price: 1299, rating: 4.8, reviews: 445, inStock: false, badge: 'New Arrival', img: 'https://www.applegadgetsbd.com/_next/image?url=https%3A%2F%2Fadminapi.applegadgetsbd.com%2Fstorage%2Fmedia%2Flarge%2FiPad-Pro-M4-2024-SIlver-3093.jpg&w=1920&q=100' },
    { id: 6, name: 'Apple Watch Ultra 2', brand: 'Apple', category: 'Wearables', price: 799, rating: 4.7, reviews: 889, inStock: true, badge: 'Popular', img: 'https://www.applegadgetsbd.com/_next/image?url=https%3A%2F%2Fadminapi.applegadgetsbd.com%2Fstorage%2Fmedia%2Fmedium%2FApple-Watch-Ultra-2-with-Ocean-Band-GPS-%2B-Cellular-2024-Ice-Blue-3539.jpg&w=640&q=100' },
    { id: 7, name: 'Dell XPS 15', brand: 'Dell', category: 'Laptops', price: 1749, rating: 4.6, reviews: 723, inStock: true, badge: 'Editor Pick', img: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?q=80&w=800&auto=format&fit=crop' },
    { id: 8, name: 'ROG Ally X', brand: 'Asus', category: 'Gaming', price: 899, rating: 4.5, reviews: 512, inStock: true, badge: 'Hot', img: 'https://www.applegadgetsbd.com/_next/image?url=https%3A%2F%2Fadminapi.applegadgetsbd.com%2Fstorage%2Fmedia%2Fmedium%2FG614JJ-5987.jpg&w=640&q=100' },
    { id: 9, name: 'Bose QuietComfort 45', brand: 'Bose', category: 'Audio', price: 279, rating: 4.6, reviews: 2100, inStock: true, badge: 'Best Seller', img: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=800&auto=format&fit=crop' },
    { id: 10, name: 'Galaxy Tab S9 Ultra', brand: 'Samsung', category: 'Tablets', price: 1099, rating: 4.6, reviews: 388, inStock: true, badge: 'Trending', img: 'https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?q=80&w=800&auto=format&fit=crop' },
    { id: 11, name: 'Pixel 9 Pro', brand: 'Samsung', category: 'Smartphones', price: 999, rating: 4.5, reviews: 541, inStock: false, badge: 'New', img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop' },
    { id: 12, name: 'MacBook Air M3', brand: 'Apple', category: 'Laptops', price: 1299, rating: 4.9, reviews: 1480, inStock: true, badge: 'Best Seller', img: 'https://www.applegadgetsbd.com/_next/image?url=https%3A%2F%2Fadminapi.applegadgetsbd.com%2Fstorage%2Fmedia%2Fmedium%2FMacBook-Air-M3-13-Inch-Midnight-7621.jpg&w=640&q=100' },
    { id: 13, name: 'Sony PlayStation 5', brand: 'Sony', category: 'Gaming', price: 499, rating: 4.8, reviews: 4321, inStock: true, badge: 'Hot', img: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=800&auto=format&fit=crop' },
    { id: 14, name: 'Logitech MX Master 3', brand: 'Logitech', category: 'Gaming', price: 99, rating: 4.7, reviews: 3890, inStock: true, badge: 'Top Rated', img: 'https://images.unsplash.com/photo-1527814050087-3793815479db?q=80&w=800&auto=format&fit=crop' },
    { id: 15, name: 'AirPods Pro (2nd Gen)', brand: 'Apple', category: 'Audio', price: 249, rating: 4.8, reviews: 5621, inStock: true, badge: 'Best Seller', img: 'https://www.applegadgetsbd.com/_next/image?url=https%3A%2F%2Fadminapi.applegadgetsbd.com%2Fstorage%2Fmedia%2Fmedium%2FAirPods-Pro-(2nd-generation)-USB%E2%80%90C-a-1521.jpg&w=640&q=100' },
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

const page = () => {
    const [filters, setFilters] = useState({ ...DEFAULT_FILTERS });
    const [sortBy, setSortBy] = useState('featured');
    const [currentPage, setCurrentPage] = useState(1);
    const [viewMode, setViewMode] = useState('grid');
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

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
            default: break;
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

                        {/* ── Sidebar Filter (Desktop) ── */}
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
                                        onClick={() => setMobileFiltersOpen(true)}
                                        className="lg:hidden flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl border border-border hover:border-accent hover:text-accent transition-all"
                                    >
                                        <SlidersHorizontal size={15} /> Filters
                                    </button>
                                    <p className="text-base text-text-secondary">
                                        <span className="font-bold text-text-primary">{filteredProducts.length}</span> products found
                                    </p>
                                </div>

                                {/* Right: sort + view toggles */}
                                <SortProduct sortBy={sortBy} setSortBy={setSortBy} setCurrentPage={setCurrentPage} setViewMode={setViewMode} viewMode={viewMode} />
                            </div>

                            {/* Mobile Filters Drawer Layer */}
                            {/* Backdrop */}
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

                                {/* Apply button (optional but good for UX) */}
                                <button
                                    onClick={() => setMobileFiltersOpen(false)}
                                    className="mt-4 w-full py-3 bg-accent text-white font-bold rounded-2xl shadow-lg shadow-accent/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                                >
                                    Apply Filters
                                </button>
                            </div>

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
                                <ShopEmptyState handleReset={handleReset} />
                            ) : viewMode === 'grid' ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                                    {paginatedProducts.map(p => <ShopCard key={p.id} product={p} />)}
                                </div>
                            ) : (
                                /* List view */
                                <div className="flex flex-col gap-4">
                                    {paginatedProducts.map(item => (
                                        <ProductListView key={item.id} item={item} />
                                    ))}
                                </div>
                            )}

                            {/* Pagination */}
                            {filteredProducts.length > PRODUCTS_PER_PAGE && (
                                <Pagination currentPage={safePage} totalPages={totalPages} onPageChange={setCurrentPage} />
                            )}

                            {/* Showing range */}
                            {filteredProducts.length > 0 && (
                                <p className="text-center text-xs text-text-muted mt-4">-
                                    Showing {(safePage - 1) * PRODUCTS_PER_PAGE + 1}-{Math.min(safePage * PRODUCTS_PER_PAGE, filteredProducts.length)} of {filteredProducts.length} products
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default page;