import React from 'react';
import CategorySlider from '../sliders/CategorySlider';

const SmallCategory = () => {
    const products = [
        { name: "Mac", image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/store-card-13-mac-nav-202510?wid=400&hei=260&fmt=png-alpha&.v=M1Q3OGxnb1lBaHhqNjZ2OVRXZmx4YkVwOVNLbHRldEZZYkpvZ0VDM1ZJYisrUlZaSVRoWVYzU0Qra0FoTmUwNng2bitObzZwQzk4cEorV1dZdzhIazlhTkRKemhDN0NEc1VzN1ZjMGR5dUk" },
        { name: "iPhone", image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/store-card-13-iphone-nav-202509?wid=1200&hei=780&fmt=png-alpha&.v=dW5XbHI1eDVpd01qWUU4bFRtWGZXM1doT212VzJoWjBSKzRpbmNETHN1QnRHU3BERzdnOWdiQkwvWTZGajY2b1M0TjRWdzF2UjRGVEY0c3dBQVZ6VFN0TmdKaCs3NTJMbFVuOGp2LzI5RGc" },
        { name: "iPad", image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/store-card-13-ipad-nav-202405?wid=400&hei=260&fmt=png-alpha&.v=dW5XbHI1eDVpd01qWUU4bFRtWGZXNGFLQTJVNnlNQmQrVmRBYnZYei9jckUzelNmMnRxajE0NHhmMWtLazl6eG53M0FRZHBXNTh1U1lFVEtSR2YzTm5qbE56RWRpRFNIRXZvbkd2S0l5dTg" },
        { name: "Apple Watch", image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/store-card-13-watch-nav-202509?wid=400&hei=260&fmt=png-alpha&.v=S0tSVzBtSkRkSFFhMm1zS1NmeWtkeUdJZTE2SHMxcG9uUER3YTRFOUZ6ckh5NTJ6cGtEemJOblBHR043ZjFkZzAzOVFHb3N0MkVmS01ZcFh0d1Y4R2k5NGJENldmZ3lMeGxpSDNmeE9hd2s" },
        { name: "Apple Vision Pro", image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/store-card-13-vision-pro-nav-202401?wid=400&hei=260&fmt=png-alpha&.v=VzVpanYvTldHb05iVXFhc0xveWRLM25jd0w4dXFwc1hFbWZkNm9IcUR2bytSMWt1ZUNyTGx4SjRKL1pSL0ZDeGpCeVFkSWhuN0RJazJDeHBqaFFac0hlZzcwajlwb1R2dHNlazl1dldSUGQ5RzBLTDk5c25YRG5wR2ZpUlI4RFM" },
        { name: "AirPods", image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/store-card-13-airpods-nav-202509?wid=400&hei=260&fmt=png-alpha&.v=Q0Z1bWFqMUpRRnp3T0Y0VWJpdk1yMDhFUStvWHB3SDlDa3VrdUZORWRqeld1aTN5QlRYNG5PRjJxc2d1RklXbVM0TjRWdzF2UjRGVEY0c3dBQVZ6VGZUMjJQZFhhT2thWmkxZjhra3FyZEk" },
        { name: "AirTag", image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/store-card-13-airtags-nav-202108?wid=400&hei=260&fmt=png-alpha&.v=Q0Z1bWFqMUpRRnp3T0Y0VWJpdk1ydzduWDk4YUM5R1JVL2gwcEZnWWNaRFd1aTN5QlRYNG5PRjJxc2d1RklXbVM0TjRWdzF2UjRGVEY0c3dBQVZ6VFltc1ByWXViNGVYdEdGdkhJbjJoMGs" },
        { name: "Apple TV 4K", image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/store-card-13-appletv-nav-202210?wid=400&hei=260&fmt=png-alpha&.v=T0wvM1N3YUcxQ09qK0VNRkl1RU1BZFM5WnN0RmVZRmVXQ0FCUWJjbnJDald1aTN5QlRYNG5PRjJxc2d1RklXbVM0TjRWdzF2UjRGVEY0c3dBQVZ6VFZ3YmJrVi9SakQxWUcrYWQwVXc5VTA" },
        { name: "HomePod", image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/store-card-13-homepod-nav-202301?wid=400&hei=260&fmt=png-alpha&.v=WVcvamRucHVMMWs5SXZ3bVJ3Q2hpZGR0czFXNWdCUW14eTN2U29pLzNMcld1aTN5QlRYNG5PRjJxc2d1RklXbVM0TjRWdzF2UjRGVEY0c3dBQVZ6VFJmbWU0TjJLamxsdTltNkZVZ1RhbDA" },
    ];

    return (
        <section className="md:mt-28 mt-20 overflow-x-hidden">
            <div className="container">
                <div id='Small-Category-Row'>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-18 gap-2 md:gap-8">
                        <h1 className="text-5xl md:text-[80px] font-bold tracking-tight leading-none text-text-primary">
                            Store.
                        </h1>

                        <h2 className="text-[17px] md:text-2xl font-semibold text-text-primary text-left md:text-right">
                            The best way to buy the <br />
                            products you love.
                        </h2>
                    </div>
                </div>


                {/* ------------- SLider content -------------- */}
                <CategorySlider products={products} />
            </div>
        </section >
    );
};

export default SmallCategory;