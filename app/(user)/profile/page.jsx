"use client"
import React, { useState } from 'react';
import { User, ChevronRight, ShieldCheck, Bell, LogOut, ShoppingBag, MapPin, } from 'lucide-react';
import ProfileTab from '../components/ProfileTab';
import OrderTab from '../components/OrderTab';
import AddressTab from '../components/AddressTab';
import SecurityTab from '../components/SecurityTab';
import NotificationTab from '../components/NotificationTab';

const page = () => {
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
    <>
      <section id="Profile">
        <div className='container'>
          <div id="Profile-row" className="w-full py-10">

            <div className="flex gap-10">
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
                  <OrderTab orderData={orders} />
                )}

                {activeTab === 'addresses' && (
                  <AddressTab addressData={addresses} />
                )}

                {activeTab === 'security' && (
                  <SecurityTab />
                )}

                {activeTab === 'notifications' && (
                  <NotificationTab />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;