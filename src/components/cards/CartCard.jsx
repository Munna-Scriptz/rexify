import React from 'react'
import { Trash2, Minus, Plus } from 'lucide-react'

const CartCard = ({ item, removeItem, updateQuantity }) => {
    return (
        <div className="flex flex-col sm:flex-row gap-6 p-6 bg-surface rounded-2xl border border-border group hover:border-accent/30 transition-all">

            {/* Image */}
            <div className="w-full sm:w-32 h-32 bg-white rounded-xl shrink-0 overflow-hidden p-2 text-center">
                <img src={item.image} alt={item.name} className="w-full h-full object-contain mx-auto" />
            </div>

            {/* Details */}
            <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-bold text-lg text-text-primary mb-1">{item.name}</h3>
                        <p className="text-sm text-text-secondary mb-1">{item.color} {item.storage && `• ${item.storage}`}</p>
                    </div>
                    <button
                        onClick={() => removeItem(item.id)}
                        className="text-text-muted hover:text-red-500 transition-colors p-1"
                    >
                        <Trash2 size={20} />
                    </button>
                </div>

                <div className="flex justify-between items-end mt-4">
                    {/* Quantity Control */}
                    <div className="flex items-center gap-3 bg-white border border-border rounded-lg p-1">
                        <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-muted text-text-secondary transition-colors"
                            disabled={item.quantity <= 1}
                        >
                            <Minus size={14} />
                        </button>
                        <span className="text-sm font-semibold w-6 text-center">{item.quantity}</span>
                        <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-muted text-text-secondary transition-colors"
                        >
                            <Plus size={14} />
                        </button>
                    </div>

                    <p className="font-bold text-xl font-space">${(item.price * item.quantity).toLocaleString()}</p>
                </div>
            </div>
        </div>
    )
}

export default CartCard