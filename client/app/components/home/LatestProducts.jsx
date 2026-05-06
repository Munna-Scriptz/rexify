import React from 'react'
import LatestProductSlider from '../sliders/LatestProductSlider'

const LatestProducts = () => {
    return (
        <>
            <section id='LatestProduct' className='md:mt-28 mt-20 overflow-x-hidden'>
                <div className="container">
                    {/* ------------ Text  */}
                    <div id="Header-Row" className='mb-6 md:mb-10 text-2xl md:text-3xl font-semibold '>
                        <h2 className='text-text-primary'>The latest. <span className='text-text-secondary'>Take a look at what’s new, right now.</span></h2>
                    </div>
                    {/* ------------ Slider Content  */}
                    <LatestProductSlider />
                </div>
            </section>
        </>
    )
}

export default LatestProducts