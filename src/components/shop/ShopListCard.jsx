import { Star } from 'lucide-react'
import React from 'react'
import { FiHeart } from 'react-icons/fi'

const ProductListView = ({ item }) => {
  return (
    <div className="flex gap-5 rounded-2xl border border-border overflow-hidden group bg-bg hover:shadow-lg transition-all duration-300 p-4">
      <div className="w-36 h-32 shrink-0 bg-surface rounded-xl flex items-center justify-center overflow-hidden">
        <img src={item.img} alt={item.name} className="h-24 object-contain group-hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="flex-1 flex flex-col justify-between py-1">
        <div>
          <p className="text-xs text-text-muted uppercase tracking-wider mb-1">{item.brand} · {item.category}</p>
          <h3 className="font-semibold text-text-primary">{item.name}</h3>
          <div className="flex items-center gap-1.5 mt-1.5">
            <Star size={13} className="text-yellow-400 fill-yellow-400" />
            <span className="text-xs font-semibold text-text-primary">{item.rating}</span>
            <span className="text-xs text-text-muted">({item.reviews.toLocaleString()} reviews)</span>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-3">
          {!item.inStock && <span className="text-xs text-error font-medium">Out of Stock</span>}
          {item.inStock && <span className="text-xs text-success font-medium">In Stock</span>}
          <span className="text-[11px] px-2.5 py-1 rounded-full border border-border text-text-muted">{item.badge}</span>
        </div>
      </div>
      <div className="flex flex-col items-end justify-between shrink-0">
        <span className="text-xl font-bold text-text-primary">${item.price.toLocaleString()}</span>
        <div className="flex gap-2">
          <button className="h-9 w-9 rounded-xl border border-border flex items-center justify-center text-text-secondary hover:border-accent hover:text-accent transition-all" aria-label="Wishlist">
            <FiHeart size={16} />
          </button>
          <button className="h-9 px-4 rounded-xl bg-accent text-white text-sm font-semibold hover:bg-blue-700 transition-all disabled:opacity-40" disabled={!item.inStock}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductListView