import { HeartOff } from 'lucide-react';
import { FiHeart, FiShoppingBag } from 'react-icons/fi'


const SingleWishlistCard = ({ img, badge, name, variant, price, rating, reviews }) => {
    return (
        <div className="w-77.5 mx-auto rounded-2xl border border-border overflow-hidden group relative">

            {/* Image Section */}
            <div className="relative h-65 flex items-center justify-center">
                <img
                    src={img}
                    alt={name}
                    className="h-50 object-contain transition-transform duration-500 group-hover:scale-105"
                />

                {/* Floating badge */}
                <span className="absolute top-4 left-4 text-[11px] tracking-wide uppercase px-3 py-1 rounded-full border border-neutral-300 text-text-secondary bg-white">
                    {badge}
                </span>

                {/* Remove  */}
                <button
                    className="absolute top-3 right-3 h-8 w-8 rounded-full cursor-pointer bg-white/80 hover:bg-white text-text-muted hover:text-red-500 flex items-center justify-center transition-all shadow-sm hover:shadow-md opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
                    aria-label="Remove"
                >
                    <HeartOff size={16} />
                </button>

                {/* Hover Actions */}
                <div className="absolute bottom-4 left-0 w-full px-4 flex justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <button
                        className="w-full py-2.5 rounded-xl cursor-pointer bg-neutral-900 text-white font-medium text-sm flex items-center justify-center gap-2 shadow-lg hover:bg-black transition-colors"
                        aria-label="Add to cart">
                        <FiShoppingBag size={16} /> Add to Cart
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="px-5 py-4">
                <h3 className="text-[15px] font-medium text-neutral-900 leading-snug">
                    {name} <br />
                    <span className="text-neutral-500 font-normal">
                        {variant}
                    </span>
                </h3>

                <div className="mt-4 flex items-center justify-between">
                    <p className="text-[17px] font-semibold text-neutral-900">
                        ${price}
                    </p>

                    <div className="flex items-center gap-1 text-[13px] text-neutral-600">
                        <span className="text-neutral-900">★</span>
                        {rating}
                        <span className="text-neutral-400">({reviews})</span>
                    </div>
                </div>
            </div>

            {/* Bottom Accent Line */}
            <div className="h-0.5 w-full bg-linear-to-r from-transparent via-neutral-300 to-transparent opacity-0 group-hover:opacity-100 transition" />
        </div>
    );
};

export default SingleWishlistCard;
