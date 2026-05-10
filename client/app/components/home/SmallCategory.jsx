import React from 'react';
import CategorySlider from '../sliders/CategorySlider';
import { apiClient } from '@/app/lib/apiClient';

const SmallCategory = async () => {
    
    // -------- From server ---------
    let categories = { data: [] };
    try {
        categories = await apiClient.get("/category/all", {
            cache: "no-store",
        });
    } catch (error) {
        console.log(error)
    }

    return (
        <section className="md:mt-28 mt-20 overflow-x-hidden">
            <div className="container">
                <div id='Small-Category-Row'>
                    <div className="flex flex-row justify-between items-start md:items-end mb-8 md:mb-18 gap-2 md:gap-8">
                        <h1 className="text-4xl md:text-[80px] font-bold tracking-tight leading-none text-text-primary">
                            Store.
                        </h1>

                        <h2 className="text-[14px] md:text-2xl font-semibold text-text-primary text-right">
                            The best way to buy the <br />
                            products you love.
                        </h2>
                    </div>
                </div>


                {/* ------------- SLider content -------------- */}
                <CategorySlider category={categories?.data} />
            </div>
        </section >
    );
};

export default SmallCategory;