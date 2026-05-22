import { ChevronDown, LayoutGrid, List } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react'

const SortProduct = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // ========== Handle Query =========
    const sortBy = searchParams.get('sortBy');
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
        <div className="flex items-center gap-3">
            <div className="relative">
                <select
                    value={sortBy}
                    onChange={(e) => { handleQuery("sortBy", e.target.value), handlePageQuery('currentPage', "1") }}
                    className="appearance-none pl-3 pr-8 py-2 rounded-xl border border-border text-sm text-text-primary bg-bg focus:outline-none focus:border-accent cursor-pointer font-medium transition-colors"
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
    )
}

export default SortProduct