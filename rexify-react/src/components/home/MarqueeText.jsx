import React from 'react'
import { Link } from 'react-router'
import Button from '../../components/ui/Buttons'

const MarqueeText = () => {
    return (
        <>
            <section id='Marquee' className='mt-28 md:mt-50'>
                <div className="grid grid-cols-1 lg:grid-cols-12 lg:grid-flow-row-dense gap-y-4 gap-x-6">
                    <div className="lg:col-start-1 lg:col-end-13">

                        <div className="marquee-wrapper text-text-primary flex overflow-hidden gap-1 text-3xl md:text-6xl uppercase font-space">
                            <div className="marquee-track animate-marquee">
                                <p>Rexify · Smarter Tech · Built for the Future ·</p>
                            </div>
                            <div className="marquee-track animate-marquee">
                                <p>Rexify · Smarter Tech · Built for the Future ·</p>
                            </div>
                            <div className="marquee-track animate-marquee">
                                <p>Rexify · Smarter Tech · Built for the Future ·</p>
                            </div>
                            <div className="marquee-track animate-marquee">
                                <p>Rexify · Smarter Tech · Built for the Future ·</p>
                            </div>
                            <div className="marquee-track animate-marquee">
                                <p>Rexify · Smarter Tech · Built for the Future ·</p>
                            </div>
                            <div className="marquee-track animate-marquee">
                                <p>Rexify · Smarter Tech · Built for the Future ·</p>
                            </div>
                            <div className="marquee-track animate-marquee">
                                <p>Rexify · Smarter Tech · Built for the Future ·</p>
                            </div>
                            <div className="marquee-track animate-marquee">
                                <p>Rexify · Smarter Tech · Built for the Future ·</p>
                            </div>
                            <div className="marquee-track animate-marquee">
                                <p>Rexify · Smarter Tech · Built for the Future ·</p>
                            </div>
                            <div className="marquee-track animate-marquee">
                                <p>Rexify · Smarter Tech · Built for the Future ·</p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* ----------------- Bottom Text ----------------- */}
                <div className="container">
                    <div className='flex flex-col items-center gap-6 md:mt-10 mt-6'>
                        <p className='text-center max-w-5xl text-sm md:text-lg'>
                            The Consumer Electronics industry is broken. We’re here to fix it. We build high-performance products that are easy to repair, upgrade, and customize, so you can use them for as long as you'd like.
                        </p>

                        <Link to={'/'}>
                            <button className={` relative overflow-hidden px-6 py-2 text-base font-semibold uppercase text-text-primary border border-text-muted rounded-[34px] transition-all duration-300 [transition-timing-function:cubic-bezier(0.23,1,0.32,1) before:content-[''] before:absolute before:inset-0 before:m-auto before:w-12.5 before:h-12.5 before:rounded-[inherit] before:scale-0 before:-z-10 before:bg-accent before:transition-all before:duration-900 before:[transition-timing-function:cubic-bezier(0.23,1,0.32,1) hover:before:scale-[6] hover:text-surface hover:scale-110 hover:shadow-[0_0_20px_rgba(193,163,98,0.4)] active:scale-100`}>
                                Learn More about us
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}

export default MarqueeText