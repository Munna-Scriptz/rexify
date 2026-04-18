"use client"
import React, { useState } from 'react';
import ProfileTab from '../components/ProfileTab';
import OrderTab from '../components/OrderTab';
import AddressTab from '../components/AddressTab';
import SecurityTab from '../components/SecurityTab';
import NotificationTab from '../components/NotificationTab';
import ProfileNavbar from '../components/ProfileNavbar';
import ReviewTab from '../components/ReviewTab';

const page = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
    isVerified: true,
  });


  const [orders] = useState([
    { id: '#REX-9281', date: 'Oct 24, 2025', status: 'Delivered', total: '$1,240.00', items: 3, img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop' },
    { id: '#REX-8172', date: 'Sep 12, 2025', status: 'Processing', total: '$899.00', items: 1, img: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=100&auto=format&fit=crop' },
    { id: '#REX-7163', date: 'Aug 05, 2025', status: 'Cancelled', total: '$45.00', items: 2, img: 'https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?q=80&w=100&auto=format&fit=crop' },
  ]);

  const reviewData = [
    {
      id: 'REV-001',
      product: 'Wireless Noise Cancelling Headphones',
      productImg: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
      category: 'Electronics',
      rating: 5,
      date: 'Mar 12, 2025',
      comment: 'Absolutely love these headphones! The noise cancellation is top-notch and battery life is incredible. Worth every penny.',
      helpful: 24,
      verified: true,
    },
    {
      id: 'REV-002',
      product: 'Minimalist Leather Watch',
      productImg: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop',
      category: 'Accessories',
      rating: 4,
      date: 'Feb 28, 2025',
      comment: 'Great build quality and looks stunning. Strap is a bit stiff at first but softens up over time. Overall very happy with this purchase.',
      helpful: 11,
      verified: true,
    },
    {
      id: 'REV-003',
      product: 'Ergonomic Office Chair',
      productImg: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop',
      category: 'Furniture',
      rating: 3,
      date: 'Jan 15, 2025',
      comment: 'Decent chair but assembly was a nightmare. Lumbar support is okay but not great for long sessions. Expected better for the price.',
      helpful: 6,
      verified: false,
    },
    {
      id: 'REV-004',
      product: 'Mechanical Keyboard TKL',
      productImg: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=200&h=200&fit=crop',
      category: 'Electronics',
      rating: 5,
      date: 'Dec 4, 2024',
      comment: 'The tactile feedback is chefs kiss. RGB lighting is vibrant and software customization is excellent. My productivity has genuinely improved.',
      helpful: 38,
      verified: true,
    },
  ];


  const [addresses] = useState([
    { id: 1, type: 'Home', isDefault: true, details: '123 Tech Lane, Silicon Valley, CA 94025', phone: '+1 (555) 000-1234' },
    { id: 2, type: 'Office', isDefault: false, details: '456 Innovation Way, San Francisco, CA 94105', phone: '+1 (555) 999-5678' },
  ]);




  return (
    <>

      <main className="flex min-h-screen bg-surface">
        {/* --------------- Sidebar ---------------- */}
        <ProfileNavbar user={user} activeTab={activeTab} setActiveTab={setActiveTab} />

        {/*  --------------- Content ---------------- */}
        <section className="flex-1 h-screen overflow-y-auto pt-6 pb-10 px-6">
          <div className="animate-slide-in-from-bottom-3 duration-700">
            {activeTab === 'profile' && (
              <ProfileTab userData={user} setUser={setUser} />
            )}

            {activeTab === 'orders' && (
              <OrderTab orderData={orders} />
            )}

            {activeTab === 'reviews' && (
              <ReviewTab reviews={reviewData} />
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
        </section>
      </main>
    </>
  );
};

export default page;