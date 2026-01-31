import React from 'react'

const SingleCategoryCard = ({ item }) => {
    return (
        <div className="flex flex-col items-center gap-y-5 group cursor-pointer relative px-6 py-8 rounded-2xl transition-all duration-500 hover:bg-slate-50/50">
            <div className="relative">
                <div className="absolute -inset-2 rounded-full border border-slate-100 group-hover:border-slate-200 transition-all duration-500"></div>

                <div className='w-35 h-35 rounded-full overflow-hidden ring-1 ring-slate-200 ring-offset-4 ring-offset-white group-hover:ring-slate-300 group-hover:ring-offset-8 transition-all duration-700 ease-out shadow-lg group-hover:shadow-2xl'>
                    <img
                        src={item.img}
                        className='w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-1000 ease-out brightness-95 group-hover:brightness-100'
                        alt="category"
                    />
                </div>

                <div className="absolute top-0 right-0 w-2 h-2 bg-coil rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ring-2 ring-white"></div>
            </div>

            <div className="text-center space-y-2">
                <p className="text-coil font-normal text-sm uppercase tracking-[0.15em] group-hover:text-coil transition-all duration-500">
                    {item.name}
                </p>
                <div className="flex justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-1 h-1 rounded-full bg-slate-400"></div>
                    <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                    <div className="w-1 h-1 rounded-full bg-slate-400"></div>
                </div>
            </div>
        </div>
    )
}

export default SingleCategoryCard