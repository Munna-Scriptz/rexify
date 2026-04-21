"use client"
import React, { useState, useEffect, useRef } from 'react';
import Button from '../../../components/ui/Buttons';
import Header from '../../components/Header';
import BreadCrumbs from '../../../components/utils/BreadCrumbs';
import { useRouter } from 'next/navigation';

const VerifyOTP = () => {
    const router = useRouter();
    const [otp, setOtp] = useState(['', '', '', '', '']);
    const [timer, setTimer] = useState(120); // 2 minutes in seconds
    const [canResend, setCanResend] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const inputRefs = [useRef(), useRef(), useRef(), useRef(), useRef()];
    console.log(otp)
    // Timer logic
    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else {
            setCanResend(true);
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [timer]);

    // Focus first input on mount
    useEffect(() => {
        if (inputRefs[0].current) {
            inputRefs[0].current.focus();
        }
    }, []);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}s`;
    };

    const handleOtpChange = (index, value) => {
        if (isNaN(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);
        setError('');

        // Move to next input
        if (value && index < 3) {
            inputRefs[index + 1].current.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs[index - 1].current.focus();
        }
    };

    const handleResend = () => {
        if (!canResend) return;
        setTimer(120);
        setCanResend(false);
        setOtp(['', '', '', '']);
        setError('');
        // Add resend logic here
        console.log("Resending OTP...");
    };

    const handleVerify = (e) => {
        e.preventDefault();
        const otpValue = otp.join('');
        if (otpValue.length < 4) {
            setError('Please enter all 4 digits');
            return;
        }
        setLoading(true);
        // Simulate verification
        setTimeout(() => {
            console.log("Verifying OTP:", otpValue);
            setLoading(false);
            // router.push('/auth/success');
        }, 1500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-white overflow-x-hidden">
            <BreadCrumbs to={'/auth/signup'} name={'Back'} absolute={true} />
            
            <div className="w-full max-w-md flex flex-col items-center animate-slide-in">
                <Header 
                    header="Verify your account" 
                    text="Please enter the verification code sent to your email" 
                    linkText="Change Email"
                    linkPath="/auth/signup"
                />

                <form onSubmit={handleVerify} className="w-full mt-4 flex flex-col items-center">
                    {/* OTP Inputs */}
                    <div className="flex gap-4 mb-8">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={inputRefs[index]}
                                type="text"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className={`w-14 h-14 text-center text-2xl font-bold rounded-xl border-2 transition-all outline-none
                                    ${error ? 'border-error text-error' : 'border-gray-200 focus:border-coil focus:ring-2 focus:ring-coil'}
                                `}
                            />
                        ))}
                    </div>


                    {/* Timer and Resend */}
                    <div className="w-full flex justify-between items-center mb-10 px-2 text-sm font-medium">
                        <p className="text-gray-500">
                            Remaining time: <span className="text-coil">{formatTime(timer)}</span>
                        </p>
                        <p className="text-gray-500">
                            Didn’t get the code? 
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

                    {error && <p className="text-error text-sm mb-4 animate-fade-in">{error}</p>}

                    {/* Action Buttons */}
                    <div className="w-full space-y-4">
                        <Button 
                            variant="authButton" 
                            isLoading={loading} 
                            type="submit"
                            className="!mb-0"
                        >
                            Verify
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VerifyOTP;
