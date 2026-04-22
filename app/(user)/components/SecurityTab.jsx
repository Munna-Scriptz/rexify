import React, { useState } from 'react'
import { Lock, ChevronRight, ShieldCheck, Mail, CheckCircle2, X } from 'lucide-react';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Buttons';

const SecurityTab = () => {
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [email, setEmail] = useState('');

  const handleConfirmEmail = (e) => {
    e.preventDefault();
    if (email) {
      setShowEmailModal(false);
      setShowSuccessModal(true);
    }
  };

  return (
    <>

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
              <button
                onClick={() => setShowEmailModal(true)}
                className="px-8 py-3 bg-text-primary text-white text-sm font-bold rounded-xl hover:bg-black hover:shadow-xl transition-all duration-300 cursor-pointer text-center"
              >
                Change password
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
      {/* Email Input Modal */}
      {showEmailModal && (
        <div className="absolute w-full h-full inset-0 z-50 flex items-center justify-center bg-[#1F1F1F]/85  animate-fade-in">
          <div className="bg-white rounded-3xl p-8 w-[90%] max-w-md shadow-2xl animate-animate-in relative">
            <button
              onClick={() => setShowEmailModal(false)}
              className="absolute top-5 right-5 text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-accent/5 rounded-2xl flex items-center justify-center text-accent mb-6">
                <Mail size={32} />
              </div>

              <h3 className="text-2xl font-bold text-text-primary mb-2">Change Password</h3>
              <p className="text-text-secondary text-sm mb-8">
                Enter your email address below. We'll send you a secure link to reset your password.
              </p>

              <form onSubmit={handleConfirmEmail} className="w-full space-y-4">
                <Input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="py-4"
                />
                <Button
                  type="submit"
                  variant="authButton"
                  className="w-full mb-0"
                >
                  Send Reset Link
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1F1F1F]/85 animate-fade-in">
          <div className="bg-white rounded-3xl p-8 w-[90%] max-w-md shadow-2xl animate-animate-in relative">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-success/10 rounded-2xl flex items-center justify-center text-success mb-6">
                <CheckCircle2 size={32} />
              </div>

              <h3 className="text-2xl font-bold text-text-primary mb-2">Link Sent!</h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-8">
                A reset link has been sent to your email:<br />
                <span className="font-bold text-text-primary text-base mt-1 block">{email}</span>
              </p>

              <Button
                onClick={() => setShowSuccessModal(false)}
                variant="authButton"
                className="w-full mb-0"
              >
                OK
              </Button>
            </div>
          </div>
        </div>
      )}
    </>

  )
}

export default SecurityTab