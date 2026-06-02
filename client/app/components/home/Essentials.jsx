import React from 'react'
import EssentialCard from '../cards/EssentialCard';
import EssentialSlider from '../sliders/EsstentialSlider';
import Button from '../../components/ui/Buttons';
import Link from 'next/link';
import { apiClient } from '@/app/lib/apiClient';

const Essentials = async () => {
    // -------- From server ---------
    const products = await apiClient.get("/product/home?isEveryday=true", {
        revalidate: 60 * 5,
    });

    return (
        <>
            <section id='Essentials' className='mt-20 md:mt-30'>
                <div className="container">
                    {/* -------------- Text Header --------------- */}
                    <div id="Header-Row" className="mb-8 md:mb-10 flex flex-row items-center md:items-end justify-between">
                        <h2 className="text-2xl md:text-4xl font-semibold text-text-primary">
                            Everyday Essentials.
                        </h2>

                        <button className="text-sm md:text-base font-medium text-text-secondary hover:text-neutral-900 flex items-center gap-1 transition cursor-pointer" >
                            View all
                            <span className="text-base">→</span>
                        </button>
                    </div>

                    {/* -------------- Cards --------------- */}
                    {/* Desktop Layout */}
                    <div
                        id="content-Row"
                        className="hidden md:flex flex-row justify-center gap-8"
                    >
                        {/* Left Column */}
                        <div className="flex flex-col gap-8 translate-y-6 select-none">
                            {products?.data
                                .filter((_, i) => i % 3 === 0)
                                .map((item, i) => (
                                    <EssentialCard
                                        key={i}
                                        img={item.variants[0].thumbnail}
                                        badge={item.badge}
                                        name={item.title}
                                        slug={item.slug}
                                        variant={item.brand}
                                        price={item.price}
                                        rating={item.avgReview || 0}
                                        reviews={item.totalReview || 0}
                                    />
                                ))}
                        </div>

                        {/* Middle Column (Raised) */}
                        <div className="flex flex-col gap-8 -translate-y-6">
                            {products?.data
                                .filter((_, i) => i % 3 === 1)
                                .map((item, i) => (
                                    <EssentialCard
                                        key={i}
                                        img={item.variants[0].thumbnail}
                                        badge={item.badge}
                                        name={item.title}
                                        variant={item.brand}
                                        price={item.variants[0].price}
                                        rating={item.avgReview || 0}
                                        reviews={item.totalReview || 0}
                                    />
                                ))}
                        </div>

                        {/* Right Column */}
                        <div className="flex flex-col gap-8 translate-y-6">
                            {products?.data
                                .filter((_, i) => i % 3 === 2)
                                .map((item, i) => (
                                    <EssentialCard
                                        key={i}
                                        img={item.variants[0].thumbnail}
                                        badge={item.badge}
                                        name={item.title}
                                        variant={item.brand}
                                        price={item.price}
                                        rating={item.avgReview || 0}
                                        reviews={item.totalReview || 0}
                                    />
                                ))}
                        </div>
                    </div>

                    {/* mobile slider --------------- */}
                    <div className='md:hidden block'>
                        <EssentialSlider products={products?.data} />
                    </div>

                    {/* -------------- Explore more ------------- */}
                    <Link href={'/category'} className='flex items-center justify-center mt-10 md:mt-14'>
                        <Button variant='explore' className="w-full md:w-auto">Explore More →</Button>
                    </Link>
                </div>
            </section>
        </>
    )
}

export default Essentials