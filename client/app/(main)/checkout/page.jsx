"use client"
import React, { useEffect, useState } from 'react';
import { ShieldCheck, CircleCheck } from 'lucide-react';
import { apiClient } from '@/app/lib/apiClient';
import CheckoutSummery from '@/app/components/checkout/CheckoutSummery';

const page = () => {
    const [paymentMethod, setPaymentMethod] = useState('stripe');
    const [cartId, setCartId] = useState('');

    // Address State
    const [shippingAddress, setShippingAddress] = useState({
        fullName: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        division: '',
        postalCode: '',
        phone: ''
    });

    // carts and price
    const [carts, setCarts] = useState([])
    useEffect(() => {
        const fetchApi = async () => {
            const carts = await apiClient.get("/cart", {
                tags: ["cart"],
            })
            setCarts(carts?.data?.items)
            setCartId(carts?.data?._id)
        }
        fetchApi()
    }, [])

    const methods = [
        { id: 'cod', label: 'Cash on delivery', icon: "https://static.vecteezy.com/system/resources/thumbnails/028/825/029/small/speed-style-cash-on-delivery-banner-label-clipart-vector.jpg", description: 'Pay upon delivery' },
        { id: 'stripe', label: 'Stripe', icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG0cf-eryEIb2GySQcpoP7NXjQ7-CVUbLS2w&s", description: 'Stripe payment method' },
    ];

    // Handle input change
    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setShippingAddress(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const divisions = [
        "Dhaka", "Chattogram", "Rajshahi", "Khulna",
        "Sylhet", "Barishal", "Rangpur", "Mymensingh"
    ];

    // -------------- Handle checkout ---------------
    const handleConfirm = async () => {
        const res = await fetch(
            "http://localhost:8000/checkout",
            {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    paymentMethod,
                    cartId,
                    shippingAddress: shippingAddress.addressLine1,
                    division: shippingAddress.division
                })
            }
        );

        const data = await res.json();
        window.location.href = data.data.url
    }


    return (
        <section className="md:py-12 py-6">
            <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Column: Shipping Address + Payment Methods */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* ==================== SHIPPING ADDRESS ==================== */}
                        <div className="bg-white rounded-2xl md:p-8 p-5 border border-border shadow-sm">
                            <h2 className="md:text-2xl text-xl font-bold font-space text-text-primary mb-2">
                                Shipping Address
                            </h2>
                            <p className="text-text-secondary mb-8 md:text-base text-sm">
                                Enter your delivery information
                            </p>

                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-text-primary mb-1">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={shippingAddress.fullName}
                                        onChange={handleAddressChange}
                                        className="w-full px-4 py-3 rounded-xl border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-text-primary mb-1">
                                        Address Line 1
                                    </label>
                                    <input
                                        type="text"
                                        name="addressLine1"
                                        value={shippingAddress.addressLine1}
                                        onChange={handleAddressChange}
                                        className="w-full px-4 py-3 rounded-xl border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none"
                                        placeholder="House 12, Road 5, Block B"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-text-primary mb-1">
                                        Address Line 2 (Optional)
                                    </label>
                                    <input
                                        type="text"
                                        name="addressLine2"
                                        value={shippingAddress.addressLine2}
                                        onChange={handleAddressChange}
                                        className="w-full px-4 py-3 rounded-xl border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none"
                                        placeholder="Apartment/Suite (optional)"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-medium text-text-primary mb-1">
                                            City
                                        </label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={shippingAddress.city}
                                            onChange={handleAddressChange}
                                            className="w-full px-4 py-3 rounded-xl border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none"
                                            placeholder="Dhaka"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-text-primary mb-1">
                                            Division
                                        </label>
                                        <select
                                            name="division"
                                            value={shippingAddress.division}
                                            onChange={handleAddressChange}
                                            className="w-full px-4 py-3 rounded-xl border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none bg-white"
                                        >
                                            <option value="">Select Division</option>
                                            {divisions.map(div => (
                                                <option key={div} value={div}>{div}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-medium text-text-primary mb-1">
                                            Postal Code
                                        </label>
                                        <input
                                            type="text"
                                            name="postalCode"
                                            value={shippingAddress.postalCode}
                                            onChange={handleAddressChange}
                                            className="w-full px-4 py-3 rounded-xl border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none"
                                            placeholder="1200"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-text-primary mb-1">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={shippingAddress.phone}
                                            onChange={handleAddressChange}
                                            className="w-full px-4 py-3 rounded-xl border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none"
                                            placeholder="+880 1XXX-XXXXXX"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ==================== PAYMENT METHOD ==================== */}
                        <div className="bg-white rounded-2xl md:p-8 p-5 border border-border shadow-sm">
                            <h2 className="md:text-2xl text-xl font-bold font-space text-text-primary mb-2">Payment Method</h2>
                            <p className="text-text-secondary mb-8 md:text-base text-sm">Select your preferred payment method and enter your details.</p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                                {methods.map((method) => (
                                    <button
                                        key={method.id}
                                        onClick={() => setPaymentMethod(method.id)}
                                        className={`flex items-start gap-4 md:p-5 p-3 rounded-2xl border transition-all duration-300 relative text-left cursor-pointer ${paymentMethod === method.id
                                            ? 'border-accent bg-accent/5 ring-1 ring-accent/20 shadow-md'
                                            : 'border-border hover:border-gray-300 hover:bg-gray-50'
                                            }`}
                                    >
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0`}>
                                            <img src={method.icon} className='object-cover' alt="options" />
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
                    <CheckoutSummery
                        cartItems={carts}
                        buttonText="Pay Now"
                        handleConfirm={handleConfirm}
                    />
                </div>
            </div>
        </section>
    );
};

export default page;