import { cookies } from 'next/headers'
import ProductContainer from '../../../components/product/ProductContainer'
import Specifications from '../../../components/product/Specifications'
import RelatedProduct from '../../../components/common/RelatedProduct'
import { apiClient } from '@/app/lib/apiClient'
import ProductReview from '@/app/components/product/ProductReview'

const page = async ({ params }) => {
    const { slug } = await params;
    const cookieStore = await cookies();
    const token = cookieStore.get('X-AS-TOKEN')?.value;
    // -------- From server ---------
    let product = { data: [] };
    let currentUser = null;

    try {
        const [productRes, userRes] = await Promise.all([
            apiClient.get(`/product/${slug}`),
            token ? apiClient.get('/auth/profile', { headers: { Cookie: `X-AS-TOKEN=${token}` } }) : null
        ]);
        product = productRes;
        currentUser = userRes;
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
                    {/* <RelatedProduct product={product} /> */}
                </div>
            </div>
        </section>
    )
}

export default page