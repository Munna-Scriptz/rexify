"use client"
import React, { useState } from 'react';
import ProfileTab from '../components/ProfileTab';
import OrderTab from '../components/OrderTab';
import AddressTab from '../components/AddressTab';
import SecurityTab from '../components/SecurityTab';
import NotificationTab from '../components/NotificationTab';
import ProfileNavbar from '../components/ProfileNavbar';

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




  return (
    <>

      <main className="flex min-h-screen bg-surface">
        {/* --------------- Sidebar ---------------- */}
        <ProfileNavbar user={user} activeTab={activeTab} setActiveTab={setActiveTab}/>

        {/*  --------------- Content ---------------- */}
        <section className="flex-1 h-screen overflow-y-auto pt-10 pb-20 px-10">
          <div className="space-y-8">

            <div className="animate-slide-in-from-bottom-3 duration-700">
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
        </section>
      </main>
    </>
  );
};

export default page;