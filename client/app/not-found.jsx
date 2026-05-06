import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-6 relative overflow-hidden">

            {/* Subtle grid */}
            <div
                className="absolute inset-0 opacity-[0.025]"
                style={{
                    backgroundImage: `linear-gradient(#155dfc 1px, transparent 1px), linear-gradient(90deg, #155dfc 1px, transparent 1px)`,
                    backgroundSize: '52px 52px',
                }}
            />

            {/* Softer gradient glow */}
            <div className="absolute top-[-15%] right-[-10%] w-[45%] h-[45%] bg-accent/6 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-15%] left-[-10%] w-[40%] h-[40%] bg-accent/6 blur-[120px] rounded-full" />

            <div className="relative z-10 flex flex-col items-center text-center max-w-md w-full">

                {/* 404 Section */}
                <div className="relative mb-4 select-none">

                    {/* Gradient 404 */}
                    <h1 className="text-[clamp(7rem,20vw,9rem)] font-black tracking-tight bg-linear-to-b from-accent/30 to-transparent bg-clip-text text-transparent">
                        404
                    </h1>
                </div>

                {/* Label */}
                <div className="flex items-center gap-3 mb-3">
                    <div className="h-px w-10 bg-accent/20" />
                    <span className="text-[10px] font-bold text-accent/60 uppercase tracking-[0.3em]">
                        Page Not Found
                    </span>
                    <div className="h-px w-10 bg-accent/20" />
                </div>

                {/* Heading */}
                <h1 className="text-3xl font-black text-[#0f172a] tracking-tight mb-3">
                    You drifted too far
                </h1>

                {/* Subtext */}
                <p className="text-sm text-[#64748b] leading-relaxed mb-6 max-w-sm">
                    The page you're trying to reach doesn’t exist or has been moved.
                    Try navigating back or exploring other sections.
                </p>

                {/* Fake path (cleaner) */}
                <div className="flex items-center gap-2 mb-10 px-4 py-3 bg-[#f9fbff] border border-[#e6ecf5] rounded-xl w-full max-w-70 shadow-sm">
                    <span className="text-[11px] font-mono text-[#94a3b8] truncate flex-1 text-left">
                        /unknown-route
                    </span>
                    <span className="text-[10px] font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-md border border-red-100">
                        404
                    </span>
                </div>

                {/* CTA */}
                <Link
                    href="/"
                    className="group w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-2xl bg-accent text-white text-sm font-semibold hover:bg-[#1a6aff] hover:shadow-[0_10px_30px_rgba(21,93,252,0.35)] active:scale-[0.98] transition-all duration-200 mb-4"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </Link>

                {/* Footer */}
                <p className="text-[10px] text-[#94a3b8]">
                    Error code: <span className="font-bold text-accent/60">404_NOT_FOUND</span>
                </p>

            </div>
        </div>
    );
};

export default NotFound;