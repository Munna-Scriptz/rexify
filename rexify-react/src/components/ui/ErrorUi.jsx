import React from 'react'

const ErrorUi = ({errorMessage}) => {
    return (
        <div className={`${errorMessage ? '' : 'hidden'} w-full flex justify-center px-2 mb-6`}>
            <div className="animate-error flex items-center gap-3 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 backdrop-blur-md shadow-[0_0_20px_rgba(239,68,68,0.1)]">
                {/* Glowing Dot */}
                <div className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </div>

                {/* Error Text */}
                <p className="text-[10px] md:text-xs font-black tracking-[0.15em] text-red-400 uppercase">
                    {errorMessage}
                </p>

                {/* Decorative corner accent */}
                <div className="h-2 w-0.5 bg-red-500/40 ml-1"></div>
            </div>
        </div>
    )
}

export default ErrorUi