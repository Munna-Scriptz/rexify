import React from 'react'
import pro1 from '../../assets/latestPro1.jpg'
import pro2 from '../../assets/latestPro2.jpg'
import pro3 from '../../assets/latestPro3.jpg'
import pro4 from '../../assets/latestPro4.jpg'
import LatestProductSlider from '../sliders/LatestProductSlider'

const LatestProducts = () => {
    const products = [
        { name: "iPhone 17 Pro", color: 'surface', text: 'All out Pro.', desc: 'From $1099 or $45.79/mo. for 24 mo.', image: pro1 },
        { name: "MacBook Pro 14", color: 'surface', text: 'Supercharged by M5.', desc: 'From $1599 or $133.25/mo. for 12 months.', image: pro3 },
        { name: "iPad Pro", color: 'surface', text: 'Mmmmm. Power.', desc: 'From $999 or $83.25/mo. for 12 months', image: pro2 },
        { name: "Apple Watch Series 11", color: 'text-primary', text: 'The ultimate way to watch your health.', desc: 'From $399 or $33.25/mo. for 12 mo.', image: pro4 },
        { name: "Apple Vision Pro", color: 'text-primary', text: 'New powerful M5 chip and comfortable Dual Knit Band.', desc: 'From $3499 or $291.58/mo. for 12 mo.', image: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/store-card-40-vision-pro-202510?wid=800&hei=1000&fmt=jpeg&qlt=90&.v=TVVQNGFmWnRIeGl6RHZFdkZqMmNxT2JuTWZNYUVWLzFTaTdNdUxxeWtQVG45S05qekNUdVUwMVFyK1pKaERUd2JGcXNRQnFCV0w3WVRjTExvdm1ic1JRRkR1OTVrTXczUEJ3YTNXM0U0S1QrNmVjbmk5c1V4VVk2VEt3TGcxekg' },
    ];

    return (
        <>
            <section id='LatestProduct' className='mt-28 overflow-x-hidden'>
                <div className="container">
                    {/* ------------ Text  */}
                    <div id="Header-Row" className='mb-6 md:mb-10 text-2xl md:text-3xl font-semibold '>
                        <h2 className='text-text-primary'>The latest. <span className='text-text-secondary'>Take a look at what’s new, right now.</span></h2>
                    </div>
                </div>

                {/* ------------ Slider Content  */}
                <LatestProductSlider products={products}/>
            </section>
        </>
    )
}

export default LatestProducts