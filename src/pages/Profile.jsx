import React, { useState } from 'react';
import { User, Lock, ChevronRight, ShieldCheck, Bell, LogOut, Edit3, ShoppingBag, MapPin, Plus, Trash2, Clock, CreditCard } from 'lucide-react';
import ProfileTab from '../components/profile/ProfileTab';
import OrderTab from '../components/profile/OrderTab';

const Profile = () => {
    const [activeTab, setActiveTab] = useState('profile');

    const [user, setUser] = useState({
        name: "John Doe",
        email: "john.doe@example.com",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
        isVerified: false,
    });


    const [orders] = useState([
        { id: '#REX-9281', date: 'Oct 24, 2025', status: 'Delivered', total: '$1,240.00', items: 3, img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop' },
        { id: '#REX-8172', date: 'Sep 12, 2025', status: 'Processing', total: '$899.00', items: 1, img: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=100&auto=format&fit=crop' },
        { id: '#REX-7163', date: 'Aug 05, 2025', status: 'Cancelled', total: '$45.00', items: 2, img: 'https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?q=80&w=100&auto=format&fit=crop' },
    ]);

    const [addresses] = useState([
        { id: 1, type: 'Home', isDefault: true, details: '123 Tech Lane, Silicon Valley, CA 94025', phone: '+1 (555) 000-1234' },
        { id: 2, type: 'Office', isDefault: false, details: '456 Innovation Way, San Francisco, CA 94105', phone: '+1 (555) 999-5678' },
    ]);


    const tabs = [
        { id: 'profile', label: 'Public Profile', icon: User },
        { id: 'orders', label: 'Order History', icon: ShoppingBag },
        { id: 'addresses', label: 'My Addresses', icon: MapPin },
        { id: 'security', label: 'Security', icon: ShieldCheck },
        { id: 'notifications', label: 'Notifications', icon: Bell },
    ];

    return (
        <div className="min-h-screen bg-surface py-12 px-4 sm:px-6 lg:px-12 font-primary">
            <div className="w-full max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-text-primary tracking-tight font-space">Account Settings</h1>
                    <p className="text-text-secondary mt-2">Manage your account information, orders, and security preferences.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Sidebar Navigation */}
                    <div className="lg:col-span-3 space-y-1">
                        <div className="bg-white rounded-2xl p-2 border border-border shadow-sm">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center justify-between px-5 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer group ${activeTab === tab.id
                                        ? 'bg-accent text-white shadow-lg shadow-accent/25'
                                        : 'text-text-secondary hover:bg-surface hover:text-text-primary'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <tab.icon size={18} strokeWidth={2.2} />
                                        {tab.label}
                                    </div>
                                    <ChevronRight size={14} className={activeTab === tab.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 transition-opacity'} />
                                </button>
                            ))}
                        </div>
                        <div className="pt-4 mt-6">
                            <button className="w-full flex items-center gap-3 px-5 py-3.5 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all duration-300 cursor-pointer border border-transparent hover:border-red-100">
                                <LogOut size={18} strokeWidth={2.2} />
                                Sign Out
                            </button>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="lg:col-span-9 space-y-6">

                        {activeTab === 'profile' && (
                            <ProfileTab userData={user} setUser={setUser} />
                        )}

                        {activeTab === 'orders' && (
                            <OrderTab orderData={orders}/>
                        )}

                        {activeTab === 'addresses' && (
                            <div className="animate-slide-in-from-bottom-3 duration-500 space-y-6">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-bold font-space text-text-primary flex items-center gap-3">
                                        <MapPin size={22} className="text-accent" />
                                        Saved Addresses
                                    </h2>
                                    <button className="flex items-center gap-2 px-5 py-2.5 bg-accent text-white font-bold text-sm rounded-xl hover:shadow-lg hover:shadow-accent/30 active:scale-95 transition-all cursor-pointer">
                                        <Plus size={18} /> Add New Address
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {addresses.map((addr) => (
                                        <div key={addr.id} className={`bg-white p-8 rounded-2xl border transition-all duration-300 relative group shadow-sm hover:shadow-md ${addr.isDefault ? 'border-accent ring-1 ring-accent/20 shadow-lg shadow-accent/5' : 'border-border'}`}>
                                            {addr.isDefault && (
                                                <div className="absolute top-4 right-4 bg-accent text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-tighter shadow-sm">
                                                    Default
                                                </div>
                                            )}
                                            <div className="w-12 h-12 rounded-xl bg-accent/5 flex items-center justify-center text-accent mb-6">
                                                <MapPin size={24} strokeWidth={2.2} />
                                            </div>
                                            <h4 className="text-lg font-bold text-text-primary mb-3 font-space">{addr.type} Delivery</h4>
                                            <p className="text-sm text-text-secondary mb-2 leading-relaxed">{addr.details}</p>
                                            <p className="text-sm font-semibold text-text-primary mb-8 flex items-center gap-2">
                                                <CreditCard size={14} className="text-text-muted" /> {addr.phone}
                                            </p>

                                            <div className="flex items-center gap-6 pt-6 border-t border-border/50">
                                                <button className="text-sm font-bold text-text-primary hover:text-accent transition-colors flex items-center gap-1.5 cursor-pointer">
                                                    <Edit3 size={15} /> Edit
                                                </button>
                                                {!addr.isDefault && (
                                                    <button className="text-sm font-bold text-text-muted hover:text-red-500 transition-colors flex items-center gap-1.5 cursor-pointer">
                                                        <Trash2 size={15} /> Delete
                                                    </button>
                                                )}
                                                {!addr.isDefault && (
                                                    <button className="text-xs font-bold text-accent ml-auto hover:underline cursor-pointer">
                                                        Set as Default
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'security' && (
                            <div className="animate-slide-in-from-bottom-3 duration-500 space-y-6">
                                <div className="bg-white rounded-2xl p-10 border border-border shadow-sm">
                                    <h2 className="text-xl font-bold text-text-primary mb-8 font-space flex items-center gap-3">
                                        <Lock size={22} className="text-accent" />
                                        Advanced Security
                                    </h2>

                                    <div className="space-y-10">
                                        {/* Change Password */}
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-border/60">
                                            <div>
                                                <h4 className="font-bold text-lg text-text-primary mb-1">Pass-key & Password</h4>
                                                <p className="text-sm text-text-secondary max-w-md">Update your password or set up a biometric passkey for faster logins.</p>
                                            </div>
                                            <button className="px-8 py-3 bg-text-primary text-white text-sm font-bold rounded-xl hover:bg-black hover:shadow-xl transition-all duration-300 cursor-pointer text-center">
                                                Update Credentials
                                            </button>
                                        </div>

                                        {/* 2FA */}
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-border/60">
                                            <div className="flex items-start gap-4">
                                                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                                                    <ShieldCheck size={20} />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-lg text-text-primary mb-1">Two-Factor Auth</h4>
                                                    <p className="text-sm text-text-secondary">Protect your account with an extra verification step.</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className="text-xs font-black text-text-muted uppercase tracking-widest bg-muted px-2 py-1 rounded">Inactive</span>
                                                <button className="w-14 h-7 bg-muted rounded-full relative cursor-pointer p-1 transition-colors hover:bg-muted/80">
                                                    <div className="w-5 h-5 bg-white rounded-full shadow-md transition-transform"></div>
                                                </button>
                                            </div>
                                        </div>

                                        {/* Sessions */}
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                                            <div>
                                                <h4 className="font-bold text-lg text-text-primary mb-1">Active Login Sessions</h4>
                                                <p className="text-sm text-text-secondary">Manage and sign out of other active sessions on different devices.</p>
                                            </div>
                                            <button className="flex items-center gap-2 text-sm font-bold text-accent hover:text-accent/80 transition-colors cursor-pointer group">
                                                Device History <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'notifications' && (
                            <div className="animate-slide-in-from-bottom-3 duration-500">
                                <div className="bg-white rounded-2xl p-10 border border-border shadow-sm">
                                    <h2 className="text-xl font-bold text-text-primary mb-6 font-space flex items-center gap-3">
                                        <Bell size={22} className="text-accent" />
                                        Communication Preferences
                                    </h2>
                                    <p className="text-text-secondary text-sm mb-10 pb-6 border-b border-border">Control the frequency and channel of our updates.</p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                                        {[
                                            { label: 'Newsletter & Promos', desc: 'New arrivals and exclusive offers' },
                                            { label: 'Order Notifications', desc: 'Updates on your shipping status' },
                                            { label: 'Security Alerts', desc: 'Important account login alerts' },
                                            { label: 'Flash Sale Entry', desc: 'Early access to limited drops' }
                                        ].map((item, idx) => (
                                            <div key={idx} className="flex items-center justify-between py-2">
                                                <div>
                                                    <h5 className="font-bold text-text-primary text-sm">{item.label}</h5>
                                                    <p className="text-xs text-text-muted">{item.desc}</p>
                                                </div>
                                                <button className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors p-1 ${idx < 2 ? 'bg-accent' : 'bg-muted'}`}>
                                                    <div className={`w-4 h-4 bg-white rounded-full shadow-sm shadow-black/20 transition-transform ${idx < 2 ? 'translate-x-6' : 'translate-x-0'}`}></div>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
