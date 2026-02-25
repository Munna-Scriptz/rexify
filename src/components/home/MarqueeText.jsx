import React from 'react'
import { Link } from 'react-router'
import Button from '../../ui/Button'

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
                            <Button variant="outline">
                                Learn More about us
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}

export default MarqueeText