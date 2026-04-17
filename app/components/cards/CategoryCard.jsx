import { ArrowRight } from 'lucide-react'
import React from 'react'

const CategoryCard = ({item}) => {
    return (
        <div
            className="group relative md:h-100 h-60 rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500"
        >
            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
            </div>

            {/* Content */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex items-center gap-3 mb-2 text-white/80">
                        <div className="p-2 bg-white/10 backdrop-blur-md rounded-lg">
                            {item.icon}
                        </div>
                        <span className="text-sm font-medium uppercase tracking-wider">{item.count}</span>
                    </div>

                    <h3 className="text-3xl font-bold text-white mb-4 font-space">{item.title}</h3>

                    <div className="flex items-center gap-2 text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                        Shop Now <ArrowRight size={20} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategoryCard