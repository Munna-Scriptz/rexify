import React, { useState } from 'react';
import {
    CreditCard,
    Landmark,
    Smartphone,
    ShieldCheck,
    ChevronRight,
    CircleCheck,
    ArrowLeft,
    Wallet
} from 'lucide-react';
import { Link } from 'react-router';
import OrderSummary from '../components/cart/OrderSummary';

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
            <div className="max-w-7xl mx-auto">
                {/* Breadcrumbs / Back */}
                <Link to="/cart" className="flex items-center gap-2 text-text-secondary hover:text-accent transition-colors mb-8 group">
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="font-semibold text-sm">Back to Cart</span>
                </Link>

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
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 gap-6">
                                            <div>
                                                <label className="block text-sm font-bold text-text-primary mb-2">Card Holder Name</label>
                                                <input type="text" placeholder="John Doe" className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-text-primary mb-2">Card Number</label>
                                                <div className="relative">
                                                    <input type="text" placeholder="0000 0000 0000 0000" className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all pl-12" />
                                                    <CreditCard size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm font-bold text-text-primary mb-2">Expiry Date</label>
                                                    <input type="text" placeholder="MM/YY" className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-bold text-text-primary mb-2">CVV</label>
                                                    <input type="text" placeholder="123" className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {paymentMethod === 'bank' && (
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-bold text-text-primary mb-2">Select Bank</label>
                                            <select className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all bg-white">
                                                <option>Chase Bank</option>
                                                <option>Bank of America</option>
                                                <option>Wells Fargo</option>
                                                <option>HSBC</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-text-primary mb-2">Account Number</label>
                                            <input type="text" placeholder="Enter your bank account number" className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all" />
                                        </div>
                                        <div className="p-4 bg-muted/30 rounded-xl border border-dashed border-border">
                                            <p className="text-xs text-text-secondary leading-relaxed">
                                                Note: Direct bank transfers may take up to 24 hours to process. Your order will be confirmed once funds are received.
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {(paymentMethod === 'bkash' || paymentMethod === 'nagad') && (
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-bold text-text-primary mb-2">{paymentMethod === 'bkash' ? 'bKash' : 'Nagad'} Number</label>
                                            <div className="relative">
                                                <input type="text" placeholder="01XXXXXXXXX" className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all pl-12" />
                                                <Smartphone size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-text-primary mb-2">Transaction ID</label>
                                            <input type="text" placeholder="TRX12345678" className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all" />
                                        </div>
                                        <div className="p-5 bg-accent/5 rounded-2xl border border-accent/10">
                                            <div className="flex gap-4">
                                                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shrink-0 text-white">
                                                    <Smartphone size={20} />
                                                </div>
                                                <div>
                                                    <h5 className="font-bold text-text-primary mb-1">How to pay via {paymentMethod === 'bkash' ? 'bKash' : 'Nagad'}?</h5>
                                                    <p className="text-xs text-text-secondary leading-relaxed">
                                                        1. Dial *247# or open the app<br />
                                                        2. Choose "Send Money" or "Payment"<br />
                                                        3. Enter our merchant number: 01300000000<br />
                                                        4. Enter the total amount and your PIN<br />
                                                        5. Copy the Transaction ID and paste it above
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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