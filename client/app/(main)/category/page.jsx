import { PageHeader } from '../../components/common/PageHeader';
import CategoryCard from '../../components/cards/CategoryCard';
import { apiClient } from '@/app/lib/apiClient';

const page = async () => {
    // -------- From server ---------
    let categories = { data: [] };
    try {
        categories = await apiClient.get("/category/all", {
            revalidate: 300,
        });
    } catch (error) {
        console.log(error)
    }

    return (
        <>
            <section id='Category'>
                <div className="container">
                    <div id="Category-Row">
                        {/* Header */}
                        <PageHeader topText={"Explore The Future"} headerText={"Browse by"} colorText={"Category"} bottomText={"Dive into our extensive collection of premium electronics. Find exactly what you need, organized for your convenience."} />

                        {/* Category Grid */}
                        <section className="py-20">
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 gap-6">
                                {categories?.data.map((item, i) => (
                                    <CategoryCard item={item} key={i} />
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </section>
        </>
    );
};

export default page
