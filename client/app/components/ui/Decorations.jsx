// ----------------------- Home Decorations ---------------------------
export default function HomeDecorations() {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {/* 1. The Base: Noise & Grid */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 transition-opacity"></div>
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>

            {/* 2. Cyber ScanLine (Subtle movement) */}
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-fuchsia-500/5 to-transparent h-[20%] w-full animate-[scanLine_8s_linear_infinite] opacity-20"></div>

            {/* 3. Primary Glowing Blobs (With Pulse) */}
            <div className="absolute top-[-10%] left-[-10%] w-125 h-125 bg-violet-600/20 rounded-full blur-[120px] animate-[pulse-slow_10s_infinite]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-125 h-125 bg-fuchsia-500/15 rounded-full blur-[120px] animate-[pulse-slow_12s_infinite_reverse]" />

            {/* 4. Accent Flares (Sharp glow in corners) */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[80px] rounded-full"></div>
            <div className="absolute bottom-1/2 left-0 w-32 h-96 bg-violet-500/5 blur-[100px] rounded-full rotate-45"></div>

            {/* 5. Twinkling "Stars" (Small subtle dots) */}
            <div className="absolute top-1/4 left-1/3 w-1 h-1 bg-white rounded-full animate-[twinkle_3s_infinite] shadow-[0_0_8px_white]"></div>
            <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-fuchsia-400 rounded-full animate-[twinkle_4s_infinite_1s] shadow-[0_0_8px_#d946ef]"></div>
            <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-violet-400 rounded-full animate-[twinkle_5s_infinite_2s] shadow-[0_0_8px_#7c3aed]"></div>

            {/* 6. Top Edge Light (Makes the Nav pop) */}
            <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-violet-500/50 to-transparent"></div>
        </div>
    )
}