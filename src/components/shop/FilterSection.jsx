import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FilterSection = ({ title, icon: Icon, children, defaultOpen = true }) => {
    const [open, setOpen] = useState(defaultOpen);

    return (
        <div className="border-b border-border py-4">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center cursor-pointer justify-between group mb-1"
            >
                {/* Left: icon + title */}
                <span className="flex items-center gap-2.5">
                    {Icon && (
                        <span className="flex items-center justify-center w-6 h-6 rounded-md bg-accent/10 text-accent">
                            <Icon size={13} strokeWidth={2.2} />
                        </span>
                    )}
                    <span className="font-semibold text-text-primary text-sm group-hover:text-accent transition-colors">
                        {title}
                    </span>
                </span>

                {/* Chevron — rotates instead of swapping icons */}
                <ChevronDown
                    size={15}
                    strokeWidth={2.2}
                    className={`text-text-secondary transition-transform duration-200 ${open ? 'rotate-180' : 'rotate-0'}`}
                />
            </button>

            {/* Collapsible content */}
            <div
                className={`overflow-hidden transition-all duration-200 ${open ? 'mt-3 opacity-100' : 'max-h-0 opacity-0'}`}
            >
                {children}
            </div>
        </div>
    );
};

export default FilterSection;