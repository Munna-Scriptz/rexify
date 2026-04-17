import React from 'react'

const ProductCountServer = async ({ searchParams }) => {
    const ALL_PRODUCTS = [
        { id: 1, name: 'iPhone 16 Pro', brand: 'Apple', category: 'Smartphones', price: 1099, rating: 4.9, reviews: 1824, inStock: true, badge: 'New Arrival' },
        { id: 2, name: 'MacBook Pro 14"', brand: 'Apple', category: 'Laptops', price: 1999, rating: 4.8, reviews: 952, inStock: true, badge: 'Best Seller' },
        { id: 3, name: 'Galaxy S25 Ultra', brand: 'Samsung', category: 'Smartphones', price: 1299, rating: 4.7, reviews: 678, inStock: true, badge: 'Trending' },
        { id: 4, name: 'Sony WH-1000XM5', brand: 'Sony', category: 'Audio', price: 349, rating: 4.9, reviews: 3201, inStock: true, badge: 'Top Rated' },
        { id: 5, name: 'iPad Pro 13', brand: 'Apple', category: 'Tablets', price: 1299, rating: 4.8, reviews: 445, inStock: false, badge: 'New Arrival' },
        { id: 6, name: 'Apple Watch Ultra 2', brand: 'Apple', category: 'Wearables', price: 799, rating: 4.7, reviews: 889, inStock: true, badge: 'Popular' },
        { id: 7, name: 'Dell XPS 15', brand: 'Dell', category: 'Laptops', price: 1749, rating: 4.6, reviews: 723, inStock: true, badge: 'Editor Pick' },
        { id: 8, name: 'ROG Ally X', brand: 'Asus', category: 'Gaming', price: 899, rating: 4.5, reviews: 512, inStock: true, badge: 'Hot' },
        { id: 9, name: 'Bose QuietComfort 45', brand: 'Bose', category: 'Audio', price: 279, rating: 4.6, reviews: 2100, inStock: true, badge: 'Best Seller' },
        { id: 10, name: 'Galaxy Tab S9 Ultra', brand: 'Samsung', category: 'Tablets', price: 1099, rating: 4.6, reviews: 388, inStock: true, badge: 'Trending' },
        { id: 11, name: 'Pixel 9 Pro', brand: 'Samsung', category: 'Smartphones', price: 999, rating: 4.5, reviews: 541, inStock: false, badge: 'New' },
        { id: 12, name: 'MacBook Air M3', brand: 'Apple', category: 'Laptops', price: 1299, rating: 4.9, reviews: 1480, inStock: true, badge: 'Best Seller' },
        { id: 13, name: 'Sony PlayStation 5', brand: 'Sony', category: 'Gaming', price: 499, rating: 4.8, reviews: 4321, inStock: true, badge: 'Hot' },
        { id: 14, name: 'Logitech MX Master 3', brand: 'Logitech', category: 'Gaming', price: 99, rating: 4.7, reviews: 3890, inStock: true, badge: 'Top Rated' },
        { id: 15, name: 'AirPods Pro (2nd Gen)', brand: 'Apple', category: 'Audio', price: 249, rating: 4.8, reviews: 5621, inStock: true, badge: 'Best Seller' },
        { id: 16, name: 'Galaxy Watch 6', brand: 'Samsung', category: 'Wearables', price: 299, rating: 4.4, reviews: 712, inStock: true, badge: 'Sale' },
    ];

    const category = searchParams?.category || 'All';
    const brandsParam = searchParams?.brands ? searchParams.brands.split(',') : [];
    const minPrice = parseInt(searchParams?.minPrice) || 0;
    const maxPrice = parseInt(searchParams?.maxPrice) || 5000;
    const ratingParam = parseInt(searchParams?.rating) || 0;
    const inStockOnly = searchParams?.inStock === 'true';

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

    return (
        <p className="text-base text-text-secondary">
            <span className="font-bold text-text-primary">{filteredProducts.length}</span> products found
        </p>
    );
};

export default ProductCountServer;
