import React from 'react'
import { ChevronRight, ShoppingBag, Clock, Package, RefreshCw } from 'lucide-react';

const statusConfig = {
  Delivered: {
    bg: 'bg-[#f0fdf4]',
    text: 'text-[#16a34a]',
    border: 'border-[#bbf7d0]',
    dot: 'bg-[#22c55e]',
    shadow: 'shadow-[0_0_6px_#22c55e66]',
  },
  Processing: {
    bg: 'bg-[#eff6ff]',
    text: 'text-accent',
    border: 'border-[#bfdbfe]',
    dot: 'bg-accent',
    shadow: 'shadow-[0_0_6px_#155dfc66]',
  },
  Cancelled: {
    bg: 'bg-[#fef2f2]',
    text: 'text-[#dc2626]',
    border: 'border-[#fecaca]',
    dot: 'bg-[#ef4444]',
    shadow: 'shadow-[0_0_6px_#ef444466]',
  },
};

const OrderTab = ({ orderData }) => {
  return (
    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-3 duration-500">

      {/* ── Header Card ── */}
      <div className="bg-white rounded-2xl border border-[#e8edf5] shadow-[0_2px_16px_#155dfc08] overflow-hidden">

        {/* Top accent stripe */}
        <div className="h-1 w-full bg-linear-to-r from-accent via-[#4d8bff] to-accent/30" />

        {/* Sticky header */}
        <div className="px-6 py-5 border-b border-[#f1f5f9] flex items-center justify-between bg-white sticky top-0 z-10">
          <h2 className="text-base font-bold text-[#0f172a] flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#eff6ff] border border-accent/15 flex items-center justify-center">
              <ShoppingBag size={15} className="text-accent" />
            </div>
            Purchase History
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-[#64748b] bg-[#f8faff] border border-[#e8edf5] px-3 py-1.5 rounded-full uppercase tracking-widest">
              {orderData.length} Orders
            </span>
          </div>
        </div>

        {/* Order rows */}
        <div className="divide-y divide-[#f1f5f9]">
          {orderData.map((item) => {
            const s = statusConfig[item.status] ?? statusConfig.Processing;
            return (
              <div
                key={item.id}
                className="px-6 py-5 hover:bg-[#f8faff] transition-colors duration-200 group"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

                  {/* Left — image + info */}
                  <div className="flex items-center gap-5">
                    {/* Product image */}
                    <div className="w-18 h-18 shrink-0 bg-[#f8faff] rounded-xl border border-[#e8edf5] overflow-hidden p-2 group-hover:border-accent/20 group-hover:shadow-[0_4px_14px_#155dfc0d] transition-all duration-300">
                      <img
                        src={item.img}
                        alt="order item"
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Info */}
                    <div>
                      <div className="flex items-center gap-2.5 mb-2 flex-wrap">
                        <span className="text-sm font-bold text-[#0f172a] font-mono">{item.id}</span>

                        {/* Status badge */}
                        <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${s.bg} ${s.text} ${s.border}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${s.dot} ${s.shadow}`} />
                          {item.status}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-[#94a3b8] flex-wrap">
                        <span className="flex items-center gap-1.5">
                          <Clock size={12} className="text-[#cbd5e1]" />
                          {item.date}
                        </span>
                        <span className="w-1 h-1 bg-[#e2e8f0] rounded-full" />
                        <span className="flex items-center gap-1.5">
                          <Package size={12} className="text-[#cbd5e1]" />
                          {item.items} {item.items > 1 ? 'Items' : 'Item'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right — total + action */}
                  <div className="flex items-center justify-between md:flex-col md:items-end gap-2 md:shrink-0">
                    <span className="text-lg font-bold text-[#0f172a]">{item.total}</span>
                    <button className="inline-flex items-center gap-1 text-[11px] font-bold text-accent border border-accent/20 bg-[#eff6ff] px-3 py-1.5 rounded-full hover:bg-accent hover:text-white hover:border-accent hover:shadow-[0_4px_10px_#155dfc33] transition-all duration-200 cursor-pointer uppercase tracking-wide">
                      Details <ChevronRight size={12} />
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Load more footer */}
        <div className="px-6 py-5 bg-[#f8faff] border-t border-[#f1f5f9] flex items-center justify-center">
          <button className="inline-flex items-center gap-2 text-xs font-bold text-[#64748b] hover:text-accent bg-white border border-[#e8edf5] hover:border-accent/25 hover:bg-[#eff6ff] hover:shadow-[0_4px_10px_#155dfc14] px-5 py-2.5 rounded-full transition-all duration-200 cursor-pointer uppercase tracking-widest">
            <RefreshCw size={13} />
            Load Older Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderTab;