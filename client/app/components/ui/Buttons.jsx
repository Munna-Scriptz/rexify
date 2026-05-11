"use client"
import React from 'react';

const Button = ({
    children,
    variant = 'primary',
    size = '',
    isLoading = false,
    leftIcon,
    rightIcon,
    className = '',
    disabled,
    ...props
}) => {

    // 1. Base styles that never change
    const baseStyles = "inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none active:scale-95 disabled:opacity-50 disabled:pointer-events-none";

    // 2. Color variants (The "Vibe")
    const variants = {
        primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 shadow-sm",
        adminPrimary: "w-full justify-center bg-accent text-white font-semibold text-sm hover:scale-105 active:scale-95 flex items-center gap-2",
        secondary: "bg-emerald-500 text-white hover:bg-emerald-600 focus:ring-emerald-400",
        signUp: "bg-transparent text-white",
        sinInAndSignUp: "w-full py-4 bg-linear-to-r from-brand to-Secondary font-bold text-sm hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-violet-500/20 flex items-center justify-center gap-2",
        sinInAndSignUpWhite: "w-full py-4 bg-white text-slate-950 rounded-xl font-black text-sm hover:bg-brand hover:text-white active:scale-[0.96] transition-all duration-300 flex items-center justify-center gap-2 group",
        ghost: "border-2 border-border text-brand font-bold text-sm hover:bg-white",
        danger: "bg-rose-500 text-white hover:bg-rose-600 focus:ring-rose-400",
        success: "bg-green-500/20 text-green-400",
        produtButtons: "h-9 w-9 md:h-11 md:w-11 rounded-full bg-white border border-neutral-300 flex items-center justify-center hover:border-neutral-900",
        
        authButton: `w-full bg-coil/80 text-white font-semibold py-3.5 rounded-full mb-10 hover:bg-text-primary duration-300 cursor-pointer`,
        authMethodButton: `
        flex-1 flex items-center justify-center gap-3 border border-gray-400 hover:bg-gray-200 rounded-full py-3 duration-300 
        text-coil text-sm font-medium`,
        explore: ` px-7 py-3 group bg-text-primary text-white rounded-full font-medium tracking-wide shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:bg-black hover:shadow-[0_20px_40px_rgba(0,0,0,0.35)] transition-all duration-300 ease-out`,
    };

    // 3. Size variants (The "Scale")
    const sizes = {
        sm: "text-xs px-3 py-1.5 rounded-md",
        md: "text-sm px-5 py-2.5 rounded-lg",
        lg: "text-base px-8 py-3.5 rounded-xl",
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className} cursor-pointer select-none`}
            disabled={disabled || isLoading}
            {...props}
        >
            {/* Show loading spinner if isLoading is true */}
            {isLoading && (
                <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            )}

            {/* Render icons only if they exist and we aren't loading */}
            {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
            {isLoading ? 'Loading...' : children}
            {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
        </button>
    );
};

export default Button;