import { ShieldCheck, Truck, Cpu, Headphones } from "lucide-react";
import ServiceCard from "../cards/ServiceCard";
import ServiceSlider from "../sliders/ServiceSlider";

const Services = () => {
    const servicesItem = [
        {
            icon: ShieldCheck,
            title: "Secure Payments",
            desc: "Enterprise-grade security with encrypted transactions and trusted gateways."
        },
        {
            icon: Truck,
            title: "Fast Delivery",
            desc: "Optimized logistics to deliver your tech faster, safer, and on time."
        },
        {
            icon: Cpu,
            title: "Latest Technology",
            desc: "Carefully curated cutting-edge tech products from trusted brands."
        },
        {
            icon: Headphones,
            title: "24/7 Support",
            desc: "Always-on expert support for a smooth and reliable shopping experience."
        }
    ];

    return (
        <section id="Services">
            <div className="container">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end text-center md:text-left mb-10 md:mb-15 gap-0">
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-text-primary font-display">
                        The <span className="text-blue-600">Rexify</span> <span className="block text-3xl md:text-5xl text-left md:mt-2">Standard</span>
                    </h2>
                    <p className="mt-4 text-text-muted text-sm md:text-lg font-medium leading-relaxed max-w-lg text-left md:text-right">
                        We don't just sell tech; we curate a premium experience.
                        Built for speed, trust, and the future.
                    </p>
                </div>

                {/* ---------------- Cards --------------- */}
                <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {servicesItem.map((item, i) => (
                        <ServiceCard item={item} key={i} />
                    ))}
                </div>

                {/* mobile slider --------------- */}
                <div className='md:hidden block'>
                    <ServiceSlider />
                </div>



            </div>
        </section>
    );
}

export default Services;