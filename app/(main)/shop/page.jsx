import React, { Suspense } from 'react';
import ShopFiltersClient from '../../components/shop/ShopFiltersClient';
import ShopProductsServer from '../../components/shop/ShopProductsServer';
import SortProductClient from '../../components/shop/SortProductClient';
import ActiveFiltersClient from '../../components/shop/ActiveFiltersClient';
import PaginationClient from '../../components/shop/PaginationClient';
import ProductCountServer from '../../components/shop/ProductCountServer';

const PRODUCTS_PER_PAGE = 9;
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

// Helper to get total pages
function getTotalPages(filters) {
    let products = [...ALL_PRODUCTS];
    const category = filters?.category || 'All';
    const brandsParam = filters?.brands ? filters.brands.split(',') : [];
    const minPrice = parseInt(filters?.minPrice) || 0;
    const maxPrice = parseInt(filters?.maxPrice) || 5000;
    const ratingParam = parseInt(filters?.rating) || 0;
    const inStockOnly = filters?.inStock === 'true';

    if (category !== 'All') {
        products = products.filter(p => p.category === category);
    }
    if (brandsParam.length > 0) {
        products = products.filter(p => brandsParam.includes(p.brand));
    }
    products = products.filter(p => p.price >= minPrice && p.price <= maxPrice);
    if (ratingParam > 0) {
        products = products.filter(p => p.rating >= ratingParam);
    }
    if (inStockOnly) {
        products = products.filter(p => p.inStock);
    }

    return Math.max(1, Math.ceil(products.length / PRODUCTS_PER_PAGE));
}

const page = ({ searchParams }) => {
    const totalPages = getTotalPages(searchParams);

    return (
        <>
            <section className="py-10">
                <div className="container">
                    <div className="flex gap-8">

                        {/* ── Left Sidebar: Filters (Client Component) ── */}
                        <ShopFiltersClient />

                        {/* ── Main Content Area ── */}
                        <div className="flex-1 min-w-0">

                            {/* Toolbar: Mobile Filter Button + Sort + View Toggle */}
                            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-border">
                                {/* Left: Mobile Filters Button + Product Count */}
                                <div className="flex items-center gap-3">
                                    {/* Mobile filter button is built into ShopFiltersClient */}
                                    <Suspense fallback={<div>Loading...</div>}>
                                        <ProductCountServer searchParams={searchParams} />
                                    </Suspense>
                                </div>

                                {/* Right: Sort and View toggles */}
                                <SortProductClient />
                            </div>

                            {/* Active filter chips */}
                            <Suspense fallback={null}>
                                <ActiveFiltersClient />
                            </Suspense>

                            {/* Products Grid/List (Server Component) */}
                            <Suspense fallback={<div className="text-center py-10">Loading products...</div>}>
                                <ShopProductsServer searchParams={searchParams} />
                            </Suspense>

                            {/* Pagination (Client Component) */}
                            <Suspense fallback={null}>
                                <PaginationClient currentPage={parseInt(searchParams?.page) || 1} totalPages={totalPages} />
                            </Suspense>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default page;