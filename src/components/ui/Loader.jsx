import React from 'react';
import { Link as LinkIcon } from 'lucide-react';

const Loader = () => {
    return (
        <div className="fixed inset-0 z-999 bg-primary flex flex-col items-center justify-center overflow-hidden">

            <div className="absolute inset-0 bg-[radial-linear(ellipse_at_center,var(--tw-linear-stops))] from-slate-900 via-primary to-black opacity-80"></div>

            {/* 2. The "Compression Tunnel" */}
            <div className="relative flex items-center justify-center">

                {/* The Gyroscope Rings (Representing stability/precision) */}
                <div className="absolute w-64 h-64 border border-slate-700/30 rounded-full animate-gyro"></div>
                <div className="absolute w-48 h-48 border border-slate-600/30 rounded-full animate-gyro animation-delay-1000" style={{ animationDirection: 'reverse', animationDuration: '10s' }}></div>

                {/* --- LEFT SIDE: The "Long" Data Stream (Incoming) --- */}
                <div className="absolute right-12 flex flex-col gap-2 opacity-50">
                    {/* These lines look like they are rushing into the center */}
                    <div className="w-32 h-0.5 bg-linear-to-l from-violet-500 to-transparent animate-[stream-in_1.5s_infinite_linear]"></div>
                    <div className="w-48 h-0.5 bg-linear-to-l from-fuchsia-500 to-transparent animate-[stream-in_2s_infinite_linear_0.2s]"></div>
                    <div className="w-24 h-0.5 bg-linear-to-l from-indigo-500 to-transparent animate-[stream-in_1.2s_infinite_linear_0.5s]"></div>
                </div>

                {/* --- RIGHT SIDE: The "Long" Data Stream (Incoming from other side) --- */}
                <div className="absolute left-12 flex flex-col gap-2 opacity-50 rotate-180">
                    <div className="w-32 h-0.5 bg-linear-to-l from-violet-500 to-transparent animate-[stream-in_1.5s_infinite_linear]"></div>
                    <div className="w-48 h-0.5 bg-linear-to-l from-fuchsia-500 to-transparent animate-[stream-in_2s_infinite_linear_0.2s]"></div>
                </div>

                {/* --- THE CORE (The Shortener Engine) --- */}
                <div className="relative z-10 w-24 h-24 bg-slate-950 rounded-full flex items-center justify-center border border-white/10 animate-core">
                    {/* The glowing event horizon */}
                    <div className="absolute inset-0 rounded-full bg-linear-to-br from-violet-600/50 to-fuchsia-600/50 blur-xl opacity-50"></div>

                    {/* The Glass Orb */}
                    <div className="relative z-20 w-full h-full rounded-full bg-linear-to-b from-white/5 to-transparent backdrop-blur-sm flex items-center justify-center overflow-hidden">
                        {/* Highlight Shine */}
                        <div className="absolute top-0 w-full h-1/2 bg-linear-to-b from-white/10 to-transparent opacity-50"></div>

                        {/* The Link Icon - Pulsing */}
                        <LinkIcon className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] animate-pulse" size={32} />
                    </div>
                </div>

            </div>

            {/* 3. Futuristic Status Text */}
            <div className="mt-16 text-center z-10 space-y-2">
                <h2 className="text-xl font-medium text-white tracking-[0.3em] uppercase">
                    Loading
                </h2>
                <div className="flex items-center justify-center gap-1">
                    <span className="w-1 h-1 bg-fuchsia-500 rounded-full animate-bounce"></span>
                    <span className="w-1 h-1 bg-violet-500 rounded-full animate-bounce delay-100"></span>
                    <span className="w-1 h-1 bg-indigo-500 rounded-full animate-bounce delay-200"></span>
                </div>
                <p className="text-[10px] text-slate-500 font-mono mt-2">
                    Entering to Rexurl please wait // v2.0.4
                </p>
            </div>

        </div>
    );
};

export default Loader;