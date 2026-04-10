import React from 'react'
import Button from '../../components/ui/Buttons'
import wiggleImg from '../../assets/wiggleImg.png'
import MoveEyes from '../../components/ui/MoveEyes'

const NewsLetter = () => {
    return (
        <>
            <section id='content' className='mt-20 md:mt-35 py-12 md:py-24'>
                <div className="container">
                    <div className="relative">

                        <div className="absolute left-0 md:left-10 top-0 md:top-5 text-orange-500 scale-75 md:scale-100">
                            <MoveEyes />
                        </div>

                        <div className="absolute right-0 md:right-25 top-0 md:top-5 -rotate-10 text-accent scale-100">
                            <span className="text-sm md:text-xl font-semibold">Monthly-ish</span>

                            <div className="w-21 md:w-31 overflow-hidden">
                                <div className="wiggle-track">
                                    <img
                                        src={wiggleImg}
                                        alt="wiggle"
                                        className="h-1.5 md:h-2.5 object-cover"
                                    />
                                    <img
                                        src={wiggleImg}
                                        alt="wiggle duplicate"
                                        className="h-1.5 md:h-2.5 object-cover"
                                    />
                                </div>
                            </div>
                        </div>


                        <div className="text-center pt-18 md:pt-0">
                            <h2 className="text-2xl md:text-[54px] font-semibold font-secondary text-text-primary leading-tight">
                                Keep track of what we’re<br className="hidden md:block" />
                                working on with the Framework<br className="hidden md:block" />
                                Newsletter.
                            </h2>

                            <div className="mt-8 md:mt-16 flex flex-col md:flex-row items-center gap-4 md:gap-6 max-w-3xl mx-auto">
                                <input
                                    type="email"
                                    className="w-full bg-transparent border-b border-neutral-900 focus:outline-none hover:border-accent hover:placeholder:text-accent duration-300 focus:border-neutral-500 py-2 text-base md:text-lg"
                                    placeholder='Your email'
                                />

                                <Button variant='explore' className="w-full md:w-auto">Subscribe</Button>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}

export default NewsLetter