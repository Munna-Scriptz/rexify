import React from 'react'
import ProductSlider from '../sliders/ProductSlider';
import { apiClient } from '@/app/lib/apiClient';

const BestSeller = async () => {

    // -------- From server --------
    let products = { data: [] };

    try {
        products = await apiClient.get("/product", {
            revalidate: 60 * 20,
        });
    } catch (error) {
        console.log(error)
    }

    return (
        <>
            <section id='Best-Seller' className='md:mt-28 mt-20'>
                <div className="container">
                    <div id="Header-Row" className="mb-6 md:mb-10 flex items-center md:items-end justify-between">
                        <h2 className="text-2xl md:text-4xl font-semibold text-text-primary">
                            All Collection.
                        </h2>

                        <button className="text-sm md:text-base font-medium text-text-secondary hover:text-neutral-900 flex items-center gap-1 transition cursor-pointer " >
                            View all
                            <span className="text-base">→</span>
                        </button>
                    </div>


                    {/* ----------- Slider Content ----------- */}
                    <ProductSlider products={products?.data?.products} />
                </div>
            </section>
        </>
    )
}

export default BestSeller