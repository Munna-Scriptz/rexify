import React from 'react';
import { RefreshCw, ShoppingCart, HelpCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';
import completeIcon from "../assets/cancelPayment.webm"
import BackUi from '../utils/BackUi';

const CheckoutError = () => {
    // Troubleshooting steps for a professional look
    const troubleshootingTips = [
        "Ensure your credit card details are correct.",
        "Check if you have sufficient funds in your account.",
        "Ensure your bank isn't blocking international or online transactions.",
        "Try using a different payment method or card."
    ];

    return (
        <>
            <BackUi to={'/'} name={'Home'} absolute={true} />
            <section id='Checkout-Error'>
                <div className="container">
                    <div className="flex items-center justify-center overflow-hidden md:mt-0 mt-10">
                        <div className="max-w-xl w-full z-10">
                            <div className="text-center mb-10 animate-fade-down">
                                <div className="relative inline-flex items-center justify-center mb-2">
                                    {/* Icon Container */}
                                    <div className="relative inline-block translate-y-5">
                                        <video
                                            className="w-full h-full object-cover"
                                            src={completeIcon}
                                            muted
                                            autoPlay
                                            loop
                                            playsInline
                                            preload="metadata"
                                        />

                                        {/* Smaller Floating Orbs */}
                                        <div className="absolute top-10 -right-2 w-6 h-6 bg-red-400 rounded-full animate-float-slow shadow-lg"></div>
                                        <div className="absolute top-16 left-0 w-4 h-4 bg-pink-400 rounded-full animate-float shadow-md"></div>
                                    </div>
                                </div>

                                <h1 className="md:text-4xl text-3xl font-black text-text-primary font-space tracking-tight mb-4">
                                    Payment Declined
                                </h1>
                                <p className="text-text-secondary md:text-lg text-base max-w-md mx-auto leading-relaxed">
                                    We encountered an issue processing your transaction. Your order <span className="text-error font-bold italic">was not placed</span> and no charges were made.
                                </p>
                            </div>

                            {/* Error Details Card */}
                            <div className="bg-white rounded-3xl md:p-8 p-6 border border-border shadow-2xl shadow-black/3 mb-8 animate-fade-up">
                                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border/50">
                                    <div className="w-10 h-10 rounded-xl bg-error/10 flex items-center justify-center text-error">
                                        <AlertCircle size={20} />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-xs font-bold text-text-muted uppercase tracking-wider">Transaction Status</p>
                                        <p className="text-sm font-black text-error">Processing Error / Declined</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-sm font-bold text-text-primary flex items-center gap-2">
                                        <HelpCircle size={16} className="text-accent" />
                                        How to resolve this:
                                    </h4>
                                    <ul className="space-y-3">
                                        {troubleshootingTips.map((tip, index) => (
                                            <li key={index} className="flex gap-3 text-sm text-text-secondary leading-snug items-start">
                                                <div className="w-1.5 h-1.5 rounded-full bg-error/40 mt-1.5 shrink-0"></div>
                                                {tip}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-up">
                                <Link
                                    to="/checkout"
                                    className="flex items-center justify-center gap-2 bg-text-primary text-white py-4 px-6 rounded-2xl font-bold hover:bg-black transition-all hover:shadow-xl shadow-black/10 active:scale-95 group"
                                >
                                    <RefreshCw size={18} className="group-hover:rotate-180 transition-transform duration-500" />
                                    Try Again
                                </Link>
                                <Link
                                    to="/cart"
                                    className="flex items-center justify-center gap-2 bg-white border-2 border-border text-text-primary py-4 px-6 rounded-2xl font-bold hover:bg-muted transition-all active:scale-95"
                                >
                                    <ShoppingCart size={18} />
                                    Back to Cart
                                </Link>
                            </div>

                            {/* Secondary Links */}
                            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 animate-fade-in">
                                <Link to="/" className="text-sm font-bold text-text-secondary hover:text-accent transition-colors flex items-center gap-2">
                                    <ArrowLeft size={16} />
                                    Home Page
                                </Link>
                                <Link to="/contact" className="text-sm font-bold text-text-secondary hover:text-accent transition-colors">
                                    Contact Support
                                </Link>
                                <span className="text-xs text-text-muted">Error Code: REX_PAY_402</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default CheckoutError;