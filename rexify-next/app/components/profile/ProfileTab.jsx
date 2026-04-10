import React, { useState } from 'react'
import { User, Mail, Camera, CheckCircle, AlertCircle, ShieldCheck, Edit3 } from 'lucide-react';

const ProfileTab = ({ userData, setUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(userData.name);

  const handleNameUpdate = () => {
    setUser({ ...userData, name: newName });
    setIsEditing(false);
  };

  return (
    <div className="animate-slide-in-from-bottom-3 duration-500 space-y-6">
      {/* Profile Card */}
      <div className="bg-white rounded-2xl p-10 border border-border shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-3xl -translate-y-1/2 translate-x-1/2 rounded-full"></div>
        <div className="relative flex flex-col sm:flex-row items-center gap-10">
          {/* Avatar Section */}
          <div className="relative">
            <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-accent-soft shadow-inner">
              <img
                src={userData.avatar}
                alt="User avatar"
                className="w-full h-full object-cover transition-transform duration-700"
              />
            </div>
            <button className="absolute bottom-2 right-2 bg-accent text-white p-3 rounded-full shadow-xl border-2 border-white hover:scale-110 active:scale-95 transition-all cursor-pointer">
              <Camera size={18} />
            </button>
          </div>

          {/* User Info Section */}
          <div className="flex-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-4 mb-2">
              {isEditing ? (
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="text-3xl font-bold text-text-primary border-b-2 border-accent focus:outline-none bg-surface/50 px-3 py-1 rounded-t-lg"
                    autoFocus
                  />
                  <button
                    onClick={handleNameUpdate}
                    className="bg-accent text-white px-5 py-2 rounded-xl font-bold hover:shadow-lg hover:shadow-accent/30 transition-all cursor-pointer text-sm"
                  >
                    Save Changes
                  </button>
                </div>
              ) : (
                <h2 className="text-3xl font-bold text-text-primary font-space">{userData.name}</h2>
              )}
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-surface text-text-muted hover:text-accent hover:bg-accent-soft transition-all duration-300"
                >
                  <Edit3 size={18} />
                </button>
              )}
            </div>
            <p className="text-text-secondary flex items-center justify-center sm:justify-start gap-2.5 text-lg mb-6">
              <Mail size={18} className="text-accent" />
              {userData.email}
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
              {userData.isVerified ? (
                <div className="flex items-center gap-2 px-4 py-1.5 bg-green-50 text-green-600 text-xs font-bold rounded-full border border-green-100 shadow-sm">
                  <CheckCircle size={14} /> Verified Account
                </div>
              ) : (
                <div className="flex items-center gap-2 px-4 py-1.5 bg-amber-50 text-amber-600 text-xs font-bold rounded-full border border-amber-100 shadow-sm">
                  <AlertCircle size={14} /> Identity Not Verified
                </div>
              )}
              <button className="text-xs font-bold text-accent hover:bg-accent hover:text-white transition-all duration-300 cursor-pointer border border-accent/30 px-5 py-1.5 rounded-full">
                {userData.isVerified ? 'View Profile Badge' : 'Complete Verification'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl border border-border shadow-sm">
          <h3 className="text-base font-bold text-text-primary mb-6 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
              <User size={16} className="text-accent" />
            </div>
            Personal Details
          </h3>
          <div className="space-y-5">
            <div className="flex justify-between items-center pb-4 border-b border-border/50">
              <span className="text-sm font-medium text-text-muted">Full Display Name</span>
              <span className="text-sm font-bold text-text-primary">{userData.name}</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-border/50">
              <span className="text-sm font-medium text-text-muted">Primary Email</span>
              <span className="text-sm font-bold text-text-primary">{userData.email}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-text-muted">Account Type</span>
              <span className="text-sm font-bold text-accent px-2 py-0.5 bg-accent/5 rounded-md">Individual Client</span>
            </div>
          </div>
        </div>
        <div className="bg-white p-8 rounded-2xl border border-border shadow-sm">
          <h3 className="text-base font-bold text-text-primary mb-6 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
              <ShieldCheck size={16} className="text-accent" />
            </div>
            Verification Center
          </h3>
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-bold text-text-primary block">Identity Check</span>
                <span className="text-xs text-text-secondary">Verify to unlock buying limits</span>
              </div>
              <button className="text-xs py-2 px-5 bg-accent text-white font-bold rounded-xl hover:shadow-lg hover:shadow-accent/25 transition-all cursor-pointer">
                Start Now
              </button>
            </div>
            <div className="pt-4 p-4 bg-muted/30 rounded-xl border border-dashed border-border">
              <p className="text-[12px] text-text-secondary leading-relaxed flex items-start gap-2">
                <AlertCircle size={14} className="shrink-0 text-amber-500 mt-0.5" />
                Your account is currently restricted to $5,000 in monthly transactions until verified.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileTab