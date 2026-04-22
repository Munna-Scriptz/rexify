"use client"
import React, { useState } from 'react';
import { redirect, useParams } from 'next/navigation';
import { Lock, CheckCircle2, AlertCircle } from 'lucide-react';
import Input from '@/app/components/ui/Input';
import Button from '@/app/components/ui/Buttons';

const ResetPasswordPage = () => {
  const getParams = useParams();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setStatus('error');
      setMessage('Passwords do not match. Please try again.');
      return;
    }

    if (password.length < 6) {
      setStatus('error');
      setMessage('Password must be at least 6 characters long.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/resetPassword/${getParams.token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword: password })
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('Your password has been successfully reset. You can now log in with your new password.');
      } else {
        throw new Error(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setStatus('error');
      setMessage(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const closeModals = () => {
    if (status === 'success') {
      redirect("/auth/signin")
    }
    setStatus(null);
  };

  return (
    <div className="flex items-center justify-center p-6">
      <div className=" rounded-3xl p-10 w-full max-w-md animate-animate-in">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-16 h-16 bg-accent/5 rounded-2xl flex items-center justify-center text-accent mb-6">
            <Lock size={32} />
          </div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">Reset Password</h1>
          <p className="text-text-secondary">Please enter your new password below.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="New Password"
            variant="signup"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            password={true}
          />
          <Input
            label="Confirm New Password"
            variant="signup"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            id="password"
            name="password"
            password={true}
          />

          <Button
            type="submit"
            variant="authButton"
            isLoading={isLoading}
            className="w-full mb-0"
          >
            Reset Password
          </Button>
        </form>
      </div>

      {/* Success/Error Modals */}
      {status && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1F1F1F]/85 animate-fade-in">
          <div className="bg-white rounded-3xl p-8 w-[90%] max-w-md shadow-2xl animate-animate-in relative">
            <div className="flex flex-col items-center text-center">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${status === 'success' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
                }`}>
                {status === 'success' ? <CheckCircle2 size={32} /> : <AlertCircle size={32} />}
              </div>

              <h3 className="text-2xl font-bold text-text-primary mb-2">
                {status === 'success' ? 'Successful!' : 'Action Failed'}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-8">
                {message}
              </p>

              <Button
                onClick={closeModals}
                variant="authButton"
                className="w-full mb-0"
              >
                {status === 'success' ? 'Go to Login' : 'Try Again'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetPasswordPage;
