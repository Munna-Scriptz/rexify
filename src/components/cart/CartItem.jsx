import React from 'react'
import CartCard from '../cards/CartCard';

const CartItem = ({ cartItems, setCartItems }) => {

    const updateQuantity = (id, change) => {
        setCartItems(prevItems => prevItems.map(item => {
            if (item.id === id) {
                const newQuantity = Math.max(1, item.quantity + change);
                return { ...item, quantity: newQuantity };
            }
            return item;
        }));
    };

    // Remove Item Handler
    const removeItem = (id) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    return (
        <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
                <CartCard key={item.id} item={item} removeItem={removeItem} updateQuantity={updateQuantity} z/>
            ))}
        </div>
    )
}

export default CartItem