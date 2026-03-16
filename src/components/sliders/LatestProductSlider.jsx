import React, { useState } from 'react'
import SingleLatestCard from '../common/SingleLatestCard'
import Slider from 'react-slick'

const LatestProductSlider = ({ products }) => {

    return (
        <div id="Cards-Row" className='pl-4 md:pl-10'>
            <div className='md:mr-7'>
                {products.map((item, i) => (
                    <SingleLatestCard key={i} item={item} />
                ))}
            </div>
        </div>
    )
}

export default LatestProductSlider