import React, { useState } from 'react'
import { Link } from 'react-router'
import { Trash2, ShoppingCart, Heart, ArrowRight, X, Check, MoreHorizontal } from 'lucide-react'

const Wishlist = () => {
    // Mock Data
    const [wishlistItems, setWishlistItems] = useState([
        {
            id: 1,
            name: "Louis Vuitton Star Trail",
            brand: "Louis Vuitton",
            price: 1350,
            originalPrice: 1650,
            image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=300&auto=format&fit=crop",
            inStock: true,
            dateAdded: "August 22, 2026"
        },
        {
            id: 2,
            name: "Prada Re-Edition 2005",
            brand: "Prada",
            price: 1990,
            image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=300&auto=format&fit=crop",
            inStock: true,
            dateAdded: "August 21, 2026"
        },
        {
            id: 3,
            name: "Valentino Roman Stud",
            brand: "Valentino",
            price: 3150,
            image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=300&auto=format&fit=crop",
            inStock: true,
            dateAdded: "August 20, 2026"
        },
        {
            id: 4,
            name: "Balmain B-Bold Sneakers",
            brand: "Balmain",
            price: 1100,
            image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=300&auto=format&fit=crop",
            inStock: true,
            dateAdded: "August 18, 2026"
        },
        {
            id: 5,
            name: "Gucci GG Supreme",
            brand: "Gucci",
            price: 2100,
            image: "https://images.unsplash.com/photo-1559563458-52c69522108a?q=80&w=300&auto=format&fit=crop",
            inStock: false,
            dateAdded: "August 15, 2026"
        }
    ]);

    const [selectedItems, setSelectedItems] = useState([]);
    const [action, setAction] = useState('Add to cart');

    const toggleSelect = (id) => {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter(item => item !== id));
        } else {
            setSelectedItems([...selectedItems, id]);
        }
    };

    const toggleSelectAll = () => {
        if (selectedItems.length === wishlistItems.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(wishlistItems.map(item => item.id));
        }
    };

    const handleApplyAction = () => {
        if (selectedItems.length === 0) {
            alert("No items selected");
            return;
        }
        if (action === 'Add to cart') {
            alert(`Added ${selectedItems.length} items to cart`);
        } else if (action === 'Remove') {
            setWishlistItems(wishlistItems.filter(item => !selectedItems.includes(item.id)));
            setSelectedItems([]);
        }
    };


    if (wishlistItems.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 font-primary">
                <div className="w-20 h-20 bg-muted/20 rounded-full flex items-center justify-center text-text-secondary mb-6 animate-pulse">
                    <Heart size={40} strokeWidth={1.5} />
                </div>
                <h2 className="text-3xl font-bold font-space mb-3">Your wishlist is empty</h2>
                <p className="text-text-secondary max-w-md mb-8">
                    Looks like haven't added anything to your wishlist yet.
                </p>
                <Link to="/category" className="px-8 py-3 bg-accent text-white font-medium rounded-full hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-accent/20">
                    Start Shopping <ArrowRight size={18} />
                </Link>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-bg font-primary py-12">
            <div className="container mx-auto px-4 md:px-8">

                {/* Header */}
                

                {/* List Content */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    {/* Table Header */}
                    <div className="grid grid-cols-12 gap-4 p-6 border-b border-gray-100 bg-gray-50/50 text-sm font-bold text-text-primary uppercase tracking-wider items-center">
                        <div className="col-span-1 flex justify-center">
                            <input
                                type="checkbox"
                                className="w-5 h-5 rounded border-gray-300 text-accent focus:ring-accent cursor-pointer"
                                checked={selectedItems.length === wishlistItems.length && wishlistItems.length > 0}
                                onChange={toggleSelectAll}
                            />
                        </div>
                        <div className="col-span-11 md:col-span-5">Product name</div>
                        <div className="hidden md:block col-span-2 text-center">Unit price</div>
                        <div className="hidden md:block col-span-2 text-center">Stock status</div>
                        <div className="hidden md:block col-span-2 text-right">Action</div>
                    </div>

                    {/* Items */}
                    <div className="divide-y divide-gray-100">
                        {wishlistItems.map((item) => (
                            <div key={item.id} className="grid grid-cols-12 gap-4 p-6 items-center hover:bg-gray-50/30 transition-colors group">
                                {/* Checkbox */}
                                <div className="col-span-1 flex justify-center">
                                    <input
                                        type="checkbox"
                                        className="w-5 h-5 rounded border-gray-300 text-accent focus:ring-accent cursor-pointer"
                                        checked={selectedItems.includes(item.id)}
                                        onChange={() => toggleSelect(item.id)}
                                    />
                                </div>

                                {/* Product Info */}
                                <div className="col-span-11 md:col-span-5 flex items-center gap-6">
                                    <div className="w-20 h-24 bg-gray-50 rounded-lg p-2 border border-gray-100 flex-shrink-0">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                                    </div>
                                    <div className="flex flex-col">
                                        <h3 className="font-bold text-text-primary text-lg mb-1">{item.name}</h3>
                                        <p className="text-text-muted text-sm">{item.brand}</p>
                                        {/* Mobile Only Fields */}
                                        <div className="md:hidden mt-2 text-sm text-text-primary font-bold">
                                            ${item.price.toLocaleString()}
                                        </div>
                                        <div className={`md:hidden mt-1 text-xs font-medium ${item.inStock ? 'text-green-600' : 'text-red-500'}`}>
                                            {item.inStock ? 'In Stock' : 'Out of Stock'}
                                        </div>
                                    </div>
                                </div>

                                {/* Price (Desktop) */}
                                <div className="hidden md:block col-span-2 text-center font-bold text-text-primary">
                                    ${item.price.toLocaleString()}
                                </div>

                                {/* Stock Status (Desktop) */}
                                <div className="hidden md:block col-span-2 text-center">
                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${item.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {item.inStock ? 'In Stock' : 'Out of Stock'}
                                    </span>
                                </div>

                                {/* Actions (Desktop) */}
                                <div className="hidden md:flex col-span-2 justify-end items-center gap-4">
                                    <div className="flex flex-col items-end gap-2">
                                        <span className="text-[10px] text-text-muted">Added on: {item.dateAdded}</span>
                                        <button
                                            className="px-6 py-2 bg-accent text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-all shadow-md shadow-accent/20 whitespace-nowrap"
                                            onClick={() => alert(`Added ${item.name} to cart`)}
                                        >
                                            Add to cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Bulk Actions Footer */}
                    <div className="p-6 bg-gray-50 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <span className="text-sm font-medium text-text-primary whitespace-nowrap">Apply this action to all the selected items:</span>
                            <div className="relative flex items-center">
                                <select
                                    value={action}
                                    onChange={(e) => setAction(e.target.value)}
                                    className="appearance-none bg-white border border-gray-300 text-text-primary text-sm rounded-lg focus:ring-accent focus:border-accent block w-full pl-4 pr-10 py-2.5 cursor-pointer outline-none font-medium"
                                >
                                    <option value="Add to cart">Add to cart</option>
                                    <option value="Remove">Remove</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                </div>
                            </div>
                            <button
                                onClick={handleApplyAction}
                                className="px-6 py-2.5 bg-white border border-gray-300 text-accent font-bold rounded-lg hover:bg-accent hover:text-white transition-all text-sm uppercase tracking-wide"
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Wishlist