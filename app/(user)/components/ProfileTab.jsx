import React, { useState } from 'react'
import { User, Mail, Camera, CheckCircle, AlertCircle, ShieldCheck, Edit3, X, Check } from 'lucide-react';

const ProfileTab = ({ userData, setUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(userData.name);

  const handleNameUpdate = () => {
    setUser({ ...userData, name: newName });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setNewName(userData.name);
    setIsEditing(false);
  };

  return (
    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-3 duration-500">

      {/* ── Hero Profile Card ── */}
      <div className="relative rounded-2xl overflow-hidden border border-accent/10 bg-white shadow-[0_2px_24px_#155dfc0d]">
        {/* Background glow blobs */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-accent/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#dbeafe]/60 blur-2xl rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        {/* Top accent stripe */}
        <div className="h-1 w-full bg-linear-to-r from-accent via-[#4d8bff] to-accent/30" />

        <div className="relative p-8 flex flex-col sm:flex-row items-center gap-8">

          {/* Avatar */}
          <div className="relative shrink-0 group">
            <div className="w-32 h-32 rounded-2xl overflow-hidden border-2 border-accent/20 shadow-[0_0_0_4px_#155dfc0f,0_16px_40px_#155dfc14]">
              <img
                src={userData.avatar}
                alt="User avatar"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <button className="absolute -bottom-2 -right-2 bg-accent text-white p-2.5 rounded-xl shadow-[0_4px_14px_#155dfc55] border-2 border-white hover:bg-[#1a6aff] hover:scale-110 active:scale-95 transition-all cursor-pointer">
              <Camera size={15} />
            </button>
          </div>

          {/* Info */}
          <div className="flex-1 text-center sm:text-left min-w-0">

            {/* Name row */}
            <div className="flex items-center justify-center sm:justify-start gap-3 mb-2 flex-wrap">
              {isEditing ? (
                <div className="flex items-center gap-2 flex-wrap">
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="text-2xl font-semibold text-[#0f172a] bg-[#f8faff] border border-accent/30 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15 px-3 py-1.5 rounded-xl transition-all"
                    autoFocus
                  />
                  <button
                    onClick={handleNameUpdate}
                    className="flex items-center gap-1.5 bg-accent text-white px-4 py-2 rounded-xl font-semibold text-sm hover:bg-[#1a6aff] hover:shadow-[0_4px_14px_#155dfc44] transition-all cursor-pointer"
                  >
                    <Check size={14} /> Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-1.5 bg-[#f1f5f9] text-[#64748b] px-4 py-2 rounded-xl font-semibold text-sm hover:bg-[#e2e8f0] hover:text-[#334155] transition-all cursor-pointer"
                  >
                    <X size={14} /> Cancel
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-semibold text-[#0f172a] tracking-tight">{userData.name}</h2>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#f1f5f9] border border-[#e2e8f0] text-[#94a3b8] hover:text-accent hover:bg-[#eff6ff] hover:border-accent/20 transition-all duration-200 cursor-pointer"
                  >
                    <Edit3 size={14} />
                  </button>
                </>
              )}
            </div>

            {/* Email */}
            <p className="text-[#64748b] flex items-center justify-center sm:justify-start gap-2 text-sm mb-5">
              <Mail size={14} className="text-accent" />
              {userData.email}
            </p>

            {/* Badges row */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
              {userData.isVerified ? (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-[#f0fdf4] text-success text-[11px] font-semibold rounded-full border border-[#bbf7d0] tracking-wide uppercase">
                  <CheckCircle size={12} /> Verified Account
                </div>
              ) : (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-[#fffbeb] text-[#d97706] text-[11px] font-semibold rounded-full border border-[#fde68a] tracking-wide uppercase">
                  <AlertCircle size={12} /> Not Verified
                </div>
              )}
              <button className="text-[11px] font-semibold text-accent border border-accent/30 px-4 py-1.5 rounded-full hover:bg-accent hover:text-white hover:border-accent hover:shadow-[0_4px_14px_#155dfc33] transition-all duration-200 cursor-pointer tracking-wide uppercase">
                {userData.isVerified ? 'View Badge' : 'Get Verified'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Details Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Personal Details */}
        <div className="bg-white rounded-2xl border border-[#e8edf5] shadow-[0_2px_16px_#155dfc08] p-7 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#eff6ff] blur-2xl rounded-full pointer-events-none" />
          <h3 className="text-sm font-semibold text-[#0f172a] mb-6 flex items-center gap-3 relative">
            <div className="w-8 h-8 rounded-lg bg-[#eff6ff] border border-accent/15 flex items-center justify-center">
              <User size={15} className="text-accent" />
            </div>
            Personal Details
          </h3>

          <div className="space-y-0 relative">
            {[
              { label: 'Full Name', value: userData.name },
              { label: 'Email Address', value: userData.email },
              { label: 'Account Type', value: 'Individual Client', accent: true },
            ].map((item, i, arr) => (
              <div
                key={item.label}
                className={`flex justify-between items-center py-4 ${i < arr.length - 1 ? 'border-b border-[#f1f5f9]' : ''}`}
              >
                <span className="text-[10px] font-semibold text-[#94a3b8] uppercase tracking-widest">{item.label}</span>
                <span className={item.accent
                  ? 'text-accent bg-[#eff6ff] border border-accent/15 px-2.5 py-1 rounded-lg text-xs font-semibold'
                  : 'text-sm font-semibold text-[#334155]'
                }>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Verification Center */}
        <div className="bg-white rounded-2xl border border-[#e8edf5] shadow-[0_2px_16px_#155dfc08] p-7 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#fffbeb]/80 blur-2xl rounded-full pointer-events-none" />
          <h3 className="text-sm font-semibold text-[#0f172a] mb-6 flex items-center gap-3 relative">
            <div className="w-8 h-8 rounded-lg bg-[#eff6ff] border border-accent/15 flex items-center justify-center">
              <ShieldCheck size={15} className="text-accent" />
            </div>
            Verification Center
          </h3>

          <div className="space-y-4 relative">
            <div className="flex items-center justify-between gap-4">
              <div>
                <span className="text-sm font-semibold text-[#0f172a] block mb-0.5">Identity Check</span>
                <span className="text-xs text-[#94a3b8]">Verify to unlock buying limits</span>
              </div>
              <button className="shrink-0 text-xs py-2 px-5 bg-accent text-white font-semibold rounded-xl hover:bg-[#1a6aff] hover:shadow-[0_4px_14px_#155dfc44] transition-all cursor-pointer">
                Start Now
              </button>
            </div>

            {/* Warning banner */}
            <div className="p-4 bg-[#fffbeb] rounded-xl border border-[#fde68a] border-dashed">
              <p className="text-xs text-[#92400e] leading-relaxed flex items-start gap-2">
                <AlertCircle size={13} className="shrink-0 text-[#d97706] mt-0.5" />
                Account is restricted to $5,000 monthly transactions until identity is verified.
              </p>
            </div>

            {/* Progress */}
            <div>
              <div className="flex justify-between text-[10px] text-[#94a3b8] mb-2 uppercase tracking-widest font-semibold">
                <span>Verification Progress</span>
                <span>0 / 3 steps</span>
              </div>
              <div className="h-1.5 w-full bg-[#f1f5f9] rounded-full overflow-hidden">
                <div className="h-full w-0 bg-linear-to-r from-accent to-[#4d8bff] rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;