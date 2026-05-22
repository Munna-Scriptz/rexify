"use client"

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const RangeSlider = ({ MIN_PRICE = 0, MAX_PRICE = 50000 }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [filters, setFilters] = useState({
        priceRange: {
            min: MIN_PRICE,
            max: MAX_PRICE,
        },
    });

    const priceTimerRef = useRef(null);

    const schedulePriceQuery = (priceRange) => {
        if (priceTimerRef.current) clearTimeout(priceTimerRef.current);

        priceTimerRef.current = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());
            params.set("minPrice", String(priceRange.min));
            params.set("maxPrice", String(priceRange.max));

            router.push(`${pathname}?${params.toString()}`);
            priceTimerRef.current = null;
        }, 500);
    };

    useEffect(() => {
        return () => {
            if (priceTimerRef.current) clearTimeout(priceTimerRef.current);
        };
    }, []);

    const handlePriceChange = (e, key) => {
        const value = Number(e.target.value);

        setFilters((prev) => {
            const prevRange = prev.priceRange;

            let nextRange = { ...prevRange };

            if (key === "min") {
                nextRange.min = Math.min(value, prevRange.max - 50);
            } else {
                nextRange.max = Math.max(value, prevRange.min + 50);
            }

            // clamp safety
            nextRange.min = Math.max(MIN_PRICE, nextRange.min);
            nextRange.max = Math.min(MAX_PRICE, nextRange.max);

            schedulePriceQuery(nextRange);

            return {
                ...prev,
                priceRange: nextRange,
            };
        });
    };

    const { min, max } = filters.priceRange;

    return (
        <>
            <div className="space-y-3 overflow-x-hidden">
                <div className="flex items-center justify-between text-sm font-semibold text-text-primary">
                    <span>${min}</span>
                    <span>${max}</span>
                </div>

                <div className="relative h-7 flex items-center">
                    <div className="absolute w-full h-1.5 bg-muted rounded-full" />

                    <div
                        className="absolute h-1.5 bg-accent rounded-full pointer-events-none"
                        style={{
                            left: `${((min - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100}%`,
                            right: `${100 - ((max - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100}%`,
                        }}
                    />

                    <input
                        type="range"
                        min={MIN_PRICE}
                        max={MAX_PRICE}
                        step={50}
                        value={min}
                        onChange={(e) => handlePriceChange(e, "min")}
                        className="price-range-thumb"
                    />

                    <input
                        type="range"
                        min={MIN_PRICE}
                        max={MAX_PRICE}
                        step={50}
                        value={max}
                        onChange={(e) => handlePriceChange(e, "max")}
                        className="price-range-thumb"
                    />
                </div>

                <div className="flex gap-2 mt-4">
                    <div className="flex-1">
                        <label className="text-xs text-text-muted mb-1 block">Min</label>
                        <input
                            type="number"
                            min={MIN_PRICE}
                            max={max - 50}
                            step={50}
                            value={min}
                            onChange={(e) => handlePriceChange(e, "min")}
                            className="w-full border border-accent/60 rounded-lg px-3 py-2 text-sm"
                        />
                    </div>

                    <div className="flex-1">
                        <label className="text-xs text-text-muted mb-1 block">Max</label>
                        <input
                            type="number"
                            min={min + 50}
                            max={MAX_PRICE}
                            step={50}
                            value={max}
                            onChange={(e) => handlePriceChange(e, "max")}
                            className="w-full border border-accent/60 rounded-lg px-3 py-2 text-sm"
                        />
                    </div>
                </div>
            </div>

            {/* --------- CSS AND STYLE ---------- */}
            <style>
                {`
                .price-range-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 100%;
                    height: 100%;
                    background: transparent;
                    pointer-events: none;      /* let the wrapper catch clicks; only thumbs fire */
                    position: absolute;
                    top: 0;
                    left: 0;
                }

                /* Chrome / Safari / Edge thumb */
                .price-range-thumb::-webkit-slider-thumb {
                  -webkit-appearance: none;
                  appearance: none;
                  pointer-events: all;       /* thumb itself is interactive */
                  width: 20px;
                  height: 20px;
                  border-radius: 50%;
                  background: #ffffff;
                  border: 2.5px solid var(--color-accent);
                  box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-accent) 18%, transparent);
                  cursor: grab;
                  transition: box-shadow 0.15s ease, transform 0.15s ease;
                }
                .price-range-thumb::-webkit-slider-thumb:active {
                  cursor: grabbing;
                  transform: scale(1.15);
                  box-shadow: 0 0 0 5px color-mix(in srgb, var(--color-accent) 22%, transparent);
                }
                                
                /* Firefox thumb */
                .price-range-thumb::-moz-range-thumb {
                  pointer-events: all;
                  width: 20px;
                  height: 20px;
                  border-radius: 50%;
                  background: #ffffff;
                  border: 2.5px solid var(--color-accent);
                  box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-accent) 18%, transparent);
                  cursor: grab;
                  transition: box-shadow 0.15s ease, transform 0.15s ease;
                }
                .price-range-thumb::-moz-range-thumb:active {
                  cursor: grabbing;
                  transform: scale(1.15);
                }
                                
                /* Hide the native track on all browsers */
                .price-range-thumb::-webkit-slider-runnable-track { background: transparent; border: none; }
                .price-range-thumb::-moz-range-track             { background: transparent; border: none; }
                .price-range-thumb:focus { outline: none; }
                `}
            </style>
        </>
    )
}

export default RangeSlider