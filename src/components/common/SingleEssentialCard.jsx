import { FiHeart, FiShoppingBag } from 'react-icons/fi'

const SingleEssentialCard = ({ img, name, variant }) => {
    return (
        <div className="md:w-87 w-full rounded-3xl border border-neutral-200 cursor-pointer overflow-hidden group relative transition-all duration-500 ease-out hover:-translate-y-2 shadow-[0_12px_40px_rgba(0,0,0,0.12)] hover:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.35)]">

            {/* Image ------------ */}
            <div className="relative h-70 flex items-center justify-center">
                <img
                    src={img}
                    alt={name}
                    className="h-52.5 object-contain transition-transform duration-500 group-hover:scale-105"
                />

                {/* Hover ------- */}
                <div className=" absolute top-1/2 right-4 -translate-y-1/2 flex flex-col gap-3 translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 " >
                    <button className="h-11 w-11 rounded-full bg-white border cursor-pointer border-neutral-300 flex items-center justify-center hover:border-neutral-900 transition" aria-label="Add to cart" >
                        <FiShoppingBag size={18} />
                    </button>

                    <button className=" h-11 w-11 rounded-full bg-white border cursor-pointer border-neutral-300 flex items-center justify-center hover:border-neutral-900 transition " aria-label="Add to wishlist" >
                        <FiHeart size={18} />
                    </button>
                </div>
            </div>

            {/* Content ------------ */}
            <div className="px-5 py-4">
                <h3 className="text-[16px] font-medium text-neutral-900">
                    {name}
                </h3>
                <p className="text-[13px] text-neutral-500 mt-1">
                    {variant}
                </p>

                {/* Color ------------ */}
                <div className="flex items-center gap-2 mt-4">
                    <span className="h-3 w-3 rounded-full bg-black" />
                    <span className="h-3 w-3 rounded-full bg-orange-500" />
                    <span className="h-3 w-3 rounded-full bg-neutral-400" />
                    <span className="h-3 w-3 rounded-full bg-emerald-500" />
                    <span className="h-3 w-3 rounded-full bg-sky-400" />
                </div>
            </div>
        </div>
    );
};

export default SingleEssentialCard;
