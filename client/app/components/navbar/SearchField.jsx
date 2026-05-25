import { apiClient } from "@/app/lib/apiClient";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const topSearches = [
    "Iphone",
    "Samsung",
    "Google",
    "OnePlus",
    "xiaomi",
    "Red magic",
];

const SearchField = ({ close }) => {
    const [query, setQuery] = useState('');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    // ----------- Fetch with Debouncing --------------
    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (query.length > 2) {
                try {
                    setLoading(true);
                    const res = await apiClient.get(`/product?search=${query}`, {
                        revalidate: 60 * 5,
                    });
                    setProducts(res?.data?.products || []);
                } catch (err) {
                    setProducts([]);
                } finally {
                    setLoading(false);
                }
            } else {
                setProducts([]);
            }
        }, 700);

        return () => clearTimeout(delayDebounceFn);
    }, [query]);


    // ----------- Lock Body on input --------------
    const inputRef = useRef(null);
    useEffect(() => {
        document.body.style.overflow = "hidden";
        inputRef.current?.focus();

        const onKey = (e) => { if (e.key === "Escape") close(false); };
        window.addEventListener("keydown", onKey);

        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", onKey);
        };
    }, [close]);

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/70 z-40 backdrop-blur-sm"
                onClick={() => close(false)}
            />

            {/* Panel — sits right below the navbar (sticky top-0 = ~56 px, adjust if needed) */}
            <div className="w-full bg-white border-b border-gray-200 shadow-lg relative z-50 fade-reveal">
                <div className="container py-6">
                    {/* Row: input + close */}
                    <div className="flex items-center gap-3 mb-6">
                        <div className="relative flex-1">
                            <Search
                                size={18}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                            />
                            <input
                                ref={inputRef}
                                onChange={(e) => setQuery(e.target.value)}
                                value={query}
                                type="text"
                                placeholder="What are you looking for?"
                                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-sm text-text-primary bg-surface transition"
                            />
                        </div>
                        <button
                            onClick={() => close(false)}
                            className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 text-gray-500 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition cursor-pointer"
                            title="Close (Esc)"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="grid grid-cols-12 gap-8">
                        {/* Left – Top Searches */}
                        <div className="col-span-12 md:col-span-3">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                                Top Searches
                            </h3>
                            <div className="space-y-1">
                                {topSearches.map((item, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            setQuery(item);
                                            inputRef.current?.focus();
                                        }}
                                        className="flex items-center gap-2 w-full text-left text-sm cursor-pointer px-3 py-2 rounded-lg text-gray-600 hover:bg-accent/5 hover:text-accent transition"
                                    >
                                        <Search size={12} className="text-gray-300 shrink-0" />
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Right – Suggested Products */}
                        <div className="col-span-12 md:col-span-9">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                                {products.length === 0 ?
                                    "Search Your Product here"
                                    :
                                    `Products found - ${products.length}`
                                }
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {loading ? (
                                    <div className="col-span-1 md:col-span-2 lg:col-span-3 flex items-center justify-center p-8">
                                        <div className="animate-pulse text-center text-gray-400">Searching...</div>
                                    </div>
                                ) : query.length <= 0 ? (
                                    <div className="col-span-1 md:col-span-2 lg:col-span-3 flex items-center justify-center p-8 text-gray-400">
                                        Search your product.
                                    </div>
                                ) : products.length === 0 ? (
                                    <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col items-center justify-center p-8 text-center text-gray-400">
                                        <div className="mb-2">No products found</div>
                                        <div className="text-sm">Try different keywords or check spelling.</div>
                                    </div>
                                ) : (
                                    products.map((item, i) => (
                                        <div
                                            key={i}
                                            className="flex flex-col bg-white border border-gray-100 rounded-lg p-3 group cursor-pointer hover:shadow hover:scale-[1.01]"
                                        >
                                            <Link h
                                                ref={`/product/${item.slug}`}
                                                onClick={() => close(false)}
                                                className="flex items-start gap-3"
                                            >
                                                <div className="w-20 h-20 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 overflow-hidden">
                                                    <img
                                                        src={item.variants[0]?.thumbnail}
                                                        alt={item.title}
                                                        className="w-full h-full object-contain"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-semibold text-text-primary group-hover:text-accent leading-snug line-clamp-2">
                                                        {item.title}
                                                    </p>
                                                    <p className="text-sm text-gray-500 mt-1">{item.variants[0]?.price}</p>
                                                    <p className="text-xs text-gray-400 mt-2 line-clamp-2">{item.description || item.shortDescription || ''}</p>
                                                </div>
                                            </Link>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SearchField;