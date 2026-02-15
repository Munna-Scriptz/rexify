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
                    className="absolute top-3 right-3 h-8 w-8 rounded-full cursor-pointer bg-coil/40 hover:bg-red-500 text-white hover:text- flex items-center justify-center duration-300 shadow-sm hover:shadow-md translate-y-2"
                    aria-label="Remove"
                >
                    <HeartOff size={18} />
                </button>
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


                {/* Hover Actions */}
                    <button
                    className='w-full py-2.5 mt-3 bg-accent cursor-pointer text-white font-medium rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-accent/20'
                        aria-label="Add to cart">
                        <FiShoppingBag size={16} /> Add to Cart
                    </button>
            </div>

            {/* Bottom Accent Line */}
            <div className="h-0.5 w-full bg-linear-to-r from-transparent via-neutral-300 to-transparent opacity-0 group-hover:opacity-100 transition" />
        </div>
    );
};

export default SingleWishlistCard;
