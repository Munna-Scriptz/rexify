"use client"
import React from 'react';
import { X, SlidersHorizontal } from 'lucide-react';
import ShopFilterPanel from '../../components/shop/ShopFilterPanel';
import Pagination from '../../components/shop/Pagination';
import ShopCard from '../../components/shop/ShopCard';
import ProductListView from '../../components/shop/ShopListCard';
import ShopEmptyState from '../../components/emptyState/ShopEmptyState';
import SortProduct from '../../components/shop/SortProduct';
import MobileFilter from '@/app/components/shop/MobileFilter';

// const DEFAULT_FILTERS = {
//     category: 'All',
//     brands: [],
//     priceRange: { min: 0, max: 5000 },
//     rating: 0,
//     inStockOnly: false,
// };

const page = () => {

    const filters = []
    // ============ Handle reset ============
    const handleFilterChange = () => {

    }
    // ============ Handle reset ============
    const handleReset = () => {

    }
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
                                {/* <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setMobileFiltersOpen(true)}
                                        className="lg:hidden flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl border border-border hover:border-accent hover:text-accent transition-all"
                                    >
                                        <SlidersHorizontal size={15} /> Filters
                                    </button>
                                    <p className="text-base text-text-secondary">
                                        <span className="font-bold text-text-primary">{filteredProducts.length}</span> products found
                                    </p>
                                </div> */}

                                {/* Right: sort + view toggles */}
                                {/* <SortProduct sortBy={sortBy} setSortBy={setSortBy} setCurrentPage={setCurrentPage} setViewMode={setViewMode} viewMode={viewMode} /> */}
                            </div>



                            {/* Drawer */}
                            {/* <MobileFilter /> */}

                            {/* Active filter chips */}
                            {/* {activeFilters.length > 0 && (
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
                            )} */}

                            {/* Product Grid / List */}
                            {/* {paginatedProducts.length === 0 ? (
                                <ShopEmptyState handleReset={handleReset} />
                            ) : viewMode === 'grid' ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                                    {paginatedProducts.map(p => <ShopCard key={p.id} product={p} />)}
                                </div>
                            ) : (
                                <div className="flex flex-col gap-4">
                                    {paginatedProducts.map(item => (
                                        <ProductListView key={item.id} item={item} />
                                    ))}
                                </div>
                            )} */}

                            {/* Pagination */}
                            {/* {filteredProducts.length > PRODUCTS_PER_PAGE && (
                                <Pagination currentPage={safePage} totalPages={totalPages} onPageChange={setCurrentPage} />
                            )} */}

                            {/* Showing range */}
                            {/* {filteredProducts.length > 0 && (
                                <p className="text-center text-xs text-text-muted mt-4">-
                                    Showing {(safePage - 1) * PRODUCTS_PER_PAGE + 1}-{Math.min(safePage * PRODUCTS_PER_PAGE, filteredProducts.length)} of {filteredProducts.length} products
                                </p>
                            )} */}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default page;