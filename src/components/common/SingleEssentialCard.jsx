import { FiHeart, FiShoppingBag } from 'react-icons/fi'

const SingleEssentialCard = ({ img, name, variant }) => {
    return (
        <div className="md:w-87 w-full rounded-3xl border border-neutral-200 cursor-pointer overflow-hidden group relative transition-all duration-500 ease-out hover:-translate-y-2 shadow-[0_12px_40px_rgba(0,0,0,0.12)] hover:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.35)]">

            {/* Image ------------ */}
            <div className="relative h-[200px] md:h-70 flex items-center justify-center">
                <img
                    src={img}
                    alt={name}
                    className="max-h-[140px] md:max-h-[210px] w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                />

                {/* Hover ------- */}
                <div className=" absolute top-1/2 right-2 md:right-4 -translate-y-1/2 flex flex-col gap-2 md:gap-3 translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 " >
                    <button className="h-9 w-9 md:h-11 md:w-11 rounded-full bg-white border cursor-pointer border-neutral-300 flex items-center justify-center hover:border-neutral-900 transition" aria-label="Add to cart" >
                        <FiShoppingBag size={16} />
                    </button>

                    <button className=" h-9 w-9 md:h-11 md:w-11 rounded-full bg-white border cursor-pointer border-neutral-300 flex items-center justify-center hover:border-neutral-900 transition " aria-label="Add to wishlist" >
                        <FiHeart size={16} />
                    </button>
                </div>
            </div>

            {/* Content ------------ */}
            <div className="px-3 md:px-5 py-3 md:py-4">
                <h3 className="text-[14px] md:text-[16px] font-medium text-neutral-900 truncate">
                    {name}
                </h3>
                <p className="text-[12px] md:text-[13px] text-neutral-500 mt-1 truncate">
                    {variant}
                </p>

                {/* Color ------------ */}
                <div className="flex items-center gap-1.5 md:gap-2 mt-3 md:mt-4">
                    <span className="h-2.5 w-2.5 md:h-3 md:w-3 rounded-full bg-black" />
                    <span className="h-2.5 w-2.5 md:h-3 md:w-3 rounded-full bg-orange-500" />
                    <span className="h-2.5 w-2.5 md:h-3 md:w-3 rounded-full bg-neutral-400" />
                    <span className="h-2.5 w-2.5 md:h-3 md:w-3 rounded-full bg-emerald-500" />
                    <span className="h-2.5 w-2.5 md:h-3 md:w-3 rounded-full bg-sky-400" />
                </div>
            </div>
        </div>
    );
};

export default SingleEssentialCard;
