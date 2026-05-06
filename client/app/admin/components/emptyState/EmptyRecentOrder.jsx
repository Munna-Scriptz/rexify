import React from 'react'
import { FiBox } from 'react-icons/fi'

const EmptyRecentOrder = ({ setSearchData, OrderData }) => {
    return (
        <div className="flex flex-col items-center justify-center py-24 bg-surface/20 rounded-4xl border border-dashed border-border/50">
            <div className="bg-white p-6 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-border mb-6">
                <FiBox className="text-6xl text-accent/30" />
            </div>
            <h3 className="text-text-primary text-xl font-bold font-space">No Orders Found</h3>
            <p className="text-text-muted mt-2 max-w-xs text-center text-sm leading-relaxed">It looks like there are no orders to display at the moment. New customer orders will appear here automatically.</p>
            <button onClick={() => setSearchData(OrderData)} className="mt-8 bg-accent text-white px-6 py-2.5 rounded-xl font-bold text-xs transition-all hover:bg-black cursor-pointer shadow-lg shadow-accent/10">
                Reload Dummy Data
            </button>
        </div>
    )
}

export default EmptyRecentOrder