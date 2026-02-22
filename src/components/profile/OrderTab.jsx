import React from 'react'
import { ChevronRight, ShoppingBag, Plus, Clock } from 'lucide-react';

const OrderTab = ({ orderData }) => {
  return (
    <div className="animate-slide-in-from-bottom-3 duration-500 space-y-6">
      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="p-8 border-b border-border flex items-center justify-between bg-white sticky top-0 z-10">
          <h2 className="text-xl font-bold font-space text-text-primary flex items-center gap-3">
            <ShoppingBag size={22} className="text-accent" />
            Purchase History
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-text-secondary bg-surface px-3 py-1 rounded-full border border-border">
              Total Orders: {orderData.length}
            </span>
          </div>
        </div>

        <div className="divide-y divide-border">
          {orderData.map((item) => (
            <div key={item.id} className="p-8 hover:bg-surface/50 transition-colors group">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-muted rounded-xl border border-border overflow-hidden p-2 group-hover:scale-105 transition-transform duration-500">
                    <img src={item.img} alt="order item" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1.5">
                      <span className="text-lg font-bold text-text-primary font-space">{item.id}</span>
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${item.status === 'Delivered'
                        ? 'bg-green-50 text-green-600 border-green-100'
                        : item.status === 'Processing'
                          ? 'bg-blue-50 text-blue-600 border-blue-100'
                          : 'bg-red-50 text-red-600 border-red-100'
                        }`}>
                        {item.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-text-secondary">
                      <span className="flex items-center gap-1.5"><Clock size={14} /> {item.date}</span>
                      <span className="w-1 h-1 bg-border rounded-full"></span>
                      <span>{item.items} {item.items > 1 ? 'Items' : 'Item'}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between md:flex-col md:items-end gap-2">
                  <span className="text-xl font-bold text-text-primary">{item.total}</span>
                  <button className="text-xs font-bold text-accent hover:underline flex items-center gap-1 transition-all cursor-pointer">
                    View Details <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-8 bg-surface/30 text-center">
          <button className="text-sm font-bold text-text-secondary hover:text-accent transition-colors flex items-center gap-2 mx-auto cursor-pointer">
            Load older orders <Plus size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default OrderTab