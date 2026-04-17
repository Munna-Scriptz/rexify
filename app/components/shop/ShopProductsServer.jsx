import React from 'react'
import ShopCard from './ShopCard'
import ProductListView from './ShopListCard'
import ShopEmptyState from '../emptyState/ShopEmptyState'

const PRODUCTS_PER_PAGE = 9;

// Mock product data - In production, fetch from API
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

const ShopProductsServer = async ({ searchParams }) => {
    // Parse filters from URL query params
    const category = searchParams?.category || 'All';
    const brandsParam = searchParams?.brands ? searchParams.brands.split(',') : [];
    const minPrice = parseInt(searchParams?.minPrice) || 0;
    const maxPrice = parseInt(searchParams?.maxPrice) || 5000;
    const ratingParam = parseInt(searchParams?.rating) || 0;
    const inStockOnly = searchParams?.inStock === 'true';
    const sortBy = searchParams?.sort || 'featured';
    const pageNum = parseInt(searchParams?.page) || 1;
    const viewMode = searchParams?.view || 'grid';

    // Filter products based on query params
    let filteredProducts = [...ALL_PRODUCTS];

    if (category !== 'All') {
        filteredProducts = filteredProducts.filter(p => p.category === category);
    }
    if (brandsParam.length > 0) {
        filteredProducts = filteredProducts.filter(p => brandsParam.includes(p.brand));
    }
    filteredProducts = filteredProducts.filter(
        p => p.price >= minPrice && p.price <= maxPrice
    );
    if (ratingParam > 0) {
        filteredProducts = filteredProducts.filter(p => p.rating >= ratingParam);
    }
    if (inStockOnly) {
        filteredProducts = filteredProducts.filter(p => p.inStock);
    }

    // Sort
    switch (sortBy) {
        case 'price-asc':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
        case 'reviews':
            filteredProducts.sort((a, b) => b.reviews - a.reviews);
            break;
        default:
            break;
    }

    // Pagination
    const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE));
    const safePage = Math.min(pageNum, totalPages);
    const paginatedProducts = filteredProducts.slice(
        (safePage - 1) * PRODUCTS_PER_PAGE,
        safePage * PRODUCTS_PER_PAGE
    );

    // For API integration, replace the mock data above with:
    // const response = await fetch('https://api.example.com/products', {
    //     params: { category, brands: brandsParam, minPrice, maxPrice, rating: ratingParam, inStock: inStockOnly, sort: sortBy, page: pageNum },
    //     next: { revalidate: 60 } // ISR: Revalidate every 60 seconds
    // });
    // const filteredProducts = await response.json();

    return (
        <div>
            {/* Product Grid / List */}
            {paginatedProducts.length === 0 ? (
                <ShopEmptyState />
            ) : viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                    {paginatedProducts.map(p => (
                        <ShopCard key={p.id} product={p} />
                    ))}
                </div>
            ) : (
                /* List view */
                <div className="flex flex-col gap-4">
                    {paginatedProducts.map(item => (
                        <ProductListView key={item.id} item={item} />
                    ))}
                </div>
            )}

            {/* Showing range */}
            {filteredProducts.length > 0 && (
                <p className="text-center text-xs text-text-muted mt-4">
                    Showing {(safePage - 1) * PRODUCTS_PER_PAGE + 1}-{Math.min(safePage * PRODUCTS_PER_PAGE, filteredProducts.length)} of {filteredProducts.length} products
                </p>
            )}
        </div>
    );
};

export default ShopProductsServer;
