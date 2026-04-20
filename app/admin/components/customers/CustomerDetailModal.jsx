import React, { useState } from 'react';
import { X, Mail, ShoppingCart, Package, MessageSquare, Calendar, ShieldCheck, DollarSign, Edit2, Save } from 'lucide-react';

const CustomerDetailModal = ({ customer, onClose }) => {
  const [editedName, setEditedName] = useState(customer?.name || '');
  const [editedRole, setEditedRole] = useState(customer?.role || 'user');

  if (!customer) return null;

  const handleSave = () => {
    console.log('Saved changes:', { name: editedName, role: editedRole });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedName(customer.name);
    setEditedRole(customer.role || 'user');
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-4xl bg-white rounded-[40px] shadow-2xl overflow-hidden animate-zoom-in">
        <button
          onClick={onClose}
          className="absolute top-8 right-8 w-12 h-12 flex items-center justify-center rounded-full bg-surface border border-border text-text-muted hover:text-brand hover:border-brand transition-all cursor-pointer z-10"
        >
          <X size={24} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* Sidebar Area */}
          <div className="md:col-span-4 bg-surface p-10 flex flex-col items-center gap-6 border-r border-border">
            <img
              src={customer.avatar || `https://ui-avatars.com/api/?name=${customer.name}&background=random`}
              alt={customer.name}
              className="w-40 h-40 rounded-full object-cover border-8 border-white shadow-xl"
            />
            <div className="text-center">
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="w-full text-3xl font-bold font-space text-brand leading-tight italic rounded-lg px-2 py-1 focus:outline-none"
              />
              <p className="text-text-muted text-sm flex items-center justify-center gap-2 mt-1">
                <Mail size={14} /> {customer.email}
              </p>
            </div>

            <div className="w-full flex flex-col gap-3 mt-4 pt-6 border-t border-border/50">
              <div className="flex items-center justify-between px-4 py-2 bg-white rounded-xl border border-border shadow-sm">
                <span className="text-text-muted text-xs font-bold font-space uppercase">Role</span>
                <select
                  value={editedRole}
                  onChange={(e) => setEditedRole(e.target.value)}
                  className="text-accent text-xs font-bold font-space uppercase border-0 bg-transparent focus:outline-none cursor-pointer"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>

              </div>
              <div className="flex items-center justify-between px-4 py-2 bg-white rounded-xl border border-border shadow-sm">
                <span className="text-text-muted text-xs font-bold font-space uppercase">Status</span>
                <span className="text-success text-xs font-bold font-space uppercase">{customer.status}</span>
              </div>

              {/* Save/Cancel Buttons */}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={handleSave}
                  className="flex-1 flex items-center justify-center gap-2 bg-accent text-white px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all cursor-pointer hover:bg-blue-700"
                >
                  <Save size={14} /> Save
                </button>
                <button
                  onClick={handleCancel}
                  className="flex-1 flex items-center justify-center gap-2 bg-surface border border-border text-text-primary px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all cursor-pointer hover:bg-gray-100"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="md:col-span-8 p-10 flex flex-col gap-8">
            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Total Spent', value: `$${customer.totalSpent.toLocaleString()}`, icon: <DollarSign size={18} />, color: 'bg-accent/10 text-accent' },
                { label: 'Total Orders', value: customer.orders.length, icon: <Package size={18} />, color: 'bg-success/10 text-success' },
                { label: 'Cart Items', value: customer.cart.length, icon: <ShoppingCart size={18} />, color: 'bg-warning/10 text-warning' },
                { label: 'Reviews', value: customer.reviews.length, icon: <MessageSquare size={18} />, color: 'bg-rose-500/10 text-rose-500' }
              ].map((stat, i) => (
                <div key={i} className="p-4 rounded-[28px] border border-border flex flex-col gap-2">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                    {stat.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-coil font-bold text-lg font-space">{stat.value}</span>
                    <span className="text-text-muted text-[10px] font-bold uppercase tracking-wider">{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Orders Section */}
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-bold font-space text-brand flex items-center gap-2">
                <Package size={20} className="text-accent" /> Recent Activity
              </h3>
              <div className="space-y-3">
                {customer.orders.slice(0, 3).map((order) => (
                  <div key={order.id} className="p-4 bg-surface rounded-2xl border border-border flex items-center justify-between border-l-4 border-l-accent group hover:bg-white transition-all cursor-pointer shadow-sm">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-brand font-bold text-sm">Order #{order.id}</span>
                      <span className="text-text-muted text-xs">{order.date}</span>
                    </div>
                    <span className="text-coil font-bold text-sm">${order.amount}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Info */}
            <div className="mt-auto pt-6 border-t border-border/50 flex items-center justify-between text-text-muted text-xs font-bold uppercase tracking-widest font-space">
              <span className="flex items-center gap-1.5 leading-none">
                <Calendar size={14} className="mb-0.5" /> Customer Since: {customer.joinedDate}
              </span>
              <span className="flex items-center gap-1.5 leading-none">
                <ShieldCheck size={14} className="mb-0.5" /> Verified User
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailModal;
