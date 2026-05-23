"use client"
import { ChevronDown, LayoutGrid, List, SlidersHorizontal } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const ShopHeader = ({ totalProducts }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // ========== Handle Query =========
    const toggle = searchParams.get('toggle');

    const handleQuery = (name, value) => {
        const params = new URLSearchParams(searchParams.toString());

        // 2. Set multiple parameters
        params.set(name, value);

        // 3. Push the new URL
        router.push(`${pathname}?${params.toString()}`);
    };
    const handlePageQuery = (name, value) => {
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
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-border">
                {/* Left: count + mobile filter toggle */}
                <div className="flex justify-between items-center gap-2 w-full md:w-auto" >
                    <p className="text-base text-text-secondary">
                        <span className="font-bold text-text-primary">{totalProducts || 0}</span> products found
                    </p>
                    <button
                        onClick={() => router.push(`/shop`)}
                        className="lg:hidden flex items-center gap-2 text-sm font-medium px-4 cursor-pointer py-2 rounded-xl border border-border hover:border-accent hover:text-accent transition-all"
                    >
                        Clear
                    </button>
                    <button
                        onClick={() => handleQuery("filter", true)}
                        className="lg:hidden flex items-center gap-2 text-sm font-medium px-4 cursor-pointer py-2 rounded-xl border border-border hover:border-accent hover:text-accent transition-all"
                    >
                        <SlidersHorizontal size={15} /> Filters
                    </button>
                </div>

                {/* Right: sort + view toggles */}
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative w-full md:w-auto">
                        <select
                            onChange={(e) => { handleQuery("sortBy", e.target.value), handlePageQuery('currentPage', "1") }}
                            className="appearance-none pl-3 pr-8 py-2 w-full md:w-auto rounded-xl border border-border text-sm text-text-primary bg-bg focus:outline-none focus:border-accent cursor-pointer font-medium transition-colors"
                        >
                            <option value="featured">Featured</option>
                            <option value="price-asc">Price: Low → High</option>
                            <option value="price-desc">Price: High → Low</option>
                            <option value="rating">Top Rated</option>
                            <option value="reviews">Most Reviewed</option>
                        </select>
                        <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
                    </div>
                    {/* View toggles */}
                    <div className="flex items-center gap-1 border border-border rounded-xl p-1">
                        <button onClick={() => clearQuery('toggle')} className={`p-1.5 rounded-lg cursor-pointer transition-all ${!toggle ? 'bg-accent text-white' : 'text-text-secondary hover:text-text-primary'}`}>
                            <LayoutGrid size={15} />
                        </button>
                        <button onClick={() => handleQuery('toggle', "list")} className={`p-1.5 rounded-lg cursor-pointer transition-all ${toggle == 'list' ? 'bg-accent text-white' : 'text-text-secondary hover:text-text-primary'}`}>
                            <List size={15} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShopHeader