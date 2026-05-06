import React from 'react'

const LatestCard = ({ item }) => {
    return (
        <div className="w-[95%] md:h-130 select-none h-110 p-6 bg-cover bg-no-repeat bg-center relative rounded-[20px] shadow hover:shadow-[0px_4px_16px_rgba(17,17,26,0.1),0px_8px_24px_rgba(17,17,26,0.1),0px_16px_56px_rgba(17,17,26,0.1)] duration-300 hover:scale-[1.02] my-2" style={{
            backgroundImage: `url(${typeof item.image === "string" ? item.image : item.image.src})`
        }}>
            <div className='md:pt-6 pt-4 space-y-1'>
                <h2 style={{color: `${item.color}`}} className={`md:text-[26px] text-2xl font-semibold`}>{item.name}</h2>
                <p style={{color: `${item.color}`}} className={`text-lg font-medium`}>{item.text}</p>
                <p style={{color: `${item.color}`}} className={`text-sm`}>{item.desc}</p>
            </div>
        </div>
    )
}

export default LatestCard