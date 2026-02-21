import React from 'react'

const RangeSlider = ({ filters, MIN_PRICE, MAX_PRICE, handlePriceChange }) => {
    return (
        <>
            <div className="space-y-3 overflow-x-hidden">
                <div className="flex items-center justify-between text-sm font-semibold text-text-primary">
                    <span>${filters.priceRange.min}</span>
                    <span>${filters.priceRange.max}</span>
                </div>
                {/* Track */}
                <div className="relative h-7 flex items-center">
                    {/* Grey background track */}
                    <div className="absolute w-full h-1.5 bg-muted rounded-full" />
                    {/* Coloured fill between thumbs */}
                    <div
                        className="absolute h-1.5 bg-accent rounded-full pointer-events-none"
                        style={{
                            left: `${((filters.priceRange.min - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100}%`,
                            right: `${100 - ((filters.priceRange.max - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100}%`
                        }}
                    />
                    {/* Min thumb */}
                    <input
                        type="range"
                        min={MIN_PRICE}
                        max={MAX_PRICE}
                        step={50}
                        value={filters.priceRange.min}
                        onChange={e => handlePriceChange(e, 'min')}
                        className="price-range-thumb"
                        style={{ zIndex: filters.priceRange.min > MAX_PRICE - 200 ? 5 : 3 }}
                    />
                    {/* Max thumb */}
                    <input
                        type="range"
                        min={MIN_PRICE}
                        max={MAX_PRICE}
                        step={50}
                        value={filters.priceRange.max}
                        onChange={e => handlePriceChange(e, 'max')}
                        className="price-range-thumb"
                        style={{ zIndex: 4 }}
                    />
                </div>
                <div className="flex gap-2 mt-4">
                    <div className="flex-1">
                        <label className="text-xs text-text-muted mb-1 block">Min</label>
                        <input
                            type="number" min={MIN_PRICE} max={filters.priceRange.max} step={50}
                            value={filters.priceRange.min}
                            onChange={e => handlePriceChange(e, 'min')}
                            className="w-full border border-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent bg-bg"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="text-xs text-text-muted mb-1 block">Max</label>
                        <input
                            type="number" min={filters.priceRange.min} max={MAX_PRICE} step={50}
                            value={filters.priceRange.max}
                            onChange={e => handlePriceChange(e, 'max')}
                            className="w-full border border-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent bg-bg"
                        />
                    </div>
                </div>
            </div>

            {/* --------- CSS AND SYLE ---------- */}
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