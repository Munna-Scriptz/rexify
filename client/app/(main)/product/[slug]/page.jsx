import { Cpu, Camera, Battery, Smartphone, Maximize, HardDrive } from 'lucide-react'
import { cookies } from 'next/headers'
import ImageGallery from '../../../components/product/ImageGallery'
import ProductDetails from '../../../components/product/ProductDetails'
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
                    {/* ================= Product Top Section ================= */}
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-20">

                        {/* --- Left: Image Gallery --- */}
                        <ImageGallery images={product?.data?.product?.images} />

                        {/* --- Right: Product Details --- */}
                        <ProductDetails product={product?.data?.product} />
                    </div>

                    {/* ================= Specs & Description ================= */}
                    <Specifications specifications={product?.data?.product?.specifications} />

                    {/* ================= Specs & Description ================= */}
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