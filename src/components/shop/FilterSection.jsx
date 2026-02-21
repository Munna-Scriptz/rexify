import React, { useState } from 'react'
import { ChevronDown, ChevronUp, X, SlidersHorizontal } from 'lucide-react';

const FilterSection = ({ title, children, defaultOpen = true }) => {
    const [open, setOpen] = useState(defaultOpen);
    return (
        <div className="border-b border-border py-5">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center cursor-pointer justify-between font-semibold text-text-primary text-sm mb-1"
            >
                {title}
                {open ? <ChevronUp size={16} className="text-text-secondary" /> : <ChevronDown size={16} className="text-text-secondary" />}
            </button>
            {open && <div className="mt-3">{children}</div>}
        </div>
    );
};

export default FilterSection