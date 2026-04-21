"use client"
import React, { useState, useEffect, useRef } from 'react';
import Button from '../../../components/ui/Buttons';
import BreadCrumbs from '../../../components/utils/BreadCrumbs';
import Link from 'next/link';
import { redirect, useSearchParams } from 'next/navigation';
import { Bounce, toast, ToastContainer } from 'react-toastify';

const VerifyOTP = () => {
    const searchParams = useSearchParams()
    const email = searchParams.get('email')

    const [otp, setOtp] = useState('');
    const [timer, setTimer] = useState(10);
    const [canResend, setCanResend] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const inputRefs = [useRef(), useRef(), useRef(), useRef()];

    useEffect(() => {
        if (timer <= 0) { setCanResend(true); return; }
        const interval = setInterval(() => setTimer(t => t - 1), 1000);
        return () => clearInterval(interval);
    }, [timer]);

    useEffect(() => {
        inputRefs[0].current?.focus();
    }, []);

    const formatTime = (s) =>
        `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}s`;

    const handleOtpChange = (index, value) => {
        if (!/^\d*$/.test(value)) return;
        const chars = otp.split('');
        chars[index] = value.slice(-1);
        const updated = chars.join('').slice(0, 4);
        setOtp(updated);
        setError('');
        if (value && index < 3) inputRefs[index + 1].current?.focus();
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs[index - 1].current?.focus();
        }
    };

    const handleResend = async () => {
        if (!canResend) return;
        setTimer(120);
        setCanResend(false);
        setOtp('');
        setError('');
        inputRefs[0].current?.focus();

        // ----------- Email validation ----------
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/resendOTP`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email })
        })
        const data = await res.json();
        if (!res.ok) {
            setLoading(false);
            setError(data.message)
            return
        }

        toast.success(data.message, {
            theme: "dark",
            transition: Bounce,
        });
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        if (otp.length < 4) { setError('Please enter all 4 digits'); return; }
        setLoading(true);

        // ----------- Email validation ----------
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/verifyOTP`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, otp })
        })
        const data = await res.json();
        if (!res.ok) {
            setLoading(false);
            setError(data.message)
            return
        }

        toast.success(data.message, {
            theme: "dark",
            transition: Bounce,
        });
        setTimeout(() => {
            setLoading(false);
            redirect("/")
        }, 2000);
    };

    return (
        <>
            <ToastContainer />
            <div className="min-h-screen flex items-center justify-center p-6 overflow-x-hidden">
                <BreadCrumbs to={'/auth/signup'} name={'Back'} absolute={true} />

                <div className="w-full max-w-md flex flex-col items-center animate-slide-in">

                    {/* SVG Icon Placeholder */}
                    <div className="mb-8 p-4 bg-orange-100 rounded-2xl">
                        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                            <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                    </div>

                    <div className="text-center mb-8">
                        <h1 className="text-2xl md:text-3xl font-bold text-coil mb-3">
                            Verify Your Email Address
                        </h1>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-sm mx-auto">
                            Please enter the 4-digit verification code sent to your email to complete your registration.
                        </p>
                    </div>

                    <form onSubmit={handleVerify} className="w-full flex flex-col items-center">

                        {/* OTP Inputs — now iterates over indices, reads otp[index] from string */}
                        <div className="flex gap-3 mb-8">
                            {[0, 1, 2, 3].map((index) => {
                                const digit = otp[index] || '';
                                return (
                                    <input
                                        key={index}
                                        ref={inputRefs[index]}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleOtpChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        className={`w-14 h-16 text-center text-2xl font-black rounded-2xl outline-none transition-all duration-200 cursor-text select-none border-2 shadow-sm
                                            ${error
                                                ? 'bg-[#fef2f2] border-[#fecaca] text-error shadow-[0_0_0_4px_#fee2e2] ring-0'
                                                : digit
                                                    ? 'bg-[#f0fdf4] border-success text-[#15803d] shadow-[0_0_0_4px_#dcfce7]'
                                                    : 'bg-[#f8faff] border-[#e2e8f0] text-[#0f172a] hover:border-accent/30 hover:bg-[#eff6ff]/50 focus:bg-white focus:border-accent focus:shadow-[0_0_0_4px_#eff6ff] focus:text-accent'
                                            }`}
                                    />
                                );
                            })}
                        </div>

                        <div className="mb-10 text-sm font-medium">
                            <p className="text-gray-600">
                                Want to Change Your Email Address?
                                <Link href="/auth/signup" className="ml-1 text-coil font-bold hover:underline">
                                    Change Here
                                </Link>
                            </p>
                        </div>

                        {error && <p className="text-error text-sm mb-4 animate-fade-in">{error}</p>}

                        {/* Action Button */}
                        <div className="w-full mb-8">
                            <Button
                                variant="primary"
                                isLoading={loading}
                                type="submit"
                                className="w-full py-4 rounded-2xl bg-orange-500 hover:bg-orange-600 border-none text-white shadow-lg shadow-orange-200"
                            >
                                Verify Email
                            </Button>
                        </div>

                        {/* Timer and Resend */}
                        <div className="w-full flex justify-between items-center px-2 text-sm font-medium">
                            <p className="text-gray-500">
                                Remaining time: <span className="text-coil">{formatTime(timer)}</span>
                            </p>
                            <p className="text-gray-500">
                                Didn't get the code?
                                <button
                                    type="button"
                                    onClick={handleResend}
                                    disabled={!canResend}
                                    className={`ml-1 font-bold transition-colors ${canResend ? 'text-accent cursor-pointer hover:underline' : 'text-gray-400 cursor-not-allowed'}`}
                                >
                                    Resend
                                </button>
                            </p>
                        </div>

                    </form>
                </div>
            </div>
        </>
    );
};

export default VerifyOTP;