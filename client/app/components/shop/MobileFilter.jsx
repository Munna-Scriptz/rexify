'use client'
import React from 'react'
import ShopFilterPanel from './ShopFilterPanel'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const MobileFilter = () => {

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // ========== Handle Query =========
    const filter = searchParams.get('filter');

    const handleQuery = (name, value) => {
        const params = new URLSearchParams(searchParams.toString());

        // 2. Set multiple parameters
        params.set(name, value);

        // 3. Push the new URL
        router.push(`${pathname}?${params.toString()}`);
    };

    const clearQuery = (name) => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete(name);
        const queryString = params.toString();
        const updatedUrl = queryString ? `${pathname}?${queryString}` : pathname;
        router.replace(updatedUrl);
    };

    return (
        <>
            {/* Mobile Filters Drawer Layer */}
            <div
                className={`fixed inset-0 bg-black/60 z-100 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${filter ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => clearQuery("filter")}
            />

            <div
                className={`fixed bottom-0 left-0 right-0 z-101 bg-surface rounded-t-4xl border-t border-border p-4 pb-4 transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) lg:hidden h-[90vh] flex flex-col shadow-2xl ${filter ? 'translate-y-0' : 'translate-y-full'}`}
            >
                {/* Drawer Handle */}
                <div
                    className="w-12 h-1.5 bg-border rounded-full mx-auto mb-6 shrink-0 cursor-pointer hover:bg-accent/40 transition-colors"
                    onClick={() => clearQuery("filter")}
                />

                <div className="overflow-y-auto flex-1 pr-1"
                    style={{
                        scrollbarWidth: 'none',          /* Firefox */
                        msOverflowStyle: 'none',         /* IE and Edge */
                        WebkitScrollbar: { display: 'none' } // Note: Standard inline style doesn't support pseudo-elements directly
                    }}
                >
                    <ShopFilterPanel
                        isMobileDrawer={true}
                    />
                </div>

                {/* Apply button (optional but good for UX) */}
                <button
                    onClick={() => clearQuery("filter")}
                    className="mt-4 w-full py-3 bg-accent text-white font-bold rounded-2xl shadow-lg shadow-accent/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                    Apply Filters
                </button>
            </div>
        </>
    )
}

export default MobileFilter