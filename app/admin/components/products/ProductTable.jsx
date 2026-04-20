import React, { useState } from 'react';
import { FiSearch, FiGrid, FiLayout } from 'react-icons/fi';
import { productData } from '../../DashboardData/DDData';
import { MdFormatListBulleted } from 'react-icons/md';
import EmptyProduct from '../emptyState/EmptyProduct';
import ProductCard from '../cards/ProductCard';
import Pagination from '../common/Pagination';
import VerifyDelete from '../common/VerifyDelete';

const ProductTable = () => {
    const [view, setView] = useState('list');
    const [activeTab, setActiveTab] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [isDeleteOpen, SetisDeleteOpen] = useState(false)


    const tabs = ['All', 'Active', 'Inactive'];

    const filteredProducts = productData.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTab = activeTab === 'All' || product.status === activeTab;
        return matchesSearch && matchesTab;
    });

    const resetFilters = () => {
        setSearchQuery('');
        setActiveTab('All');
    };

    // -------- Handle delete 
    const handleDelete = ()=>{
        SetisDeleteOpen(!isDeleteOpen)
    }


    return (
        <>
            <section className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                {/* ------------------ Filter and controls bar ------------------ */}
                <div className="flex flex-col gap-6 ">
                    {/* Tabs */}
                    <div className="flex items-center gap-1 bg-surface p-1.5 rounded-2xl border border-border/60 w-fit">
                        {tabs.map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all cursor-pointer ${activeTab === tab
                                    ? 'bg-accent text-accent-soft shadow-sm'
                                    : 'text-text-muted hover:text-text-secondary'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Sub controls bar */}
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <div className="flex flex-col sm:flex-row items-center gap-4 grow max-w-2xl w-full">
                            {/* Search Bar */}
                            <div className="relative group w-full">
                                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted text-lg group-focus-within:text-accent transition-colors" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search products..."
                                    className="w-full bg-surface border border-border/60 rounded-2xl pl-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/10 focus:border-accent group-hover:border-accent/30 transition-all font-medium"
                                />
                            </div>

                            {/* Category Dropdown */}
                            <div className="relative group w-full sm:w-auto min-w-45">
                                <FiLayout className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-accent transition-colors" />
                                <select className="w-full bg-surface border border-border/60 rounded-2xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/10 focus:border-accent transition-all appearance-none font-semibold text-coil/80 cursor-pointer">
                                    <option>All Categories</option>
                                    <option>Iphone</option>
                                    <option>Samsung</option>
                                    <option>Redmi</option>
                                </select>
                            </div>
                        </div>

                        {/* View Switcher */}
                        <div className="flex items-center gap-2 p-1.5 bg-surface rounded-2xl border border-border/60 ml-auto lg:ml-0">
                            <button
                                onClick={() => setView('list')}
                                className={`p-2.5 rounded-xl transition-all cursor-pointer ${view === 'list' ? 'bg-accent shadow-sm text-accent-soft' : 'text-text-muted hover:text-text-secondary'}`}
                                title="List View"
                            >
                                <MdFormatListBulleted className="text-xl" />
                            </button>
                            <button
                                onClick={() => setView('grid')}
                                className={`p-2.5 rounded-xl transition-all cursor-pointer ${view === 'grid' ? 'bg-accent shadow-sm text-accent-soft' : 'text-text-muted hover:text-text-secondary'}`}
                                title="Grid View"
                            >
                                <FiGrid className="text-xl" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* ------------------ List / Grid / Empty State ------------------ */}
                {filteredProducts.length > 0 ?
                    <>
                        <ProductCard view={view} handleDelete={handleDelete}  filteredProducts={filteredProducts} />

                        <Pagination />
                    </>
                    :
                    <EmptyProduct resetFilters={resetFilters} />
                }
            </section>

            {/* -------------- Confirm Delete --------------- */}
            <VerifyDelete isOpen={isDeleteOpen} onClose={() => SetisDeleteOpen(false)} onConfirm={""} itemName="Spring Collection 2024" />

        </>
    );
};

export default ProductTable;