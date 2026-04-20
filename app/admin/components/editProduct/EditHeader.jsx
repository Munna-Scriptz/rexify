import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Eye, 
  Power,
  RefreshCw
} from 'lucide-react';
import { Link, useNavigate } from 'react-router';

const EditHeader = ({ isActive, onToggleActive }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border pb-8 mb-8 animate-fade-in">
      <div className="flex items-center gap-5">
        <button 
          onClick={() => navigate('/products')}
          className="w-12 h-12 rounded-2xl border-2 border-border flex items-center justify-center text-text-muted hover:border-brand hover:text-brand transition-all cursor-pointer group shadow-sm bg-white"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        </button>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold font-space text-brand tracking-tight">Edit Product</h1>
            <span className={`px-3 py-1 rounded-full text-[10px] font-bold font-space uppercase border-2 ${isActive ? 'bg-success/10 text-success border-success/20' : 'bg-rose-500/10 text-rose-500 border-rose-500/20'}`}>
              {isActive ? 'Live & Active' : 'Product Inactive'}
            </span>
          </div>
          <p className="text-text-muted text-sm font-bold uppercase tracking-widest leading-none">ID: #RE-9921-FX</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Active/Inactive Toggle */}
        <button 
          onClick={onToggleActive}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold font-space text-sm transition-all cursor-pointer shadow-sm border-2 ${isActive ? 'bg-white border-rose-500/20 text-rose-500 hover:bg-rose-50' : 'bg-white border-success/20 text-success hover:bg-success/5'}`}
        >
          <Power size={18} />
          {isActive ? 'Deactivate Listing' : 'Reactivate Listing'}
        </button>

        <Link to={"/products/view"} className="px-6 py-2.5 rounded-xl border-2 border-brand/10 bg-surface text-brand font-bold font-space text-sm hover:bg-white hover:border-brand transition-all cursor-pointer flex items-center gap-2 shadow-sm">
          <Eye size={18} />
          Preview Shop
        </Link>
        
        <button className="px-10 py-2.5 rounded-xl bg-brand text-white font-bold font-space text-sm shadow-xl shadow-brand/30 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2 border-2 border-brand">
          <RefreshCw size={18} />
          Update Changes
        </button>
      </div>
    </div>
  );
};

export default EditHeader;
