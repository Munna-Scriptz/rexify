import React, { useState } from 'react'
import { FiBarChart2, FiInfo } from 'react-icons/fi';

const TotalOrders = ({ orders }) => {
    const [isDeductEnabled, setIsDeductEnabled] = useState(false);

    return (
        <section className={`p-6 bg-white rounded-2xl w-[50%] border border-border shadow-sm hover:shadow-xl transition-all duration-300 group`}>
            {/* ------------------- Header --------------------- */}
            <div className='flex items-start justify-between'>
                <div className='flex items-center gap-4'>
                    <div className='bg-surface w-11 h-11 rounded-xl flex items-center justify-center border border-border/50 group-hover:bg-accent/10 group-hover:text-accent transition-all'>
                        <FiBarChart2 className='text-xl' />
                    </div>
                    <h2 className='text-text-primary font-bold text-base font-space'>Total Orders</h2>
                </div>

                <div className='flex flex-col items-end gap-1.5'>
                    <span className='text-text-muted text-[10px] font-bold uppercase tracking-wider'>Only completed</span>
                    <div className='flex items-center gap-3'>
                        {/* Custom Toggle Switch */}
                        <div
                            onClick={() => setIsDeductEnabled(!isDeductEnabled)}
                            className={`w-11 h-6 rounded-full p-1 cursor-pointer transition-all duration-300 ${isDeductEnabled ? 'bg-accent' : 'bg-muted'}`}
                        >
                            <div className={`bg-white w-4 h-4 rounded-full shadow-sm transition-transform duration-300 ${isDeductEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
                        </div>
                        <FiInfo className='text-text-muted text-lg cursor-pointer hover:text-accent transition-colors' />
                    </div>
                </div>
            </div>

            {/* ------------------- Balance Content --------------------- */}
            <div className='mt-8 flex items-baseline gap-2'>
                <h1 className='text-accent text-4xl font-black font-space tracking-tight'>{orders}</h1>
                <span className='text-text-muted text-sm font-semibold uppercase'>Orders</span>
            </div>
        </section>
    )
}

export default TotalOrders;