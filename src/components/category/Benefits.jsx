import React from 'react'
import { Truck, RotateCcw, Gift, Headset, ShieldCheck } from 'lucide-react';

const Benefits = () => {
    const benefits = [
        { icon: Truck, title: "Free shipping", desc: "On orders over £50" },
        { icon: RotateCcw, title: "Easy returns", desc: "Free within 30 days" },
        { icon: Gift, title: "Special gifts", desc: "Free with select orders" },
        { icon: Headset, title: "Support 24/7", desc: "Help when you need it" },
        { icon: ShieldCheck, title: "Secured payment", desc: "100% safe" },
    ];
    return (
        <section className="border border-muted rounded-xl p-6 md:p-8 shadow-sm">
            <div className="flex flex-wrap justify-center md:justify-between items-center gap-8 md:gap-6">
                {benefits.map((item, idx) => (
                    <div
                        key={idx}
                        className={`flex items-center gap-3 ${idx !== benefits.length - 1 ? 'pr-8 md:pr-16 border-r-3 border-coil/50' : ''}`}
                    >
                        {/* Icon with border */}
                        <div className="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center shrink-0">
                            <item.icon size={24} className="text-gray-700" strokeWidth={1.5} />
                        </div>

                        {/* Text content */}
                        <div className="text-left">
                            <h4 className="text-sm font-semibold text-gray-900">{item.title}</h4>
                            <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Benefits