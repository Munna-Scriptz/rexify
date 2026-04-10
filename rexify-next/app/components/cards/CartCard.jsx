import React from 'react'
import { Trash2, Minus, Plus } from 'lucide-react'
import Button from '../ui/Buttons'

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
                    <Button variant='delete' onClick={() => removeItem(item.id)}>
                        <Trash2 size={20} />
                    </Button>
                </div>

                <div className="flex justify-between items-end mt-4">
                    {/* Quantity Control */}
                    <div className="flex items-center gap-3 bg-white border border-border rounded-lg p-1">
                        <Button variant='quantity' onClick={() => updateQuantity(item.id, -1)} disabled={item.quantity <= 1}>
                            -
                        </Button>
                        <span className="text-sm font-semibold w-6 text-center select-none">{item.quantity}</span>
                        <Button variant='quantity' onClick={() => updateQuantity(item.id, 1)} >
                            +
                        </Button>
                    </div>

                    <p className="font-bold text-xl font-space">${(item.price * item.quantity).toLocaleString()}</p>
                </div>
            </div>
        </div>
    )
}

export default CartCard
