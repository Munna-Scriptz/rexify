"use client"

import React from 'react'
import { Trash2 } from 'lucide-react'
import { toast } from 'react-toastify';
import { apiClient } from '@/app/lib/apiClient';
import { refreshCart } from '@/app/lib/RefreshCart';

const CartCard = ({ item }) => {
    const cart = item.product.variants.find(item => item.sku === item.sku);

    const removeCart = async () => {
        try {
            await apiClient.delete(`/cart/delete/?product=${item.product._id}&sku=${item.sku}`);
            await refreshCart();
            toast.success("Cart deleted")
        } catch (error) {
            toast.error("Something went wrong")
        }
    }

    const updateCart = async (quantity) => {
        if (quantity < 1) return;
        if (quantity > 20) return;

        try {
            await apiClient.patch(`/cart/update`, {
                product: item.product._id,
                sku: item.sku,
                quantity
            });
            await refreshCart();
        } catch (error) {
            toast.error("Something went wrong")
        }
    }

    return (
        <div className="flex flex-col sm:flex-row gap-6 p-6 bg-surface rounded-2xl border border-border group hover:border-accent/30 transition-all">

            {/* Image */}
            <div className="w-full sm:w-32 h-32 bg-white rounded-xl shrink-0 overflow-hidden p-2 text-center">
                <img src={cart.thumbnail} alt={item.product.title} className="w-full h-full object-contain mx-auto" />
            </div>

            {/* Details */}
            <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-bold text-lg text-text-primary mb-1">
                            {item.product.title}
                        </h3>

                        <div className="flex items-center gap-2 text-sm text-text-secondary mb-1">
                            {/* Color pallet */}
                            <span
                                className="w-4 h-4 rounded-full border border-border"
                                style={{ backgroundColor: cart.color.code }}
                            />

                            {/* Color name */}
                            <span>{cart.color.name}</span>

                            {/* Storage */}
                            {cart.storage && (
                                <span>• {cart.storage}</span>
                            )}

                            {/* RAM */}
                            {cart.ram && (
                                <span>• {cart.ram} RAM</span>
                            )}
                        </div>
                    </div>
                    <button onClick={removeCart} className='text-text-muted hover:text-red-500 p-1 cursor-pointer'>
                        <Trash2 size={20} />
                    </button>
                </div>

                <div className="flex justify-between items-end mt-4">
                    {/* Quantity Control */}
                    <div className="flex items-center gap-3 bg-white border border-border rounded-lg p-1">
                        <button
                            onClick={() => updateCart(item.quantity - 1)}
                            className='w-8 h-8 flex items-center cursor-pointer justify-center rounded-md hover:bg-muted text-text-secondary transition-colors'>
                            -
                        </button>
                        <span className="text-sm font-semibold w-6 text-center select-none">{item.quantity}</span>
                        <button
                            onClick={() => updateCart(item.quantity + 1)}
                            className='w-8 h-8 flex items-center cursor-pointer justify-center rounded-md hover:bg-muted text-text-secondary transition-colors'>
                            +
                        </button>
                    </div>

                    <p className="font-bold text-xl font-space">${item.subTotal}</p>
                </div>
            </div>
        </div>
    )
}

export default CartCard
