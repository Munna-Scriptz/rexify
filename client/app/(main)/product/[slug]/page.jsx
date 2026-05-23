import { cookies } from 'next/headers'
import ProductContainer from '../../../components/product/ProductContainer'
import Specifications from '../../../components/product/Specifications'
import { apiClient } from '@/app/lib/apiClient'
import ProductReview from '@/app/components/product/ProductReview'
import ProductSlider from '@/app/components/sliders/ProductSlider'

const page = async ({ params }) => {
    const { slug } = await params;
    const cookieStore = await cookies();
    const token = cookieStore.get('X-AS-TOKEN')?.value;
    // -------- From server ---------
    let product = { data: [] };
    let currentUser = null;
    let related = { data: [] };

    try {
        const [productRes, userRes] = await Promise.all([
            apiClient.get(`/product/${slug}`),
            token ? apiClient.get('/auth/profile', { headers: { Cookie: `X-AS-TOKEN=${token}` } }) : null,
        ]);
        product = productRes;
        currentUser = userRes;

        related = await apiClient.get(`/product/related/?tags=${product?.data?.product?.tags}&limit=${10}`)
    } catch (error) {
        console.log(error)
    }

    return (
        <section id='Product-details' className="text-text-primary pb-20 mt-8">
            <div id='Product-details-row'>
                <div className="container pt-12">
                    {/* ================= Product Top Section (Image Gallery & Details wrapper) ================= */}
                    <ProductContainer
                        product={product?.data?.product}
                        currentUser={currentUser}
                    />

                    {/* ================= Specs & Description ================= */}
                    <Specifications specifications={product?.data?.product?.specifications} />

                    {/* ================= Product Reviews ================= */}
                    <ProductReview
                        reviews={product?.data?.reviews}
                        productId={product?.data?.product?._id}
                        currentUser={currentUser}
                    />

                    {/* ================= Related Products ================= */}
                    <section id='Best-Seller' className='md:mt-28 mt-20'>
                        <div className="container">
                            <div id="Header-Row" className="mb-6 md:mb-10 flex items-center md:items-end justify-between">
                                <h2 className="text-2xl md:text-4xl font-semibold text-text-primary">
                                    Related Products
                                </h2>

                                <button className="text-sm md:text-base font-medium text-text-secondary hover:text-neutral-900 flex items-center gap-1 transition cursor-pointer " >
                                    View all
                                    <span className="text-base">→</span>
                                </button>
                            </div>
                        </div>

                        {/* ----------- Slider Content ----------- */}
                        <ProductSlider products={related?.data} />
                    </section>
                </div>
            </div>
        </section>
    )
}

export default page