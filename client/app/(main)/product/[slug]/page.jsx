import { Cpu, Camera, Battery, Smartphone, Maximize, HardDrive } from 'lucide-react'
import ImageGallery from '../../../components/product/ImageGallery'
import ProductDetails from '../../../components/product/ProductDetails'
import Specifications from '../../../components/product/Specifications'
import RelatedProduct from '../../../components/common/RelatedProduct'
import { apiClient } from '@/app/lib/apiClient'
import ProductReview from '@/app/components/product/ProductReview'

const page = async ({ params }) => {
    const { slug } = await params;
    // -------- From server ---------
    let product = { data: [] };

    try {
        product = await apiClient.get(`/product/${slug}`);
    } catch (error) {
        console.log(error)
    }

    console.log(product)

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
                    <ProductReview reviews={product?.data?.reviews}/>

                    {/* ================= Related Products ================= */}
                    {/* <RelatedProduct product={product} /> */}
                </div>
            </div>
        </section>
    )
}

export default page