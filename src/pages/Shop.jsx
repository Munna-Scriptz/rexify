import React, { useState, useMemo } from 'react';
import { ChevronDown, X, SlidersHorizontal, LayoutGrid, List, } from 'lucide-react';
import ShopFilterPanel from '../components/shop/ShopFilterPanel';
import Pagination from '../components/shop/Pagination';
import ShopCard from '../components/shop/ShopCard';
import ProductListView from '../components/shop/ShopListCard';
import ShopEmptyState from '../components/emptyState/ShopEmptyState';
import SortProduct from '../components/shop/SortProduct';

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
                                    <p className="text-base text-text-secondary">
                                        <span className="font-bold text-text-primary">{filteredProducts.length}</span> products found
                                    </p>
                                </div>

                                {/* Right: sort + view toggles */}
                                <SortProduct sortBy={sortBy} setSortBy={setSortBy} setCurrentPage={setCurrentPage} setViewMode={setViewMode} viewMode={viewMode}/>
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

export default Shop;