import React from 'react';
import { Mail } from 'lucide-react';

const CustomerGridCard = ({ customer, onClick }) => {
  return (
    <div 
      onClick={() => onClick(customer)}
      className="p-6 bg-white rounded-3xl border border-border flex flex-col items-center text-center gap-4 hover:shadow-xl transition-all duration-300 cursor-pointer group animate-fade-up shadow-[0_4px_25px_rgba(0,0,0,0.02)]"
    >
      <div className="relative">
        <img 
          src={customer.avatar || `https://ui-avatars.com/api/?name=${customer.name}&background=random`} 
          alt={customer.name} 
          className="w-24 h-24 rounded-full object-cover border-4 border-surface shadow-sm group-hover:scale-105 transition-transform"
        />
        <div className={`absolute bottom-1 right-1 w-5 h-5 border-2 border-white rounded-full ${customer.status === 'active' ? 'bg-success' : 'bg-text-muted'}`} />
      </div>
      
      <div className="flex flex-col gap-1">
        <h3 className="text-brand font-bold text-lg font-space">{customer.name}</h3>
        <p className="text-text-muted text-sm flex items-center justify-center gap-1.5">
          <Mail size={14} /> {customer.email}
        </p>
      </div>

      <div className="grid grid-cols-3 w-full gap-2 mt-2 pt-4 border-t border-border/50">
        <div className="flex flex-col items-center">
          <span className="text-coil font-bold text-sm">{customer.orders.length}</span>
          <span className="text-text-muted text-[10px] uppercase font-bold tracking-wider">Orders</span>
        </div>
        <div className="flex flex-col items-center border-x border-border/50">
          <span className="text-coil font-bold text-sm">{customer.cart.length}</span>
          <span className="text-text-muted text-[10px] uppercase font-bold tracking-wider">Carts</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-coil font-bold text-sm">{customer.reviews.length}</span>
          <span className="text-text-muted text-[10px] uppercase font-bold tracking-wider">Reviews</span>
        </div>
      </div>
    </div>
  );
};

export default CustomerGridCard;
