import React, { useState } from 'react';
import { CreditCard, Landmark, Smartphone, ShieldCheck, CircleCheck, Wallet } from 'lucide-react';
import OrderSummary from '../components/cart/OrderSummary';
import VisaMeth from '../components/confirm/VisaMeth';
import BankMeth from '../components/confirm/BankNagadMeth';
import BkashNagadMeth from '../components/confirm/BkashMeth';
import BackUi from '../utils/BackUi';

const Confirm = () => {
    const [paymentMethod, setPaymentMethod] = useState('visa');

    // Mock cart items for the summary
    const [cartItems] = useState([
        { id: 1, name: "MacBook Air M3", price: 1099, quantity: 1, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca4?q=80&w=200&auto=format&fit=crop" },
        { id: 2, name: "Sony WH-1000XM5", price: 349, quantity: 1, image: "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?q=80&w=200&auto=format&fit=crop" }
    ]);

    const methods = [
        { id: 'visa', label: 'Visa / Mastercard', icon: CreditCard, description: 'Pay with your credit or debit card' },
        { id: 'bank', label: 'Bank Transfer', icon: Landmark, description: 'Direct transfer from your bank account' },
        { id: 'bkash', label: 'bKash', icon: Wallet, description: 'Fast mobile payment via bKash' },
        { id: 'nagad', label: 'Nagad', icon: Smartphone, description: 'Secure payment via Nagad' },
    ];

    return (
        <div className="min-h-screen bg-surface py-12 px-4 sm:px-6 lg:px-12 font-primary">
            <div className="container">
                {/* Breadcrumbs / Back */}
                
                <BackUi to={"/cart"} name={"Cart"}/>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Column: Payment Methods & Forms */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white rounded-2xl p-8 border border-border shadow-sm">
                            <h2 className="text-2xl font-bold font-space text-text-primary mb-2">Payment Method</h2>
                            <p className="text-text-secondary mb-8">Select your preferred payment method and enter your details.</p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                                {methods.map((method) => (
                                    <button
                                        key={method.id}
                                        onClick={() => setPaymentMethod(method.id)}
                                        className={`flex items-start gap-4 p-5 rounded-2xl border transition-all duration-300 relative text-left cursor-pointer ${paymentMethod === method.id
                                            ? 'border-accent bg-accent/5 ring-1 ring-accent/20 shadow-md'
                                            : 'border-border hover:border-gray-300 hover:bg-gray-50'
                                            }`}
                                    >
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${paymentMethod === method.id ? 'bg-accent text-white' : 'bg-surface text-text-muted'
                                            }`}>
                                            <method.icon size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-text-primary mb-1">{method.label}</h4>
                                            <p className="text-xs text-text-secondary leading-relaxed">{method.description}</p>
                                        </div>
                                        {paymentMethod === method.id && (
                                            <div className="absolute top-4 right-4 text-accent">
                                                <CircleCheck size={20} fill="currentColor" className="text-white" />
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>

                            {/* Payment Forms */}
                            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                                {paymentMethod === 'visa' && (
                                    <VisaMeth />
                                )}

                                {paymentMethod === 'bank' && (
                                    <BankMeth />
                                )}

                                {(paymentMethod === 'bkash' || paymentMethod === 'nagad') && (
                                    <BkashNagadMeth paymentMethod={paymentMethod} />
                                )}
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 border border-border shadow-sm flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                                <ShieldCheck size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-text-primary text-sm">Secure Checkout Enabled</h4>
                                <p className="text-xs text-text-secondary">Your payment information is encrypted and processed securely. We never store your full card details.</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Order Summary */}
                    <OrderSummary cartItems={cartItems} buttonText="Pay Now" />
                </div>
            </div>
        </div>
    );
};

export default Confirm;