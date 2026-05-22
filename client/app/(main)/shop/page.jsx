import React from 'react';
import ShopFilterPanel from '../../components/shop/ShopFilterPanel';
import Pagination from '../../components/shop/Pagination';
import ShopCard from '../../components/shop/ShopCard';
import ProductListView from '../../components/shop/ShopListCard';
import ShopEmptyState from '../../components/emptyState/ShopEmptyState';
import ShopHeader from '../../components/shop/ShopHeader';
import MobileFilter from '@/app/components/shop/MobileFilter';
import { apiClient } from '@/app/lib/apiClient';

export default async function Page({ searchParams }) {
    const PRODUCTS_PER_PAGE = 10
    const totalProduct = 5
    const viewMode = "grid"
    // -------- All Queries ---------
    const category = await searchParams?.category
    // -------- From server ---------
    let res = { data: [] };

    try {
        res = await apiClient.get(`/product`, {
            revalidate: 60 * 5,
        });
    } catch (error) {
        console.log(error)
    }

    return (
        <>
            <section className="py-10">
                <div className="container">
                    <div className="flex gap-8">
                        {/* ── Sidebar Filter (Desktop) ── */}
                        <div className="hidden lg:block w-64 shrink-0">
                            <div className="sticky top-4">
                                <ShopFilterPanel />
                            </div>
                        </div>

                        {/* ── Main Content ── */}
                        <div className="flex-1 min-w-0">
                            {/* Toolbar */}
                            <ShopHeader />

                            {/* Drawer */}
                            <MobileFilter />

                            {/* Product Grid / List */}
                            {res?.data?.products.length === 0 ? (
                                <ShopEmptyState/>
                            ) : viewMode === 'grid' ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                                    {res?.data?.products.map((item, i) => <ShopCard key={i} product={item} />)}
                                </div>
                            ) : (
                                <div className="flex flex-col gap-4">
                                    {res?.data?.products.map((item, i) => (
                                        <ProductListView key={i} item={item} />
                                    ))}
                                </div>
                            )}

                            {/* Pagination */}
                            <Pagination totalPages={5} />

                            {/* Showing range */}
                            <p className="text-center text-xs text-text-muted mt-4">-
                                Showing {PRODUCTS_PER_PAGE} of {totalProduct} products
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};