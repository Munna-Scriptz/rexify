import React, { useEffect, useState } from 'react';
import { ShoppingBag, Package, Home, ArrowRight, Share2 } from 'lucide-react';
import { Link } from 'react-router';
import completeIcon from "../assets/completPayment.webm"
import BackUi from '../utils/BackUi';

const Complete = () => {
    const [showConfetti, setShowConfetti] = useState(false);
    const orderNumber = "REX-" + Math.floor(Math.random() * 900000 + 100000);

    useEffect(() => {
        setShowConfetti(true);
        const timer = setTimeout(() => setShowConfetti(false), 5000);
        return () => clearTimeout(timer);
    }, []);

    // Helper for floating particles
    const particles = Array.from({ length: 40 });

    return (
        <>
            <BackUi to={'/'} name={'Home'} absolute={true} />
            <div className="flex items-center justify-center overflow-hidden md:mt-0 mt-10">
                <div className="container">

                    {/* Confetti / Particle Background */}
                    {showConfetti && particles.map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-2 h-2 rounded-full animate-confetti"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `-20px`,
                                backgroundColor: i % 3 === 0 ? '#3b82f6' : i % 3 === 1 ? '#10b981' : '#f59e0b',
                                animationDelay: `${Math.random() * 3}s`,
                                animationDuration: `${2 + Math.random() * 3}s`
                            }}
                        />
                    ))}

                    <div className="max-w-xl w-full text-center z-10">
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
                            <div className="absolute top-10 -right-2 w-6 h-6 bg-green-400 rounded-full animate-float-slow shadow-lg"></div>
                            <div className="absolute top-16 left-0 w-4 h-4 bg-amber-400 rounded-full animate-float shadow-md"></div>
                        </div>

                        {/* Celebration Text */}
                        <div className="space-y-4 mb-10 animate-fade-up">
                            <h1 className="md:text-4xl text-3xl font-black text-text-primary font-space tracking-tight">
                                Order Confirmed!
                            </h1>
                            <p className="text-text-secondary md:text-lg text-base max-w-md mx-auto leading-relaxed">
                                Hooray! Your payment was successful and your order <span className="text-accent font-bold">#{orderNumber}</span> is now being prepared for shipping.
                            </p>
                        </div>

                        {/* Order Status Timeline Card */}
                        <div className="bg-white rounded-3xl md:p-8 p-6 border border-border shadow-xl shadow-black/5 mb-10 animate-fade-up delay-200">
                            <div className="flex items-center justify-between mb-8 pb-6 border-b border-border/50">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                                        <Package size={20} />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-xs font-bold text-text-muted uppercase tracking-wider">Order Number</p>
                                        <p className="text-sm font-black text-text-primary">{orderNumber}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                    <span className="text-xs font-bold text-green-700">Payment Verified</span>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="flex gap-4 group">
                                    <div className="relative flex flex-col items-center">
                                        <div className="w-4 h-4 rounded-full bg-accent ring-4 ring-accent/20 z-10"></div>
                                        <div className="w-0.5 h-full bg-border absolute top-4"></div>
                                    </div>
                                    <div className="text-left pb-4">
                                        <h4 className="text-sm font-bold text-text-primary">Order Placed</h4>
                                        <p className="text-xs text-text-muted mt-0.5">Today, {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 group opacity-50">
                                    <div className="relative flex flex-col items-center">
                                        <div className="w-4 h-4 rounded-full bg-border z-10 group-hover:bg-accent transition-colors"></div>
                                        <div className="w-0.5 h-full bg-border absolute top-4 opacity-50"></div>
                                    </div>
                                    <div className="text-left pb-4">
                                        <h4 className="text-sm font-bold text-text-primary">Preparing Items</h4>
                                        <p className="text-xs text-text-muted mt-0.5">Estimated by tomorrow</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 opacity-30">
                                    <div className="relative flex flex-col items-center">
                                        <div className="w-4 h-4 rounded-full bg-border z-10"></div>
                                    </div>
                                    <div className="text-left">
                                        <h4 className="text-sm font-bold text-text-primary">Shipped & Delivered</h4>
                                        <p className="text-xs text-text-muted mt-0.5">Stay tuned for updates</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Primary Actions */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-up delay-400">
                            <Link
                                to="/profile?tab=orders"
                                className="flex items-center justify-center gap-2 bg-text-primary text-white py-4 px-6 rounded-2xl font-bold hover:bg-black transition-all hover:shadow-lg shadow-black/10 active:scale-95"
                            >
                                <ShoppingBag size={18} />
                                View Order History
                            </Link>
                            <Link
                                to="/shop"
                                className="flex items-center justify-center gap-2 bg-accent text-white py-4 px-6 rounded-2xl font-bold hover:bg-blue-600 transition-all hover:shadow-lg shadow-accent/20 active:scale-95"
                            >
                                Continue Shopping
                                <ArrowRight size={18} />
                            </Link>
                        </div>

                        {/* Secondary Actions */}
                        <div className="mt-8 flex items-center justify-center gap-6 animate-fade-in delay-700">
                            <Link to="/" className="text-sm font-bold text-text-secondary hover:text-accent transition-colors flex items-center gap-2">
                                <Home size={16} />
                                Back to Home
                            </Link>
                            <button className="text-sm font-bold text-text-secondary hover:text-accent transition-colors flex items-center gap-2">
                                <Share2 size={16} />
                                Share Rexify
                            </button>
                        </div>
                    </div>

                    {/* Custom Animations Logic for this page */}
                    <style dangerouslySetInnerHTML={{
                        __html: `
                    @keyframes confetti {
                        0% { transform: translateY(0) rotate(0deg); opacity: 1; }
                        100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
                    }
                    .animate-confetti {
                        animation: confetti linear forwards;
                    }
                    @keyframes bounce-in {
                        0% { transform: scale(0.3); opacity: 0; }
                        50% { transform: scale(1.1); }
                        70% { transform: scale(0.9); }
                        100% { transform: scale(1); opacity: 1; }
                    }
                    .animate-bounce-in {
                        animation: bounce-in 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
                    }
                    @keyframes float {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-10px); }
                    }
                    .animate-float { animation: float 3s ease-in-out infinite; }
                    .animate-float-slow { animation: float 5s ease-in-out infinite; }
                    @keyframes fade-up {
                        from { transform: translateY(20px); opacity: 0; }
                        to { transform: translateY(0); opacity: 1; }
                    }
                    .animate-fade-up { animation: fade-up 0.6s ease-out forwards; }
                    .delay-200 { animation-delay: 0.2s; opacity: 0; }
                    .delay-400 { animation-delay: 0.4s; opacity: 0; }
                    .delay-700 { animation-delay: 0.7s; opacity: 0; }
                    @keyframes fade-in {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                    .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
                    @keyframes check-draw {
                        from { stroke-dashoffset: 100; }
                        to { stroke-dashoffset: 0; }
                    }
                    .animate-check-draw {
                        stroke-dasharray: 100;
                        animation: check-draw 0.5s ease-out 0.8s forwards;
                    }
                `}} />
                </div>
            </div>
        </>
    );
};

export default Complete;