import React from 'react'

const ServiceCard = ({ item }) => {
    return (
        <div className=" group relative p-6 h-full bg-linear-to-br from-white to-gray-50 rounded-3xl border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-lg transition-all duration-500 ease-out hover:bg-linear-to-br hover:from-white hover:to-blue-50 overflow-hidden">
            {/* Decorative Background Blur */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-100 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-3xl" />

            {/* Corner accent line */}
            <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-blue-200 rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Icon - Clean & Minimal */}
            <div className="flex items-center gap-3">
                <div className="relative z-10 flex items-center justify-center w-14 h-14 rounded-2xl bg-linear-to-br from-blue-50 to-blue-100 text-blue-600 mb-6 group-hover:scale-105 group-hover:shadow-md transition-all duration-500">
                    <item.icon size={28} strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-semibold text-coil mb-3 tracking-tight">
                    {item.title}
                </h3>
            </div>

            {/* Text */}
            <div className="relative z-10">
                <p className="text-text-secondary text-sm leading-relaxed font-normal select-none">
                    {item.desc}
                </p>
            </div>
        </div>
    )
}

export default ServiceCard