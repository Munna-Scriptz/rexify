import { Search, X } from "lucide-react";
import { useEffect, useRef } from "react";

const topSearches = [
    "Power Bank",
    "Charger",
    "USB-C Hub",
    "UGREEN Flash Sale",
    "Ugreen Network Attached Storage",
    "What is NAS",
];

const suggestedProducts = [
    {
        title: "UGREEN 145W 25000mAh 3-Port Power Bank",
        img: "https://www.startech.com.bd/image/cache/catalog/smart-watch/xiaomi/watch-s3/xiaomi-watch-s3-228x228.webp",
    },
    {
        title: "Apple Watch Series 9",
        img: "https://www.startech.com.bd/image/cache/catalog/watch/apple/watch-series-9/watch-series-9-midnight-01-228x228.webp",
    },
    {
        title: "Nothing Ear (2)",
        img: "https://www.startech.com.bd/image/cache/catalog/smart-watch/xiaomi/watch-s3/xiaomi-watch-s3-228x228.webp",
    },
    {
        title: "Samsung Galaxy Watch 6",
        img: "https://www.startech.com.bd/image/cache/catalog/smart-watch/samsung/galaxy-watch-7-40mm/galaxy-watch-7-40mm-228x228.webp",
    },
    {
        title: "Logitech MX Master 3S",
        img: "https://www.startech.com.bd/image/cache/catalog/mouse/logitech/mx-master-3s/logitech-mx-master-3s-01-228x228.jpg",
    },
    {
        title: "Sony WH-1000XM5",
        img: "https://www.startech.com.bd/image/cache/catalog/headphone/sony/wh-1000xm5/wh-1000xm5-offical-228x228.webp",
    },
];

const SearchField = ({ close }) => {
    const inputRef = useRef(null);

    // Lock body scroll + auto-focus input + Escape to close
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
                                type="text"
                                placeholder="What are you looking for?"
                                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl
                                 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent
                                 text-sm text-text-primary bg-surface transition"
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
                                Suggested Products
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                                {suggestedProducts.map((product, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-3 p-3 group rounded-xl cursor-pointer hover:bg-surface transition"
                                    >
                                        <div className="w-12 h-12 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 overflow-hidden">
                                            <img
                                                src={product.img}
                                                alt={product.title}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                        <p className="text-sm font-medium text-text-primary group-hover:text-accent duration-200 leading-snug line-clamp-2">
                                            {product.title}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SearchField;