import { Star } from 'lucide-react'
import React from 'react'
import { FiHeart } from 'react-icons/fi'

const ProductListView = ({ item }) => {
  return (
    <div className="flex flex-row gap-3 sm:gap-5 rounded-2xl border border-border overflow-hidden group bg-bg hover:shadow-lg transition-all duration-300 p-2.5 sm:p-4">
      {/* Image Container */}
      <div className="w-24 xs:w-28 sm:w-40 h-24 sm:h-36 shrink-0 bg-surface rounded-xl flex items-center justify-center overflow-hidden relative">
        <img src={item.img} alt={item.name} className="h-20 sm:h-24 object-contain group-hover:scale-105 transition-transform duration-300" />
        <span className="hidden sm:inline-block absolute top-2 left-2 text-[10px] px-2 py-0.5 rounded-full bg-white/80 backdrop-blur-sm border border-border shadow-sm text-text-secondary font-medium uppercase tracking-tighter">
          {item.badge}
        </span>
      </div>

      {/* Content Area */}
      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
        <div className="min-w-0">
          <p className="text-[9px] sm:text-xs text-text-muted uppercase tracking-wider mb-0.5 truncate">{item.brand} · {item.category}</p>
          <h3 className="font-semibold text-text-primary text-sm sm:text-lg leading-tight line-clamp-2">{item.name}</h3>

          <div className="flex items-center gap-1.5 mt-1 sm:mt-2">
            <div className="flex items-center gap-1 px-1 sm:px-1.5 py-0.5 bg-yellow-400/10 rounded-md">
              <Star size={10} className="text-yellow-400 fill-yellow-400 sm:size-3" />
              <span className="text-[10px] sm:text-xs font-bold text-text-primary">{item.rating}</span>
            </div>
            <span className="text-[10px] sm:text-xs text-text-muted hidden xs:inline">({item.reviews.toLocaleString()})</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          {!item.inStock && <span className="text-[10px] sm:text-xs text-error font-bold px-1.5 py-0.5 bg-red-50 rounded-lg">Out</span>}
          {item.inStock && <span className="text-[10px] sm:text-xs text-success font-bold px-1.5 py-0.5 bg-green-50 rounded-lg">Stock</span>}
          <span className="xs:hidden text-[9px] px-2 py-0.5 rounded-full border border-border text-text-muted whitespace-nowrap truncate max-w-15">{item.badge}</span>
        </div>
      </div>

      {/* Action Area */}
      <div className="flex flex-col items-end justify-between shrink-0 pl-1 sm:pl-0">
        <span className="text-lg sm:text-2xl font-semibold text-text-primary">${item.price.toLocaleString()}</span>
        <div className="flex gap-1.5 sm:gap-2">
          <button className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg sm:rounded-xl border border-border flex items-center justify-center text-text-secondary hover:border-accent hover:text-accent transition-all active:scale-95 bg-surface" aria-label="Wishlist">
            <FiHeart size={14} className="sm:size-4" />
          </button>
          <button
            className="h-8 px-2.5 sm:h-9 sm:px-4 rounded-lg sm:rounded-xl bg-accent text-white text-[10px] sm:text-sm font-bold shadow-lg shadow-accent/20 hover:bg-blue-700 transition-all disabled:opacity-40 active:scale-95 whitespace-nowrap"
            disabled={!item.inStock}
          >
            <span className="sm:hidden">Add</span>
            <span className="hidden sm:inline">Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductListView