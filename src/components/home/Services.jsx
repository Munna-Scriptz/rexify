import { ShieldCheck, Truck, Cpu, Headphones } from "lucide-react";



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
                <div className="flex flex-col md:flex-row justify-between items-center md:items-end text-center md:text-left mb-10 md:mb-15 gap-6 px-4 md:px-0">
                    <h2 className="text-3xl md:text-6xl font-bold tracking-tight text-text-primary font-display">
                        The <span className="text-blue-600">Rexify</span> <span className="block text-3xl md:text-5xl md:text-left mt-2">Standard</span>
                    </h2>
                    <p className="mt-4 text-text-muted text-base md:text-lg font-medium leading-relaxed max-w-lg md:text-right">
                        We don't just sell tech; we curate a premium experience.
                        Built for speed, trust, and the future.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {servicesItem.map((item, index) => (
                        <div
                            key={index}
                            className="
                                group relative p-6 h-full
                                bg-linear-to-br from-white to-gray-50
                                rounded-3xl
                                border border-gray-100
                                hover:border-gray-200
                                shadow-sm hover:shadow-lg
                                transition-all duration-500 ease-out
                                hover:bg-linear-to-br hover:from-white hover:to-blue-50
                                overflow-hidden
                            "
                        >
                            {/* Decorative Background Blur */}
                            <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-100 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-3xl" />

                            {/* Corner accent line */}
                            <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-blue-200 rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Icon - Clean & Minimal */}
                            <div className="flex items-center gap-3">
                                <div className="relative z-10 flex items-center justify-center w-14 h-14 rounded-2xl bg-linear-to-br from-blue-50 to-blue-100 text-blue-600 mb-6 group-hover:scale-105 group-hover:shadow-md transition-all duration-500">
                                    <item.icon size={28} strokeWidth={1.5} />
                                </div>
                                <h3 className="text-lg font-semibold text-coil mb-3 tracking-tight">
                                    {item.title}
                                </h3>
                            </div>

                            {/* Text */}
                            <div className="relative z-10">
                                <p className="text-text-secondary text-sm leading-relaxed font-normal select-none">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Services;