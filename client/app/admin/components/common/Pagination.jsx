import React from 'react';
import { FiChevronDown } from 'react-icons/fi';

const Pagination = () => {
    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-6 mt-4 pl-3">
            {/* Left: Results Info */}
            <div className="text-text-muted text-sm font-medium">
                Showing <span className="text-coil">1-10</span> of <span className="text-coil">15</span> results
            </div>

            {/* Right: Controls */}
            <div className="flex flex-wrap items-center gap-6">
                {/* Rows per page selector */}
                <div className="flex items-center gap-3">
                    <span className="text-text-muted text-sm font-medium">Rows</span>
                    <div className="relative group">
                        <select className="appearance-none bg-surface border border-border/60 rounded-xl pl-4 pr-10 py-2.5 text-sm font-medium text-coil cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/10 focus:border-accent transition-all">
                            <option>10</option>
                            <option>20</option>
                            <option>50</option>
                        </select>
                        <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none group-focus-within:text-accent transition-colors" />
                    </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center gap-2">
                    <button className="px-5 py-2.5 bg-surface border border-border/60 rounded-xl text-text-secondary text-sm font-medium hover:bg-white hover:text-accent hover:border-accent/40 transition-all cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm">
                        Previous
                    </button>

                    <div className="flex items-center gap-2">
                        <button className="w-10 h-10 rounded-xl bg-accent text-accent-soft text-sm font-medium shadow-lg shadow-accent/20 transition-all flex items-center justify-center cursor-pointer">
                            1
                        </button>
                        <button className="w-10 h-10 rounded-xl bg-surface border border-border/60 text-text-secondary text-sm font-medium hover:bg-white hover:text-accent hover:border-accent/40 transition-all flex items-center justify-center cursor-pointer active:scale-95">
                            2
                        </button>
                    </div>

                    <button className="px-5 py-2.5 bg-surface border border-border/60 rounded-xl text-text-secondary text-sm font-medium hover:bg-white hover:text-accent hover:border-accent/40 transition-all cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm">
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Pagination;