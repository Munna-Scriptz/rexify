import React from 'react'
import { FiHome } from 'react-icons/fi';

const TotalEarning = ({ earning, charges }) => {
    return (
        <section className={`p-6 bg-white rounded-2xl w-[50%] border border-border shadow-sm hover:shadow-xl transition-all duration-300 group`}>
            {/* ------------------- Header --------------------- */}
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-4'>
                    <div className='bg-surface w-11 h-11 rounded-xl flex items-center justify-center border border-border/50 group-hover:bg-accent/10 group-hover:text-accent transition-all'>
                        <FiHome className='text-xl' />
                    </div>
                    <h2 className='text-text-primary font-bold text-base font-space'>Total Earning</h2>
                </div>

                <div className='flex items-center gap-2'>
                    <button className='bg-accent hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-lg shadow-accent/10'>
                        View
                    </button>
                    <button className='bg-surface hover:bg-muted text-text-secondary px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer border border-border/50'>
                        Withdraw
                    </button>
                </div>
            </div>

            {/* ------------------- Balance Content --------------------- */}
            <div className='mt-8 flex items-end justify-between'>
                <div className='flex items-baseline gap-2'>
                    <h1 className='text-success text-4xl font-black font-space tracking-tight'>{earning}</h1>
                    <span className='text-text-muted text-sm font-bold uppercase'>BDT</span>
                </div>

                <div className='text-right'>
                    <p className='text-text-muted text-[11px] font-bold uppercase tracking-wider mb-1'>Charges</p>
                    <p className='text-text-primary font-semibold text-sm font-space'>{charges} <span className='text-text-muted font-normal'>BDT</span></p>
                </div>
            </div>
        </section>
    )
}

export default TotalEarning;