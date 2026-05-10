import Link from 'next/link';
import { FiHeart, FiShoppingBag } from 'react-icons/fi'

const SellerCard = ({ img, badge, slug, title, variant, price, rating, reviews }) => {
    return (
        <Link href={`/product/${slug}`} className="md:w-77.5 w-70 mx-auto inline-block rounded-2xl border border-border overflow-hidden group relative select-none">

            {/* Image Section */}
            <div className="relative h-65 flex items-center justify-center">
                <img
                    src={img}
                    alt={title}
                    className="h-50 object-contain transition-transform duration-500 group-hover:scale-105"
                />

                {/* Floating badge */}
                <span className="absolute top-4 left-4 text-[11px] tracking-wide uppercase px-3 py-1 rounded-full border border-neutral-300 text-text-secondary bg-white">
                    {badge}
                </span>

                {/* Hover Actions */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    {/* Add to Cart */}
                    <button
                        className="h-11 w-11 rounded-full cursor-pointer border border-neutral-300 bg-white flex items-center justify-center text-text-primary hover:border-neutral-900 hover:text-neutral-900 transition"
                        aria-label="Add to cart"
                        onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                        }}
                    >
                        <FiShoppingBag size={18} />
                    </button>

                    {/* Wishlist */}
                    <button className="h-11 w-11 rounded-full cursor-pointer border border-neutral-300 bg-white flex items-center justify-center text-text-primary hover:border-neutral-900 hover:text-neutral-900 transition"
                        aria-label="Add to wishlist"
                        onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                        }}
                    >
                        <FiHeart size={18} />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="px-5 py-4">
                <h3 className="text-[15px] font-medium text-neutral-900 leading-snug">
                    {title} <br />
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
        </Link>
    );
};

export default SellerCard;
