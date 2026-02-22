import React from 'react'
import { Lock, ChevronRight, ShieldCheck } from 'lucide-react';

const SecurityTab = () => {
  return (
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
  )
}

export default SecurityTab