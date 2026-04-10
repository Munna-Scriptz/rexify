import React from 'react'
import { Edit3, MapPin, Plus, Trash2, CreditCard } from 'lucide-react';

const AddressTab = ({ addressData }) => {
  return (
    <div className="animate-slide-in-from-bottom-3 duration-500 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold font-space text-text-primary flex items-center gap-3">
          <MapPin size={22} className="text-accent" />
          Saved Addresses
        </h2>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-accent text-white font-bold text-sm rounded-xl hover:shadow-lg hover:shadow-accent/30 active:scale-95 transition-all cursor-pointer">
          <Plus size={18} /> Add New Address
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addressData.map((item) => (
          <div key={item.id} className={`bg-white p-8 rounded-2xl border transition-all duration-300 relative group shadow-sm hover:shadow-md ${item.isDefault ? 'border-accent ring-1 ring-accent/20 shadow-lg shadow-accent/5' : 'border-border'}`}>
            {item.isDefault && (
              <div className="absolute top-4 right-4 bg-accent text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-tighter shadow-sm">
                Default
              </div>
            )}
            <div className="w-12 h-12 rounded-xl bg-accent/5 flex items-center justify-center text-accent mb-6">
              <MapPin size={24} strokeWidth={2.2} />
            </div>
            <h4 className="text-lg font-bold text-text-primary mb-3 font-space">{item.type} Delivery</h4>
            <p className="text-sm text-text-secondary mb-2 leading-relaxed">{item.details}</p>
            <p className="text-sm font-semibold text-text-primary mb-8 flex items-center gap-2">
              <CreditCard size={14} className="text-text-muted" /> {item.phone}
            </p>

            <div className="flex items-center gap-6 pt-6 border-t border-border/50">
              <button className="text-sm font-bold text-text-primary hover:text-accent transition-colors flex items-center gap-1.5 cursor-pointer">
                <Edit3 size={15} /> Edit
              </button>
              {!item.isDefault && (
                <button className="text-sm font-bold text-text-muted hover:text-red-500 transition-colors flex items-center gap-1.5 cursor-pointer">
                  <Trash2 size={15} /> Delete
                </button>
              )}
              {!item.isDefault && (
                <button className="text-xs font-bold text-accent ml-auto hover:underline cursor-pointer">
                  Set as Default
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AddressTab