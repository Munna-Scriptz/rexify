import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) pages.push(i);
    const visiblePages = pages.filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1);

    return (
        <div className="flex items-center justify-center gap-2 mt-10">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-border text-text-secondary hover:border-accent hover:text-accent transition-all disabled:opacity-30 disabled:pointer-events-none"
            >
                <ChevronLeft size={16} />
            </button>

            {visiblePages.map((page, idx) => {
                const prev = visiblePages[idx - 1];
                const showEllipsis = prev && page - prev > 1;
                return (
                    <React.Fragment key={page}>
                        {showEllipsis && <span className="px-1 text-text-muted text-sm">…</span>}
                        <button
                            onClick={() => onPageChange(page)}
                            className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${currentPage === page ? 'bg-accent text-white shadow-md shadow-accent/25' : 'border border-border text-text-secondary hover:border-accent hover:text-accent'}`}
                        >
                            {page}
                        </button>
                    </React.Fragment>
                );
            })}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-border text-text-secondary hover:border-accent hover:text-accent transition-all disabled:opacity-30 disabled:pointer-events-none"
            >
                <ChevronRight size={16} />
            </button>
        </div>
    );
};

export default Pagination