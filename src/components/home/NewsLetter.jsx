import React from 'react'
import Button from '../../ui/Button'
import wiggleImg from '../../assets/wiggleImg.png'
import MoveEyes from '../../ui/MoveEyes'

const NewsLetter = () => {
    return (
        <>
            <section id='content' className='mt-35 py-24'>
                <div className="container">
                    <div className="px-6 relative">

                        <div className="absolute left-10 top-5 text-orange-500">
                            <MoveEyes />
                        </div>

                        <div className="absolute right-25 top-5 -rotate-10 text-accent">
                            <span className="text-xl font-semibold">Monthly-ish</span>

                            <div className="w-31 overflow-hidden">
                                <div className="wiggle-track">
                                    <img
                                        src={wiggleImg}
                                        alt="wiggle"
                                        className="h-2.5 object-cover"
                                    />
                                    <img
                                        src={wiggleImg}
                                        alt="wiggle duplicate"
                                        className="h-2.5 object-cover"
                                    />
                                </div>
                            </div>
                        </div>


                        <div className="text-center">
                            <h2 className="text-4xl md:text-[54px] font-semibold font-secondary text-text-primary leading-tight">
                                Keep track of what we’re<br />
                                working on with the Framework<br />
                                Newsletter.
                            </h2>

                            <div className="mt-16 flex items-center gap-6 max-w-6xl mx-auto">
                                <input
                                    type="email"
                                    className="w-full bg-transparent border-b border-neutral-900 focus:outline-none hover:border-accent hover:placeholder:text-accent duration-300 focus:border-neutral-500 py-2 text-lg"
                                    placeholder='Your email'
                                />

                                <Button variant='explore'>Subscribe</Button>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}

export default NewsLetter