'use client'
import React, { useState } from 'react'
import ShopFilterPanel from './ShopFilterPanel'

const MobileFilter = () => {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

    return (
        <>
            {/* Mobile Filters Drawer Layer */}
            <div
                className={`fixed inset-0 bg-black/60 z-100 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${mobileFiltersOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setMobileFiltersOpen(false)}
            />

            <div
                className={`fixed bottom-0 left-0 right-0 z-101 bg-surface rounded-t-4xl border-t border-border p-4 pb-4 transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) lg:hidden h-[70vh] flex flex-col shadow-2xl ${mobileFiltersOpen ? 'translate-y-0' : 'translate-y-full'}`}
            >
                {/* Drawer Handle */}
                <div
                    className="w-12 h-1.5 bg-border rounded-full mx-auto mb-6 shrink-0 cursor-pointer hover:bg-accent/40 transition-colors"
                    onClick={() => setMobileFiltersOpen(false)}
                />

                <div className="overflow-y-auto flex-1 pr-1 custom-scrollbar">
                    <ShopFilterPanel
                        filters={"filters"}
                        setFilters={"handleFilterChange"}
                        onReset={"handleReset"}
                        isMobileDrawer={true}
                        onClose={() => setMobileFiltersOpen(false)}
                    />
                </div>

                {/* Apply button (optional but good for UX) */}
                <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="mt-4 w-full py-3 bg-accent text-white font-bold rounded-2xl shadow-lg shadow-accent/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                    Apply Filters
                </button>
            </div>
        </>
    )
}

export default MobileFilter