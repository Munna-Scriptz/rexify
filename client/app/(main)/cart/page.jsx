import React from 'react'
import OrderSummary from '../../components/cart/OrderSummary';
import EmptyCart from '../../components/cart/EmptyCart';
import CartCard from '../../components/cards/CartCard';
import { apiClient } from '@/app/lib/apiClient';

const Cart = async () => {
    // -------- From server ---------
    const carts = await apiClient.get("/cart", {
        cache: 'no-store'
    });

    // Empty State Component
    if (!carts?.data || carts.data?.items?.length === 0) {
        return (
            <EmptyCart />
        )
    }

    return (
        <div className="min-h-screen bg-bg font-primary py-12">
            <div className="container">
                <h1 className="text-3xl font-bold font-space mb-8">Shopping Cart <span className="text-text-secondary text-xl font-normal">({carts?.data?.items?.length} items)</span></h1>

                <div className="grid lg:grid-cols-3 gap-8 md:gap-12">

                    {/* Cart Items List */}
                    <div className="lg:col-span-2 space-y-6">
                        {carts?.data?.items?.map((item, i) => (
                            <CartCard key={i} item={item} />
                        ))}
                    </div>

                    {/* Order Summary */}
                    <OrderSummary cartItems={carts?.data?.items} to={"/checkout"} />

                </div>
            </div>
        </div>
    )
}

export default Cart