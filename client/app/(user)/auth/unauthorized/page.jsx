import React from 'react';
import { ShieldX, ArrowLeft, Lock } from 'lucide-react';
import Link from 'next/link';

const page = () => {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-6 relative overflow-hidden">

            {/* Background grid */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(#155dfc 1px, transparent 1px), linear-gradient(90deg, #155dfc 1px, transparent 1px)`,
                    backgroundSize: '48px 48px',
                }}
            />

            {/* Glow blobs */}
            <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-accent/5 blur-[80px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-5%] w-[35%] h-[35%] bg-accent/5 blur-[80px] rounded-full pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center text-center max-w-md w-full">

                {/* Icon cluster */}
                <div className="relative mb-10">
                    {/* Outer ring */}
                    <div className="w-28 h-28 rounded-4xl border border-accent/15 bg-[#f8fbff] flex items-center justify-center shadow-[0_0_0_8px_#155dfc08,0_16px_48px_#155dfc10]">
                        <ShieldX size={44} className="text-accent" strokeWidth={1.5} />
                    </div>

                    {/* Lock badge */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-xl bg-accent flex items-center justify-center shadow-[0_4px_12px_#155dfc44]">
                        <Lock size={14} className="text-white" strokeWidth={2.5} />
                    </div>

                    {/* Decorative dots */}
                    <div className="absolute -bottom-1 -left-3 w-2 h-2 rounded-full bg-accent/30" />
                    <div className="absolute top-2 -left-5 w-1.5 h-1.5 rounded-full bg-accent/20" />
                    <div className="absolute bottom-3 -right-5 w-1 h-1 rounded-full bg-accent/25" />
                </div>

                {/* Error code */}
                <div className="flex items-center gap-2 mb-4">
                    <div className="h-px w-8 bg-accent/25" />
                    <span className="text-[10px] font-black text-accent/60 uppercase tracking-[0.3em]">Error 403</span>
                    <div className="h-px w-8 bg-accent/25" />
                </div>

                {/* Heading */}
                <h1 className="text-3xl font-black text-[#0f172a] tracking-tight mb-3 leading-tight">
                    Access <span className="text-accent">Restricted</span>
                </h1>

                {/* Subtext */}
                <p className="text-sm text-[#64748b] leading-relaxed mb-2 max-w-xs">
                    You don't have permission to access this area. This section is restricted to authorized administrators only.
                </p>

                <p className="text-xs text-[#94a3b8] mb-10">
                    If you believe this is a mistake, please contact your system administrator.
                </p>

                {/* Return button */}
                <Link
                    href="/"
                    className="group w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-2xl bg-accent text-white text-sm font-bold hover:bg-[#1a6aff] hover:shadow-[0_8px_24px_#155dfc44] active:scale-[0.98] transition-all duration-200 cursor-pointer mb-4"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-200" />
                    Return to Home
                </Link>

            </div>
        </div>
    );
};

export default page;