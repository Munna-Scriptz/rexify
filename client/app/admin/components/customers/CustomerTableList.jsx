import React from 'react';
import { Eye, Mail } from 'lucide-react';

const CustomerTableList = ({ customers, onSelect }) => {
  return (
    <div className="w-full bg-white rounded-3xl border border-border shadow-[0_4px_25px_rgba(0,0,0,0.02)] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-surface/60 border-b border-border">
              <th className="px-8 py-5 text-sm font-bold font-space text-brand uppercase tracking-wider">Customer</th>
              <th className="px-8 py-5 text-sm font-bold font-space text-brand uppercase tracking-wider">Status</th>
              <th className="px-8 py-5 text-sm font-bold font-space text-brand uppercase tracking-wider">Activity</th>
              <th className="px-8 py-5 text-sm font-bold font-space text-brand uppercase tracking-wider">Spent</th>
              <th className="px-8 py-5 text-sm font-bold font-space text-brand uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {customers.map((customer) => (
              <tr key={customer.id} className="hover:bg-surface/40 transition-colors group">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <img 
                      src={customer.avatar || `https://ui-avatars.com/api/?name=${customer.name}&background=random`} 
                      className="w-12 h-12 rounded-full object-cover border border-border shadow-sm group-hover:scale-105 transition-transform" 
                      alt="" 
                    />
                    <div className="flex flex-col">
                      <span className="text-brand font-bold text-base font-space leading-tight">{customer.name}</span>
                      <span className="text-text-muted text-sm flex items-center gap-1.5 mt-0.5">
                        <Mail size={12} className="opacity-60" /> {customer.email}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold font-space uppercase tracking-wide border ${
                    customer.status === 'active' 
                      ? 'bg-success/5 border-success/30 text-success' 
                      : 'bg-text-muted/5 border-text-muted/30 text-text-muted'
                  }`}>
                    {customer.status}
                  </span>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                     <div className="flex flex-col items-center">
                        <span className="text-coil font-bold text-sm">{customer.orders.length}</span>
                        <span className="text-text-muted text-[10px] font-bold uppercase">Orders</span>
                     </div>
                     <div className="flex flex-col items-center">
                        <span className="text-coil font-bold text-sm">{customer.reviews.length}</span>
                        <span className="text-text-muted text-[10px] font-bold uppercase">Reviews</span>
                     </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className="text-coil font-bold font-space text-base">${customer.totalSpent.toLocaleString()}</span>
                </td>
                <td className="px-8 py-6 text-right">
                  <button 
                    onClick={() => onSelect(customer)}
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-accent/5 border border-accent/20 text-accent hover:bg-accent hover:text-white transition-all cursor-pointer shadow-sm active:scale-95"
                  >
                    <Eye size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerTableList;
