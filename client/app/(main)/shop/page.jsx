import React from 'react';
import ShopFilterPanel from '../../components/shop/ShopFilterPanel';
import Pagination from '../../components/shop/Pagination';
import ProductListView from '../../components/shop/ShopListCard';
import ShopEmptyState from '../../components/emptyState/ShopEmptyState';
import ShopHeader from '../../components/shop/ShopHeader';
import MobileFilter from '@/app/components/shop/MobileFilter';
import { apiClient } from '@/app/lib/apiClient';
import SellerCard from '@/app/components/cards/SellerCard';

export default async function Page({ searchParams }) {
    const PRODUCTS_PER_PAGE = 10
    const totalProduct = 5
    const viewMode = "grid"

    // -------- All Queries ---------
    const query = await searchParams
    const category = query.category
    const minPrice = query.minPrice
    const maxPrice = query.maxPrice
    const brand = query.brand
    const rating = query.rating

    // -------- From server ---------
    let res = { data: [] };
    let categoryList = { data: [] };

    try {
        const params = new URLSearchParams();

        if (category) { params.append("category", category); }
        if (minPrice) { params.append("minPrice", minPrice); }
        if (maxPrice) { params.append("maxPrice", maxPrice); }
        if (brand) { params.append("brand", brand); }
        if (rating) { params.append("rating", rating); }


        // ----------- Fetch ----------
        res = await apiClient.get(`/product${params.toString() ? `?${params.toString()}` : ""}`, {
            revalidation: 60 * 5,
        });

        // ----------- Fetch category ----------
        categoryList = await apiClient.get("/category/all");
    } catch (error) {
        console.log(error)
    }

    console.log(res)
    return (
        <>
            <section className="py-10">
                <div className="container">
                    <div className="flex gap-8">
                        {/* ── Sidebar Filter (Desktop) ── */}
                        <div className="hidden lg:block w-64 shrink-0">
                            <div className="sticky top-4">
                                <ShopFilterPanel categories={categoryList?.data} />
                            </div>
                        </div>

                        {/* ── Main Content ── */}
                        <div className="flex-1 min-w-0">
                            {/* Toolbar */}
                            <ShopHeader totalProducts={res?.data?.products?.length}/>

                            {/* Drawer */}
                            <MobileFilter />

                            {/* Product Grid / List */}
                            {res?.data?.products?.length === 0 ? (
                                <ShopEmptyState />
                            ) : viewMode === 'grid' ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                                    {res?.data?.products?.map((item, i) => (
                                        <div key={i}>
                                            <SellerCard
                                                img={item.variants[0].thumbnail || item.image}
                                                badge={item.badge}
                                                slug={item.slug}
                                                title={item.title}
                                                variant={item.brand}
                                                price={item.variants[0].price}
                                                rating={item.avgReview || 0}
                                                reviews={item.totalReview || 0}
                                            />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col gap-4">
                                    {res?.data?.products.map((item, i) => (
                                        <ProductListView key={i} item={item} />
                                    ))}
                                </div>
                            )}

                            {/* Pagination */}
                            <Pagination totalPages={res?.data?.pagination?.showing} />

                            {/* Showing range */}
                            <p className="text-center text-xs text-text-muted mt-4">-
                                Showing {res?.data?.pagination?.showing} of {res?.data?.pagination?.total} products
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};